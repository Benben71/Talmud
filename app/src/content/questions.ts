// Les grandes questions : les débats de l'aggada sur le sens, le mal, la liberté, la vérité, l'éthique.
// Le contenu est dans questions.json (lu aussi par le serveur de la hevrouta). Chaque débat est une
// suite de tours de parole, paraphrasés (pas traduits), avec la référence du texte quand elle change.
import data from "./questions.json";

export type TourType = "recit" | "avis" | "question" | "objection" | "reponse" | "preuve" | "conclusion";

export interface Camp { id: string; label: string }
export interface Tour { qui: string; quand?: string; type: TourType; camp?: string; dit: string; ref?: string }
export interface Source { ref: string; path: string }

export interface GrandeQuestion {
  id: string;
  question: string;
  he: string;
  heLabel: string;
  domaine: string;
  accroche: string;
  camps: Camp[];
  debat: Tour[];
  issue: string;
  a_toi: string;
  amorces: string[];
  sources: Source[];
  sougya?: string;
  vigilance?: string;
}

export const QUESTIONS = data as GrandeQuestion[];
export const DOMAINES = ["Exister", "Le mal", "Liberté", "Vérité", "Éthique", "Dieu et le monde"] as const;

export const TOUR_LABEL: Record<TourType, { sym: string; label: string }> = {
  recit: { sym: "✎", label: "récit" }, avis: { sym: "¶", label: "avis" }, question: { sym: "?", label: "question" },
  objection: { sym: "✗", label: "objection" }, reponse: { sym: "↳", label: "réponse" }, preuve: { sym: "≡", label: "preuve" },
  conclusion: { sym: "★", label: "conclusion" },
};

// Les voix collectives ou narratives ne sont pas des « sages » à présenter ou à ranger sur la carte.
const COLLECTIFS = new Set(["Le Talmud", "La Mishna", "La Guemara", "Les sages", "Tous", "Le vote", "Une baraïta", "Les uns", "Les autres", "Dieu, dans le récit", "Une voix céleste", "Les philosophes", "Le prophète Élie"]);
export const estSage = (qui: string) => !COLLECTIFS.has(qui);
export const SAGES = [...new Set(QUESTIONS.flatMap((q) => q.debat.map((t) => t.qui)).filter(estSage))];

export const sefaria = (s: Source) => `https://www.sefaria.org/${s.path}`;

// Ce que l'ado a fait sur une question : son camp avant et après, ses réponses aux sages, son argument, le chat.
export interface EtatQuestion {
  avant: string | null;
  pourquoi: string;
  revele: number;
  reponses: Record<number, string>;
  apres: string | null;
  argument: string;
  carte: { choix: Record<string, string>; verifie: boolean };
  chat: { role: "user" | "assistant"; content: string; move?: string }[];
}

export const etatVide = (): EtatQuestion => ({ avant: null, pourquoi: "", revele: 0, reponses: {}, apres: null, argument: "", carte: { choix: {}, verifie: false }, chat: [] });

export function lireEtat(id: string): EtatQuestion {
  try {
    const raw = localStorage.getItem(`talmud:q:${id}`);
    if (raw) return { ...etatVide(), ...JSON.parse(raw) };
    // Première version de la rubrique : une seule réponse libre par question.
    const ancien = localStorage.getItem(`talmud:question:${id}`);
    return ancien ? { ...etatVide(), argument: ancien } : etatVide();
  } catch { return etatVide(); }
}

export function ecrireEtat(id: string, e: EtatQuestion) {
  try { localStorage.setItem(`talmud:q:${id}`, JSON.stringify(e)); } catch { /* stockage indisponible */ }
}
