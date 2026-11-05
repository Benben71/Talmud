// Rend un texte interpolé « **littéral** explication » : le gras = le texte, le romain = Steinsaltz.
export function Interp({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <p className={`interp text-[1.2rem] leading-[1.6] ${className}`}>
      {parts.map((p, k) =>
        p.startsWith("**") ? <strong key={k}>{p.slice(2, -2)}</strong> : <span key={k}>{p}</span>,
      )}
    </p>
  );
}
