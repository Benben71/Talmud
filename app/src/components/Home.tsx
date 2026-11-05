// La page d'accueil se lit de haut en bas comme une introduction, puis s'ouvre sur la mer :
//   1. le mot, la promesse, un bouton pour commencer, et un vrai débat résumé réplique par réplique ;
//   2. « Le Talmud, c'est quoi ? » — trois paragraphes, un schéma de la page imprimée et une frise qui finit par « toi » ;
//   3. « Comment ça marche ici » — les cinq temps d'une séance, les outils de l'app et cinq mots-clés ;
//   4. « Choisis un passage » — la mer du Talmud, avec les parcours, les voix et les gestes dans les marges.
import type { ReactNode } from "react";
import type { Catalogue, Role, Sougya } from "../types";
import { OUTIL_LABEL, PARCOURS, ROLE_LABEL, ROLE_SYMBOL } from "../types";
import { readProgress } from "../store";
import { Archipel, MobileArchipel } from "./Archipel";
import { Fleuron } from "./Fleuron";
import { NavIcon, type NavKey } from "./Nav";
import type { Sujet } from "../router";

const DEMO_SLUG = "bava-metzia-2a"; // la sougya résumée dans l'extrait de l'accueil
const LINK = "underline decoration-rule underline-offset-2 hover:text-ink hover:decoration-ink";

const TEMPS: { titre: string; texte: string }[] = [
  { titre: "Le cas", texte: "Une situation concrète, d'hier et d'aujourd'hui : deux personnes, un objet trouvé, une décision à prendre." },
  { titre: "Ta première idée", texte: "Tu écris ce que tu en penses, avant de lire la réponse des sages." },
  { titre: "Les voix & le débat", texte: "Tu lis le passage phrase par phrase : qui parle, qui objecte, qui répond à qui." },
  { titre: "Et alors ?", texte: "Ce que le débat a tranché, ce qu'il laisse ouvert, et ce que ça change pour toi." },
  { titre: "Ma page", texte: "Tes idées et tes questions, rassemblées dans un carnet que tu peux imprimer." },
];

const OUTILS: { k: NavKey; titre: string; texte: string }[] = [
  { k: "lire", titre: "Trois façons de lire", texte: "L'histoire racontée, le texte expliqué (la traduction de Steinsaltz), ou l'original araméen, mot à mot." },
  { k: "hevrouta", titre: "Une hevrouta", texte: "Un binôme d'étude, joué ici par une IA : il t'explique, te contredit et te demande « pourquoi ? »." },
  { k: "carte", titre: "La carte du débat", texte: "Reconstruis la discussion comme un arbre : la question, l'objection, la réponse." },
  { k: "reperes", titre: "Des repères", texte: "Une petite histoire du Talmud, qui est qui, un glossaire et les mots araméens." },
];

// Le début de Bava Metsia 2a, résumé coup par coup (d'après les segments 0 à 7 de la sougya) :
// chaque réplique répond à la précédente, d'où le décalage.
const EXTRAIT: { role: Role; qui: string; texte: string }[] = [
  { role: "MISHNA", qui: "la Mishna", texte: "Deux personnes tiennent un vêtement. Chacune dit : « Je l'ai trouvé, il est tout à moi. » Chacune jure, et on partage." },
  { role: "QUESTION", qui: "la Guemara", texte: "Pourquoi leur faire dire deux choses ? « Je l'ai trouvé » suffirait !" },
  { role: "REPONSE", qui: "la Guemara", texte: "Non : « trouvé » pourrait vouloir dire « vu ». Or voir un objet ne suffit pas pour qu'il soit à toi." },
  { role: "OBJECTION", qui: "la Guemara, citant Rabbenaï", texte: "Mais dans la Torah, « trouver », c'est avoir en main !" },
  { role: "REPONSE", qui: "la Guemara", texte: "La Mishna parle comme tout le monde : dans la rue, dès qu'on voit un objet, on dit « je l'ai trouvé »." },
];

const FRISE: { quand: string; quoi: string; toi?: boolean }[] = [
  { quand: "vers 200", quoi: "la Mishna est écrite" },
  { quand: "200-500", quoi: "les sages en débattent" },
  { quand: "vers 500", quoi: "le Talmud de Babylone" },
  { quand: "1040-1105", quoi: "Rachi l'explique" },
  { quand: "1520", quoi: "premier Talmud imprimé" },
  { quand: "1880", quoi: "la page de Vilna" },
  { quand: "1965-2010", quoi: "Steinsaltz le traduit" },
  { quand: "aujourd'hui", quoi: "toi", toi: true },
];

