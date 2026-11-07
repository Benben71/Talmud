// Serveur de la hevrouta : reçoit l'état de l'étude (sougya, segment courant, coup joué, historique)
// et interroge OpenAI ou Claude avec un prompt ancré sur le texte. Sans clé API, répond en « mode démo ».
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

const here = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.resolve(here, "../src/content");
// Pas `PORT` : certains lanceurs (preview) le fixent pour le serveur web, pas pour celui-ci.
const PORT = process.env.HEVROUTA_PORT || 8787;

// Charge .env à la main (pas de dépendance) avant de choisir le fournisseur et le modèle.
const envPath = path.resolve(here, "../.env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const provider = process.env.OPENAI_API_KEY
  ? "openai"
  : process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN
    ? "claude"
    : "demo";
const model = provider === "openai"
  ? process.env.OPENAI_MODEL || "gpt-6-luna"
  : provider === "claude"
    ? process.env.HEVROUTA_MODEL || "claude-opus-5-5"
    : null;
const invalidOpenAIKey = provider === "openai" && /\s/.test(process.env.OPENAI_API_KEY);
const client = provider === "openai" && !invalidOpenAIKey ? new OpenAI() : provider === "claude" ? new Anthropic() : null;

const sougyot = new Map();
for (const f of fs.readdirSync(CONTENT)) {
  if (f.endsWith(".json") && !["index.json", "catalogue.json", "questions.json"].includes(f)) {
    const s = JSON.parse(fs.readFileSync(path.join(CONTENT, f), "utf8"));
    sougyot.set(s.slug, s);
  }
}

// Les grandes questions : la hevrouta débat d'une question à partir des voix du débat rapportées dans la fiche.
const questions = new Map(JSON.parse(fs.readFileSync(path.join(CONTENT, "questions.json"), "utf8")).map((q) => [q.id, q]));

const Q_MOVES = {
  explique: "L'élève ne comprend pas un point du débat. Explique simplement, en t'appuyant sur les tours de parole, puis retourne-lui une question.",
  avocat: "L'élève te demande de défendre le camp opposé au sien (ou, s'il n'a pas de camp, le camp le moins évident). Fais-le pour de vrai, avec le meilleur argument des sages de ce camp, en citant le tour. Puis demande-lui ce qu'il répond.",
  voix: "L'élève demande à un sage du débat de parler. Réponds EN TANT QUE ce sage, strictement à partir de ce que la fiche lui attribue. Si la fiche ne lui fait rien dire sur ce point, dis-le, et indique ce qu'il dit vraiment.",
  kouchia: "L'élève pose une objection. Prends-la au sérieux : dis si un sage du débat la pose déjà ou y répond (cite le tour), sinon reconnais qu'elle reste ouverte (teikou).",
  monavis: "L'élève défend son avis. Avant de l'accepter, demande-lui de reformuler en une phrase l'avis du camp adverse. Puis teste son argument avec un « et si… ? ».",
  libre: "Message libre de l'élève.",
};

function questionPrompt(q, etat = {}) {
  const camp = (id) => q.camps.find((c) => c.id === id)?.label ?? "pas encore choisi";
  const tours = q.debat.map((t, i) => `--- tour ${i + 1} · ${t.type} · ${t.qui}${t.quand ? ` (${t.quand})` : ""}${t.camp ? ` · camp : ${camp(t.camp)}` : ""}${t.ref ? ` · ${t.ref}` : ""}\n${t.dit}`).join("\n");
  const reponses = Object.entries(etat.reponses ?? {}).filter(([, v]) => v).map(([i, v]) => `- au tour ${Number(i) + 1} : « ${v} »`).join("\n") || "(aucune)";
  return `Tu es la hevrouta (le binôme d'étude) d'un adolescent de 12 à 17 ans, francophone, qui découvre le Talmud. Tu as environ 16 ans, tu as lu ce débat ; tu n'es ni un rav ni un prof. Tu es curieux, chaleureux, précis, et tu aimes les bonnes questions plus que les bonnes réponses.

On ne lit pas ici une page de loi, mais un débat de l'aggada (récits, paraboles), rarement tranché. Ton but : que l'élève comprenne chaque position, prenne parti avec de vrais arguments, et accepte que la question reste ouverte.

RÈGLES
1. Tu t'appuies sur les tours de parole ci-dessous et tu les cites ainsi : (tour N). La fiche paraphrase le texte : ne présente pas ses phrases comme des citations mot à mot. Si tu évoques un autre passage ou un commentateur absent de la fiche, dis que c'est de mémoire et que ça se vérifie.
2. Tu ne tranches pas à la place de l'élève. Tu peux dire ce que le Talmud retient ou laisse ouvert, d'après la fiche.
3. Avant d'accepter un argument de l'élève, tu lui demandes de reformuler l'avis adverse.
4. Tu dis « je ne sais pas » ou « teikou » plutôt que d'inventer.
5. Pour toute question de pratique personnelle, ou si l'élève parle d'une souffrance réelle (deuil, harcèlement, idées noires), tu réponds avec douceur et tu l'encourages à en parler à un adulte de confiance.
6. Tu réponds en français, en 3 à 8 phrases, sans jargon non expliqué. Tu termines presque toujours par une question. Tu respectes la tradition et la diversité des lecteurs (écoles juives, familles laïques, curieux non juifs).

QUESTION : ${q.question}
Camps possibles : ${q.camps.map((c) => c.label).join(" / ")}
Ce que la fiche dit de l'issue : ${q.issue}
Amorces prévues : ${q.amorces.join(" · ")}

L'ÉLÈVE
Son avis avant de lire : ${camp(etat.avant)}${etat.pourquoi ? ` — « ${etat.pourquoi} »` : ""}
Son avis après avoir lu : ${etat.apres ? camp(etat.apres) : "pas encore donné"}
Ce qu'il a répondu aux sages dans le fil du débat :
${reponses}

LE DÉBAT, TOUR PAR TOUR
${tours}`;
}

function questionDemo(q, move, text, etat = {}) {
  const autre = q.camps.find((c) => c.id !== etat.avant) ?? q.camps[0];
  const tour = q.debat.findIndex((t) => t.camp === autre.id);
  const t = q.debat[tour] ?? q.debat[0];
  const base = {
    explique: `(Mode démo — pas de clé API.) Le cœur du débat : ${q.camps.map((c) => `« ${c.label} »`).join(" contre ")}. Relis le tour ${tour + 1} : ${t.qui} dit « ${t.dit} ». Avec tes mots, qu'est-ce qu'il veut défendre ?`,
    avocat: `(Mode démo.) Je prends le camp « ${autre.label} ». ${t.qui} le dit (tour ${tour + 1}) : « ${t.dit} » Qu'est-ce que tu réponds à ça ?`,
    voix: `(Mode démo.) [${t.qui}] Je n'ai dit qu'une chose dans ce débat (tour ${tour + 1}) : « ${t.dit} » Sur le reste, la fiche ne me fait rien dire.`,
    kouchia: `(Mode démo.) Bonne objection. Regarde si un des sages y répond déjà, par exemple au tour ${tour + 1}. Sinon, c'est peut-être un teikou : une question qui reste debout.`,
    monavis: `(Mode démo.) D'accord, mais avant que je l'accepte : reformule en une phrase l'avis « ${autre.label} », comme si tu devais le défendre.`,
    libre: `(Mode démo.) Je suis un mode démo sans clé API. Mais je te pose la question de la fiche : ${q.a_toi}`,
  };
  return base[move] ?? base.libre;
}

const MOVES = {
  explique: "L'élève demande une explication du segment courant. Explique simplement, puis retourne-lui une question.",
  jexplique: "L'élève reformule le segment avec ses mots. Joue le binôme qui ne comprend pas tout : pointe ce qui manque ou ce qui est flou, par une question (« attends, donc… ? »). Ne corrige pas frontalement.",
  kouchia: "L'élève pose une objection (kouchia). Prends-la au sérieux. Cherche si la Guemara y répond dans un segment suivant (sans le révéler : dis « lisons la suite » si c'est le cas). Sinon, dis si les commentateurs la posent, ou reconnais un teikou.",
  tachma: "L'élève apporte une preuve (ta chma) : un segment ou un passage déjà vu. Évalue la preuve, puis propose une contre-preuve ou une distinction.",
  chani: "L'élève fait une distinction entre deux cas (chani hatam). Teste la distinction avec un « et si… ? ».",
  voix: "L'élève demande à une voix du texte de parler. Réponds EN TANT QUE cette voix, strictement à partir de ce que le texte lui attribue dans la sougya. Si le texte ne lui fait rien dire sur ce point, dis-le.",
  teikou: "L'élève suspend la question (teikou). Accepte, résume la question en une phrase pour sa page, et dis où elle pourrait être reprise.",
  libre: "Message libre de l'élève.",
};

function systemPrompt(s) {
  const segs = s.segments
    .map(
      (g) =>
        `--- segment ${g.i} · rôle ${g.role} · voix : ${g.voix} · répond à : ${JSON.stringify(g.repond_a)}\n` +
        `ARAMÉEN : ${g.original}\nANGLAIS (Steinsaltz, interpolé) : ${g.english}\nHÉBREU (Steinsaltz) : ${g.hebrew}\nRÉSUMÉ FR : ${g.resume}`,
    )
    .join("\n");
  const amorces = s.questions_hevrouta.map((q) => `- « ${q.amorce} » → ${q.piste}`).join("\n");
  return `Tu es la hevrouta (le binôme d'étude) d'un adolescent de 12 à 17 ans, francophone, qui découvre le Talmud. Tu as toi-même environ 16 ans et tu as déjà lu la page ; tu n'es ni un rav ni un prof. Tu es curieux, chaleureux, précis, et tu aimes les bonnes questions plus que les bonnes réponses.

RÈGLES
1. Tu es ancré sur la sougya ci-dessous. Tu cites toujours tes sources ainsi : (segment N). Tu n'inventes jamais une citation absente du texte fourni ; si tu mentionnes un autre passage du Talmud, dis que c'est de mémoire et que ça se vérifie.
2. Tu ne donnes pas la réponse du segment suivant avant que l'élève l'ait lu : tu fais deviner, puis tu dis « lisons la suite ».
3. Avant d'accepter un argument de l'élève, tu lui demandes de reformuler l'avis adverse.
4. Tu dis « je ne sais pas » ou « teikou » plutôt que d'inventer.
5. Pour toute question de pratique personnelle (« est-ce que j'ai le droit de… »), tu renvoies vers un rav ou un adulte de référence : l'app enseigne, elle ne tranche pas.
6. Tu réponds en français, en 3 à 8 phrases, sans jargon non expliqué. Tu termines presque toujours par une question. Pas de listes à puces sauf nécessité. Tu respectes la tradition et la diversité des lecteurs (écoles juives, familles laïques, curieux non juifs).
7. Tu distingues le texte lui-même de l'explication interpolée de Steinsaltz quand ça compte.

SOUGYA : ${s.titre} (${s.ref})
Cas transposé : ${s.cas.transpose}
Cas d'époque : ${s.cas.epoque}
Et alors ? (ne pas révéler avant la fin) : ${s.et_alors.principe}
Amorces prévues par l'éditeur (avec la piste à suivre) :
${amorces}

TEXTE DE LA SOUGYA, SEGMENT PAR SEGMENT
${segs}`;
}

function demoReply(s, segIndex, move, text) {
  const g = s.segments.find((x) => x.i === segIndex) ?? s.segments[0];
  const hit = s.questions_hevrouta.find((q) => text && q.amorce.toLowerCase().split(" ").filter((w) => w.length > 4).some((w) => text.toLowerCase().includes(w)));
  const base = {
    explique: `(Mode démo — pas de clé API.) Au segment ${g.i}, ${g.voix} ${g.role === "QUESTION" ? "pose une question" : g.role === "OBJECTION" ? "objecte" : g.role === "REPONSE" ? "répond" : "parle"} : ${g.resume} À ton avis, pourquoi ce coup-là, à ce moment-là ?`,
    jexplique: `(Mode démo.) Attends, je veux être sûr de te suivre : tu dis que « ${text?.slice(0, 80) ?? "…"} ». Mais alors, qu'est-ce qui se passe avec « celui-ci dit » qui apparaît deux fois (segment 4) ?`,
    kouchia: hit ? `(Mode démo.) Bonne kouchia — l'éditeur l'avait prévue. ${hit.piste}` : `(Mode démo.) Bonne kouchia. Avant que je réponde : qu'est-ce que le texte, au segment ${g.i}, dit exactement sur ce point ? Lisons la suite, et on verra si la Guemara y répond.`,
    tachma: `(Mode démo.) Tu apportes une preuve. Voyons : est-ce que le segment que tu cites parle vraiment du même cas ? Rav Pappa (segment 10) distingue justement deux cas. Ta preuve tient-elle dans les deux ?`,
    chani: `(Mode démo.) Tu distingues deux cas — c'est exactement le geste de Rav Pappa (segment 10). Et si les deux personnes avaient des témoins (segment 3) : ta distinction tient-elle encore ?`,
    voix: `(Mode démo.) [Rav Pappa] Je n'ai dit qu'une chose (segment 10) : la première clause parle d'un objet trouvé, la seconde d'un achat. Sur le reste, le texte ne me fait rien dire — tu devras demander à la Guemara.`,
    teikou: `(Mode démo.) Teikou — on laisse ça en suspens. Je note pour ta page : « ${text?.slice(0, 100) ?? "question suspendue"} ». On pourra la reprendre avec le traité Chevouot (le serment).`,
    libre: hit ? `(Mode démo.) ${hit.piste}` : `(Mode démo.) Je ne suis qu'un mode démo sans clé API, mais voilà ce que je ferais : relis le segment ${g.i} et dis-moi, avec tes mots, ce que ${g.voix} veut obtenir. Ensuite on cherche ensemble.`,
  };
  return base[move] ?? base.libre;
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/api/status", (_req, res) => res.json({ mode: provider, model, sougyot: [...sougyot.keys()] }));

app.post("/api/hevrouta", async (req, res) => {
  if (invalidOpenAIKey) return res.status(500).json({ error: "OPENAI_API_KEY contient des espaces ou un commentaire. Corrige la variable sur le serveur." });
  const { slug, segment, question, etat, move = "libre", text = "", history = [] } = req.body ?? {};
  const q = question ? questions.get(question) : null;
  const s = q ? null : sougyot.get(slug);
  if (question && !q) return res.status(404).json({ error: "question inconnue" });
  if (!q && !s) return res.status(404).json({ error: "sougya inconnue" });
  const userTurn = q
    ? `[Coup : ${move}] ${Q_MOVES[move] ?? Q_MOVES.libre}\n\nL'élève : ${text || "(aucun texte)"}`
    : `[Segment courant : ${segment}] [Coup : ${move}] ${MOVES[move] ?? MOVES.libre}\n\nL'élève : ${text || "(aucun texte)"}`;
  const system = q ? questionPrompt(q, etat) : systemPrompt(s);

  if (!client) return res.json({ mode: "demo", reply: q ? questionDemo(q, move, text, etat) : demoReply(s, segment, move, text) });

  const messages = [
    ...history.slice(-12).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: userTurn },
  ];
  try {
    if (provider === "openai") {
      const response = await client.responses.create({
        model,
        instructions: system,
        input: messages,
        max_output_tokens: 2048,
        reasoning: { effort: "low" },
        store: false,
      });
      const reply = response.output_text?.trim();
      if (!reply) return res.status(502).json({ error: "Aucune réponse reçue du modèle." });
      return res.json({ mode: "openai", reply, usage: response.usage });
    }

    const response = await client.beta.messages.create({
      model,
      max_tokens: 1024,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium" },
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages,
    });
    if (response.stop_reason === "refusal") {
      return res.json({ mode: "claude", reply: "Je préfère ne pas répondre à ça ici. Reformule, ou demande à un adulte de référence." });
    }
    const reply = response.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    res.json({ mode: "claude", reply, usage: response.usage });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError || err instanceof OpenAI.AuthenticationError) return res.status(401).json({ error: "Clé API invalide." });
    if (err instanceof Anthropic.RateLimitError || err instanceof OpenAI.RateLimitError) return res.status(429).json({ error: "Trop de requêtes, réessaie dans un instant." });
    if (err instanceof Anthropic.APIError || err instanceof OpenAI.APIError) return res.status(502).json({ error: `Erreur API ${err.status ?? "inconnue"}.` });
    console.error("Erreur serveur hevrouta :", err?.name ?? "erreur inconnue");
    res.status(500).json({ error: "Erreur serveur." });
  }
});

export default app;

// Vercel importe cette application dans ses fonctions ; en local, ce fichier démarre le serveur.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => console.log(`hevrouta server on :${PORT} — mode ${provider === "demo" ? "démo (pas de clé API)" : `${provider} (${model})`}`));
}
