// Assemble le contenu de l'app à partir de documentation/corpus :
//   corpus/<slug>.json            (texte Sefaria : araméen, anglais Steinsaltz, hébreu Steinsaltz)
//   corpus/annotations/<slug>.json (couche éditoriale : rôles, carte du débat, cas, encadrés, hevrouta)
//   corpus/fr/<slug>.fr.json       (adaptation française : texte interpolé + histoire)
// → app/src/content/<slug>.json + app/src/content/index.json
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(here, "../../documentation/corpus");
const OUT = path.resolve(here, "../src/content");
const SLUGS = ["bava-metzia-2a", "pesachim-10b", "chullin-90b", "berakhot-10a"];
// Titre courant de chaque sougya, comme sur la page imprimée : traité, chapitre, feuillet.
const HE = {
  "bava-metzia-2a": { tractate: "בבא מציעא", chapter: "שנים אוחזין · פרק ראשון", daf: "ב׳ א" },
  "pesachim-10b": { tractate: "פסחים", chapter: "אור לארבעה עשר · פרק ראשון", daf: "י׳ ב" },
  "chullin-90b": { tractate: "חולין", chapter: "גיד הנשה · פרק שביעי", daf: "צ׳ ב" },
  "berakhot-10a": { tractate: "ברכות", chapter: "מאימתי · פרק ראשון", daf: "י׳ א" },
};

fs.mkdirSync(OUT, { recursive: true });
const index = [];

for (const slug of SLUGS) {
  const src = JSON.parse(fs.readFileSync(path.join(CORPUS, `${slug}.json`), "utf8"));
  const ann = JSON.parse(fs.readFileSync(path.join(CORPUS, "annotations", `${slug}.json`), "utf8"));
  const frPath = path.join(CORPUS, "fr", `${slug}.fr.json`);
  const fr = fs.existsSync(frPath) ? JSON.parse(fs.readFileSync(frPath, "utf8")) : { texte: [], histoire: [] };

  const [lo, hi] = ann.sougya.segments;
  const segments = ann.segments
    .filter((s) => s.dans_sougya)
    .map((s) => ({
      i: s.i,
      role: s.role,
      voix: s.voix,
      repond_a: s.repond_a,
      resume: s.resume_fr,
      histoire: fr.histoire[s.i] ?? s.resume_fr,
      texte: fr.texte[s.i] ?? null,
      original: src.aramaic_vocalized[s.i],
      english: src.english_steinsaltz[s.i],
      hebrew: src.steinsaltz_hebrew_commentary[s.i],
      encadres: s.encadres ?? [],
      decoupage: s.decoupage_suggere ?? null,
    }));

  const out = {
    slug,
    ref: ann.ref,
    heRef: src.heRef,
    url: src.url,
    titre: ann.titre,
    parcours: ann.parcours,
    duree_min: ann.duree_min,
    he: HE[slug] ?? { tractate: "", chapter: "", daf: "" },
    sougya: { segments: [lo, hi], actes: ann.sougya.actes ?? [] },
    cas: ann.cas,
    premiere_idee: ann.premiere_idee,
    ce_texte: ann.ce_texte ?? null,
    idee_cle: ann.idee_cle ?? null,
    plus_tard: ann.plus_tard ?? [],
    a_toi: ann.a_toi ?? [],
    segments,
    et_alors: ann.et_alors,
    outils: ann.outils,
    personnages: ann.personnages,
    questions_hevrouta: ann.questions_hevrouta,
    liens: ann.liens,
    vigilance: ann.vigilance ?? null,
    attribution:
      "Texte : The William Davidson Talmud (Koren Noé Talmud), traduction et commentaire de R. Adin Even-Israel Steinsaltz — CC BY-NC 4.0 — via Sefaria.org. Adaptation française : prototype, non relue.",
  };
  fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(out, null, 1));
  index.push({ slug, ref: out.ref, titre: out.titre, parcours: out.parcours, duree_min: out.duree_min, segments: segments.length });
  console.log(`${slug}: ${segments.length} segments (${lo}-${hi}), texte FR: ${segments.filter((s) => s.texte).length}`);
}
fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify(index, null, 1));

// Catalogue de toutes les sougyot annotées (disponibles ou à venir) pour la page d'accueil.
const COURT = {
  "bava-metzia-2a": "Le talit", "berakhot-2a": "Le soir", "shabbat-31a": "Sur un pied", "eruvin-13b": "Celles-ci et celles-là",
  "bava-metzia-59b": "Le four d'Akhnaï", "bava-metzia-62a": "La gourde", "sanhedrin-37a": "Un monde entier",
  "taanit-7a": "Mes élèves", "taanit-23a": "Le caroubier", "pesachim-10b": "La souris", "chullin-90b": "Trois cents prêtres", "berakhot-10a": "Beruria",
};
const catalogue = fs.readdirSync(path.join(CORPUS, "annotations")).filter((f) => f.endsWith(".json")).map((f) => {
  const a = JSON.parse(fs.readFileSync(path.join(CORPUS, "annotations", f), "utf8"));
  const [lo, hi] = a.sougya.segments;
  return {
    slug: a.slug, ref: a.ref, titre: a.titre, court: COURT[a.slug] ?? a.titre, parcours: a.parcours, duree_min: a.duree_min,
    segments: hi - lo + 1, type: a.et_alors.type, personnages: a.personnages, outils: a.outils,
    disponible: SLUGS.includes(a.slug), cas: a.cas.transpose, idee_cle: a.idee_cle ?? null, ce_texte: a.ce_texte ?? null,
    vigilance: a.vigilance ?? null,
  };
});
fs.writeFileSync(path.join(OUT, "catalogue.json"), JSON.stringify(catalogue, null, 1));
console.log(`catalogue: ${catalogue.length} sougyot, ${catalogue.filter((c) => c.disponible).length} disponible(s)`);