const MOTS: [string, string, string][] = [
  ["מַחְלוֹקֶת", "Mahloket", "le désaccord, que le Talmud garde au lieu de l'effacer."],
  ["סוּגְיָא", "Sougya", "un passage, une discussion complète : une île sur la carte."],
  ["חַבְרוּתָא", "Hevrouta", "l'étude à deux, et le binôme qui lit avec toi."],
  ["קוּשְׁיָא", "Kouchia", "l'objection : « oui, mais… »."],
  ["תֵּיקוּ", "Teikou", "la question reste ouverte, sans réponse."],
];

function Extrait({ onLire }: { onLire: () => void }) {
  return (
    <figure className="bloc-strong px-4 py-4 md:px-5">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-3">
        <span className="sc text-[calc(14px*var(--text-scale))] text-rubric">un débat, en vrai</span>
        <span className="he text-[calc(15px*var(--text-scale))] text-ink-2">בבא מציעא ב.</span>
      </figcaption>
      <p className="text-[calc(12.5px*var(--text-scale))] italic text-ink-2">Le tout début de Bava Metsia, résumé réplique par réplique.</p>
      <ol className="mt-3 space-y-2">
        {EXTRAIT.map((e, k) => (
          <li key={k} className="border-l-2 pl-3" style={{ marginLeft: `${Math.min(k, 4) * 12}px`, borderColor: k === 0 ? "var(--color-ink)" : "var(--color-rule)" }}>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="role-mark text-[calc(13px*var(--text-scale))]"><span className="sym">{ROLE_SYMBOL[e.role]}</span>{ROLE_LABEL[e.role]}</span>
              <span className="text-[calc(12px*var(--text-scale))] italic text-ink-2">{e.qui}</span>
            </div>
            <p className="text-[calc(14px*var(--text-scale))] leading-snug">{e.texte}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 border-t hairline pt-2 text-[calc(13px*var(--text-scale))] leading-snug text-ink-2">
        … et ça continue : une nouvelle objection, puis la distinction de Rav Pappa.{" "}
        <button className={LINK} onClick={onLire}>Lire la suite →</button>
      </p>
    </figure>
  );
}

function Titre({ n, he, id, children }: { n: string; he: string; id?: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-4">
      <div className="rule-double" />
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4">
        <h2 className={`text-[calc(22px*var(--text-scale))] leading-tight md:text-[calc(26px*var(--text-scale))]`}>
          <span className="sc mr-2 text-rubric">{n}</span>{children}
        </h2>
        <span className={`he text-[calc(18px*var(--text-scale))] text-ink-2`}>{he}</span>
      </div>
    </div>
  );
}

// Schéma d'une page de Talmud (édition de Vilna) : le texte au centre, les commentaires autour.
function SchemaPage() {
  const lignes = (x: number, y0: number, y1: number, w: number, step = 7) =>
    Array.from({ length: Math.floor((y1 - y0) / step) }, (_, k) => <line key={k} x1={x} x2={x + w * (0.82 + 0.18 * ((k * 7) % 5) / 4)} y1={y0 + k * step} y2={y0 + k * step} />);
  return (
    <figure className="mx-auto w-full max-w-[260px]">
      <svg viewBox="0 0 220 270" className="w-full" role="img" aria-label="Schéma d'une page de Talmud : le texte au centre, Rachi d'un côté, Tossafot de l'autre">
        <rect x="6" y="6" width="208" height="258" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink" />
        <text x="110" y="22" textAnchor="middle" className="fill-ink-2" style={{ font: "italic 9px var(--font-serif)" }}>titre courant · traité · daf</text>
        <g stroke="currentColor" strokeWidth="1" className="text-rule">{lignes(18, 54, 250, 46)}{lignes(156, 54, 250, 46)}</g>
        <rect x="72" y="34" width="76" height="216" fill="var(--color-rubric-soft)" opacity=".55" />
        <g stroke="currentColor" strokeWidth="1.4" className="text-ink">{lignes(78, 46, 244, 64, 8)}</g>
        <g style={{ font: "600 10px var(--font-serif)" }}>
          <rect x="80" y="122" width="60" height="30" fill="var(--color-paper)" stroke="currentColor" className="text-ink" />
          <text x="110" y="135" textAnchor="middle" className="fill-ink">Mishna</text>
          <text x="110" y="147" textAnchor="middle" className="fill-ink">+ Guemara</text>
          <rect x="16" y="138" width="50" height="17" fill="var(--color-paper)" />
          <text x="41" y="150" textAnchor="middle" className="fill-rubric">Rachi</text>
          <rect x="152" y="138" width="54" height="17" fill="var(--color-paper)" />
          <text x="179" y="150" textAnchor="middle" className="fill-rubric">Tossafot</text>
        </g>
      </svg>
      <figcaption className={`mt-1 text-center text-[calc(13px*var(--text-scale))] italic leading-snug text-ink-2`}>
        Une page, cinq siècles de voix : le texte au centre (vers 200-500), les commentaires autour (XI<sup>e</sup>-XIII<sup>e</sup> s.).
      </figcaption>
    </figure>
  );
}

export function Home({ catalogue, texture, onStart, onResume, onReperes, onAdulte }: {
  catalogue: Catalogue[]; texture: Sougya;
  onStart: (slug: string) => void; onResume: (slug: string, seg: number) => void; onReperes: (sujet: Sujet) => void; onAdulte: () => void;
}) {
  const ouverts = catalogue.filter((c) => c.disponible);
  const enCours = ouverts.map((c) => ({ c, p: readProgress(c.slug) })).filter((x) => x.p.started && x.p.last_segment !== null);
  const resume = enCours[0] ?? null;
  const first = ouverts[0];
  const personnages = [...new Set(catalogue.flatMap((c) => c.personnages))];
  const outils = [...new Set(catalogue.flatMap((c) => c.outils))];
  const byParcours = (id: string) => catalogue.filter((c) => c.parcours.includes(id));
  const heLeft = texture.segments.slice(0, 4).map((s) => s.hebrew).join(" ");
  const heRight = texture.segments.slice(4, 9).map((s) => s.hebrew).join(" ");
  const aller = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const commencer = resume
    ? <button onClick={() => onResume(resume.c.slug, resume.p.last_segment!)} className="btn btn-primary">Reprendre · {resume.c.court}, segment {resume.p.last_segment} →</button>
    : <button onClick={() => onStart(first.slug)} className="btn btn-primary">Commencer le premier passage →</button>;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-3 md:px-6">
      <Fleuron className="mb-3" />

      {/* 1. Le mot, la promesse, et de quoi commencer tout de suite */}
      <section className="grid items-center gap-x-12 gap-y-6 md:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-5">
            <span className="he text-[3.4rem] font-bold leading-none tracking-tight md:text-[4.2rem]">מַחְלוֹקֶת</span>
            <span className={`sc text-[calc(13px*var(--text-scale))] text-ink-2`}>mahloket · le désaccord qu'on garde</span>
          </div>
          <h1 className="mt-3 text-[1.7rem] leading-tight md:text-[2.1rem]">Entre dans le plus grand débat de l'histoire.</h1>
          <p className={`mt-3 max-w-xl text-[calc(16px*var(--text-scale))] leading-snug text-ink-2`}>
            <strong className="font-semibold text-ink">Mahloket</strong> est une initiation au <strong className="font-semibold text-ink">Talmud</strong> pour les 12-17 ans.
            Tu lis de vrais passages, tu donnes ton avis avant les sages, et tu apprends à débattre comme eux :
            poser une question, objecter, répondre — et parfois laisser une question ouverte.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            {commencer}
            {resume
              ? <button onClick={() => onStart(first.slug)} className={`sc text-[calc(13px*var(--text-scale))] text-ink-2 ${LINK}`}>ou commencer par {first.court.toLowerCase()}</button>
              : <span className={`sc text-[calc(12px*var(--text-scale))] text-ink-2`}>{first.court} · {first.ref.replace("_", " ").replace(".", " ")} · {first.duree_min} min · aucun prérequis</span>}
          </div>
          <nav className={`mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[calc(14px*var(--text-scale))] text-ink-2`} aria-label="Sur cette page">
            <span className="sc text-rubric">sur cette page</span>
            <button className={LINK} onClick={() => aller("talmud")}>Le Talmud, c'est quoi ?</button>
            <button className={LINK} onClick={() => aller("methode")}>Comment ça marche</button>
            <button className={LINK} onClick={() => aller("passages")}>Choisir un passage</button>
          </nav>
        </div>

        <Extrait onLire={() => onStart(DEMO_SLUG)} />
      </section>

      {/* 2. Le Talmud, c'est quoi ? */}
      <section className="mt-10">
        <Titre n="I" he="תַּלְמוּד" id="talmud">Le Talmud, c'est quoi ?</Titre>
        <div className="mt-4 grid gap-x-8 gap-y-6 lg:grid-cols-[1fr_1fr_1fr_240px]">
          <div>
            <h3 className={`sc mb-1 text-[calc(14px*var(--text-scale))] text-rubric`}>un livre qui débat</h3>
            <p className={`text-[calc(15px*var(--text-scale))] leading-snug`}>
              Vers l'an 200, Rabbi Yehouda ha-Nassi met par écrit des règles transmises jusque-là de bouche à oreille : c'est la <strong className="font-semibold">Mishna</strong>, en hébreu, courte et précise.
              Pendant trois siècles, des sages la discutent ligne par ligne, en Babylonie et en Terre d'Israël : c'est la <strong className="font-semibold">Guemara</strong>, surtout en araméen.
              Mishna + Guemara = <strong className="font-semibold">Talmud</strong> : 2 711 feuillets dans sa version de Babylone.
            </p>
          </div>
          <div>
            <h3 className={`sc mb-1 text-[calc(14px*var(--text-scale))] text-rubric`}>de quoi ça parle</h3>
            <p className={`text-[calc(15px*var(--text-scale))] leading-snug`}>
              De tout. Un objet trouvé dans la rue, une dette, une fête, une prière, un procès, la vérité, la majorité, le respect de l'autre…
              La loi (<em>halakha</em>) y côtoie les histoires et les paraboles (<em>aggada</em>), sur la même page. C'est la base du droit et de l'éthique juifs.
            </p>
          </div>
          <div>
            <h3 className={`sc mb-1 text-[calc(14px*var(--text-scale))] text-rubric`}>pourquoi on l'étudie encore</h3>
            <p className={`text-[calc(15px*var(--text-scale))] leading-snug`}>
              Parce qu'il garde les avis perdants, les objections et même les questions sans réponse (<em>teikou</em>).
              On ne l'apprend pas par cœur : on le lit à deux, à voix haute, en se demandant « pourquoi ? ». Une école de pensée critique, depuis quinze siècles.
            </p>
            <p className={`mt-2 text-[calc(14px*var(--text-scale))] text-ink-2`}>
              <button className={LINK} onClick={() => onReperes("histoire")}>Une petite histoire du Talmud →</button>
            </p>
          </div>
          <div className="border-t hairline pt-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <SchemaPage />
            <p className={`mt-1 text-center text-[calc(13px*var(--text-scale))] text-ink-2`}>
              <button className={LINK} onClick={() => onReperes("la-page")}>Comment lire une page →</button>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="sc mb-3 text-[calc(14px*var(--text-scale))] text-rubric">quinze siècles, une seule conversation</div>
          <ol className="relative grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
            <span className="absolute left-0 right-0 top-[5px] hidden border-t border-rule lg:block" aria-hidden="true" />
            {FRISE.map((f) => (
              <li key={f.quand} className="relative flex items-start gap-2 lg:block">
                <span className={`relative mt-[1px] block h-[11px] w-[11px] shrink-0 rounded-full border ${f.toi ? "border-rubric bg-rubric" : "border-ink bg-paper"}`} />
                <div className="lg:mt-2">
                  <div className={`sc text-[calc(12.5px*var(--text-scale))] ${f.toi ? "text-rubric" : "text-ink-2"}`}>{f.quand}</div>
                  <div className={`text-[calc(14.5px*var(--text-scale))] leading-tight ${f.toi ? "font-semibold text-rubric" : ""}`}>{f.quoi}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Comment ça marche ici */}
      <section className="mt-10">
        <Titre n="II" he="חַבְרוּתָא" id="methode">Comment ça marche ici</Titre>
        <p className={`mt-3 max-w-3xl text-[calc(15px*var(--text-scale))] leading-snug text-ink-2`}>
          Chaque passage (une <em>sougya</em>) se lit en 15 à 25 minutes, en cinq temps. On suit la méthode du rabbin <strong className="font-semibold text-ink">Adin Steinsaltz</strong>, qui a traduit et expliqué tout le Talmud pour que chacun puisse l'ouvrir.
        </p>
        <ol className="mt-5 grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
          {TEMPS.map((t, k) => (
            <li key={t.titre} className="relative flex gap-3 lg:block">
              <div className="flex items-center gap-2 lg:mb-2">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${k === 0 ? "border-rubric bg-rubric text-paper" : "border-ink"} text-[calc(15px*var(--text-scale))] font-semibold`}>{k + 1}</span>
                {k < TEMPS.length - 1 && <span className="hidden flex-1 border-t border-dashed border-rule lg:block" />}
              </div>
              <div>
                <h3 className={`text-[calc(17px*var(--text-scale))] font-semibold leading-tight`}>{t.titre}</h3>
                <p className={`mt-0.5 text-[calc(14px*var(--text-scale))] leading-snug text-ink-2`}>{t.texte}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {OUTILS.map((o) => (
            <div key={o.k} className="bloc flex gap-3 px-3 py-3">
              <span className="mt-0.5 text-rubric"><NavIcon k={o.k} active size={26} /></span>
              <div>
                <h3 className={`text-[calc(16px*var(--text-scale))] font-semibold leading-tight`}>{o.titre}</h3>
                <p className={`mt-0.5 text-[calc(13.5px*var(--text-scale))] leading-snug text-ink-2`}>{o.texte}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <div className="sc mb-3 text-[calc(14px*var(--text-scale))] text-rubric">cinq mots pour s'y retrouver</div>
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
            {MOTS.map(([he, mot, def]) => (
              <div key={mot} className="border-t hairline pt-2">
                <dt className="flex items-baseline justify-between gap-2">
                  <span className="text-[calc(16px*var(--text-scale))] font-semibold">{mot}</span>
                  <span className="he text-[calc(17px*var(--text-scale))] text-ink-2">{he}</span>
                </dt>
                <dd className="text-[calc(13.5px*var(--text-scale))] leading-snug text-ink-2">{def}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className={`mt-5 text-[calc(13.5px*var(--text-scale))] text-ink-2`}>
          Pas de compte : ce que tu écris reste dans ce navigateur. Ces outils sont aussi dans la barre de navigation{" "}
          <span className="hidden md:inline">à gauche</span><span className="md:hidden">en bas</span>.
        </p>
      </section>

      {/* 4. La mer : choisir un passage */}
      <section className="mt-10">
        <Titre n="III" he="יַם הַתַּלְמוּד" id="passages">Choisis un passage</Titre>
        <p className={`mt-3 max-w-3xl text-[calc(15px*var(--text-scale))] leading-snug text-ink-2`}>
          On appelle le Talmud « la mer » : on n'en voit jamais le bout. Ici, chaque île est un passage, regroupé par grande question.
          Une île en trait plein est ouverte ({ouverts.length} sur {catalogue.length} pour l'instant), en pointillé elle arrive. Pas d'ordre obligé : commence où tu veux.
        </p>

        <div className="mt-5 grid gap-x-6 gap-y-6 lg:grid-cols-[190px_1fr_190px]">
          <aside className="order-2 lg:order-1">
            <div className="sc mb-2 border-t hairline pt-2 text-sm text-rubric">les parcours</div>
            <ul className="space-y-2.5">
              {PARCOURS.map((p) => {
                const list = byParcours(p.id);
                if (list.length === 0) return null;
                const dispo = list.filter((c) => c.disponible).length;
                return (
                  <li key={p.id} className={`text-[calc(14px*var(--text-scale))] leading-snug`}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold">{p.label}</span>
                      <span className={`sc text-[calc(11px*var(--text-scale))] text-ink-2`}>{dispo}/{list.length}</span>
                    </div>
                    <div className={`text-[calc(12px*var(--text-scale))] italic text-ink-2`}>{p.question}</div>
                    <div className="text-[calc(12.5px*var(--text-scale))]">
                      {list.map((c, k) => (
                        <span key={c.slug}>
                          {k > 0 && <span className="text-rule"> · </span>}
                          {c.disponible
                            ? <button className="underline decoration-rule underline-offset-2 hover:decoration-ink" onClick={() => onStart(c.slug)} title={c.idee_cle ?? undefined}>{c.court}</button>
                            : <span className="italic text-ink-2">{c.court}</span>}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 hidden border-t hairline pt-2 lg:block">
              <div className={`he mb-1 text-[calc(12px*var(--text-scale))] font-bold`}>רש״י · שטיינזלץ</div>
              <p className="he-texture">{heLeft}</p>
            </div>
          </aside>

          <main className="order-1 flex min-w-0 flex-col lg:order-2">
            <div className="md:overflow-x-auto">
              <div className="md:hidden"><MobileArchipel items={catalogue} onOpen={onStart} /></div>
              <div className="hidden min-w-[760px] md:block"><Archipel items={catalogue} onOpen={onStart} /></div>
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              {commencer}
              <span className={`text-[calc(13px*var(--text-scale))] text-ink-2`}>Pas sûr ? Le premier passage est fait pour ça.</span>
            </div>
            <p className={`mt-3 border-l hairline pl-3 text-[calc(14px*var(--text-scale))] italic leading-snug text-ink-2`}>
              <span className="sc not-italic text-rubric">le premier cas · </span>{first.cas}
            </p>
          </main>

          <aside className="order-3">
            <div className="sc border-t hairline pt-2 text-sm text-rubric">qui parle dans ces débats ?</div>
            <p className={`mb-2 text-[calc(13px*var(--text-scale))] leading-snug text-ink-2`}>Des sages dont les idées se répondent d'une page à l'autre. <button className={LINK} onClick={() => onReperes("qui-est-qui")}>Qui est qui ? →</button></p>
            <ul className={`columns-2 text-[calc(13.5px*var(--text-scale))] leading-snug lg:columns-1`}>
              {personnages.slice(0, 8).map((p) => <li key={p}><span className="rubric">⋄</span> {p}</li>)}
              {personnages.length > 8 && <li className="italic text-ink-2">… et {personnages.length - 8} autres</li>}
            </ul>
            <div className="sc mt-4 border-t hairline pt-2 text-sm text-rubric">comment raisonnent-ils ?</div>
            <p className={`mb-2 text-[calc(13px*var(--text-scale))] leading-snug text-ink-2`}>Questions, preuves, distinctions : des gestes à reconnaître en lisant. <button className={LINK} onClick={() => onReperes("mots")}>Voir les mots du débat →</button></p>
            <ul className={`text-[calc(13.5px*var(--text-scale))] leading-snug`}>
              {outils.slice(0, 6).map((o) => <li key={o}><span className="rubric">⋄</span> {OUTIL_LABEL[o] ?? o}</li>)}
              {outils.length > 6 && <li className="italic text-ink-2">… et {outils.length - 6} autres, en chemin</li>}
            </ul>
            <div className="mt-5 hidden border-t hairline pt-2 lg:block">
              <div className={`he mb-1 text-[calc(12px*var(--text-scale))] font-bold`}>תוספות · שטיינזלץ</div>
              <p className="he-texture">{heRight}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Pour l'adulte, et les crédits */}
      <section className="mt-10 grid gap-4 border-t border-ink pt-4 md:grid-cols-[1fr_2fr]">
        <div>
          <div className="sc text-sm text-rubric">parent, enseignant, animateur ?</div>
          <p className={`mt-1 text-[calc(14px*var(--text-scale))] leading-snug text-ink-2`}>
            Ce que l'app fait, ce qu'elle ne fait pas, et comment accompagner un ado qui l'utilise.{" "}
            <button className={LINK} onClick={onAdulte}>Pour l'adulte qui accompagne →</button>
          </p>
        </div>
        <footer className={`text-[calc(12px*var(--text-scale))] leading-snug text-ink-2`}>
          Texte : <em>The William Davidson Talmud</em> (Koren Noé Talmud), traduction et commentaire de R. Adin Even-Israel Steinsaltz — CC BY-NC 4.0 — via Sefaria.org. Adaptation française non relue. Prototype, non commercial. Dispositifs « Ce texte », « Idée clé », « Plus tard », « À toi », repères et page pour l'adulte inspirés du carnet <em>Ouvrir le Talmud</em> (Ayeka, Rav Emile Ackermann).
        </footer>
      </section>
    </div>
  );
}
