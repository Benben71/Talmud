// Les temps 1, 2, 5 et 6 de la sougya : le cas, la première idée, « et alors ? », ma page.
import { useState } from "react";
import type { Sougya } from "../types";
import { OUTIL_LABEL, ROLE_LABEL, ROLE_SYMBOL } from "../types";
import type { MaPage } from "../store";

function Kicker({ n, label }: { n: number; label: string }) {
  return <div className="sc text-sm text-rubric">{n} · {label}</div>;
}

export function Cas({ s, onNext }: { s: Sougya; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8 md:px-8">
      <Kicker n={1} label="Le cas" />
      <h1 className="mt-1 text-4xl leading-tight">{s.titre}</h1>
      <div className="mt-2 text-sm text-ink-2">{s.ref.replace("_", " ").replace(".", " ")} · <span className="he text-base">{s.heRef}</span> · ~{s.duree_min} min</div>
      <p className="mt-8 text-[1.35rem] leading-[1.55]">{s.cas.transpose}</p>
      <p className="mt-5 border-l hairline pl-4 text-[calc(15px*var(--text-scale))] leading-snug text-ink-2"><span className="sc">tel que le texte le pose</span> — {s.cas.epoque}</p>
      {s.ce_texte && (
        <div className="mt-6 border-t border-b hairline py-3">
          <div className="sc text-sm text-rubric">ce texte</div>
          <p className="mt-1 text-[calc(15px*var(--text-scale))] leading-snug">{s.ce_texte}</p>
        </div>
      )}
      <button onClick={onNext} className="btn btn-primary mt-8">{s.cas.transpose.includes("juge") ? "Je suis le juge →" : "J'entre →"}</button>
    </div>
  );
}

export function PremiereIdee({ s, value, onChange, onNext }: { s: Sougya; value: string; onChange: (v: string) => void; onNext: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8 md:px-8">
      <Kicker n={2} label="Ta première idée" />
      <p className="mt-2 text-[1.35rem] leading-[1.55]">{s.premiere_idee}</p>
      <p className="mt-1 text-[calc(15px*var(--text-scale))] text-ink-2">Écris avant de lire. Tu la retrouveras à la fin — c'est le but.</p>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={5} autoFocus
        className="mt-5 w-full p-3 text-[1.15rem] leading-relaxed" placeholder="Je déciderais… / Je demanderais d'abord…" />
      <div className="mt-5 flex items-baseline gap-4">
        <button onClick={onNext} disabled={value.trim().length < 3} className="btn btn-primary">Lire les voix →</button>
        <button onClick={onNext} className="sc text-sm text-ink-2 hover:text-ink">je préfère lire d'abord</button>
      </div>
    </div>
  );
}

