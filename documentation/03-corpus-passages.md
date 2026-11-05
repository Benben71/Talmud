# Corpus de démarrage : 9 passages « coup de cœur » pour ados

Téléchargés depuis l'API Sefaria le 5 nov. 2026 dans [`corpus/`](corpus/). Chaque fichier JSON contient, **aligné segment par segment** :
- `aramaic_vocalized` — texte original vocalisé (Steinsaltz)
- `english_steinsaltz` — traduction anglaise interpolée (Steinsaltz)
- `steinsaltz_hebrew_commentary` — explication en hébreu moderne (Steinsaltz)
- `ref`, `heRef`, `url`, `theme_fr`, `source` (attribution CC BY-NC)

Choix éditorial : des histoires et des débats courts, avec un **dilemme** ou une **valeur** qui parle à un ado de 12-17 ans, et une porte d'entrée vers les grands personnages.

| # | Fichier | Réf. | Le passage en une phrase | Question pour lancer le débat | Segment(s) clé(s) |
|---|---|---|---|---|---|
| 1 | `berakhot-2a.json` | Berakhot 2a | Le Talmud commence par une question pratique : à partir de quand récite-t-on le Chema le soir ? Trois avis (Rabbi Eliézer, les Sages, Rabban Gamliel). | Pourquoi commencer un livre géant par une question d'horaire ? | 1–2 |
| 2 | `shabbat-31a.json` | Shabbat 31a | Un non-juif veut apprendre « toute la Torah sur un pied ». Chammaï le chasse ; Hillel répond : « Ce qui t'est détestable, ne le fais pas à autrui… le reste est commentaire, va étudier. » | Patience ou exigence : quel prof voudrais-tu avoir ? | 5 (+ 3 autres récits de conversions autour) |
| 3 | `eruvin-13b.json` | Eruvin 13b | Trois ans de dispute entre Beit Chammaï et Beit Hillel ; une voix céleste : « Les uns et les autres sont paroles du Dieu vivant », mais la loi suit Hillel car ils étaient humbles et citaient l'avis adverse en premier. | Peut-on avoir raison *et* respecter celui qui pense le contraire ? | 9–10 |
| 4 | `taanit-7a.json` | Taanit 7a | Rabbi Hanina : « J'ai beaucoup appris de mes maîtres, plus de mes amis, et plus que tout de mes élèves. » | Qu'as-tu déjà appris de quelqu'un de plus jeune que toi ? | 11 |
| 5 | `taanit-23a.json` | Taanit 23a | Honi voit un homme planter un caroubier qui donnera dans 70 ans ; il s'endort 70 ans… puis « ou la compagnie, ou la mort ». | Pour qui plantes-tu tes « caroubiers » ? | 14–15 (+ Honi et la pluie avant) |
| 6 | `bava-metzia-2a.json` | Bava Metzia 2a | Deux personnes tiennent un même talit, chacune dit « je l'ai trouvé, il est à moi ». Solution : serment et partage. | Est-ce juste de couper la poire en deux ? | 0 |
| 7 | `bava-metzia-59b.json` | Bava Metzia 59b | Le four d'Akhnaï : Rabbi Eliézer fait parler un caroubier, un ruisseau, les murs, une voix céleste… Rabbi Yehochoua : « La Torah n'est pas dans le ciel. » Dieu sourit : « Mes enfants m'ont vaincu. » | La majorité a-t-elle toujours raison ? Et le prix payé par Rabbi Eliézer ? | 4 et suivants |
| 8 | `bava-metzia-62a.json` | Bava Metzia 62a | Deux voyageurs dans le désert, une seule gourde. Ben Petoura : partager (et mourir tous les deux). Rabbi Akiva : « Ta vie passe avant. » | Que ferais-tu ? (dilemme moral pur) | 1 |
| 9 | `sanhedrin-37a.json` | Sanhedrin 37a | L'humanité a commencé par un seul humain pour enseigner que qui détruit une vie détruit un monde, qui sauve une vie sauve un monde entier ; et que personne ne peut dire « mon ancêtre est plus grand que le tien ». | Pourquoi chaque personne vaut-elle « un monde » ? | 12-14 (+ 37b seg. 0) |
| + | `shabbat-30b.json` | Shabbat 30b | Prologue de la sougya 2 : « que l'homme soit toujours patient comme Hillel et non irascible comme Chammaï ». | — | 11 |
| + | `sanhedrin-37b.json` | Sanhedrin 37b | Fin de la Mishna de la sougya 9 : « et pourtant, celui qui sait doit témoigner » (Lévitique 5:1). | — | 0 |
| 10 | `pesachim-10b.json` | Pesachim 10b | Rava : une souris entre avec un pain, une souris sort avec un pain — la même ? Souris blanche, souris noire, belette, serpent… et deux **teikou**. | À quoi sert un cas bizarre ? | 3-11 (annoté, traduit, **ouvert dans l'app**) |
| 11 | `chullin-90b.json` | Chullin 90b | Rava : « trois cents kor de cendres », c'est une exagération. Rabbi Ami : la Torah, les prophètes et les sages exagèrent parfois. Chmouel : trois cents prêtres, trois fois. | Un texte sacré a-t-il le droit d'exagérer ? | 8-14 (annoté, traduit, **ouvert dans l'app**) |
| 12 | `berakhot-10a.json` | Berakhot 10a | Beruria à Rabbi Meïr : il est écrit « les péchés », pas « les pécheurs » — va jusqu'au bout du verset. Et la même méthode contre un moqueur. | Que peut-on souhaiter à qui nous fait du mal ? | 1-6 (annoté, traduit, **ouvert dans l'app**) |
| + | `rosh-hashanah-27b.json` · `sanhedrin-56a.json` · `bava-kamma-113a.json` | — | Chapitres 7 et 11 du carnet Ayeka : le chofar et l'écho, les lois de Noé, la loi du royaume. | — | téléchargés, non annotés |
| + | `makkot-7a.json` | Makkot 7a | Quatre voix sur la peine de mort (une fois en 7 ans / 70 ans / jamais / « vous multiplieriez les meurtriers ») ; la Guemara laisse une question en **teikou**. | Faut-il une justice qui ne punit presque jamais ? | 2, 8 |

## Annotations éditoriales (`corpus/annotations/`)
Chaque passage a son fichier `annotations/<slug>.json`, aligné sur les segments Sefaria : rôle de chaque segment dans le débat (QUESTION, REPONSE, OBJECTION, PREUVE…), voix, `repond_a` (pour dessiner la carte du débat), résumé français, encadrés (PERSONNAGE, MOT, CONTEXTE, HALAKHA, OUTIL), bornes de la sougya, cas transposé, « et alors ? », amorces de hevrouta, liens. Format décrit dans [`annotations/SCHEMA.md`](corpus/annotations/SCHEMA.md). Contrôle : `python3 -I documentation/corpus/validate.py`.

**Statut : pré-annotation par Claude, vérifiée par une relecture indépendante ([RAPPORT-VERIFICATION.md](corpus/annotations/RAPPORT-VERIFICATION.md)) dont toutes les corrections sont reportées ; reste à valider par un enseignant** — voir [POINTS-A-TRANCHER.md](corpus/annotations/POINTS-A-TRANCHER.md) pour les choix éditoriaux ouverts et les points invérifiables.

Constat après annotation : 3 passages sont de vrais débats (BM 2a, Berakhot 2a, BM 59b), 3 sont des récits (Chabbat 31a, Taanit 23a, BM 62a), 3 sont des chaînes d'enseignements (Erouvin 13b, Taanit 7a, Sanhedrin 37a). Pour l'exercice « reconstruis le fil », commencer par BM 2a.

Passages complémentaires téléchargés (non annotés) : `shabbat-30b.json` (prologue « que l'homme soit toujours patient comme Hillel », seg. 11 — doit ouvrir la sougya de Chabbat 31a), `sanhedrin-37b.json` (fin de la Mishna : « il faut témoigner », seg. 0 — doit clore Sanhedrin 37a), `makkot-7a.json` (quatre voix sur la peine de mort et un **teikou** de la Guemara, seg. 2 et 8 — candidat pour la sougya « teikou »). À compléter : **BM 58b-59a** (le four lui-même), **Taanit 23b** (Abba Hilkiya).

## Fichiers annexes
- `corpus/_index.json` — liste des passages (slug, ref, thème, nb de segments)
- `corpus/_sample_calendars.json` — exemple de réponse `/api/calendars` (Daf Yomi, paracha…)
- `corpus/_sample_index_berakhot.json` — exemple de structure d'un traité

## Pistes pour étendre le corpus
- **Personnages** : Rabbi Akiva (Berakhot 61b ; Ketoubot 62b-63a ; Menahot 29b — Moïse dans la classe de Rabbi Akiva), Rabbi Yohanan ben Zakkaï (Guittin 56a-b), Beruria (Berakhot 10a).
- **Raisonnement** : kal va-homer, *teikou* (question sans réponse), structure question/réponse (*kouchia*/*terouts*).
- **Vie concrète** : objets trouvés (Bava Metzia ch. 2), dommages (Bava Kamma 2a — le bœuf, la fosse, le feu), respect des parents (Kiddouchin 31a).
