// Les grandes questions : le cœur de l'app. Pour chaque question, l'ado prend parti, lit le débat des
// sages tour par tour en répondant à qui il veut, voit ce que le Talmud en fait, revoit son avis,
// puis débat avec sa hevrouta. Tout reste dans le navigateur (talmud:q:<id>).
import { useCallback, useEffect, useRef, useState } from "react";
import type { Catalogue } from "../types";
import {
  DOMAINES, QUESTIONS, TOUR_LABEL, ecrireEtat, etatVide, lireEtat, sefaria,
  type EtatQuestion, type GrandeQuestion, type Tour,
} from "../content/questions";
import { Fleuron } from "./Fleuron";

const LINK = "underline decoration-rule underline-offset-2 hover:text-ink hover:decoration-ink";

function useEtat(id: string) {
  const [etat, setEtat] = useState<EtatQuestion>(() => lireEtat(id));
  useEffect(() => { ecrireEtat(id, etat); }, [id, etat]);
  const update = useCallback((patch: Partial<EtatQuestion> | ((e: EtatQuestion) => Partial<EtatQuestion>)) => {
    setEtat((e) => ({ ...e, ...(typeof patch === "function" ? patch(e) : patch) }));
  }, []);
  return { etat, update, reset: () => setEtat(etatVide()) };
}

