import type { Encadre, EncadreType } from "../types";

// Notes marginales, comme les rubriques de l'édition Steinsaltz : un titre en petites capitales, un filet, le texte.
const LABEL: Record<EncadreType, string> = {
  PERSONNAGE: "Personnage", MOT: "Mot", CONTEXTE: "Contexte", HALAKHA: "Halakha", OUTIL: "Outil",
};

export function Encadres({ items, only, empty }: { items: Encadre[]; only?: EncadreType[]; empty?: string }) {
  const list = only ? items.filter((e) => only.includes(e.type)) : items;
  if (list.length === 0) return <p className="text-[13px] leading-snug text-ink-2">{empty ?? "Rien à signaler sur ce segment."}</p>;
  return (
    <div className="space-y-3">
      {list.map((e, k) => (
        <div key={k} className="fadein border-t hairline pt-2">
          <div className="flex items-baseline gap-2">
            <span className="sc text-[12px] text-rubric">{LABEL[e.type]}</span>
            <span className="text-[15px] font-semibold">{e.titre}</span>
          </div>
          <p className="mt-1 text-[14px] leading-snug text-ink-2">{e.texte}</p>
        </div>
      ))}
    </div>
  );
}
