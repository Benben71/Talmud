// « La mer du Talmud » (yam ha-Talmud) : chaque sougya est une île, dessinée à la plume
// avec ses lignes de sonde et ses côtes hachurées ; les parcours sont des archipels.
// Carte marine gravée : cartouche, rose des vents, lignes de rhumb. Encre indigo pour l'eau.
import type { Catalogue } from "../types";

const CLUSTERS: Record<string, { x: number; y: number; label: string; he: string }> = {
  "a-qui-cest": { x: 150, y: 250, label: "À qui c'est ?", he: "שלי שלך" },
  "avoir-raison": { x: 430, y: 220, label: "Avoir raison", he: "אלו ואלו" },
  "toi-et-lautre": { x: 730, y: 260, label: "Toi et l'autre", he: "ואהבת לרעך" },
  "le-temps-long": { x: 940, y: 250, label: "Le temps long", he: "דור לדור" },
  "lire-comme-un-sage": { x: 250, y: 380, label: "Lire comme un sage", he: "תיקו" },
};
const POS: Record<string, [number, number]> = {
  "bava-metzia-2a": [150, 232],
  "berakhot-2a": [330, 190], "eruvin-13b": [470, 300], "bava-metzia-59b": [540, 160],
  "shabbat-31a": [670, 190], "bava-metzia-62a": [820, 270], "sanhedrin-37a": [705, 350],
  "taanit-7a": [920, 190], "taanit-23a": [960, 300],
  "pesachim-10b": [300, 395], "chullin-90b": [440, 400], "berakhot-10a": [790, 200],
};
const SPREAD = [[0, 0], [-110, 90], [110, 100], [0, -110]];
const W = 1060, H = 460;

function hash(s: string) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; }
function pt(cx: number, cy: number, r: number, seed: number, t: number, scale = 1) {
  const wob = 1 + 0.16 * Math.sin(3 * t + seed * 6.28) + 0.11 * Math.sin(5 * t + seed * 12.5) + 0.05 * Math.sin(8 * t + seed * 3.1);
  const rr = r * scale * wob;
  return [cx + rr * Math.cos(t), cy + rr * Math.sin(t) * 0.78] as const;
}
function island(cx: number, cy: number, r: number, seed: number, scale = 1) {
  const n = 56; const pts: string[] = [];
  for (let k = 0; k <= n; k++) { const [x, y] = pt(cx, cy, r, seed, (k / n) * Math.PI * 2, scale); pts.push(`${x.toFixed(1)},${y.toFixed(1)}`); }
  return `M${pts.join("L")}Z`;
}
// Hachures de côte : petits traits perpendiculaires au rivage, côté mer, comme sur les cartes gravées.
function coast(cx: number, cy: number, r: number, seed: number) {
  const n = 40; const out: string[] = [];
  for (let k = 0; k < n; k++) {
    const t = (k / n) * Math.PI * 2;
    const [x1, y1] = pt(cx, cy, r, seed, t, 1.04);
    const [x2, y2] = pt(cx, cy, r, seed, t, 1.04 + 0.08 + 0.05 * ((k % 3) / 2));
    out.push(`M${x1.toFixed(1)},${y1.toFixed(1)}L${x2.toFixed(1)},${y2.toFixed(1)}`);
  }
  return out.join("");
}

