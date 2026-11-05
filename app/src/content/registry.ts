// Les sougyot ouvertes dans l'app. Pour en ajouter une : ses trois fichiers dans documentation/corpus,
// son slug dans scripts/build-content.mjs, puis une ligne ici.
import type { Catalogue, Sougya } from "../types";
import bm2a from "./bava-metzia-2a.json";
import pes10b from "./pesachim-10b.json";
import chul90b from "./chullin-90b.json";
import ber10a from "./berakhot-10a.json";
import catalogueJson from "./catalogue.json";

export const SOUGYOT: Record<string, Sougya> = {
  "bava-metzia-2a": bm2a as unknown as Sougya,
  "pesachim-10b": pes10b as unknown as Sougya,
  "chullin-90b": chul90b as unknown as Sougya,
  "berakhot-10a": ber10a as unknown as Sougya,
};
export const CATALOGUE = catalogueJson as Catalogue[];
export const DEFAULT_SLUG = "bava-metzia-2a";
