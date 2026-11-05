// La carte du débat : la sougya vue de haut, comme un fil de discussion.
// Mode Lire : l'arbre réel, cliquable. Mode Reconstruire : les coups de la Guemara sont à replacer
// (quel rôle ? à quoi répond-il ? — et, en mode mélangé, dans quel ordre ?).
import { useMemo, useRef, useState, type CSSProperties } from "react";
import type { Role, Segment, Sougya } from "../types";
import { ROLE_LABEL, ROLE_SYMBOL, ROLE_VERB } from "../types";

const PLAY_ROLES: Role[] = ["QUESTION", "REPONSE", "OBJECTION", "PREUVE", "DISTINCTION", "CONCLUSION"];
const BASE_ROLES: Role[] = ["MISHNA", "RECIT", "ENSEIGNEMENT"];

type Node = { i: number; role: Role; parent: number | null };
export type CarteScore = { roles: number; liens: number; ordre: number; total: number; difficile: boolean };

function firstParent(r: Segment["repond_a"]): number | null {
  return r === null ? null : Array.isArray(r) ? r[0] : r;
}
function parentsOf(r: Segment["repond_a"]): number[] {
  return r === null ? [] : Array.isArray(r) ? r : [r];
}

function Tree({ nodes, segs, onPick, picked, highlight, compact, allowNone }: {
  nodes: Node[]; segs: Map<number, Segment>; onPick?: (i: number | null) => void; picked?: number | null;
  highlight?: (n: Node) => "ok" | "ko" | null; compact?: boolean; allowNone?: boolean;
}) {
  const byId = new Map(nodes.map((n) => [n.i, n]));
  const depth = (n: Node) => { let d = 0; let p = n.parent; const seen = new Set<number>(); while (p !== null && byId.has(p) && !seen.has(p)) { seen.add(p); d++; p = byId.get(p)!.parent; } return d; };
  return (
    <div className="space-y-1.5 md:space-y-[3px]">
      {onPick && allowNone && (
        <button onClick={() => onPick(null)} className={`sc w-full border border-dashed px-2 py-2 text-left text-[calc(14px*var(--text-scale))] md:py-1 md:text-[calc(13px*var(--text-scale))] ${picked === null ? "border-ink" : "border-rule text-ink-2 hover:border-ink"}`}>
          ⟂ ne répond à rien : nouveau fil
        </button>
      )}
      {nodes.map((n) => {
        const s = segs.get(n.i)!;
        const h = highlight?.(n);
        const d = depth(n);
        return (
          <div key={n.i} style={{ "--carte-depth": d } as CSSProperties} className={`carte-node ${d > 0 ? "border-l hairline pl-2" : ""}`}>
            <button onClick={() => onPick?.(n.i)} disabled={!onPick}
              className={`w-full border px-2 py-2 text-left text-[calc(15px*var(--text-scale))] leading-snug md:py-1 md:text-[calc(13px*var(--text-scale))] ${picked === n.i ? "border-ink bg-surface/40" : h === "ok" ? "border-ink-2 bg-surface/30" : h === "ko" ? "border-rubric bg-rubric-soft/60" : "border-rule bg-surface/20"} ${onPick ? "hover:border-ink" : ""}`}>
              <span className="role-mark"><span className="sym">{ROLE_SYMBOL[n.role]}</span>{ROLE_LABEL[n.role]}</span>
              <span className="text-ink-2"> [{n.i}] {s.voix}</span>
              {n.parent !== null && <span className="text-ink-2"> → {n.parent}</span>}
              {h === "ko" && <span className="rubric"> ✗</span>}
              {!compact && <div className="mt-1 text-[calc(14px*var(--text-scale))] text-ink-2 md:mt-0.5 md:text-[calc(12px*var(--text-scale))]">{s.resume.length > 140 ? s.resume.slice(0, 140) + "…" : s.resume}</div>}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function Carte({ sougya, onGo, onScore, best }: { sougya: Sougya; onGo: (i: number) => void; onScore: (s: CarteScore) => void; best: CarteScore | null }) {
  const segs = useMemo(() => new Map(sougya.segments.map((s) => [s.i, s])), [sougya]);
  const truth: Node[] = useMemo(() => sougya.segments.map((s) => ({ i: s.i, role: s.role, parent: firstParent(s.repond_a) })), [sougya]);
  const base = useMemo(() => sougya.segments.filter((s) => BASE_ROLES.includes(s.role)), [sougya]);
  const cards = useMemo(() => sougya.segments.filter((s) => !BASE_ROLES.includes(s.role)), [sougya]);

  const [mode, setMode] = useState<"lire" | "jouer">("lire");
  const [difficile, setDifficile] = useState(false);
  const [placed, setPlaced] = useState<Node[]>([]);
  const [remaining, setRemaining] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [parent, setParent] = useState<number | null | undefined>(undefined);
  const [order, setOrder] = useState<number[]>([]);
  const [done, setDone] = useState<CarteScore | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  function pickParent(i: number | null) {
    setParent(i);
    if (window.innerWidth < 768) controlsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function start(hard: boolean) {
    setDifficile(hard);
    const ids = cards.map((c) => c.i);
    setRemaining(hard ? [...ids].sort(() => Math.random() - 0.5) : ids);
    setPlaced(base.map((s) => ({ i: s.i, role: s.role, parent: firstParent(s.repond_a) })));
    setCurrent(hard ? null : ids[0]); setRole(null); setParent(undefined); setOrder([]); setDone(null);
    setMode("jouer");
  }

  function place() {
    if (current === null || !role || parent === undefined) return;
    const next = [...placed, { i: current, role, parent }];
    const nextOrder = [...order, current];
    const rest = remaining.filter((x) => x !== current);
    setPlaced(next); setOrder(nextOrder); setRemaining(rest); setRole(null); setParent(undefined);
    if (rest.length === 0) {
      const guesses = next.filter((n) => cards.some((c) => c.i === n.i));
      const roles = guesses.filter((n) => segs.get(n.i)!.role === n.role).length;
      const liens = guesses.filter((n) => n.parent !== null ? parentsOf(segs.get(n.i)!.repond_a).includes(n.parent) : segs.get(n.i)!.repond_a === null).length;
      const ordre = nextOrder.filter((id, k) => id === cards[k].i).length;
      const score = { roles, liens, ordre, total: cards.length, difficile };
      setDone(score); onScore(score); setCurrent(null);
    } else {
      setCurrent(difficile ? null : rest[0]);
    }
  }

  const cur = current !== null ? segs.get(current) : null;
  const truthMap = new Map(truth.map((n) => [n.i, n]));

  return (
    <div className="mx-auto h-full max-w-5xl overflow-y-auto px-3 py-5 md:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="sc text-sm text-rubric">la carte du débat</div>
          <h2 className="text-2xl">{sougya.titre}</h2>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setMode("lire")} className={`btn btn-sm btn-quiet ${mode === "lire" ? "btn-on" : ""}`}>Lire</button>
          <button onClick={() => start(false)} className={`btn btn-sm btn-quiet ${mode === "jouer" && !difficile ? "btn-on" : ""}`}>Reconstruire</button>
          <button onClick={() => start(true)} className={`btn btn-sm btn-quiet ${mode === "jouer" && difficile ? "btn-on" : ""}`} title="Les coups sont mélangés : il faut aussi retrouver l'ordre">Mélangé</button>
        </div>
      </div>
      {best && <div className="mt-1 text-[calc(13px*var(--text-scale))] text-ink-2">Meilleur score : rôles {best.roles}/{best.total} · liens {best.liens}/{best.total}{best.difficile && ` · ordre ${best.ordre}/${best.total}`}</div>}

      {mode === "lire" && (
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_260px] md:gap-6">
          <Tree nodes={truth} segs={segs} onPick={(i) => i !== null && onGo(i)} />
          <div className="text-[calc(15px*var(--text-scale))] leading-snug text-ink-2">
            <p>Chaque coup est indenté sous le coup auquel il répond. Clique sur un coup pour l'ouvrir dans la page.</p>
            <p className="mt-3">Remarque la forme : la Guemara pose une question (4), l'affine (5-8), puis revient en arrière (9) et tranche par une distinction (10). Avancer, puis revenir : c'est normal.</p>
            <p className="mt-3">Pour vérifier que tu as vu la structure, essaie <button className="underline decoration-rule underline-offset-2 hover:text-ink" onClick={() => start(false)}>Reconstruire</button> : pour chaque coup, dis quel coup c'est et à quoi il répond.</p>
          </div>
        </div>
      )}

      {mode === "jouer" && !done && (
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_300px] md:gap-6">
          <div className="order-2 md:order-1">
            <div className="sc mb-1 text-sm text-ink-2">le fil, tel que tu le reconstruis</div>
            <Tree nodes={placed} segs={segs} compact allowNone
              onPick={cur && role ? pickParent : undefined} picked={parent === undefined ? -1 : parent} />
          </div>
          <div ref={controlsRef} className="order-1 md:order-2">
            {difficile && current === null && (
              <>
                <div className="sc mb-1 text-sm text-ink-2">quel coup vient maintenant ? ({remaining.length} restants)</div>
                <div className="space-y-1">
                  {remaining.map((id) => (
                    <button key={id} onClick={() => setCurrent(id)} className="block w-full p-2 text-left text-[calc(13px*var(--text-scale))] leading-snug hover:border-ink">
                      <span className="text-ink-2">{segs.get(id)!.voix} — </span>{segs.get(id)!.resume}
                    </button>
                  ))}
                </div>
              </>
            )}
            {cur && (
              <div className="bloc-strong p-3">
                <div className="sc text-sm text-rubric">coup à placer{!difficile && ` · ${remaining.length} restants`}</div>
                <div className="mt-1 text-[calc(13px*var(--text-scale))] text-ink-2">{cur.voix}</div>
                <p className="mt-1 text-[calc(15px*var(--text-scale))] leading-snug">{cur.resume}</p>
                <div className="sc mt-3 text-sm">1 · quel coup est-ce ?</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {PLAY_ROLES.map((r) => (
                    <button key={r} onClick={() => setRole(r)} className={`btn btn-sm btn-quiet ${role === r ? "btn-on" : ""}`}>
                      <span className={role === r ? "" : "rubric"} style={{ fontVariant: "normal" }}>{ROLE_SYMBOL[r]}</span> {ROLE_VERB[r]}
                    </button>
                  ))}
                </div>
                {role && (
                  <>
                    <div className="sc mt-3 text-sm">2 · à quoi répond-il ? <span className="text-ink-2 md:hidden">(touche un coup du fil ci-dessous)</span><span className="hidden text-ink-2 md:inline">(clique sur un coup du fil)</span></div>
                    {parent !== undefined && <div className="mt-1 text-[calc(13px*var(--text-scale))]">→ {parent === null ? "nouveau fil" : `répond à [${parent}]`}</div>}
                  </>
                )}
                <button onClick={place} disabled={!role || parent === undefined} className="btn btn-sm btn-primary mt-3 w-full">Placer</button>
              </div>
            )}
          </div>
        </div>
      )}

      {done && (
        <div className="mt-4">
          <div className="border-t border-b hairline py-3">
            <div className="text-xl">Rôles : {done.roles}/{done.total} · Liens : {done.liens}/{done.total}{done.difficile && ` · Ordre : ${done.ordre}/${done.total}`}</div>
            <p className="mt-1 text-[calc(15px*var(--text-scale))] leading-snug text-ink-2">
              {done.roles === done.total && done.liens === done.total ? "Tu as la structure entière. C'est exactement ce que fait un lecteur du Talmud : voir le fil avant les mots."
                : "Ce qui compte n'est pas le score mais de voir où tu t'es trompé : en rouge ce que la Guemara fait autrement. Compare avec la carte réelle."}
            </p>
          </div>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <div className="sc mb-1 text-sm text-ink-2">ta reconstruction</div>
              <Tree nodes={placed} segs={segs} compact highlight={(n) => {
                if (!cards.some((c) => c.i === n.i)) return null;
                const t = truthMap.get(n.i)!; const okRole = t.role === n.role;
                const okLink = n.parent !== null ? parentsOf(segs.get(n.i)!.repond_a).includes(n.parent) : t.parent === null;
                return okRole && okLink ? "ok" : "ko";
              }} />
            </div>
            <div>
              <div className="sc mb-1 text-sm text-ink-2">la carte réelle</div>
              <Tree nodes={truth} segs={segs} compact onPick={(i) => i !== null && onGo(i)} />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <button onClick={() => start(difficile)} className="btn btn-sm">Rejouer</button>
            <button onClick={() => start(!difficile)} className="btn btn-sm btn-quiet">{difficile ? "Dans l'ordre" : "Mélangé"}</button>
            <button onClick={() => setMode("lire")} className="sc text-sm text-ink-2 hover:text-ink">retour à la lecture</button>
          </div>
        </div>
      )}
    </div>
  );
}
