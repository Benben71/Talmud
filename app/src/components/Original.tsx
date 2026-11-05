import { useState } from "react";

// L'araméen vocalisé, mot par mot. Un tap sur un mot interroge le lexique de Sefaria.
interface Entry { headword: string; parent_lexicon?: string; content?: { senses?: { definition?: string }[] } }

function stripNikkud(w: string) {
  return w.replace(/[֑-ׇ]/g, "").replace(/[״׳"'.,:;!?()\-–—]/g, "");
}

export function Original({ text, mark }: { text: string; mark?: string | null }) {
  const [sel, setSel] = useState<{ word: string; loading: boolean; entries: Entry[] | null; error?: string } | null>(null);
  const words = text.split(/\s+/);

  async function lookup(w: string) {
    const bare = stripNikkud(w);
    if (!bare) return;
    setSel({ word: w, loading: true, entries: null });
    try {
      const r = await fetch(`https://www.sefaria.org/api/words/${encodeURIComponent(bare)}`);
      const data = (await r.json()) as Entry[];
      setSel({ word: w, loading: false, entries: Array.isArray(data) ? data.slice(0, 3) : [] });
    } catch {
      setSel({ word: w, loading: false, entries: null, error: "Lexique indisponible (hors ligne ?)" });
    }
  }

  return (
    <div>
      <p className="he text-[1.6rem] leading-[2]">
        {mark && <span className="he-mark ml-2">{mark}</span>}
        {words.map((w, k) => (
          <span key={k}>
            <span className={`word ${sel?.word === w ? "word-on" : ""}`} onClick={() => lookup(w)}>{w}</span>{" "}
          </span>
        ))}
      </p>
      {sel && (
        <div className="fadein bloc mt-3 p-3 text-[14px]">
          <div className="flex items-center justify-between">
            <span className="he text-xl font-medium">{sel.word}</span>
            <button className="text-ink-2 hover:text-ink" onClick={() => setSel(null)} aria-label="Fermer">✕</button>
          </div>
          {sel.loading && <p className="text-ink-2">Recherche dans le lexique Sefaria…</p>}
          {sel.error && <p className="text-ink-2">{sel.error}</p>}
          {sel.entries && sel.entries.length === 0 && <p className="text-ink-2">Pas d'entrée pour ce mot tel quel (essaie la racine, ou demande à ta hevrouta).</p>}
          {sel.entries?.map((e, k) => (
            <div key={k} className="mt-2 border-t hairline pt-2">
              <div className="sc text-[12px] text-ink-2">{e.parent_lexicon ?? "lexique"} · <span className="he" style={{ fontVariant: "normal" }}>{e.headword}</span></div>
              <div className="mt-1 leading-snug [&_i]:italic" dangerouslySetInnerHTML={{ __html: e.content?.senses?.[0]?.definition ?? "" }} />
            </div>
          ))}
          <div className="sc mt-2 text-[11px] text-ink-2">lexique Jastrow / BDB via Sefaria.org</div>
        </div>
      )}
    </div>
  );
}
