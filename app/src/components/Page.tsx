import { useEffect, useRef, useState } from "react";
import type { Depth, Layer, Role, Sougya } from "../types";
import { ROLE_LABEL, ROLE_SYMBOL, ROLE_VERB } from "../types";
import { Interp } from "./Interp";
import { Original } from "./Original";
import { Encadres } from "./Encadres";

const GUESS_ROLES: Role[] = ["QUESTION", "REPONSE", "OBJECTION", "PREUVE", "DISTINCTION", "CONCLUSION"];

export function RoleMark({ role }: { role: Role }) {
  return (
    <span className="role-mark"><span className="sym">{ROLE_SYMBOL[role]}</span>{ROLE_LABEL[role]}</span>
  );
}

// « À toi » (repris du carnet Ayeka) : après certains segments, une question à écrire.
function AToiBox({ question, value, onSave }: { question: string; value: string; onSave: (t: string) => void }) {
  const [text, setText] = useState(value);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setText(value); }, [value]);
  return (
    <div className="fadein mt-8 border-t border-ink pt-3">
      <div className="sc text-sm text-rubric">à toi</div>
      <p className="mt-1 text-[1.05rem] leading-snug">{question}</p>
      <textarea value={text} onChange={(e) => { setText(e.target.value); setSaved(false); }} onBlur={() => { onSave(text); setSaved(true); }} rows={3}
        className="mt-2 w-full p-2 text-[1rem] leading-relaxed" placeholder="Écris ici — ça ira dans ta page." />
      <div className="mt-1 text-[calc(12px*var(--text-scale))] text-ink-2">{saved ? "Gardé dans ta page." : "Plusieurs réponses sont possibles ; certaines sont mieux argumentées que d'autres."}</div>
    </div>
  );
}