export function Archipel({ items, onOpen }: { items: Catalogue[]; onOpen: (slug: string) => void }) {
  const counts: Record<string, number> = {};
  const placed = items.map((it) => {
    const p = it.parcours[0];
    const c = CLUSTERS[p] ?? { x: 500, y: 200, label: p, he: "" };
    const k = counts[p] = (counts[p] ?? 0); counts[p]++;
    const [dx, dy] = SPREAD[k % SPREAD.length];
    const [x, y] = POS[it.slug] ?? [c.x + dx, c.y + dy];
    return { it, x, y, r: 12 + it.duree_min * 0.8, seed: hash(it.slug) };
  });
  const water = "var(--color-indigo)";
  const cx = 70, cy = 366; // rose des vents

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="La mer du Talmud : les sougyot comme des îles">
      <defs>
        <pattern id="mer" width="52" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 7 q 13 -6 26 0 t 26 0" fill="none" stroke={water} strokeWidth=".55" opacity=".5" />
        </pattern>
        <pattern id="mer2" width="52" height="14" patternUnits="userSpaceOnUse" patternTransform="translate(26 7)">
          <path d="M0 7 q 13 -5 26 0 t 26 0" fill="none" stroke={water} strokeWidth=".4" opacity=".3" />
        </pattern>
        <clipPath id="sea-clip"><rect x="6" y="6" width={W - 12} height={H - 12} /></clipPath>
      </defs>
      {/* cadre gravé */}
      <rect x="6" y="6" width={W - 12} height={H - 12} fill="url(#mer)" stroke="var(--color-ink)" strokeWidth="1.2" />
      <rect x="6" y="6" width={W - 12} height={H - 12} fill="url(#mer2)" />
      <rect x="12" y="12" width={W - 24} height={H - 24} fill="none" stroke="var(--color-rule)" strokeWidth=".7" />

      <g clipPath="url(#sea-clip)">
        {/* lignes de rhumb depuis la rose des vents */}
        {Array.from({ length: 16 }, (_, k) => {
          const a = (k / 16) * Math.PI * 2;
          return <line key={k} x1={cx} y1={cy} x2={cx + 1400 * Math.cos(a)} y2={cy + 1400 * Math.sin(a)} stroke={k % 4 === 0 ? water : "var(--color-rule)"} strokeWidth={k % 4 === 0 ? ".6" : ".4"} opacity={k % 4 === 0 ? ".55" : ".45"} />;
        })}

        {/* archipels : nom en hébreu et en français */}
        {Object.entries(CLUSTERS).map(([key, c]) => (
          <g key={key}>
            <text x={c.x} y={key === "lire-comme-un-sage" ? c.y - 52 : 66} textAnchor="middle" className="fill-ink" style={{ fontSize: 19, letterSpacing: ".16em", fontVariant: "small-caps" }}>{c.label.toLowerCase()}</text>
            <text x={c.x} y={key === "lire-comme-un-sage" ? c.y - 32 : 88} textAnchor="middle" className="fill-ink-2" style={{ fontSize: 18, fontFamily: "var(--font-hebrew)" }}>{c.he}</text>
          </g>
        ))}

        {placed.map(({ it, x, y, r, seed }) => (
          <g key={it.slug} onClick={() => it.disponible && onOpen(it.slug)} style={{ cursor: it.disponible ? "pointer" : "default" }}>
            <title>{it.titre} — {it.ref.replace("_", " ").replace(".", " ")} · {it.duree_min} min{it.disponible ? "" : " · bientôt"}{it.idee_cle ? `\n${it.idee_cle}` : ""}</title>
            {/* sondes */}
            <path d={island(x, y, r, seed, 1.9)} fill="none" stroke={water} strokeWidth=".6" strokeDasharray="1.5 3" opacity=".7" />
            <path d={island(x, y, r, seed, 1.5)} fill="none" stroke={water} strokeWidth=".7" opacity=".8" />
            {/* côte hachurée */}
            <path d={coast(x, y, r, seed)} stroke={it.disponible ? "var(--color-ink)" : "var(--color-rule)"} strokeWidth=".6" opacity=".8" />
            {/* l'île */}
            <path d={island(x, y, r, seed)} fill={it.disponible ? "var(--color-paper-2)" : "var(--color-paper)"} stroke={it.disponible ? "var(--color-ink)" : "var(--color-ink-2)"} strokeWidth={it.disponible ? 1.4 : .9} strokeDasharray={it.disponible ? undefined : "3 2.5"} />
            {it.disponible && <>
              <path d={island(x + 2, y + 2, r * 0.6, seed + 0.3)} fill="none" stroke="var(--color-ink-2)" strokeWidth=".6" />
              <path d={island(x + 3, y + 3, r * 0.3, seed + 0.6)} fill="none" stroke="var(--color-ink-2)" strokeWidth=".5" />
              <path d={`M${x - 3} ${y - r * 0.2} l3 -8 l3 8 z`} fill="var(--color-rubric)" stroke="none" />
            </>}
            <text x={x} y={y + r * 0.78 + 20} textAnchor="middle" className={it.disponible ? "fill-ink" : "fill-ink-2"} style={{ fontSize: 19, fontStyle: it.disponible ? "normal" : "italic", fontWeight: it.disponible ? 600 : 400 }}>{it.court}</text>
            <text x={x} y={y + r * 0.78 + 36} textAnchor="middle" className="fill-ink-2" style={{ fontSize: 13, letterSpacing: ".1em", fontVariant: "small-caps" }}>
              {it.ref.replace("_", " ").replace(".", " ").toLowerCase()}{it.disponible ? ` · ${it.duree_min} min` : " · bientôt"}
            </text>
          </g>
        ))}

        {/* rose des vents : le daf 2, là où tout commence */}
        <g transform={`translate(${cx} ${cy})`}>
          <circle r="34" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth=".9" />
          <circle r="26" fill="none" stroke="var(--color-rule)" strokeWidth=".6" />
          {[0, 1, 2, 3].map((k) => (
            <g key={k} transform={`rotate(${k * 90})`}>
              <path d="M0 -34 L5 -6 L0 0 L-5 -6 Z" fill="var(--color-ink)" />
              <path d="M0 -34 L5 -6 L0 0 Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth=".5" />
            </g>
          ))}
          {[0, 1, 2, 3].map((k) => <path key={k} transform={`rotate(${45 + k * 90})`} d="M0 -22 L3 -5 L0 0 L-3 -5 Z" fill="var(--color-ink-2)" />)}
          <circle r="9" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth=".8" />
          <text textAnchor="middle" y="5.5" className="fill-rubric" style={{ fontSize: 15, fontFamily: "var(--font-hebrew)", fontWeight: 700 }}>ב</text>
        </g>
        <text x={24} y={cy + 56} className="fill-ink-2" style={{ fontSize: 13, letterSpacing: ".1em", fontVariant: "small-caps" }}>on commence toujours au daf 2</text>
      </g>

      {/* cartouche */}
      <g transform={`translate(${W - 24} ${H - 60})`}>
        <path d="M0 0 h-236 l-8 10 l8 10 h236 l8 -10 z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1" />
        <path d="M-4 3 h-228 l-5 7 l5 7 h228 l5 -7 z" fill="none" stroke="var(--color-rule)" strokeWidth=".6" />
        <text x="-118" y="14.5" textAnchor="middle" className="fill-ink" style={{ fontSize: 15, letterSpacing: ".2em", fontVariant: "small-caps" }}>la mer du talmud</text>
        <text x="-118" y="38" textAnchor="middle" className="fill-ink-2" style={{ fontSize: 16, fontFamily: "var(--font-hebrew)" }}>יָם הַתַּלְמוּד</text>
      </g>
    </svg>
  );
}
