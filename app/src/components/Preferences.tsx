export type Theme = "light" | "dark";

export interface PreferencesProps {
  theme: Theme;
  textSize: number;
  onTheme: (theme: Theme) => void;
  onTextSize: (size: number) => void;
}

const SIZES = [100, 115, 130];

export function Preferences({ theme, textSize, onTheme, onTextSize }: PreferencesProps) {
  const sizeIndex = SIZES.indexOf(textSize);
  return (
    <div className="preferences flex flex-wrap items-center gap-2 print:hidden" aria-label="Réglages d'affichage">
      <div className="flex items-center border hairline" role="group" aria-label="Taille du texte">
        <button type="button" className="preference-size" aria-label="Réduire la taille du texte" title="Réduire le texte"
          disabled={sizeIndex <= 0} onClick={() => onTextSize(SIZES[sizeIndex - 1])}>A−</button>
        <span className="preference-value" aria-live="polite">{textSize} %</span>
        <button type="button" className="preference-size" aria-label="Augmenter la taille du texte" title="Agrandir le texte"
          disabled={sizeIndex >= SIZES.length - 1} onClick={() => onTextSize(SIZES[sizeIndex + 1])}>A+</button>
      </div>
      <button type="button" role="switch" aria-checked={theme === "dark"} aria-label="Mode sombre"
        className="theme-toggle" onClick={() => onTheme(theme === "dark" ? "light" : "dark")}
        title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}>
        <span className="theme-toggle-track" aria-hidden="true"><span className="theme-toggle-thumb" /></span>
        <span>{theme === "dark" ? "Sombre" : "Clair"}</span>
      </button>
    </div>
  );
}
