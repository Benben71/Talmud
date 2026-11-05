// La navigation d'app : un rail à gauche sur grand écran, une barre d'onglets en bas sur téléphone.
// Six entrées, gravées au trait : la mer, lire, la carte, la hevrouta, ma page, repères.
export type NavKey = "mer" | "lire" | "carte" | "hevrouta" | "mapage" | "reperes";

const ICON: Record<NavKey, React.ReactNode> = {
  mer: <path d="M2 9 q4 -4 8 0 t8 0 M2 14 q4 -4 8 0 t8 0 M2 19 q4 -4 8 0 t8 0" />,
  lire: <><rect x="3" y="3" width="18" height="18" /><rect x="8" y="7" width="8" height="10" /><path d="M5 7v10 M19 7v10" strokeWidth=".8" /></>,
  carte: <><circle cx="12" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><circle cx="18" cy="12" r="1.5" /><path d="M12 7 L6 17 M12 7 L18 10.5 M18 13.5 V17" /></>,
  hevrouta: <><path d="M4 5 h10 v8 h-6 l-3 3 v-3 h-1 z" /><path d="M11 10 h9 v7 h-1 v3 l-3 -3 h-5 z" /></>,
  mapage: <><path d="M5 20 l10 -10 l4 4 l-10 10 h-4 z" /><path d="M15 10 l3 -3 l4 4 l-3 3" /><path d="M5 20 l4 0 l0 -4" strokeWidth=".8" /></>,
  reperes: <><circle cx="12" cy="12" r="9" /><path d="M12 3 v18 M3 12 h18" strokeWidth=".8" /><path d="M12 6 l2 6 l-2 6 l-2 -6 z" /></>,
};
const LABEL: Record<NavKey, string> = { mer: "La mer", lire: "Lire", carte: "Carte", hevrouta: "Hevrouta", mapage: "Ma page", reperes: "Repères" };
const ORDER: NavKey[] = ["mer", "lire", "carte", "hevrouta", "mapage", "reperes"];

function Icon({ k, active, size }: { k: NavKey; active: boolean; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={active ? 1.6 : 1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON[k]}
    </svg>
  );
}

export function Nav({ active, badge, disabled, onGo, variant }: {
  active: NavKey | null; badge?: Partial<Record<NavKey, number>>; disabled?: NavKey[];
  onGo: (k: NavKey) => void; variant: "rail" | "tabs";
}) {
  const items = ORDER.map((k) => {
    const isActive = active === k;
    const off = disabled?.includes(k);
    return (
      <button key={k} onClick={() => !off && onGo(k)} disabled={off} aria-current={isActive ? "page" : undefined}
        className={`relative flex min-w-0 flex-col items-center gap-1 ${variant === "rail" ? "w-full py-3" : "flex-1 py-2"} ${isActive ? "text-rubric" : off ? "text-rule" : "text-ink-2 hover:text-ink"}`}>
        {isActive && variant === "rail" && <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-rubric" />}
        {isActive && variant === "tabs" && <span className="absolute left-3 right-3 top-0 h-[2px] bg-rubric" />}
        <Icon k={k} active={isActive} size={variant === "tabs" ? 25 : 22} />
        <span className={`sc leading-none ${variant === "tabs" ? "text-[12px]" : "text-[11px]"}`}>{LABEL[k]}</span>
        {badge?.[k] ? <span className="absolute right-1/2 top-1 translate-x-4 rounded-full bg-rubric px-1 text-[9px] leading-[14px] text-paper" style={{ fontVariant: "normal" }}>{badge[k]}</span> : null}
      </button>
    );
  });
  if (variant === "rail") {
    return <nav className="hidden w-[76px] shrink-0 flex-col border-r hairline bg-paper-2/40 pt-2 md:flex print:hidden" aria-label="Navigation">{items}</nav>;
  }
  return <nav className="mobile-nav flex shrink-0 border-t hairline bg-paper md:hidden print:hidden" aria-label="Navigation">{items}</nav>;
}
