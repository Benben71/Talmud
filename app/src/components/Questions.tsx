// Les grandes questions : une porte d'entrée par les débats philosophiques de l'aggada
// (le sens de la vie, le mal, la liberté, la vérité), à côté des sougyot de la vie quotidienne.
import { useEffect, useRef, useState } from "react";
import type { Catalogue } from "../types";
import { DOMAINES, QUESTIONS, type GrandeQuestion } from "../content/questions";
import { Fleuron } from "./Fleuron";

const LINK = "underline decoration-rule underline-offset-2 hover:text-ink hover:decoration-ink";

function useReponse(id: string) {
  const key = `talmud:question:${id}`;
  const [value, setValue] = useState(() => { try { return localStorage.getItem(key) ?? ""; } catch { return ""; } });
  useEffect(() => { try { if (value) localStorage.setItem(key, value); else localStorage.removeItem(key); } catch { /* stockage indisponible */ } }, [key, value]);
  return [value, setValue] as const;
}

function Fiche({ q, catalogue, onStart, onBack }: { q: GrandeQuestion; catalogue: Catalogue[]; onStart: (slug: string) => void; onBack: (next?: string) => void }) {
  const [reponse, setReponse] = useReponse(q.id);
  const sougya = q.sougya ? catalogue.find((c) => c.slug === q.sougya) : undefined;
  const k = QUESTIONS.findIndex((x) => x.id === q.id);
  const suivante = QUESTIONS[(k + 1) % QUESTIONS.length];

  return (
    <article className="fadein">
      <button onClick={() => onBack()} className={`sc text-[calc(13px*var(--text-scale))] text-ink-2 ${LINK}`}>← toutes les questions</button>
      <div className={`sc mt-4 text-[calc(13px*var(--text-scale))] text-rubric`}>{q.domaine}</div>
      <h2 className="text-[1.8rem] leading-tight md:text-[2.2rem]">{q.question}</h2>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
        <span className={`he text-[calc(22px*var(--text-scale))]`}>{q.he}</span>
        <span className={`text-[calc(14px*var(--text-scale))] italic text-ink-2`}>{q.heLabel}</span>
      </div>
      <p className={`mt-3 max-w-2xl text-[calc(16px*var(--text-scale))] leading-snug`}>{q.accroche}</p>

      <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-[1.3fr_1fr]">
        <section>
          <h3 className={`sc text-[calc(14px*var(--text-scale))] border-t hairline pt-2 text-rubric`}>ce que raconte le talmud</h3>
          <div className="mt-2 space-y-2">
            {q.recit.map((p, i) => <p key={i} className={`text-[calc(15.5px*var(--text-scale))] leading-snug`}>{p}</p>)}
          </div>
        </section>
        <section>
          <h3 className={`sc text-[calc(14px*var(--text-scale))] border-t hairline pt-2 text-rubric`}>les voix du débat</h3>
          <dl className="mt-2 space-y-2.5">
            {q.voix.map((v) => (
              <div key={v.qui} className="border-l-2 border-rule pl-3">
                <dt className={`text-[calc(15px*var(--text-scale))] font-semibold`}>{v.qui}</dt>
                <dd className={`text-[calc(14.5px*var(--text-scale))] leading-snug text-ink-2`}>{v.dit}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="bloc mt-6 px-4 py-3">
        <h3 className={`sc text-[calc(14px*var(--text-scale))] text-rubric`}>et le talmud, il tranche ?</h3>
        <p className={`mt-1 text-[calc(15.5px*var(--text-scale))] leading-snug`}>{q.issue}</p>
      </section>

      <section className="mt-6">
        <h3 className={`sc text-[calc(14px*var(--text-scale))] border-t hairline pt-2 text-rubric`}>à toi</h3>
        <p className={`mt-1 text-[calc(15.5px*var(--text-scale))] leading-snug`}>{q.a_toi}</p>
        <textarea value={reponse} onChange={(e) => setReponse(e.target.value)} rows={4} placeholder="Ton avis, tes arguments… (reste dans ce navigateur)"
          aria-label={`Ta réponse : ${q.question}`} className={`mt-2 w-full p-2 text-[calc(15px*var(--text-scale))] leading-snug`} />
      </section>

      <section className={`mt-6 border-t hairline pt-2 text-[calc(14px*var(--text-scale))] text-ink-2`}>
        <span className="sc text-rubric">lire le texte · </span>
        {q.sources.map((src, i) => (
          <span key={src.ref}>{i > 0 && " · "}<a href={src.sefaria} target="_blank" rel="noreferrer" className={LINK}>{src.ref}</a></span>
        ))}
        <span> (Sefaria, traduction Steinsaltz)</span>
        {sougya && (
          <p className="mt-2">
            {sougya.disponible
              ? <button onClick={() => onStart(sougya.slug)} className="btn btn-sm">Étudier ce passage pas à pas →</button>
              : <span className="italic">Bientôt dans l'app comme passage à étudier pas à pas : « {sougya.titre} ».</span>}
          </p>
        )}
      </section>

      <div className="mt-8 flex justify-end">
        <button onClick={() => onBack(suivante.id)} className={`text-[calc(15px*var(--text-scale))] ${LINK}`}>Question suivante : {suivante.question} →</button>
      </div>
    </article>
  );
}

export function Questions({ id, onOpen, catalogue, onStart }: { id: string | null; onOpen: (id: string | null) => void; catalogue: Catalogue[]; onStart: (slug: string) => void }) {
  const q = id ? QUESTIONS.find((x) => x.id === id) : undefined;
  const top = useRef<HTMLDivElement>(null);
  // Changer de fiche remet la lecture en haut (le conteneur qui défile est celui de l'app).
  useEffect(() => { top.current?.scrollIntoView({ block: "start" }); }, [id]);
  return (
    <div ref={top} className="mx-auto max-w-4xl px-5 py-6 md:px-8">
      <Fleuron className="mb-4" />
      {q ? (
        <Fiche key={q.id} q={q} catalogue={catalogue} onStart={onStart} onBack={(next?: string) => onOpen(next ?? null)} />
      ) : (
        <>
          <div className={`sc text-[calc(14px*var(--text-scale))] text-rubric`}>les grandes questions</div>
          <h1 className="text-3xl">Au-delà de la vie de tous les jours</h1>
          <p className={`mt-2 max-w-2xl text-[calc(16px*var(--text-scale))] leading-snug`}>
            Le Talmud ne parle pas que d'objets trouvés et de prières. Dans ses récits et ses paraboles (l'<em>aggada</em>), les sages débattent du sens de la vie, du mal, de la liberté, de la vérité.
          </p>
          <p className={`mt-2 max-w-2xl text-[calc(14.5px*var(--text-scale))] leading-snug text-ink-2`}>
            Ces débats ne ressemblent pas à un cours de philosophie : ce sont des histoires, des dialogues, des images. Et contrairement à la loi, ils sont rarement tranchés. C'est à toi de te faire un avis.
          </p>

          {DOMAINES.map((d) => {
            const list = QUESTIONS.filter((x) => x.domaine === d);
            if (!list.length) return null;
            return (
              <section key={d} className="mt-6">
                <h2 className={`sc border-t hairline pt-2 text-[calc(14px*var(--text-scale))] text-rubric`}>{d}</h2>
                <ul className="mt-2 grid gap-3 sm:grid-cols-2">
                  {list.map((x) => (
                    <li key={x.id}>
                      <button onClick={() => onOpen(x.id)} className="bloc block h-full w-full px-4 py-3 text-left hover:border-ink">
                        <div className={`text-[calc(18px*var(--text-scale))] font-semibold leading-tight`}>{x.question}</div>
                        <div className={`he mt-1 text-[calc(16px*var(--text-scale))] text-ink-2`}>{x.he}</div>
                        <p className={`mt-1 text-[calc(14px*var(--text-scale))] leading-snug text-ink-2`}>{x.accroche}</p>
                        <div className={`sc mt-2 text-[calc(12px*var(--text-scale))] text-ink-2`}>{x.sources.map((src) => src.ref).join(" · ")}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <p className={`mt-8 border-t hairline pt-2 text-[calc(13px*var(--text-scale))] leading-snug text-ink-2`}>
            Les récits sont résumés et paraphrasés pour l'app, pas traduits mot à mot : chaque fiche renvoie au texte original. Les questions ouvertes de l'aggada ne fixent pas la loi ; un adulte, un enseignant ou un rav peut t'aider à aller plus loin.
          </p>
        </>
      )}
    </div>
  );
}
