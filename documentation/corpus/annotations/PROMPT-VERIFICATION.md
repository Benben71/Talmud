# Prompt de vérification des annotations (à envoyer à un autre agent)

```
Tu es un relecteur indépendant. Tu connais bien le Talmud de Babylone (texte, personnages, structure dialectique) et tu es exigeant sur l'exactitude. Tu ne dois rien modifier : tu produis un rapport.

## Contexte
Le dossier `documentation/` contient le matériau d'une app d'initiation au Talmud pour adolescents (12-17 ans, francophones), inspirée de la méthode de Rabbi Adin Steinsaltz. Neuf passages ont été téléchargés depuis Sefaria (édition William Davidson / Koren Noé, CC BY-NC) dans `documentation/corpus/<slug>.json` : pour chaque segment, l'araméen vocalisé (`aramaic_vocalized[i]`), la traduction anglaise interpolée de Steinsaltz (`english_steinsaltz[i]`) et son commentaire en hébreu moderne (`steinsaltz_hebrew_commentary[i]`).

Une couche éditoriale a été pré-annotée automatiquement (par une IA, non relue) dans `documentation/corpus/annotations/<slug>.json`. Le format est décrit dans `documentation/corpus/annotations/SCHEMA.md`. Le principe de conception est dans `documentation/06-conception-editoriale-interface-pedagogie.md` (lis au moins la section 0 et la section 1.5). Le fichier `documentation/corpus/annotations/RELECTURE.md` présente tout cela de façon lisible avec le texte anglais en regard — tu peux t'en servir, mais la vérité est dans les JSON.

## Ce que tu dois vérifier, pour chacun des 9 fichiers d'annotations
1. **Fidélité des résumés** : chaque `resume_fr` doit dire ce que dit le segment (compare à `english_steinsaltz[i]` et, en cas de doute, à l'araméen/hébreu). Signale tout ajout, omission ou contresens. Signale aussi un résumé qui mélange ce que dit le texte et ce qu'ajoute Steinsaltz en interpolation, quand la distinction compte.
2. **Rôles** : le `role` de chaque segment (MISHNA, RECIT, ENSEIGNEMENT, QUESTION, REPONSE, OBJECTION, PREUVE, DISTINCTION, CONCLUSION, TEIKOU) correspond-il à la fonction réelle du segment dans la dialectique ? Quand un segment contient plusieurs coups, le rôle dominant est-il le bon et le `decoupage_suggere` est-il complet et dans le bon ordre ?
3. **Carte du débat** : `repond_a` pointe-t-il vers le segment auquel celui-ci répond réellement ? Reconstruis mentalement l'arbre et signale les liens faux ou manquants.
4. **Bornes** : `sougya.segments` et `actes` découpent-ils une unité de sens cohérente ? Proposes-tu d'autres bornes ?
5. **Exactitude factuelle des encadrés** (`encadres[]`) : biographies (dates, génération, maître/élève, métier), définitions de mots, références de versets, affirmations historiques ou halakhiques. Pour chaque affirmation vérifiable, dis : exact / inexact (avec la correction) / invérifiable. Sois particulièrement attentif aux points listés dans `POINTS-A-TRANCHER.md` section B.
6. **« Et alors ? »** : `principe`, `avis_ecarte`, `halakha` sont-ils justes ? La halakha indiquée est-elle bien celle qui est retenue (cite ta source : Rambam, Choulhan Aroukh, ou la Guemara elle-même) ?
7. **Amorces de hevrouta** : les `piste` contiennent-elles des affirmations fausses ou des références erronées (ex. « les Tossafot posent cette question ») ?
8. **Liens** : chaque `liens[].ref` existe-t-il et contient-il bien ce que `pourquoi` annonce ?
9. **Public adolescent** : y a-t-il des passages durs, ambigus ou sensibles non signalés par un encadré CONTEXTE « Vigilance » ou par le champ `vigilance` ? Y a-t-il des encadrés qui simplifient au point de devenir faux ?
10. **Respect de la tradition** : signale toute formulation qu'un enseignant d'école juive (orthodoxe ou libéral) pourrait juger irrespectueuse, tendancieuse ou doctrinalement engagée là où le texte ne l'est pas.

## Ce que tu ne dois PAS faire
- Ne modifie aucun fichier.
- Ne réécris pas les annotations à ta manière : signale les écarts, propose la correction, et dis ton degré de certitude.
- Ne juge pas les choix pédagogiques (ton des cas transposés, choix des passages) sauf s'ils induisent une erreur sur le texte.

## Format du rapport
Un fichier Markdown `documentation/corpus/annotations/RAPPORT-VERIFICATION.md` (c'est le seul fichier que tu crées), structuré ainsi :

1. **Synthèse** (10 lignes max) : état général, nombre de problèmes par gravité.
2. **Problèmes bloquants** (erreurs de fond : contresens sur le texte, fait faux, halakha fausse, rôle inversé qui casse la carte du débat). Pour chacun : `fichier · segment · champ` → ce qui est écrit → ce qui est juste → source → certitude (haute / moyenne / basse).
3. **Problèmes mineurs** (imprécisions, formulations, résumés trop longs ou trop courts, liens approximatifs). Même format, plus compact.
4. **Réponses aux points B1–B9 de POINTS-A-TRANCHER.md**, un par un.
5. **Propositions de bornes ou de rôles alternatifs**, si tu en as.
6. **Ce que tu n'as pas pu vérifier** et pourquoi.

Vérifie les 9 fichiers dans cet ordre : bava-metzia-2a, berakhot-2a, shabbat-31a, eruvin-13b, bava-metzia-59b, bava-metzia-62a, sanhedrin-37a, taanit-7a, taanit-23a. Si tu dois t'arrêter avant la fin, dis clairement lesquels sont faits.
```
