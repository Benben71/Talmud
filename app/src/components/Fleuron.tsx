// Petit ornement gravé, à poser entre deux filets.
export function Fleuron({ className = "" }: { className?: string }) {
  return (
    <div className={`fleuron ${className}`}>
      <svg viewBox="0 0 120 16" width="120" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M60 2 c-6 6 -6 6 0 12 c6 -6 6 -6 0 -12 z" />
        <path d="M44 8 c6 -5 10 -5 14 0 c-4 5 -8 5 -14 0 z M76 8 c-6 -5 -10 -5 -14 0 c4 5 8 5 14 0 z" />
        <path d="M2 8 h34 M84 8 h34" strokeWidth=".8" />
        <circle cx="38" cy="8" r="1.3" fill="currentColor" stroke="none" /><circle cx="82" cy="8" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}
