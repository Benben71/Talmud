// Le cha'ar — la « porte » : le portail architectural des pages de titre du Talmud (Venise, Vilna),
// gravé au trait : deux colonnes, un arc, une clé de voûte, un cartouche. Il encadre le bloc central de l'accueil.
export function Shaar({ className = "" }: { className?: string }) {
  const ink = "var(--color-ink-2)";
  return (
    <svg viewBox="0 0 600 640" className={className} preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={ink} strokeWidth=".6" opacity=".45" />
        </pattern>
        <pattern id="hatch2" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="4" stroke={ink} strokeWidth=".5" opacity=".35" />
        </pattern>
      </defs>
      <g fill="none" stroke={ink} strokeWidth="1.1" opacity=".85">
        {/* socle */}
        <rect x="30" y="596" width="540" height="14" fill="url(#hatch2)" />
        <line x1="20" y1="610" x2="580" y2="610" strokeWidth="1.6" />
        <line x1="30" y1="620" x2="570" y2="620" strokeWidth=".7" />
        {/* bases */}
        <rect x="52" y="572" width="76" height="24" fill="url(#hatch)" />
        <rect x="472" y="572" width="76" height="24" fill="url(#hatch)" />
        <rect x="60" y="560" width="60" height="12" />
        <rect x="480" y="560" width="60" height="12" />
        {/* fûts cannelés */}
        <rect x="66" y="196" width="48" height="364" />
        <rect x="486" y="196" width="48" height="364" />
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k} strokeWidth=".6" opacity=".7">
            <line x1={74 + k * 8} y1="200" x2={74 + k * 8} y2="556" />
            <line x1={494 + k * 8} y1="200" x2={494 + k * 8} y2="556" />
          </g>
        ))}
        <rect x="66" y="196" width="48" height="364" fill="url(#hatch2)" opacity=".35" />
        <rect x="486" y="196" width="48" height="364" fill="url(#hatch2)" opacity=".35" />
        {/* chapiteaux */}
        <path d="M58 196 h64 l-6 -14 h-52 z" fill="url(#hatch)" />
        <path d="M478 196 h64 l-6 -14 h-52 z" fill="url(#hatch)" />
        <path d="M64 182 c-8 -10 -8 -18 2 -18 c6 0 8 6 4 10 M116 182 c8 -10 8 -18 -2 -18 c-6 0 -8 6 -4 10" />
        <path d="M484 182 c-8 -10 -8 -18 2 -18 c6 0 8 6 4 10 M536 182 c8 -10 8 -18 -2 -18 c-6 0 -8 6 -4 10" />
        <rect x="70" y="164" width="40" height="8" />
        <rect x="490" y="164" width="40" height="8" />
        {/* arc : extrados et intrados */}
        <path d="M90 196 A210 210 0 0 1 510 196" strokeWidth="1.6" />
        <path d="M114 196 A186 186 0 0 1 486 196" />
        <path d="M90 196 A210 210 0 0 1 510 196 L486 196 A186 186 0 0 0 114 196 Z" fill="url(#hatch)" stroke="none" opacity=".5" />
        {/* claveaux */}
        {Array.from({ length: 13 }, (_, k) => {
          const a = Math.PI - (k / 12) * Math.PI;
          const x1 = 300 + 186 * Math.cos(a), y1 = 196 - 186 * Math.sin(a);
          const x2 = 300 + 210 * Math.cos(a), y2 = 196 - 210 * Math.sin(a);
          return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth=".8" />;
        })}
        {/* clé de voûte */}
        <path d="M286 -14 h28 l6 36 h-40 z" fill="var(--color-paper)" strokeWidth="1.2" />
        <path d="M286 -14 h28 l6 36 h-40 z" fill="url(#hatch2)" />
        {/* écoinçons : rosaces */}
        <g strokeWidth=".8">
          <circle cx="60" cy="90" r="14" /><circle cx="60" cy="90" r="6" />
          <circle cx="540" cy="90" r="14" /><circle cx="540" cy="90" r="6" />
          {[0, 1, 2, 3].map((k) => <g key={k} transform={`rotate(${k * 45} 60 90)`}><line x1="46" y1="90" x2="74" y2="90" /></g>)}
          {[0, 1, 2, 3].map((k) => <g key={k} transform={`rotate(${k * 45} 540 90)`}><line x1="526" y1="90" x2="554" y2="90" /></g>)}
        </g>
        {/* entablature au-dessus des colonnes, reliant les écoinçons */}
        <line x1="40" y1="120" x2="110" y2="120" strokeWidth=".8" />
        <line x1="490" y1="120" x2="560" y2="120" strokeWidth=".8" />
      </g>
    </svg>
  );
}
