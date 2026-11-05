import { useEffect, useRef, useState } from "react";
import type { ChatMessage, Move, Segment, Sougya } from "../types";

const MOVES: { id: Move; label: string; hint: string; placeholder: string }[] = [
  { id: "explique", label: "Explique-moi", hint: "Je ne comprends pas ce segment.", placeholder: "Ce que tu ne comprends pas (ou rien : on explique tout le segment)" },
  { id: "jexplique", label: "Je t'explique", hint: "Je reformule avec mes mots, tu me dis si ça tient.", placeholder: "Explique le segment avec tes mots…" },
  { id: "kouchia", label: "Kouchia", hint: "J'ai une objection.", placeholder: "Ton objection : « mais pourquoi… ? »" },
  { id: "tachma", label: "Ta chma", hint: "J'apporte une preuve.", placeholder: "Ta preuve : un segment, un passage, un fait du texte…" },
  { id: "chani", label: "Chani", hint: "C'est différent : je distingue deux cas.", placeholder: "Ici c'est différent parce que…" },
  { id: "voix", label: "Et lui, il dirait quoi ?", hint: "Fais parler une voix du texte.", placeholder: "Qui ? (Rav Pappa, la Mishna, Rabbenaï…) et sur quoi ?" },
  { id: "teikou", label: "Teikou", hint: "Je suspends la question.", placeholder: "La question que tu laisses ouverte" },
];

export function Hevrouta({
  sougya, segment, history, onMessage, onTeikou, mode,
}: {
  sougya: Sougya; segment: Segment; history: ChatMessage[];
  onMessage: (m: ChatMessage) => void; onTeikou: (q: string) => void; mode: string;
}) {
  const [move, setMove] = useState<Move>("explique");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history.length, busy]);

  async function send(m: Move = move, t: string = text) {
    if (busy) return;
    const content = t.trim() || MOVES.find((x) => x.id === m)?.hint || "";
    const userMsg: ChatMessage = { role: "user", content, move: m, segment: segment.i };
    onMessage(userMsg);
    if (m === "teikou" && content) onTeikou(content);
    setText(""); setBusy(true); setError(null);
    try {
      const r = await fetch("/api/hevrouta", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: sougya.slug, segment: segment.i, move: m, text: content, history: history.map(({ role, content }) => ({ role, content })) }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Erreur");
      onMessage({ role: "assistant", content: data.reply, segment: segment.i });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally { setBusy(false); }
  }

  const current = MOVES.find((x) => x.id === move)!;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-baseline justify-between border-b hairline px-3 py-2">
        <div className="sc text-sm">Hevrouta <span className="text-ink-2">· segment {segment.i}</span></div>
        <div className={`sc text-[12px] ${mode === "demo" ? "text-ink-2" : "rubric"}`}>{mode === "openai" ? "OpenAI" : mode === "claude" ? "Claude" : "mode démo"}</div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {history.length === 0 && (
          <div className="text-[14px] leading-snug text-ink-2">
            <p>Ton binôme a déjà lu la page. Choisis un coup, écris, ou prends une amorce :</p>
            <ul className="mt-2 space-y-1">
              {sougya.questions_hevrouta.map((q, k) => (
                <li key={k}>
                  <button className="text-left italic text-ink underline decoration-rule underline-offset-2 hover:decoration-ink" onClick={() => { setMove("kouchia"); send("kouchia", q.amorce); }}>« {q.amorce} »</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {history.map((m, k) => (
          <div key={k} className={`fadein max-w-[94%] text-[15px] leading-snug ${m.role === "user" ? "ml-auto border-r-2 border-rubric pr-3 text-right" : "border-l hairline pl-3"}`}>
            {m.move && <div className="sc text-[11px] text-ink-2">{MOVES.find((x) => x.id === m.move)?.label ?? m.move}{m.segment !== undefined && ` · seg. ${m.segment}`}</div>}
            {m.content}
          </div>
        ))}
        {busy && <div className="text-[14px] italic text-ink-2">… ta hevrouta réfléchit</div>}
        {error && <div className="text-[14px] text-rubric">{error}</div>}
        <div ref={endRef} />
      </div>

      <div className="border-t hairline p-2">
        <div className="mb-2 flex flex-wrap gap-1">
          {MOVES.map((m) => (
            <button key={m.id} onClick={() => setMove(m.id)} title={m.hint} className={`btn btn-sm btn-quiet ${move === m.id ? "btn-on" : ""}`}>
              {m.label}
            </button>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder={current.placeholder} className="min-w-0 flex-1 px-3 py-1.5 text-[15px]" />
          <button disabled={busy} className="btn btn-sm btn-primary">Envoyer</button>
        </form>
      </div>
    </div>
  );
}
