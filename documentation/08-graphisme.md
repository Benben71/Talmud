# Univers graphique — sobre, inspiré de la page de Talmud

## Ce qu'on prend à la page de Vilna (1880), et ce qu'on laisse
| La page imprimée | Ce qu'on en garde dans l'app | Ce qu'on laisse |
|---|---|---|
| Papier ivoire, encre noire, rien d'autre | Fond papier chaud, encre brune-noire, **une seule couleur d'accent** : le rouge de rubrique (comme les lettrines des manuscrits) pour les rôles et les actions | Les couleurs par rôle (trop « app »), les ombres, les coins arrondis |
| Texte central en gros caractères carrés ; Rachi et Tossafot en marge, plus petits et plus denses | Sur grand écran : **trois colonnes** toujours visibles — Rachi à gauche, le texte au centre, Tossafot à droite — séparées par des filets fins. Sur téléphone : une colonne et les boutons de couche | Le texte qui épouse les blocs (impossible et illisible sur écran) |
| Titre courant : nom du traité, chapitre, numéro de feuillet en lettres hébraïques | **Titre courant** en haut de chaque écran : traité en hébreu et en français, chapitre, daf (« ב׳ א »), sous un double filet | — |
| « מתני׳ » et « גמ׳ » en gras au début des blocs | La **marque hébraïque** du bloc (מתני׳ / גמ׳) en tête de segment, à la place d'un badge | — |
| Hairlines, pas de cadres épais | Filets de 1 px (ou 0,5 px sur écran dense) pour tout ce qui sépare : colonnes, encadrés, boutons | Les cartes blanches sur fond gris |
| Rien n'est centré, tout est justifié dans des rectangles | Alignement à gauche (français) et à droite (hébreu), blocs rectangulaires, petites capitales pour les étiquettes | Les titres centrés, les emojis |
| Chaque page a la même structure, on s'y retrouve les yeux fermés | Même grille sur tous les écrans : titre courant, corps, barre basse | — |

Référence éditoriale : l'édition Steinsaltz/Koren garde cette page et met à côté une page de traduction où le texte littéral est en **gras** et l'explication en romain. On reprend exactement cette convention pour la profondeur « Texte ».

## Tokens
| Token | Valeur | Usage |
|---|---|---|
| `--paper` | `#f4eee1` | fond |
| `--paper-2` | `#ebe3d1` | marges, blocs secondaires |
| `--ink` | `#1b1711` | texte, filets forts |
| `--ink-2` | `#4b433a` | explications interpolées, texte secondaire |
| `--rule` | `#b8ab95` | filets fins |
| `--rubric` | `#8a2e23` | rôles, actions, le mot courant |
| `--rubric-soft` | `#e9d3cc` | fond de sélection |
| `--indigo` | `#3f4e6b` | deuxième encre : l'eau de la carte, l'original |
| `--desk` | `#2b241c` | la table sous la feuille |
| Latin | **EB Garamond** (Google Fonts), 18 px / 1,55 pour le texte ; petites capitales espacées pour les étiquettes | — |
| Hébreu | **Frank Ruhl Libre** (dérivé du Frank-Rühl, la face de livre hébraïque classique), 26 px / 2 | — |
| Interface | la même garamond ; pas de sans-serif sauf les champs de saisie | — |

## Deuxième passe : la matière
La première passe était une mise en style ; la page restait vide, alors qu'un daf est *plein*. Ce qu'on a ajouté :
- **La feuille** : l'app est une page posée sur une table sombre — grain, vignette, double filet de bord, ombre portée. L'écran devient un objet.
- **Le cha'ar** : le portail architectural des pages de titre (Venise 1520, Vilna 1880) — deux colonnes cannelées, chapiteaux, arc à claveaux, clé de voûte, rosaces — gravé au trait en SVG, autour du bloc central de l'accueil. Le mot מַחְלוֹקֶת est dans la porte.
- **Le texte réel comme matière** : les marges de l'accueil portent le vrai commentaire hébreu de Steinsaltz (segments de Bava Metzia 2a), en petit corps justifié, atténué, sous les rubriques « רש״י · שטיינזלץ » et « תוספות · שטיינזלץ » ; derrière le mot, la Mishna en filigrane. La page est dense parce que le texte y est.
- **La carte marine** : cadre gravé, cartouche (« la mer du Talmud · יָם הַתַּלְמוּד »), rose des vents à huit pointes portant le ב, lignes de rhumb, deux trames de vagues, lignes de sonde, **côtes hachurées** comme sur les cartes du XVIe siècle, nom hébreu de chaque archipel (שלי שלך, אלו ואלו, ואהבת לרעך, דור לדור). L'eau est tracée en **indigo**, deuxième encre, réservée à l'original et à la mer.
- **Fleurons** gravés entre les filets ; bouton principal avec un rappel de rubrique en relief.

## La page d'accueil : un daf dont le texte est la mer
La page d'accueil a la forme d'une page de Talmud, et chaque bloc est une porte. Première version : la mer était en bas, comme un cul-de-lampe — fidèle à la page, mais la navigation principale n'apparaissait qu'après avoir fait défiler tout l'écran. Deuxième version (5 nov. 2026) : **le « texte » au centre du daf, c'est la mer** ; elle est visible sans défiler.
- **en haut, la bande de commentaire** : le mot **מַחְלוֹקֶת** et la promesse (« Entre dans le plus grand débat de l'histoire ») à gauche, deux lignes sur *c'est quoi, le Talmud* et *comment on apprend ici* à droite, sous un double filet ;
- **au centre, la mer du Talmud** (*yam ha-Talmud*) : chaque sougya est une **île dessinée à la plume** avec ses lignes de sonde et ses côtes hachurées, les parcours sont des archipels ; une île en trait plein est ouverte, en pointillé elle arrive ; pas de chemin obligé. Une rose des vents porte le **ב** : « on commence toujours au daf 2 ». Sous la mer : *reprendre* ou *commencer*, et le cas de la première sougya ;
- **marge intérieure** : les parcours, avec leurs sougyot (ouvertes ou « bientôt »), puis le vrai commentaire hébreu de Steinsaltz en texture ;
- **marge extérieure** : les voix (personnages), la boîte à outils, et la texture « Tossafot ».
- Le portail gravé (*cha'ar*) ne sert plus sur l'accueil ; le composant reste disponible pour une page de titre ou l'ouverture d'un parcours.
- Titre courant de l'accueil : la devise d'Avot 2:16, **לֹא עָלֶיךָ הַמְּלָאכָה לִגְמֹר** (« ce n'est pas à toi d'achever l'ouvrage »).

## « Ta page » imprimée
À la fin, le commentaire de l'ado est **mis en page comme un commentaire de plus** : le texte au centre (un segment par ligne), ses anticipations dans la marge de gauche, ses kouchiot et teikou dans la marge de droite, en regard du segment où il les a posés, sous le même titre courant. C'est la quatrième couche, rendue visible.

## Règles
1. **Une couleur d'accent, et elle a un sens** : le rouge dit « ici, un coup du débat » ou « ici, tu agis ». Jamais décoratif.
2. **Les rôles se distinguent par le mot et le signe** (? ↳ ✗ ≡ ⋔ ★), pas par la couleur.
3. **L'original est toujours là**, sous le texte, en hébreu vocalisé, jamais présenté comme « difficile ».
4. **Pas de gamification visuelle** : pas de confettis, pas de barres de progression colorées ; la progression est le filet qui se remplit, en encre.
5. **Le papier respire** : marges larges, lignes de 60-70 caractères au centre, 40 en marge.
