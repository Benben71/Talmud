export type Role =
  | "MISHNA" | "RECIT" | "ENSEIGNEMENT" | "QUESTION" | "REPONSE"
  | "OBJECTION" | "PREUVE" | "DISTINCTION" | "CONCLUSION" | "TEIKOU";

export type EncadreType = "PERSONNAGE" | "MOT" | "CONTEXTE" | "HALAKHA" | "OUTIL";

export interface Encadre { type: EncadreType; titre: string; texte: string }

export interface Segment {
  i: number;
  role: Role;
  voix: string;
  repond_a: number | number[] | null;
  resume: string;
  histoire: string;
  texte: string | null;
  original: string;
  english: string;
  hebrew: string;
  encadres: Encadre[];
  decoupage: string[] | null;
}

export interface PlusTard { qui: string; quand?: string; texte: string; source?: string }
export interface AToi { apres_segment: number; question: string }

export interface Sougya {
  slug: string;
  ref: string;
  heRef: string;
  url: string;
  titre: string;
  parcours: string[];
  duree_min: number;
  he: { tractate: string; chapter: string; daf: string };
  sougya: { segments: [number, number]; actes: { titre: string; segments: [number, number] }[] };
  cas: { transpose: string; epoque: string };
  premiere_idee: string;
  ce_texte: string | null;
  idee_cle: string | null;
  plus_tard: PlusTard[];
  a_toi: AToi[];
  segments: Segment[];
  et_alors: { type: string; principe: string; avis_ecarte: string | null; halakha: string | null };
  outils: string[];
  personnages: string[];
  questions_hevrouta: { amorce: string; piste: string }[];
  liens: { ref: string; pourquoi: string }[];
  vigilance: string | null;
  attribution: string;
}

export interface Catalogue {
  slug: string; ref: string; titre: string; court: string; parcours: string[]; duree_min: number;
  segments: number; type: string; personnages: string[]; outils: string[]; disponible: boolean; cas: string;
  idee_cle: string | null; ce_texte: string | null; vigilance: string | null;
}

export type Depth = "histoire" | "texte" | "original";
export type Layer = "rachi" | "texte" | "tosafot";

export type Move = "explique" | "jexplique" | "kouchia" | "tachma" | "chani" | "voix" | "teikou" | "libre";

export interface ChatMessage { role: "user" | "assistant"; content: string; move?: Move; segment?: number }

export const ROLE_LABEL: Record<Role, string> = {
  MISHNA: "Mishna", RECIT: "Récit", ENSEIGNEMENT: "Enseignement", QUESTION: "Question",
  REPONSE: "Réponse", OBJECTION: "Objection", PREUVE: "Preuve", DISTINCTION: "Distinction",
  CONCLUSION: "Conclusion", TEIKOU: "Teikou",
};
export const ROLE_SYMBOL: Record<Role, string> = {
  MISHNA: "▣", RECIT: "✎", ENSEIGNEMENT: "¶", QUESTION: "?", REPONSE: "↳",
  OBJECTION: "✗", PREUVE: "≡", DISTINCTION: "⋔", CONCLUSION: "★", TEIKOU: "∞",
};
export const ROLE_VERB: Record<Role, string> = {
  MISHNA: "La Mishna continue", RECIT: "Elle raconte", ENSEIGNEMENT: "Un sage enseigne", QUESTION: "Elle pose une question",
  REPONSE: "Elle répond", OBJECTION: "Elle objecte", PREUVE: "Elle apporte une preuve", DISTINCTION: "Elle distingue deux cas",
  CONCLUSION: "Elle conclut", TEIKOU: "Elle laisse en suspens",
};

export const OUTIL_LABEL: Record<string, string> = {
  DIYOUK: "Diyouk — chaque mot compte", KAL_VAHOMER: "Kal va-homer — a fortiori", TSRIKHA: "Tsrikha — pourquoi les deux ?",
  CHANI: "Chani — c'est différent", TA_CHMA: "Ta chma — viens, écoute", ROV: "Rov — la majorité", SEYAG: "Seyag — une haie",
  MAHLOKET: "Mahloket — le désaccord conservé", DERACHA: "Deracha — lire un verset", LECTURE_PLURIEL: "Lire un pluriel",
  CAS_LIMITE: "Le cas bizarre — un laboratoire", TEIKOU: "Teikou — laisser la question debout",
  GUZMA: "Gouzma — reconnaître une exagération", FIN_DU_VERSET: "Va jusqu'au bout du verset",
};

export const PARCOURS: { id: string; label: string; question: string; he: string }[] = [
  { id: "a-qui-cest", label: "À qui c'est ?", question: "Possession, objets trouvés, partage", he: "שלי שלך" },
  { id: "avoir-raison", label: "Avoir raison", question: "Débat, majorité, vérité, humilité", he: "אלו ואלו" },
  { id: "toi-et-lautre", label: "Toi et l'autre", question: "Éthique, limites, règle d'or", he: "ואהבת לרעך" },
  { id: "le-temps-long", label: "Le temps long", question: "Transmission, générations", he: "דור לדור" },
  { id: "lire-comme-un-sage", label: "Lire comme un sage", question: "Cas bizarres, exagérations, teikou", he: "תיקו" },
];
