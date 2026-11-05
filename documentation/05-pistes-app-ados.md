# Pistes de conception : une app d'initiation au Talmud pour ados, avec Claude

## Public et promesse
- **12–17 ans**, francophones, du débutant complet à l'élève d'école juive qui veut « débloquer » la Guemara.
- Promesse : *« Entre dans le plus grand débat de l'histoire. »* — le Talmud comme un **forum d'arguments** vieux de 1 500 ans, où l'on a le droit (et le devoir) de poser des questions.
- Fil rouge : la méthode Steinsaltz → **texte original + traduction interpolée + encadrés** (personnage, contexte, mot, halakha).

## Fonctionnalités imaginées
| Fonction | Description | Données |
|---|---|---|
| **Lecture « Steinsaltz »** | Segment par segment : araméen vocalisé ↔ traduction FR (adaptée par Claude depuis l'anglais Steinsaltz). Toucher un mot → popup glossaire. | `corpus/*.json`, API `/api/words` |
| **Hevrouta avec Claude** | Claude joue un binôme d'étude : pose des questions, défend l'avis opposé, ne donne pas la réponse tout de suite (méthode socratique). Contexte = le passage en cours. | API Claude + passage |
| **Mahloket arena** | Deux avis (Hillel / Chammaï, Ben Petoura / Rabbi Akiva) : l'ado choisit un camp, argumente, Claude défend l'autre. | passages 3, 7, 8 |
| **Cartes personnages** | Collection à débloquer (Hillel, Rabbi Akiva, Honi, Beruria…). | fiches rédigées |
| **Défi du jour** | Le daf yomi du jour en 3 phrases + une question. | `/api/calendars` |
| **Parcours / progression** | Niveaux : « Premiers pas » (bases) → « Histoires » (aggada) → « Raisonnements » (halakha). Badges, séries de jours. | — |
| **Mode prof** | Un enseignant crée une classe, choisit les passages, voit la progression. | v2 |

## Comment utiliser Claude dans l'app
- **Système prompt « hevrouta »** : bienveillant, curieux, niveau collège-lycée, respecte la tradition, cite toujours la source (réf. + segment), dit « je ne sais pas / teikou » plutôt que d'inventer.
- **Ancrage (grounding)** : toujours passer le texte du passage (anglais + hébreu Steinsaltz) dans le prompt ; interdire les citations non présentes dans le texte fourni.
- **Pré-génération** des traductions FR et des fiches (une fois, relues par un humain) plutôt qu'à la volée → coûts maîtrisés, qualité vérifiée.
- **Questions halakhiques pratiques** (« est-ce que j'ai le droit de… ») → renvoyer vers un rav / un adulte de référence ; l'app enseigne, elle ne tranche pas.

## Points de vigilance
1. **Licence CC BY-NC** : app **gratuite et non commerciale** (ou accord avec Koren). Attribution visible. Mentionner que la traduction FR est une adaptation.
2. **Mineurs et Claude** : les conditions d'Anthropic encadrent l'usage par des mineurs (claude.ai est réservé aux 18+ ; une app tierce via l'API destinée aux mineurs doit mettre en place des garde-fous spécifiques). → **À vérifier dans la Usage Policy d'Anthropic en vigueur** avant lancement ; prévoir modération, pas de données personnelles inutiles, consentement parental selon le RGPD (en France : 15 ans).
3. **Sensibilité religieuse** : faire relire le contenu par un enseignant / rav ; respecter la diversité des publics (écoles juives, familles laïques, curieux non juifs).
4. **Passages délicats** : certains textes du Talmud demandent un contexte d'adulte → sélection éditoriale du corpus, pas d'accès libre à tout le Talmud en v1.
5. **Exactitude** : les fiches générées par IA doivent être relues ; afficher la source de chaque affirmation.

## Apps / ressources existantes (benchmark)
- **Sefaria** (web/app) — bibliothèque complète, pas pensée pour ados.
- **Gemara Tutor** (iOS) — jeu de vocabulaire/concepts araméens.
- **Gemara Academy** — méthode visuelle (schémas, animations, quiz) pour élèves.
- **Lahav** (Shalhevet High School, 2015) — app de curriculum avec dictionnaire Jastrow intégré.
→ Créneau libre : **francophone + ados + IA conversationnelle + méthode Steinsaltz**.

## Proposition de stack pour un premier prototype
- **Web app (PWA)** installable sur mobile : Next.js ou Vite + React, Tailwind.
- Contenu : JSON statique du corpus (déjà dans `corpus/`) + traductions FR pré-générées.
- Backend léger (route API) qui appelle l'API Claude pour la hevrouta (la clé ne doit jamais être côté client).
- V1 = 3 à 5 passages, hevrouta, glossaire, cartes personnages.

## Sources
- [Gemara Tutor (App Store)](https://apps.apple.com/us/app/id1148149489)
- [Shalhevet — app de curriculum Talmud](https://shalhevetboilingpoint.com/torah/2015/06/21/new-app-for-talmud-curriculum-gets-a-tryout-by-sophomores/)
- [Sefaria](https://www.sefaria.org)
