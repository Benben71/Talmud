// « Ma page » : tout ce que l'ado écrit, conservé dans le navigateur (prototype).
import { useCallback, useEffect, useState } from "react";
import type { ChatMessage } from "./types";

export interface Note { at: string; segment: number | null; kind: "idee" | "kouchia" | "teikou" | "note"; text: string }
export interface MaPage {
  premiere_idee: string;
  anticipations: Record<number, { guess: string; correct: boolean }>;
  notes: Note[];
  chat: ChatMessage[];
  ma_page: string;
  visited: number[];
  carte: { roles: number; liens: number; ordre: number; total: number; difficile: boolean } | null;
  last_segment: number | null;
}

const empty = (): MaPage => ({ premiere_idee: "", anticipations: {}, notes: [], chat: [], ma_page: "", visited: [], carte: null, last_segment: null });

// État de démonstration (captures d'écran, démo) : `#/...?seed=1` dans l'adresse.
const seed = (): MaPage => ({
  premiere_idee: "Je demande d'abord s'il y a des témoins. Sinon je tire au sort.",
  anticipations: { 4: { guess: "QUESTION", correct: true }, 5: { guess: "OBJECTION", correct: false }, 6: { guess: "OBJECTION", correct: true } },
  notes: [
    { at: "2026-11-05T10:00:00Z", segment: 4, kind: "kouchia", text: "Pourquoi ne pas tirer au sort ?" },
    { at: "2026-11-05T10:04:00Z", segment: 6, kind: "teikou", text: "Et si l'un des deux ment, le serment sert à quoi ?" },
  ],
  chat: [
    { role: "user", content: "Pourquoi ne pas tirer au sort ?", move: "kouchia", segment: 4 },
    { role: "assistant", content: "Bonne kouchia. Avant que je réponde : qu'est-ce que le serment fait que le sort ne fait pas ? Regarde qui prend un risque dans chaque cas (segment 0).", segment: 4 },
    { role: "user", content: "Celui qui jure risque de mentir devant Dieu, celui qui tire au sort ne risque rien.", move: "jexplique", segment: 4 },
    { role: "assistant", content: "Attends, donc le serment sert à faire peur à celui qui ment ? La Guemara le dit presque ainsi en 3a. Mais alors : pourquoi partager quand même, au lieu de tout donner à celui qui jure ? Lisons la suite.", segment: 4 },
  ],
  ma_page: "Moi j'aurais tiré au sort. Mais le serment oblige chacun à se mouiller — et je ne savais pas que la Mishna avait déjà pensé aux témoins.",
  visited: [0, 1, 2, 3, 4, 5, 6],
  carte: { roles: 6, liens: 5, ordre: 8, total: 8, difficile: false },
  last_segment: 6,
});

// Lecture seule, sans hook : où en est-on dans une sougya ? (pour « Reprendre » sur l'accueil)
export function readProgress(slug: string): { last_segment: number | null; started: boolean } {
  try {
    if (/[?&]seed=1/.test(location.hash) && slug === "bava-metzia-2a") return { last_segment: seed().last_segment, started: true };
    const raw = localStorage.getItem(`talmud:${slug}`);
    if (!raw) return { last_segment: null, started: false };
    const s = JSON.parse(raw) as Partial<MaPage>;
    return { last_segment: s.last_segment ?? null, started: Boolean(s.premiere_idee || (s.visited && s.visited.length)) };
  } catch { return { last_segment: null, started: false }; }
}

export function useMaPage(slug: string) {
  const key = `talmud:${slug}`;
  const [state, setState] = useState<MaPage>(() => {
    try {
      if (/[?&]seed=1/.test(location.hash)) return seed();
      const raw = localStorage.getItem(key);
      return raw ? { ...empty(), ...JSON.parse(raw) } : empty();
    } catch {
      return empty();
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* stockage indisponible */ }
  }, [key, state]);
  const update = useCallback((patch: Partial<MaPage> | ((s: MaPage) => Partial<MaPage>)) => {
    setState((s) => ({ ...s, ...(typeof patch === "function" ? patch(s) : patch) }));
  }, []);
  const reset = useCallback(() => setState(empty()), []);
  return { state, update, reset };
}