export function Page({
  sougya, index, depth, layer, anticipations, onDepth, onLayer, onGo, onAnticipate, userQuestions, aToiAnswers, onAToi, onFinish,
}: {
  sougya: Sougya; index: number; depth: Depth; layer: Layer;
  anticipations: Record<number, { guess: string; correct: boolean }>;
  onDepth: (d: Depth) => void; onLayer: (l: Layer) => void; onGo: (i: number) => void;
  onAnticipate: (seg: number, guess: Role, correct: boolean) => void;
  userQuestions: { segment: number | null; text: string }[];
  aToiAnswers: Record<number, string>;
  onAToi: (seg: number, text: string) => void;
  onFinish: () => void;
}) {
  const aToi = sougya.a_toi.find((q) => q.apres_segment === index);
  const segs = sougya.segments;
  const pos = segs.findIndex((s) => s.i === index);
  const seg = segs[pos];
  const next = segs[pos + 1];
  const [revealOriginal, setRevealOriginal] = useState(false);

  const needsGuess = next && !["MISHNA", "RECIT", "ENSEIGNEMENT"].includes(next.role) && !(next.i in anticipations);
  const [guessing, setGuessing] = useState(false);

  function goNext() {
    if (!next) return;
    if (needsGuess) { setGuessing(true); return; }
    onGo(next.i);
  }
  function guess(r: Role) {
    if (!next) return;
    onAnticipate(next.i, r, r === next.role);
    setGuessing(false);
    onGo(next.i);
  }
  const goPrev = () => { if (pos > 0) onGo(segs[pos - 1].i); };

  // Comme dans une app : flèches du clavier, et balayage sur l'écran tactile.
  const goNextRef = useRef(goNext); goNextRef.current = goNext;
  const goPrevRef = useRef(goPrev); goPrevRef.current = goPrev;
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); goNextRef.current(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrevRef.current(); }
    };
    addEventListener("keydown", on);
    return () => removeEventListener("keydown", on);
  }, []);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x, dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 70 && Math.abs(dy) < 50) { if (dx < 0) goNextRef.current(); else goPrevRef.current(); }
  };

  const acte = sougya.sougya.actes.find((a) => seg.i >= a.segments[0] && seg.i <= a.segments[1]);
  const answersTo = seg.repond_a === null ? [] : Array.isArray(seg.repond_a) ? seg.repond_a : [seg.repond_a];
  // La marque hébraïque du bloc, comme sur la page imprimée : מתני׳ pour la Mishna, גמ׳ au premier segment de Guemara.
  const heMark = seg.role === "MISHNA" ? (pos === 0 || segs[pos - 1].role !== "MISHNA" ? "מתני׳" : null)
    : pos > 0 && segs[pos - 1].role === "MISHNA" ? "גמ׳" : null;
  const myQuestions = userQuestions.filter((q) => q.segment === seg.i);

  return (
    <div className="flex h-full flex-col">
      {/* Sous-titre : l'acte, la position, le filet qui se remplit */}
      <div className="px-4 pt-2 md:px-8">
        <div className="flex items-baseline justify-between text-sm text-ink-2">
          <span className="italic">{acte?.titre ?? sougya.titre}</span>
          <span className="sc">segment {seg.i} · {pos + 1} / {segs.length}</span>
        </div>
        <div className="mt-1 flex gap-[2px]">
          {segs.map((s) => (
            <button key={s.i} onClick={() => onGo(s.i)} title={`${s.i} · ${ROLE_LABEL[s.role]}`}
              className={`seg-bar flex-1 ${s.i === seg.i ? "now" : s.i < seg.i ? "done" : ""}`} />
          ))}
        </div>
      </div>

      {/* Les trois colonnes de la page : Rachi · texte · Tossafot */}
      <div className="flex min-h-0 flex-1 md:grid md:grid-cols-[1fr_2.2fr_1fr]">
        <aside className={`${layer === "rachi" ? "block" : "hidden"} min-h-0 overflow-y-auto border-r hairline px-4 py-4 md:block md:px-5`}>
          <div className="sc mb-2 text-sm text-ink-2">Rachi · qu'est-ce que ça dit ?</div>
          <p className="mb-3 text-[calc(15px*var(--text-scale))] leading-snug">{seg.resume}</p>
          {seg.decoupage && (
            <div className="mb-3 border-t hairline pt-2 text-[calc(13px*var(--text-scale))] leading-snug text-ink-2">
              <div className="sc mb-1">plusieurs coups dans ce segment</div>
              <ol className="list-decimal space-y-0.5 pl-4">{seg.decoupage.map((d, k) => <li key={k}>{d}</li>)}</ol>
            </div>
          )}
          <Encadres items={seg.encadres} only={["MOT", "PERSONNAGE", "HALAKHA"]} empty="Pas de mot ni de personnage à expliquer ici." />
        </aside>

        <main className={`${layer === "texte" ? "block" : "hidden"} min-h-0 overflow-y-auto px-5 py-5 md:block md:px-10`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <RoleMark role={seg.role} />
            <span className="text-sm text-ink-2">{seg.voix}</span>
            {answersTo.length > 0 && (
              <span className="text-sm text-ink-2">répond à {answersTo.map((a) => (
                <button key={a} className="underline decoration-rule underline-offset-2 hover:text-ink" onClick={() => onGo(a)}>[{a}]</button>
              ))}</span>
            )}
          </div>

          {seg.i in anticipations && (
            <div className="mb-4 border-l-2 pl-3 text-sm" style={{ borderColor: anticipations[seg.i].correct ? "var(--color-ink-2)" : "var(--color-rubric)" }}>
              {anticipations[seg.i].correct
                ? <>Bien vu : tu avais anticipé « {ROLE_VERB[anticipations[seg.i].guess as Role]} ».</>
                : <>Tu pensais « {ROLE_VERB[anticipations[seg.i].guess as Role]} » — en fait : <span className="rubric">{ROLE_VERB[seg.role].toLowerCase()}</span>.</>}
            </div>
          )}

          <div className="fadein" key={`${seg.i}-${depth}`}>
            {heMark && depth !== "original" && <span className="he-mark float-left mr-3 mt-[2px] text-[1.4rem] leading-none text-ink">{heMark}</span>}
            {depth === "histoire" && <p className="text-[1.2rem] leading-[1.6]">{seg.histoire}</p>}
            {depth === "texte" && (seg.texte ? <Interp text={seg.texte} /> : <p className="text-ink-2">Pas encore de texte français pour ce segment.</p>)}
            {depth === "original" && <Original text={seg.original} mark={heMark} />}
          </div>

          {depth !== "original" && (
            <div className="mt-8 border-t hairline pt-2">
              <button className="sc text-sm text-ink-2 hover:text-ink" onClick={() => setRevealOriginal((v) => !v)}>
                {revealOriginal ? "▴ masquer la page" : "▾ la vraie page"}
              </button>
              {revealOriginal && <div className="mt-3"><Original text={seg.original} mark={heMark} /></div>}
            </div>
          )}

          {aToi && <AToiBox key={index} question={aToi.question} value={aToiAnswers[index] ?? ""} onSave={(t) => onAToi(index, t)} />}

          {guessing && next && (
            <div className="fadein bloc-strong mt-8 p-4">
              <div className="text-lg">À ton avis, que fait la Guemara maintenant ?</div>
              <div className="mb-3 text-sm text-ink-2">Pas besoin de deviner le contenu : la forme suffit.</div>
              <div className="flex flex-wrap gap-2">
                {GUESS_ROLES.map((r) => (
                  <button key={r} onClick={() => guess(r)} className="btn btn-sm">
                    <span className="rubric" style={{ fontVariant: "normal" }}>{ROLE_SYMBOL[r]}</span> {ROLE_VERB[r]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!next && (
            <div className="mt-8 border-t hairline pt-3 text-sm">
              Tu as lu toute la sougya. <button className="btn btn-sm btn-rubric ml-2" onClick={onFinish}>Et alors ? →</button>
            </div>
          )}
        </main>

        <aside className={`${layer === "tosafot" ? "block" : "hidden"} min-h-0 overflow-y-auto border-l hairline px-4 py-4 md:block md:px-5`}>
          <div className="sc mb-2 text-sm text-ink-2">Tossafot · qu'est-ce que ça pose comme question ?</div>
          <Encadres items={seg.encadres} only={["OUTIL", "CONTEXTE"]} empty="Pas d'outil ni de contexte signalé ici." />
          <div className="sc mt-5 border-t hairline pt-2 text-sm text-ink-2">ta page, sur ce segment</div>
          {myQuestions.length === 0
            ? <p className="mt-1 text-[calc(13px*var(--text-scale))] leading-snug text-ink-2">Tes kouchiot et teikou posés ici apparaîtront là — une quatrième couche, la tienne.</p>
            : <ul className="mt-1 space-y-1 text-[calc(14px*var(--text-scale))] leading-snug">{myQuestions.map((q, k) => <li key={k} className="border-l-2 border-rubric pl-2">« {q.text} »</li>)}</ul>}
        </aside>
      </div>

      {/* Barre basse : couches (mobile), profondeur, navigation */}
      <div className="border-t hairline px-4 py-2 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-1 md:hidden">
            {(["rachi", "texte", "tosafot"] as Layer[]).map((l) => (
              <button key={l} onClick={() => onLayer(l)} className={`btn btn-sm btn-quiet ${layer === l ? "btn-on" : ""}`}>
                {l === "rachi" ? "◂ Rachi" : l === "texte" ? "Texte" : "Tossafot ▸"}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {(["histoire", "texte", "original"] as Depth[]).map((d) => (
              <button key={d} onClick={() => onDepth(d)} className={`btn btn-sm btn-quiet ${depth === d ? "btn-on" : ""}`}>
                {d === "histoire" ? "Histoire" : d === "texte" ? "Texte" : "Original"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button disabled={pos === 0} onClick={goPrev} className="btn btn-sm btn-quiet" title="← au clavier, ou balayer">←</button>
            {next
              ? <button onClick={goNext} className={`btn btn-sm ${needsGuess ? "btn-rubric" : "btn-primary"}`}>{needsGuess ? "Et maintenant ?" : "Suite →"}</button>
              : <span className="sc text-sm text-ink-2">fin de la sougya</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
