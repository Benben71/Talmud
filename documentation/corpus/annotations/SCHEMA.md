# Format des annotations de sougya

Un fichier par passage : `annotations/<slug>.json`, aligné sur `corpus/<slug>.json` par l'index de segment `i`. Les annotations sont une couche **éditoriale** séparée du texte source (CC BY-NC, Steinsaltz/Sefaria) — elles peuvent être modifiées librement.

Statut : **pré-annotation par Claude (5 nov. 2026), corrigée d'après [RAPPORT-VERIFICATION.md](RAPPORT-VERIFICATION.md) (relecture indépendante), à valider par un enseignant.** Les champs sont en français ; les résumés sont des reformulations, pas des traductions.

Règle de rédaction (issue de la relecture) : quand un résumé ou un encadré reprend une **explication interpolée de Steinsaltz** et non le texte lui-même, le dire (« Steinsaltz explique… »). Les encadrés OUTIL ne doivent jamais faire dire au Talmud ce qu'il ne dit pas. Les renvois entre sougyot s'écrivent « on le retrouve en… », jamais « déjà rencontré en… » (l'ordre de lecture n'est pas garanti).

```jsonc
{
  "slug": "bava-metzia-2a",
  "ref": "Bava_Metzia.2a",                 // référence Sefaria du passage téléchargé
  "titre": "Deux personnes tiennent un talit",
  "parcours": ["a-qui-cest"],              // voir 06-conception §1.4
  "duree_min": 15,
  "sougya": {                              // la partie du passage qui forme l'unité d'étude
    "segments": [0, 11],                   // bornes incluses
    "actes": [ { "titre": "…", "segments": [0, 3] } ],   // sous-parties optionnelles
    "note": "…"                            // pourquoi ces bornes, ce qu'on laisse de côté
  },
  "cas": {
    "transpose": "…",                      // la situation dans le monde de l'ado (temps 1)
    "epoque": "…"                          // la même, telle que le texte la pose
  },
  "premiere_idee": "…",                    // la consigne du temps 2
  "segments": [
    {
      "i": 0,
      "dans_sougya": true,
      "role": "MISHNA",                    // voir la liste ci-dessous
      "voix": "la Mishna",                 // qui parle
      "repond_a": null,                    // index du segment auquel celui-ci répond (→ carte du débat) ; un entier, une liste [5, 6] si la réponse vaut pour plusieurs coups, ou null (ouverture, ou simple suite d'un texte — la Mishna qui continue n'est pas une « réponse »)
      "resume_fr": "…",                    // une phrase, pour la carte du débat et la profondeur « Histoire »
      "encadres": [ { "type": "MOT", "titre": "…", "texte": "…" } ],
      "decoupage_suggere": ["…"]           // optionnel : si un segment Sefaria contient plusieurs coups
    }
  ],
  "et_alors": {
    "type": "HALAKHA",                     // HALAKHA | TEIKOU | OUVERTURE | RECIT
    "principe": "…",                       // ce qu'on retient, en une ou deux phrases
    "avis_ecarte": "…",                    // la voix non suivie, nommée (ou null)
    "halakha": "…"                         // la décision pratique, si elle existe
  },
  "outils": ["DIYOUK"],                    // coups rencontrés pour la première fois → boîte à outils
  "personnages": ["Rav Pappa"],            // fiches à débloquer
  "questions_hevrouta": [ { "amorce": "…", "piste": "…" } ],   // amorces pour Claude + ce vers quoi guider
  "liens": [ { "ref": "Shevuot.…", "pourquoi": "…" } ],       // îles voisines sur la carte
  "vigilance": "…"                         // optionnel : point délicat pour un public ado
}
```

## Dispositifs repris du carnet « Ouvrir le Talmud » (Ayeka)
```jsonc
{
  "ce_texte": "…",          // 2-3 lignes : quel livre, quel ordre, quelle langue, qui parle, quand, où — affiché en tête de la sougya
  "idee_cle": "…",          // une phrase à retenir — affichée en tête de « Et alors ? » et sur l'île
  "plus_tard": [            // commentaires postérieurs, toujours nommés et datés
    { "qui": "Rachi", "quand": "Troyes, 1040-1105", "texte": "…", "source": "…" }
  ],
  "a_toi": [                // une question à écrire, après un segment donné
    { "apres_segment": 7, "question": "…" }
  ]
}
```

## Rôles (`role`)
| Rôle | Sens | Couleur suggérée sur la carte |
|---|---|---|
| `MISHNA` | Texte de la Mishna (ou baraïta citée comme base) | — |
| `RECIT` | Narration (aggada) : « il arriva que… » | — |
| `ENSEIGNEMENT` | Dictum autonome : « Rabbi X dit : … », souvent avec un verset | — |
| `QUESTION` | Kouchia : objection-question ouvrant un coup (« pourquoi… ? ») | ? |
| `REPONSE` | Terouts : réponse à une question | ↳ |
| `OBJECTION` | Réfutation ou contre-exemple apporté contre ce qui précède | ✗ |
| `PREUVE` | Ta chma : apport d'une source (verset, mishna, baraïta, fait) | ≡ |
| `DISTINCTION` | Chani / tsrikha : « ici c'est différent », résolution par distinction de cas | ⋔ |
| `CONCLUSION` | Clôture : décision, principe, « conclue de là que… » | ★ |
| `TEIKOU` | Question laissée ouverte | ∞ |

Un segment Sefaria contient parfois plusieurs coups (ex. question + réponse dans la même phrase) : on garde le rôle **dominant** et on indique le reste dans `resume_fr` ou `decoupage_suggere`.

## Types d'encadrés (`encadres[].type`)
`PERSONNAGE` · `MOT` · `CONTEXTE` · `HALAKHA` · `OUTIL`

## Outils (`outils`)
`DIYOUK` (chaque mot compte) · `KAL_VAHOMER` (a fortiori) · `TSRIKHA` (pourquoi les deux cas) · `CHANI` (distinction) · `TA_CHMA` (preuve par la source) · `ROV` (la majorité) · `SEYAG` (une haie autour de la loi) · `MAHLOKET` (le désaccord conservé) · `DERACHA` (lecture interprétative d'un verset) · `LECTURE_PLURIEL` (variante de DIYOUK sur un pluriel/singulier) · `CAS_LIMITE` (un cas bizarre qui isole une question) · `TEIKOU` (laisser une question debout) · `GUZMA` (reconnaître une exagération) · `FIN_DU_VERSET` (lire jusqu'au bout du verset)