function Etape({ n, titre, children }: { n: number; titre: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 fadein">
      <h3 className="flex items-baseline gap-2 border-t border-ink pt-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rubric text-[calc(14px*var(--text-scale))] font-semibold text-rubric">{n}</span>
        <span className="text-[calc(20px*var(--text-scale))] font-semibold">{titre}</span>
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Camps({ q, value, onChange }: { q: GrandeQuestion; value: string | null; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {q.camps.map((c) => (
        <button key={c.id} role="radio" aria-checked={value === c.id} onClick={() => onChange(c.id)}
          className={`btn text-left ${value === c.id ? "btn-on" : ""}`} style={{ fontVariant: "normal", textTransform: "none", letterSpacing: 0 }}>
          {c.label}
        </button>
      ))}
    </div>
  );
}

function Repondre({ qui, initial, onSave, onCancel }: { qui: string; initial: string; onSave: (t: string) => void; onCancel: () => void }) {
  const [t, setT] = useState(initial);
  return (
    <form className="mt-2 ml-auto max-w-[90%]" onSubmit={(e) => { e.preventDefault(); onSave(t.trim()); }}>
      <textarea autoFocus value={t} onChange={(e) => setT(e.target.value)} rows={2} placeholder={`Ce que tu réponds à ${qui}…`}
        aria-label={`Ta réponse à ${qui}`} className="w-full p-2 text-[calc(15px*var(--text-scale))] leading-snug" />
      <div className="mt-1 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="btn btn-sm btn-quiet">Annuler</button>
        <button className="btn btn-sm btn-primary">Ajouter au débat</button>
      </div>
    </form>
  );
}

function TourDeParole({ t, i, q, monCamp, reponse, onRepondre }: {
  t: Tour; i: number; q: GrandeQuestion; monCamp: string | null; reponse?: string; onRepondre: (i: number, t: string) => void;
}) {
  const [edit, setEdit] = useState(false);
  const src = t.ref ? q.sources.find((s) => s.ref === t.ref) : undefined;
  const camp = t.camp ? q.camps.find((c) => c.id === t.camp) : undefined;
  const lbl = TOUR_LABEL[t.type];
  return (
    <li className="fadein">
      <div className={`border-l-2 pl-3 ${t.type === "recit" ? "border-rule" : "border-rubric"}`}>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="role-mark text-[calc(13px*var(--text-scale))]"><span className="sym">{lbl.sym}</span>{lbl.label}</span>
          <span className="text-[calc(16px*var(--text-scale))] font-semibold">{t.qui}</span>
          {t.quand && <span className="text-[calc(13px*var(--text-scale))] text-ink-2">{t.quand}</span>}
          {src && <a href={sefaria(src)} target="_blank" rel="noreferrer" className={`sc text-[calc(12px*var(--text-scale))] text-ink-2 ${LINK}`}>{src.ref}</a>}
        </div>
        <p className={`mt-0.5 text-[calc(16px*var(--text-scale))] leading-snug ${t.type === "recit" ? "italic text-ink-2" : ""}`}>{t.dit}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 text-[calc(13px*var(--text-scale))] text-ink-2">
          {camp && <span className={monCamp === t.camp ? "rubric" : ""}>{monCamp === t.camp ? "● ton camp : " : "○ "}{camp.label}</span>}
          {!reponse && !edit && t.type !== "recit" && <button onClick={() => setEdit(true)} className={LINK}>répondre à {t.qui}</button>}
          {!reponse && !edit && t.type === "recit" && <button onClick={() => setEdit(true)} className={LINK}>réagir</button>}
        </div>
      </div>
      {reponse && !edit && (
        <div className="fadein mt-2 ml-auto max-w-[90%] border-r-2 border-ink pr-3 text-right">
          <div className="sc text-[calc(12px*var(--text-scale))] text-ink-2">toi, à {t.qui}</div>
          <p className="text-[calc(16px*var(--text-scale))] leading-snug">{reponse}</p>
          <button onClick={() => setEdit(true)} className={`text-[calc(12px*var(--text-scale))] text-ink-2 ${LINK}`}>modifier</button>
        </div>
      )}
      {edit && <Repondre qui={t.qui} initial={reponse ?? ""} onCancel={() => setEdit(false)} onSave={(v) => { onRepondre(i, v); setEdit(false); }} />}
    </li>
  );
}

const MOVES: { id: string; label: string; placeholder: string }[] = [
  { id: "monavis", label: "Voilà mon avis", placeholder: "Ton avis et ton meilleur argument…" },
  { id: "avocat", label: "Défends l'autre camp", placeholder: "(facultatif) sur quel point ?" },
  { id: "voix", label: "Fais parler un sage", placeholder: "Qui ? et sur quoi ?" },
  { id: "kouchia", label: "J'ai une objection", placeholder: "Mais pourquoi… ?" },
  { id: "explique", label: "Explique-moi", placeholder: "Ce que tu ne comprends pas" },
];

function DebatHevrouta({ q, etat, update, mode }: { q: GrandeQuestion; etat: EtatQuestion; update: (p: (e: EtatQuestion) => Partial<EtatQuestion>) => void; mode: string }) {
  const [move, setMove] = useState("monavis");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => { if (first.current) { first.current = false; return; } end.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [etat.chat.length, busy]);

  async function send(m = move, t = text) {
    if (busy) return;
    const content = t.trim() || MOVES.find((x) => x.id === m)!.label;
    const history = etat.chat.map(({ role, content }) => ({ role, content }));
    update((e) => ({ chat: [...e.chat, { role: "user", content, move: m }] }));
    setText(""); setBusy(true); setError(null);
    try {
      const r = await fetch("/api/hevrouta", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q.id, etat: { avant: etat.avant, pourquoi: etat.pourquoi, reponses: etat.reponses, apres: etat.apres }, move: m, text: content, history }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Erreur");
      update((e) => ({ chat: [...e.chat, { role: "assistant", content: data.reply }] }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally { setBusy(false); }
  }

  const current = MOVES.find((x) => x.id === move)!;
  return (
    <div className="bloc">
      <div className="flex items-baseline justify-between border-b hairline px-3 py-2">
        <span className="sc text-sm">ta hevrouta</span>
        <span className={`sc text-[calc(12px*var(--text-scale))] ${mode === "demo" ? "text-ink-2" : "rubric"}`}>{mode === "openai" ? "OpenAI" : mode === "claude" ? "Claude" : mode === "demo" ? "mode démo" : mode}</span>
      </div>
      <div className="max-h-[420px] space-y-3 overflow-y-auto px-3 py-3">
        {etat.chat.length === 0 && (
          <div className="text-[calc(14.5px*var(--text-scale))] leading-snug text-ink-2">
            <p>Ton binôme a lu le même débat. Il ne te donnera pas raison trop vite. Commence par une amorce :</p>
            <ul className="mt-2 space-y-1">
              {q.amorces.map((a) => (
                <li key={a}><button onClick={() => send("libre", a)} className={`text-left italic text-ink ${LINK}`}>« {a} »</button></li>
              ))}
            </ul>
          </div>
        )}
        {etat.chat.map((m, k) => (
          <div key={k} className={`fadein max-w-[94%] text-[calc(15.5px*var(--text-scale))] leading-snug ${m.role === "user" ? "ml-auto border-r-2 border-rubric pr-3 text-right" : "border-l hairline pl-3"}`}>
            {m.move && m.move !== "libre" && <div className="sc text-[calc(11px*var(--text-scale))] text-ink-2">{MOVES.find((x) => x.id === m.move)?.label}</div>}
            {m.content}
          </div>
        ))}
        {busy && <div className="text-[calc(14px*var(--text-scale))] italic text-ink-2">… ta hevrouta réfléchit</div>}
        {error && <div className="text-[calc(14px*var(--text-scale))] text-rubric">{error}</div>}
        <div ref={end} />
      </div>
      <div className="border-t hairline p-2">
        <div className="mb-2 flex flex-wrap gap-1">
          {MOVES.map((m) => <button key={m.id} onClick={() => setMove(m.id)} className={`btn btn-sm btn-quiet ${move === m.id ? "btn-on" : ""}`}>{m.label}</button>)}
        </div>
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder={current.placeholder} aria-label={current.label} className="min-w-0 flex-1 px-3 py-1.5 text-[calc(15px*var(--text-scale))]" />
          <button disabled={busy} className="btn btn-sm btn-primary">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

function Fiche({ q, catalogue, mode, onStart, onOpen }: { q: GrandeQuestion; catalogue: Catalogue[]; mode: string; onStart: (slug: string) => void; onOpen: (id: string | null) => void }) {
  const { etat, update, reset } = useEtat(q.id);
  const [changerAvant, setChangerAvant] = useState(false);
  const suiteRef = useRef<HTMLDivElement>(null);
  const sougya = q.sougya ? catalogue.find((c) => c.slug === q.sougya) : undefined;
  const k = QUESTIONS.findIndex((x) => x.id === q.id);
  const suivante = QUESTIONS[(k + 1) % QUESTIONS.length];
  // Commencé = un camp choisi ET le débat ouvert (choisir un camp ne suffit pas : on peut hésiter).
  const commence = etat.avant !== null && etat.revele > 0;
  const revele = Math.min(etat.revele, q.debat.length);
  const fini = commence && revele >= q.debat.length;
  const campLabel = (id: string | null) => q.camps.find((c) => c.id === id)?.label;
  const allies = [...new Set(q.debat.filter((t) => t.camp && t.camp === etat.avant).map((t) => t.qui))];

  const suite = () => { update((e) => ({ revele: Math.min(e.revele + 1, q.debat.length) })); };
  // À chaque nouveau tour, on garde le bouton « suite » en vue (pas à l'ouverture de la fiche).
  const ouverture = useRef(true);
  useEffect(() => {
    if (ouverture.current) { ouverture.current = false; return; }
    suiteRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [etat.revele]);

  return (
    <article>
      <button onClick={() => onOpen(null)} className={`sc text-[calc(13px*var(--text-scale))] text-ink-2 ${LINK}`}>← toutes les questions</button>
      <div className="sc mt-4 text-[calc(13px*var(--text-scale))] text-rubric">{q.domaine}</div>
      <h2 className="text-[1.8rem] leading-tight md:text-[2.3rem]">{q.question}</h2>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
        <span className="he text-[calc(22px*var(--text-scale))]">{q.he}</span>
        <span className="text-[calc(14px*var(--text-scale))] italic text-ink-2">{q.heLabel}</span>
      </div>
      <p className="mt-3 max-w-2xl text-[calc(16.5px*var(--text-scale))] leading-snug">{q.accroche}</p>

      <Etape n={1} titre="Et toi, d'abord ?">
        {commence && !changerAvant ? (
          <p className="text-[calc(15.5px*var(--text-scale))] leading-snug">
            Avant de lire, tu pensais : <strong className="font-semibold">{campLabel(etat.avant) ?? "tu ne savais pas encore"}</strong>
            {etat.pourquoi && <span className="text-ink-2"> — « {etat.pourquoi} »</span>}.{" "}
            <button onClick={() => setChangerAvant(true)} className={`text-[calc(13px*var(--text-scale))] text-ink-2 ${LINK}`}>modifier</button>
          </p>
        ) : (
          <>
            <p className="mb-3 text-[calc(15.5px*var(--text-scale))] leading-snug text-ink-2">Avant de lire les sages, prends parti. Tu pourras changer d'avis à la fin.</p>
            <Camps q={q} value={etat.avant} onChange={(id) => update({ avant: id })} />
            <input value={etat.pourquoi} onChange={(e) => update({ pourquoi: e.target.value })} placeholder="Pourquoi ? En une phrase (facultatif)" aria-label="Pourquoi ce choix"
              className="mt-3 w-full px-3 py-1.5 text-[calc(15px*var(--text-scale))]" />
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <button disabled={!etat.avant} onClick={() => { setChangerAvant(false); update((e) => ({ revele: Math.max(e.revele, 1) })); }} className="btn btn-primary">Lire le débat →</button>
              {!commence && <button onClick={() => update({ avant: "?", revele: 1 })} className={`text-[calc(14px*var(--text-scale))] text-ink-2 ${LINK}`}>Je ne sais pas encore</button>}
            </div>
          </>
        )}
      </Etape>

      {commence && revele > 0 && (
        <Etape n={2} titre="Le débat">
          <p className="mb-4 text-[calc(14.5px*var(--text-scale))] leading-snug text-ink-2">Les sages parlent chacun à leur tour. Réponds à qui tu veux : ta réponse entre dans le débat.</p>
          <ol className="space-y-5">
            {q.debat.slice(0, revele).map((t, i) => (
              <TourDeParole key={i} t={t} i={i} q={q} monCamp={etat.avant} reponse={etat.reponses[i]}
                onRepondre={(idx, v) => update((e) => { const r = { ...e.reponses }; if (v) r[idx] = v; else delete r[idx]; return { reponses: r }; })} />
            ))}
          </ol>
          <div ref={suiteRef} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {!fini && (
              <>
                <button onClick={suite} className="btn btn-primary">Qui parle ensuite ? →</button>
                <span className="text-[calc(13px*var(--text-scale))] text-ink-2">{revele} / {q.debat.length}</span>
                <button onClick={() => update({ revele: q.debat.length })} className={`text-[calc(13px*var(--text-scale))] text-ink-2 ${LINK}`}>tout afficher</button>
              </>
            )}
            {fini && <span className="sc text-[calc(13px*var(--text-scale))] text-ink-2">fin du débat · {Object.keys(etat.reponses).length} réponse{Object.keys(etat.reponses).length > 1 ? "s" : ""} de toi</span>}
          </div>
        </Etape>
      )}

      {fini && (
        <>
          <Etape n={3} titre="Et le Talmud, il tranche ?">
            <p className="text-[calc(16px*var(--text-scale))] leading-snug">{q.issue}</p>
            {etat.avant !== "?" && (
              <p className="mt-2 text-[calc(14.5px*var(--text-scale))] leading-snug text-ink-2">
                {allies.length ? <>Dans ton camp au départ : <span className="text-ink">{allies.join(", ")}</span>.</> : <>Aucun sage du débat ne défend exactement ta position de départ. C'est permis : à toi de l'argumenter.</>}
              </p>
            )}
          </Etape>

          <Etape n={4} titre="Et toi, maintenant ?">
            <Camps q={q} value={etat.apres} onChange={(id) => update({ apres: id })} />
            {etat.apres && etat.avant !== "?" && (
              <p className="fadein mt-2 text-[calc(15px*var(--text-scale))] italic text-ink-2">
                {etat.apres === etat.avant ? "Tu n'as pas changé d'avis. Qu'est-ce qui t'a conforté ?" : "Tu as changé d'avis. Quel sage t'a fait bouger ?"}
              </p>
            )}
            <p className="mt-4 text-[calc(15.5px*var(--text-scale))] leading-snug">{q.a_toi}</p>
            <textarea value={etat.argument} onChange={(e) => update({ argument: e.target.value })} rows={4} placeholder="Ton argument, avec tes mots… (reste dans ce navigateur)"
              aria-label="Ton argument" className="mt-2 w-full p-2 text-[calc(15px*var(--text-scale))] leading-snug" />
          </Etape>

          <Etape n={5} titre="Débats-en avec ta hevrouta">
            <DebatHevrouta q={q} etat={etat} update={update} mode={mode} />
          </Etape>
        </>
      )}

      <section className="mt-10 border-t hairline pt-2 text-[calc(14px*var(--text-scale))] text-ink-2">
        <span className="sc text-rubric">lire les textes · </span>
        {q.sources.map((s, i) => <span key={s.ref}>{i > 0 && " · "}<a href={sefaria(s)} target="_blank" rel="noreferrer" className={LINK}>{s.ref}</a></span>)}
        <span> (Sefaria). Les tours de parole sont résumés pour l'app, pas traduits mot à mot.</span>
        {sougya && (
          <p className="mt-2">
            {sougya.disponible
              ? <button onClick={() => onStart(sougya.slug)} className="btn btn-sm">Lire le passage en entier, pas à pas →</button>
              : <span className="italic">Bientôt : le passage en entier, à lire pas à pas (« {sougya.titre} »).</span>}
          </p>
        )}
      </section>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
        {commence ? <button onClick={() => { if (confirm("Effacer tes réponses à cette question ?")) reset(); }} className={`text-[calc(13px*var(--text-scale))] text-ink-2 ${LINK}`}>recommencer cette question</button> : <span />}
        <button onClick={() => onOpen(suivante.id)} className={`text-[calc(15px*var(--text-scale))] ${LINK}`}>Question suivante : {suivante.question} →</button>
      </div>
    </article>
  );
}

function statut(id: string): { texte: string; on: boolean } {
  const e = lireEtat(id);
  const q = QUESTIONS.find((x) => x.id === id)!;
  if (e.apres) return { texte: `ton avis : ${q.camps.find((c) => c.id === e.apres)?.label.toLowerCase()}`, on: true };
  if (e.avant !== null && e.revele > 0) return { texte: e.revele >= q.debat.length ? "débat lu" : `débat en cours · ${Math.min(e.revele, q.debat.length)}/${q.debat.length}`, on: true };
  return { texte: `${new Set(q.debat.filter((t) => t.type !== "recit").map((t) => t.qui)).size} voix · ${q.camps.length} camps`, on: false };
}

export function Questions({ id, onOpen, catalogue, onStart, mode }: { id: string | null; onOpen: (id: string | null) => void; catalogue: Catalogue[]; onStart: (slug: string) => void; mode: string }) {
  const q = id ? QUESTIONS.find((x) => x.id === id) : undefined;
  const top = useRef<HTMLDivElement>(null);
  // Changer de fiche remet la lecture en haut (le conteneur qui défile est celui de l'app).
  useEffect(() => { top.current?.scrollIntoView({ block: "start" }); }, [id]);
  return (
    <div ref={top} className="mx-auto max-w-4xl px-5 py-6 md:px-8">
      <Fleuron className="mb-4" />
      {q ? (
        <Fiche key={q.id} q={q} catalogue={catalogue} mode={mode} onStart={onStart} onOpen={onOpen} />
      ) : (
        <>
          <div className="sc text-[calc(14px*var(--text-scale))] text-rubric">les grandes questions</div>
          <h1 className="text-3xl md:text-4xl">Quelle question te travaille ?</h1>
          <p className="mt-2 max-w-2xl text-[calc(16.5px*var(--text-scale))] leading-snug">
            Choisis une question. Prends parti, puis lis ce que les sages du Talmud en ont dit, chacun à son tour. Réponds-leur, change d'avis si tu veux, et débats avec ta hevrouta.
          </p>
          <p className="mt-2 max-w-2xl text-[calc(14.5px*var(--text-scale))] leading-snug text-ink-2">
            Ces débats viennent surtout de l'<em>aggada</em> : les récits et paraboles du Talmud. Contrairement à la loi, ils sont rarement tranchés. C'est à toi de te faire un avis.
          </p>

          {DOMAINES.map((d) => {
            const list = QUESTIONS.filter((x) => x.domaine === d);
            if (!list.length) return null;
            return (
              <section key={d} className="mt-6">
                <h2 className="sc border-t hairline pt-2 text-[calc(14px*var(--text-scale))] text-rubric">{d}</h2>
                <ul className="mt-2 grid gap-3 sm:grid-cols-2">
                  {list.map((x) => {
                    const st = statut(x.id);
                    return (
                      <li key={x.id}>
                        <button onClick={() => onOpen(x.id)} className="bloc flex h-full w-full flex-col px-4 py-3 text-left hover:border-ink">
                          <div className="text-[calc(18px*var(--text-scale))] font-semibold leading-tight">{x.question}</div>
                          <div className="he mt-1 text-[calc(16px*var(--text-scale))] text-ink-2">{x.he}</div>
                          <p className="mt-1 flex-1 text-[calc(14px*var(--text-scale))] leading-snug text-ink-2">{x.accroche}</p>
                          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3">
                            <span className={`sc text-[calc(12px*var(--text-scale))] ${st.on ? "text-rubric" : "text-ink-2"}`}>{st.texte}</span>
                            <span className="sc text-[calc(12px*var(--text-scale))] text-ink-2">{x.sources[0].ref}</span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}

          <p className="mt-8 border-t hairline pt-2 text-[calc(13px*var(--text-scale))] leading-snug text-ink-2">
            Les tours de parole sont résumés et paraphrasés pour l'app, pas traduits mot à mot : chaque fiche renvoie au texte original. Un adulte, un enseignant ou un rav peut t'aider à aller plus loin.
          </p>
        </>
      )}
    </div>
  );
}