export function EtAlors({ s, anticipations, carte, onNext }: { s: Sougya; anticipations: MaPage["anticipations"]; carte: MaPage["carte"]; onNext: () => void }) {
  const guesses = Object.values(anticipations);
  const ok = guesses.filter((g) => g.correct).length;
  return (
    <div className="mx-auto max-w-2xl px-5 py-8 md:px-8">
      <Kicker n={5} label="Et alors ?" />
      <h2 className="mt-1 text-3xl">{s.et_alors.type === "TEIKOU" ? "La question reste ouverte" : s.et_alors.type === "HALAKHA" ? "Ce qu'on retient" : "Ce que ça ouvre"}</h2>
      {s.idee_cle && (
        <div className="mt-5 border-l-4 border-rubric pl-4">
          <div className="sc text-sm text-rubric">idée clé</div>
          <p className="mt-1 text-[1.3rem] leading-snug">{s.idee_cle}</p>
        </div>
      )}
      <p className="mt-5 text-[1.2rem] leading-[1.6]">{s.et_alors.principe}</p>

      {s.et_alors.halakha && (
        <div className="mt-6 border-t hairline pt-2">
          <div className="sc text-sm text-rubric">la halakha</div>
          <p className="mt-1 text-[calc(15px*var(--text-scale))] leading-snug">{s.et_alors.halakha}</p>
        </div>
      )}
      <div className="mt-4 border-t hairline pt-2">
        <div className="sc text-sm text-rubric">l'avis écarté</div>
        <p className="mt-1 text-[calc(15px*var(--text-scale))] leading-snug">{s.et_alors.avis_ecarte ?? "Aucun ici : cette sougya n'est pas une mahloket. Toutes ne finissent pas en désaccord."}</p>
      </div>

      {s.plus_tard.length > 0 && (
        <div className="mt-6 border-t hairline pt-2">
          <div className="sc text-sm text-rubric">plus tard</div>
          <p className="text-[calc(13px*var(--text-scale))] text-ink-2">Des commentaires écrits longtemps après le Talmud. On dit toujours qui parle, et quand.</p>
          <ul className="mt-2 space-y-2">
            {s.plus_tard.map((p, k) => (
              <li key={k} className="text-[calc(15px*var(--text-scale))] leading-snug">
                <span className="font-semibold">{p.qui}</span>{p.quand && <span className="text-ink-2"> ({p.quand})</span>} {p.texte}
                {p.source && <span className="sc ml-1 text-[calc(12px*var(--text-scale))] text-ink-2">— {p.source}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-6 border-t hairline pt-3 md:grid-cols-2">
        <div>
          <div className="sc text-sm text-ink-2">outils débloqués</div>
          <ul className="mt-1 space-y-1 text-[calc(15px*var(--text-scale))]">{s.outils.map((o) => <li key={o}><span className="rubric">⋄</span> {OUTIL_LABEL[o] ?? o}</li>)}</ul>
        </div>
        <div>
          <div className="sc text-sm text-ink-2">personnages rencontrés</div>
          <ul className="mt-1 space-y-1 text-[calc(15px*var(--text-scale))]">{s.personnages.map((p) => <li key={p}><span className="rubric">⋄</span> {p}</li>)}</ul>
        </div>
      </div>

      {guesses.length > 0 && (
        <p className="mt-5 text-[calc(15px*var(--text-scale))] text-ink-2">
          Anticipations : {ok}/{guesses.length} coups devinés. {ok === guesses.length ? "Tu lis déjà la forme du débat." : "Deviner la forme, c'est déjà penser talmudiquement — ça vient avec la relecture."}
        </p>
      )}

      <div className="mt-6 border-t hairline pt-2">
        <div className="sc text-sm text-ink-2">la carte du débat</div>
        <pre className="mt-2 overflow-x-auto bg-paper-2/70 p-3 font-serif text-[calc(13px*var(--text-scale))] leading-relaxed">
          {s.segments.map((g) => {
            let depth = 0; let p = g.repond_a; const seen = new Set<number>();
            while (p !== null && p !== undefined) { const f = Array.isArray(p) ? p[0] : p; if (seen.has(f)) break; seen.add(f); depth++; p = s.segments.find((x) => x.i === f)?.repond_a ?? null; }
            return `${"  ".repeat(depth)}${ROLE_SYMBOL[g.role]} [${String(g.i).padStart(2)}] ${ROLE_LABEL[g.role].padEnd(12)} ${g.voix}\n`;
          }).join("")}
        </pre>
        {carte
          ? <p className="mt-1 text-[calc(15px*var(--text-scale))] text-ink-2">Reconstruction : rôles {carte.roles}/{carte.total} · liens {carte.liens}/{carte.total}{carte.difficile && ` · ordre ${carte.ordre}/${carte.total}`}.</p>
          : <p className="mt-1 text-[calc(15px*var(--text-scale))] text-ink-2">Tu n'as pas encore essayé de reconstruire le fil (bouton « Carte » dans la page). C'est l'exercice le plus talmudique qu'on puisse faire sans un mot d'araméen.</p>}
      </div>

      <button onClick={onNext} className="btn btn-primary mt-8">Ma page →</button>
    </div>
  );
}

// « Ta page » imprimée : le texte au centre, tes notes dans la marge, en regard du segment où tu les as posées —
// comme un commentaire de plus autour de la Guemara.
function PageImprimee({ s, page }: { s: Sougya; page: MaPage }) {
  const notesFor = (i: number) => page.notes.filter((n) => n.segment === i);
  const antFor = (i: number) => page.anticipations[i];
  return (
    <div className="mt-2 border hairline bg-surface/20 px-3 py-3 md:px-5">
      <div className="flex items-baseline justify-between text-[calc(11px*var(--text-scale))] text-ink-2">
        <span className="sc">ta page</span>
        <span className="he text-sm">{s.heRef}</span>
      </div>
      <div className="rule-double mt-1 mb-3" />
      <div className="grid grid-cols-[1fr_2.4fr_1fr] gap-x-3">
        {s.segments.map((g) => {
          const notes = notesFor(g.i);
          const ant = antFor(g.i);
          return (
            <div key={g.i} className="contents">
              <div className="border-t hairline py-1.5 text-[calc(11px*var(--text-scale))] leading-snug text-ink-2">
                {ant && <div><span className="rubric">{ant.correct ? "✓" : "✗"}</span> tu avais dit : {ROLE_VERB_SHORT[ant.guess] ?? ant.guess}</div>}
              </div>
              <div className="border-t hairline py-1.5 text-[calc(12px*var(--text-scale))] leading-snug">
                <span className="role-mark text-[calc(10px*var(--text-scale))]"><span className="sym">{ROLE_SYMBOL[g.role]}</span>{ROLE_LABEL[g.role]}</span>
                <span className="text-ink-2"> · {g.voix}</span>
                <div className="mt-0.5">{g.histoire.length > 170 ? g.histoire.slice(0, 170) + "…" : g.histoire}</div>
              </div>
              <div className="border-t hairline py-1.5 text-[calc(11px*var(--text-scale))] leading-snug">
                {notes.map((n, k) => <div key={k} className="border-l-2 border-rubric pl-1.5"><span className="rubric">{n.kind === "teikou" ? "∞" : "?"}</span> {n.text}</div>)}
              </div>
            </div>
          );
        })}
      </div>
      {page.ma_page && (
        <div className="mt-3 border-t border-ink pt-2 text-[calc(12px*var(--text-scale))] leading-snug">
          <span className="sc text-rubric">et alors, pour moi</span> — {page.ma_page}
        </div>
      )}
    </div>
  );
}
const ROLE_VERB_SHORT: Record<string, string> = {
  QUESTION: "une question", REPONSE: "une réponse", OBJECTION: "une objection", PREUVE: "une preuve", DISTINCTION: "une distinction", CONCLUSION: "une conclusion",
};

export function MaPageScreen({ s, page, onChange, onRestart, onHome }: { s: Sougya; page: MaPage; onChange: (v: string) => void; onRestart: () => void; onHome: () => void }) {
  const [copied, setCopied] = useState(false);
  const exportText = () => {
    const t = [
      `# ${s.titre} (${s.ref})`, "",
      `## Ma première idée`, page.premiere_idee || "(vide)", "",
      `## Mes questions`, ...page.notes.map((n) => `- [${n.kind}${n.segment !== null ? ` · seg. ${n.segment}` : ""}] ${n.text}`), "",
      `## Ma page`, page.ma_page || "(vide)", "",
      `---`, s.attribution,
    ].join("\n");
    navigator.clipboard?.writeText(t).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };
  return (
    <div className="mx-auto max-w-2xl px-5 py-8 md:px-8 print:max-w-none print:px-0 print:py-0">
      <Kicker n={6} label="Ma page" />
      <h2 className="mt-1 text-3xl">Ton commentaire</h2>

      <div className="mt-5 border-t hairline pt-2">
        <div className="sc text-sm text-ink-2">ta première idée, avant de lire</div>
        <p className="mt-1 text-[1.1rem] italic">{page.premiere_idee || <span className="not-italic text-ink-2">(tu n'avais rien écrit)</span>}</p>
      </div>

      {page.notes.length > 0 && (
        <div className="mt-4 border-t hairline pt-2">
          <div className="sc text-sm text-ink-2">tes kouchiot, teikou et réponses « à toi »</div>
          <ul className="mt-1 space-y-1 text-[calc(15px*var(--text-scale))]">{page.notes.map((n, k) => <li key={k}><span className="rubric">{n.kind === "teikou" ? "∞" : n.kind === "note" ? "✎" : "?"}</span> {n.text}{n.segment !== null && <span className="text-ink-2"> · seg. {n.segment}</span>}</li>)}</ul>
        </div>
      )}

      <label className="mt-6 block text-[calc(15px*var(--text-scale))] text-ink-2">Relis ta première idée. Qu'est-ce qui a changé, qu'est-ce qui reste ouvert, qu'est-ce que ça te fait penser ?</label>
      <textarea value={page.ma_page} onChange={(e) => onChange(e.target.value)} rows={6}
        className="mt-2 w-full p-3 text-[1.15rem] leading-relaxed" placeholder="Moi, j'aurais tiré au sort. Est-ce que le Talmud en parle ?" />

      <div className="mt-6 border-t hairline pt-2">
        <div className="sc text-sm text-ink-2">ta page, mise en page</div>
        <p className="text-[calc(13px*var(--text-scale))] text-ink-2">Tes anticipations à gauche, tes questions à droite, en regard du segment : un commentaire de plus autour du texte.</p>
        <PageImprimee s={s} page={page} />
      </div>

      <div className="mt-5 border-t hairline pt-2 text-[calc(15px*var(--text-scale))]">
        <div className="sc text-sm text-ink-2">îles voisines</div>
        <ul className="mt-1 space-y-1">{s.liens.map((l, k) => <li key={k}><span className="sc">{l.ref.replace(/_/g, " ")}</span> — {l.pourquoi}</li>)}</ul>
      </div>

      <div className="mt-8 flex flex-wrap items-baseline gap-4 print:hidden">
        <button onClick={exportText} className="btn">{copied ? "Copié ✓" : "Copier ma page"}</button>
        <button onClick={() => window.print()} className="btn">Imprimer (A5)</button>
        <button onClick={onHome} className="btn btn-quiet">Retour à la mer</button>
        <button onClick={onRestart} className="sc text-sm text-ink-2 hover:text-ink">recommencer la sougya</button>
      </div>
      <p className="mt-10 border-t hairline pt-2 text-[calc(12px*var(--text-scale))] leading-snug text-ink-2">{s.attribution}</p>
    </div>
  );
}
