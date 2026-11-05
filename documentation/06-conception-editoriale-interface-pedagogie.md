# Conception : structure éditoriale, interface, mode d'apprentissage

> Principe directeur : **l'app ne transmet pas un contenu, elle fait pratiquer une manière de penser.** Un ado qui sort de l'app doit savoir *faire du Talmud* (questionner, distinguer, prouver, suspendre) sur trois sougyot, plutôt que *connaître* trente faits sur le Talmud. L'univers graphique viendra après ; ici on fixe la grammaire.

---

## 0. Ce qui caractérise la pensée talmudique → ce que ça impose au design

| Trait de la pensée talmudique | Ce que ça veut dire | Conséquence de design (non négociable) |
|---|---|---|
| **La question prime sur la réponse** (*kouchia* avant *terouts*) | Une sougya s'ouvre presque toujours par une question ; une bonne question vaut une réponse. | On ne montre jamais une réponse avant que l'ado ait formulé une question ou une hypothèse. La progression mesure la **qualité des questions**, pas le nombre de bonnes réponses. |
| **La mahloket est conservée** (*élou va-élou*) | Les avis minoritaires sont gardés, nommés, respectés. La loi tranche, le texte ne supprime pas. | L'interface affiche **toujours au moins deux voix**. Pas de bouton « la bonne réponse ». Quand la halakha tranche, l'avis écarté reste visible, avec son nom. |
| **Dialectique par coups** (question / réponse / objection / preuve / distinction / conclusion / *teikou*) | Une sougya est une partie d'échecs dont chaque coup a un nom et une fonction. | Chaque segment est **étiqueté par son rôle**. Le lecteur voit la *structure* du raisonnement, pas seulement son contenu. Les mêmes coups deviennent les **actions** de l'ado dans le dialogue. |
| **La page est une conversation entre siècles** (Mishna → Guemara → Rachi → Tossafot → …) | Le texte central est entouré de couches de commentaires, chacune répondant à la précédente. | La page de l'app est **en couches** : centre, explication, questions, et une **quatrième couche : la sienne**. Les notes de l'ado sont un commentaire comme les autres. |
| **Hevrouta** | On n'étudie pas seul ni en silence : on lit à deux, à voix haute, on se contredit. | Le mode principal n'est pas la lecture mais le **dialogue**. Claude est un binôme, pas un prof. |
| **Du cas concret au principe** | « Deux personnes tiennent un talit » avant « qu'est-ce que la possession ? ». | Chaque sougya commence par **une situation**, formulée dans le monde de l'ado, avant tout vocabulaire. |
| **Chaque mot compte** (*diyouk*) | « Pourquoi la Mishna dit-elle *deux fois* "celui-ci dit" ? » | Le texte original est toujours visible ; le mot est **tactile** (tap = lexique, étymologie, autres occurrences). On apprend à lire lentement. |
| **Prouver par les sources** (*ta chma*) | On n'affirme pas, on apporte un verset, une Mishna, une baraïta. | Chaque affirmation de l'app ou de Claude est **sourcée** (réf. + segment). L'ado gagne à citer. |
| **Ce n'est jamais fini** (le traité commence au daf 2 ; *lo alekha hamelakha ligmor*) | Le *teikou* est une fin légitime ; on revient, on relit, on digresse. | Pas de « niveau terminé ». La navigation n'est pas linéaire. **Suspendre** une question est une action valorisée. |
| **Humilité argumentative** (Beit Hillel cite l'avis adverse en premier) | Savoir reformuler l'autre avant de répondre. | Exercice-clé récurrent : **« Reformule l'avis que tu ne partages pas »** avant d'argumenter. |

---

## 1. Structure éditoriale

### 1.1 L'unité de base : la sougya, pas le daf
Le daf (feuillet) est une unité d'imprimeur ; la **sougya** (une discussion complète, 5 à 20 segments) est l'unité de sens. Toute l'app est faite de sougyot. Chaque sougya est découpée dans les données en segments (ceux de Sefaria, déjà alignés araméen / anglais / hébreu dans `corpus/`).

### 1.2 Anatomie d'une sougya dans l'app (6 temps)
Toujours la même séquence, pour que la forme elle-même enseigne la méthode :

| Temps | Nom pour l'ado | Ce qu'on y fait | Exemple (Bava Metzia 2a) |
|---|---|---|---|
| 1 | **Le cas** | Une situation concrète, 2-3 phrases, dans son monde. Pas de vocabulaire. | « Deux élèves ramassent en même temps un téléphone tombé dans la cour. Chacun dit : je l'ai trouvé, il est à moi. Toi, tu es le juge. » |
| 2 | **Ta première idée** | L'ado propose une solution ou une question *avant* de lire. Enregistrée (elle resservira). | « Je le donne à… / Je demande d'abord… » |
| 3 | **Les voix** | La Mishna + les positions, nommées, chacune avec sa raison. Lecture interpolée segment par segment. | Mishna : chacun jure n'avoir pas moins de la moitié, et on partage. |
| 4 | **Le débat** | La Guemara, coup par coup, avec les rôles étiquetés. L'ado anticipe le coup suivant. | « Pourquoi la Mishna dit-elle deux fois "celui-ci dit" ? » → Réponse → Objection (Rabbenaï, Deut. 22:3) → Réponse → … → Rav Pappa : deux cas différents. |
| 5 | **Et alors ?** | La conclusion : halakha tranchée, **ou** *teikou*, **ou** « la question ouvre sur… ». Et le *principe* extrait du cas. | Principe : voir n'est pas posséder ; le serment sert quand on ne peut rien prouver. |
| 6 | **Ma page** | L'ado écrit son commentaire (question restante, désaccord, lien avec sa vie). Il relit sa « première idée ». | « Moi j'aurais tiré au sort. Est-ce que le Talmud en parle ? » (→ oui, ailleurs : porte vers une autre sougya) |

Les temps 3 et 4 sont les seuls « lourds ». Une sougya se fait en 10–20 min.

### 1.3 Trois profondeurs de lecture pour le même texte (principe Steinsaltz)
Steinsaltz voulait **une page qui serve au débutant et à l'érudit**. L'app propose, sur chaque segment, trois profondeurs commutables d'un geste :

| Profondeur | Contenu | Pour qui |
|---|---|---|
| **Histoire** | Paraphrase narrative en français, à la deuxième personne quand c'est possible. | Première lecture, 12-13 ans, curieux. |
| **Texte** | Traduction interpolée (littéral en gras + explications), adaptée de Steinsaltz. | Lecture d'étude. |
| **Original** | Araméen / hébreu vocalisé, mots tactiles, traduction mot à mot au tap. | Ados d'école juive, bar/bat-mitsva, ceux qui veulent « déchiffrer la vraie page ». |

La profondeur n'est pas un niveau qu'on « débloque » : on peut descendre dans l'original dès la première sougya, sur un seul segment, puis remonter. L'ado découvre que *le vrai texte est à portée de main*.

### 1.4 Les parcours : par thème, pas par traité
Le Talmud est organisé par traité ; un ado, lui, est organisé par préoccupation. Les parcours thématiques regroupent 4-6 sougyot :

| Parcours | Question-fil | Sougyot (corpus actuel + à ajouter) |
|---|---|---|
| **À qui c'est ?** | Possession, objets trouvés, partage | BM 2a (talit) ; BM ch. 2 (objet perdu) ; BK 2a (les 4 dommages) |
| **Avoir raison** | Débat, majorité, vérité, humilité | Erouvin 13b (Hillel/Chammaï) ; BM 59b (four d'Akhnaï) ; Berakhot 2a (3 avis sur une heure) |
| **Toi et l'autre** | Éthique, limites, règle d'or | Chabbat 31a (sur un pied) ; BM 62a (la gourde) ; Sanhedrin 37a (un monde entier) |
| **Le temps long** | Transmission, générations | Taanit 23a (Honi) ; Taanit 7a (apprendre de ses élèves) ; Menahot 29b (Moïse chez Rabbi Akiva) |
| **Lire comme un sage** *(transversal)* | Les outils de raisonnement | Pas de sougya propre : chaque outil (kal va-homer, diyouk, *chani hatam*…) est **rencontré** dans une sougya, puis rangé dans la boîte à outils. |

Deux structures secondaires traversent les parcours :
- **Les personnages** : fiches débloquées à la première rencontre (Hillel apparaît dans deux parcours → l'ado le reconnaît, c'est voulu).
- **La boîte à outils** : les coups talmudiques, chacun avec la sougya où on l'a vu pour la première fois.

### 1.5 Le modèle de données qui en découle
```
Sougya
├─ id, ref Sefaria, parcours[], durée estimée
├─ cas (texte FR, 2-3 phrases)
├─ segments[]  (alignés sur Sefaria)
│   ├─ original (araméen vocalisé)
│   ├─ texte (interpolé FR)      ├─ histoire (paraphrase FR)
│   ├─ rôle : MISHNA | QUESTION | REPONSE | OBJECTION | PREUVE | DISTINCTION | CONCLUSION | TEIKOU | RECIT
│   ├─ voix (qui parle : « la Guemara », « Rav Pappa », « Rabbi Eliézer »…)
│   ├─ repond_a : id d'un segment précédent  → permet de dessiner la carte du débat
│   └─ encadrés[] : PERSONNAGE | MOT | CONTEXTE | HALAKHA | OUTIL
├─ et_alors : { type: HALAKHA | TEIKOU | OUVERTURE, principe FR, avis écarté }
└─ questions_hevrouta[] : amorces pré-écrites pour Claude, avec « réponses » de référence
```
Le champ **`rôle`** et le champ **`repond_a`** sont le cœur du projet : c'est ce qui rend la *structure* visible et jouable. Ils sont à annoter à la main (ou par Claude puis relus) pour chaque sougya du corpus.

---

## 2. Interface

### 2.1 L'écran « page » : la page de Vilna, repliée pour un téléphone
La page traditionnelle met le texte au centre et les commentaires autour. Sur un téléphone, on garde l'idée en la rendant gestuelle :

```
┌──────────────────────────────┐
│  ◀ Parcours · À qui c'est ?  │
│  Bava Metzia 2a · Le talit   │
│  ●●●○○○○○○○○○  segment 3/12  │
├──────────────────────────────┤
│                              │
│  [QUESTION] — la Guemara     │   ← étiquette de rôle, toujours visible
│                              │
│  Pourquoi la Mishna          │
│  répète-t-elle « celui-ci    │   ← profondeur Texte (interpolé)
│  dit » … ?                   │
│                              │
│  ┈┈┈ glisser ↓ : Original ┈┈┈│   ← tirer vers le bas révèle l'araméen
│  לְמָה לִי לְמִתְנָא …           │     (mots tactiles)
│                              │
├──────────────────────────────┤
│ ◀ Rachi      ● Texte   Tosafot ▶ │   ← swipe gauche/droite = couches
└──────────────────────────────┘
      ▲ tirer : Hevrouta (Claude)       ← panneau bas
```

- **Centre** : le segment courant, à la profondeur choisie. On avance segment par segment (pas de scroll infini : chaque coup du débat mérite un arrêt).
- **Couche « Rachi »** (swipe ←) : *qu'est-ce que ça dit ?* Explication simple du segment, encadrés MOT et PERSONNAGE.
- **Couche « Tossafot »** (swipe →) : *qu'est-ce que ça pose comme question ?* Objections, liens vers d'autres sougyot, encadrés CONTEXTE et OUTIL. C'est aussi là qu'apparaissent **les questions que l'ado a posées sur ce segment** (sa 4ᵉ couche) et, s'il est en classe, celles de ses camarades.
- **Panneau Hevrouta** (tirer ↑) : le dialogue avec Claude, toujours ancré sur le segment courant.
- **Mot tactile** (profondeur Original) : popup avec traduction, racine, « ce mot revient dans… ».

Règle de respect : **l'original n'est jamais plus loin qu'un geste**, et on ne le présente jamais comme « la version difficile » mais comme « la vraie page ».

### 2.2 La carte du débat
Deuxième écran, accessible depuis la page : la sougya vue de haut, comme un **fil de discussion** :

```
  ▣ MISHNA  Deux tiennent un talit → serment + partage
   │
   ├─ ? QUESTION  Pourquoi dire deux fois « celui-ci dit » ?
   │    └─ ↳ RÉPONSE  C'est une seule déclaration : « je l'ai trouvé ET il est à moi »
   │         ├─ ? QUESTION  Alors pourquoi pas juste « je l'ai trouvé » ?
   │         │    └─ ↳ RÉPONSE  Parce que « trouvé » pourrait vouloir dire « vu »
   │         │         └─ ✗ OBJECTION  Rabbenaï : dans la Torah, « trouver » = avoir en main (Deut. 22:3)
   │         │              └─ ↳ RÉPONSE  Oui dans la Torah, mais la Mishna parle comme tout le monde
   │         └─ ✗ OBJECTION  Mais le texte dit bien « celui-ci… celui-ci… » deux fois !
   │              └─ ★ CONCLUSION  Rav Pappa : ce sont deux cas (objet trouvé / achat)
```

Trois usages :
1. **Lire** : voir d'un coup d'œil où en est le débat et à quoi répond le segment courant.
2. **Reconstruire** (exercice) : les segments sont donnés dans le désordre, l'ado les place sur le fil et leur attribue un rôle. C'est l'exercice le plus « talmudique » qu'on puisse faire sans savoir un mot d'araméen.
3. **Prolonger** : l'ado peut ajouter son propre nœud (« ? et si les deux avaient des témoins ? ») → Claude répond, ou la sougya répond déjà (segment 4 de la Mishna !) — moment « tu as posé la question que le texte pose ».

### 2.3 L'écran Hevrouta : un dialogue à coups, pas un chat libre
Un chat ouvert avec une IA ne ressemble pas à une hevrouta ; une hevrouta a des coups. Le panneau propose une **palette de coups** en plus du champ libre :

| Coup | Ce que fait l'ado | Ce que fait Claude |
|---|---|---|
| **Explique-moi** | Demande une explication du segment. | Explique, puis **retourne une question**. |
| **Je t'explique** | L'ado reformule le segment avec ses mots. | Joue le binôme qui ne comprend pas tout : « Attends, donc "trouver" veut dire "voir" ? » |
| **Kouchia** (j'objecte) | L'ado pose une objection. | Prend l'objection au sérieux, cherche si la Guemara y répond, sinon : « bonne question, les Tossafot la posent aussi / teikou ». |
| **Ta chma** (je prouve) | L'ado cite un segment ou un passage déjà vu. | Évalue la preuve, propose une contre-preuve. |
| **Chani** (c'est différent) | L'ado distingue deux cas. | Teste la distinction : « et si… ? » |
| **Et Hillel, il dirait quoi ?** | L'ado demande à une voix du texte de parler. | Répond *en tant que* cette voix, strictement à partir de ce que le texte lui attribue. |
| **Teikou** | L'ado suspend. | Accepte, note la question dans « Ma page », propose où elle pourrait être reprise. |

Règles du binôme Claude (à mettre dans le system prompt) :
- Ancré sur la sougya fournie (araméen + anglais + hébreu Steinsaltz) ; cite toujours « (segment n) ».
- **Ne donne pas la réponse du prochain segment** : il fait deviner, puis dit « lisons la suite ».
- Fait **reformuler l'avis adverse** avant d'accepter un argument.
- Dit « je ne sais pas / teikou » plutôt que d'inventer ; renvoie à un adulte pour toute question de pratique personnelle.
- Ton : binôme curieux de 16 ans qui a déjà lu la page, pas un rav, pas un prof.

### 2.4 L'arène de mahloket
Pour les sougyot à deux voix fortes (Hillel/Chammaï, Rabbi Akiva/Ben Petoura, Rabbi Eliézer/Rabbi Yehochoua) : écran en **deux colonnes**. L'ado choisit un camp ; Claude tient l'autre ; **étape obligatoire** avant d'argumenter : reformuler correctement le camp adverse (validé par Claude). À la fin : « la halakha suit X — mais Y reste dans le texte. Pourquoi, à ton avis ? »

### 2.5 La carte du corpus et « Ma page »
- **Carte** : les sougyot comme des îles reliées (liens Sefaria entre sougyot, personnages communs). Pas de ligne, pas de « niveau 1 → 2 ». On voit ce qu'on a visité, ce qui est ouvert, les questions suspendues qui pendent d'une île.
- **Ma page** : tout ce que l'ado a écrit, sougya par sougya — ses premières idées, ses kouchiot, ses teikou. Après 10 sougyot, c'est *son* commentaire. Exportable, montrable à un prof ou un parent.

---

## 3. Mode d'apprentissage

### 3.1 La boucle d'une session (≈15 min)
1. **Cas** (1 min) → 2. **Première idée** (1 min, écrite) → 3. **Lecture-dialogue** (8-10 min : chaque segment = lire, anticiper le coup suivant, éventuellement hevrouta) → 4. **Et alors ?** (2 min) → 5. **Ma page** (2 min : relire sa première idée, écrire une ligne).

L'étape « anticiper le coup suivant » est le mécanisme central : avant d'afficher le segment *n+1*, l'app demande « À ton avis, que fait la Guemara maintenant ? » avec les rôles comme boutons (Elle objecte / Elle répond / Elle distingue / Elle conclut). Pas besoin de deviner le contenu ; deviner **la forme** suffit, et c'est déjà penser talmudiquement.

### 3.2 Ce qu'on mesure (et ce qu'on ne mesure pas)
| On mesure | On ne mesure pas |
|---|---|
| Nombre et qualité des **questions posées** (Claude les classe : question de compréhension / kouchia réelle / question que le texte pose lui-même) | « Bonnes réponses » à un QCM |
| Capacité à **reconstruire** une carte du débat | Vitesse |
| Capacité à **reformuler l'avis adverse** | Séries de jours (on évite le stress du streak ; on garde un rappel doux) |
| **Coups** maîtrisés (boîte à outils) | Vocabulaire araméen par cœur (vient naturellement, pas évalué) |
| Questions **suspendues puis reprises** | — |

Les « récompenses » sont intrinsèques au Talmud : débloquer un personnage, un outil, ou le moment fort : **« Ta question est celle des Tossafot »** (Claude compare la kouchia de l'ado aux questions réellement posées par les commentateurs sur ce segment, via `/api/related`).

### 3.3 Revenir : la mémoire de la structure, pas des mots
Répétition espacée sur les **sougyot déjà faites**, sous deux formes rapides (2 min) :
- « Reconstruis le fil » : 5 segments en désordre, à replacer.
- « Qui a dit quoi, et pourquoi ? » : une voix, une position, sa raison.
Et une forme lente : rouvrir une **question suspendue** avec une nouvelle sougya qui l'éclaire (c'est le *hazara*, la révision, telle que la pratique la tradition : on revient au même texte, plus armé).

### 3.4 Seul, à deux, en classe
- **Seul** : hevrouta avec Claude (v1).
- **À deux** (v2) : vraie hevrouta entre deux ados sur la même sougya, chacun sur son téléphone, segment synchronisé ; Claude n'intervient que si appelé (« on bloque ») ou pour trancher un désaccord sur le texte.
- **En classe** (v2) : le prof choisit la sougya, voit les cartes du débat reconstruites et les kouchiot de la classe ; les meilleures questions sont projetées — une couche Tossafot *de la classe*.

---

## 4. Fil rouge : Bava Metzia 2a dans l'app, de bout en bout

**Cas** — « Dans la cour, un téléphone par terre. Deux élèves le ramassent exactement en même temps. "Je l'ai trouvé." "Non, moi." Aucun témoin. Tu es le juge. »

**Première idée** — champ libre. (Les réponses typiques : tirer au sort, le donner au CPE, le couper… on les garde.)

**Les voix** — Mishna, segment 1, profondeur Texte : « Si **deux personnes tiennent un vêtement**, celui-ci dit : **je l'ai trouvé**… **celui-ci jure** qu'il n'en possède pas moins de la moitié… **et ils partagent**. » Encadré MOT : *talit* (ici : n'importe quel vêtement). Encadré HALAKHA : pourquoi un serment ? Segment 4 : s'ils ont des témoins, pas de serment → première surprise pour celui qui avait écrit « demander des témoins » : *le texte y a pensé*.

**Le débat** — segment 5, rôle QUESTION : « Pourquoi la Mishna dit-elle **deux fois** "celui-ci dit" ? » → anticipation : « que fait la Guemara ? » → RÉPONSE : c'est une seule déclaration. → QUESTION : alors pourquoi pas seulement "je l'ai trouvé" ? → RÉPONSE : parce que "trouvé" pourrait vouloir dire "vu". Encadré OUTIL : **le diyouk** (chaque mot compte) — déblocage de l'outil. → OBJECTION (Rabbenaï, Deut. 22:3) — encadré PERSONNAGE : Rabbenaï ; encadré CONTEXTE : le verset de l'objet perdu. → RÉPONSE : la Mishna parle « comme tout le monde ». → OBJECTION : mais il y a bien « celui-ci… celui-ci » deux fois ! → CONCLUSION (Rav Pappa) : deux cas, objet trouvé *et* achat — encadré OUTIL : **tsrikha** (pourquoi fallait-il dire les deux ?).

**Hevrouta type** — l'ado : « Mais pourquoi ils ne tirent pas au sort ? » Claude : « Bonne kouchia. Avant que je réponde : qu'est-ce que le serment *fait* que le tirage au sort ne fait pas ? » … « Le Talmud parle du tirage au sort ailleurs — on y va quand tu veux. »

**Et alors ?** — Principe : voir n'est pas posséder ; on jure quand on ne peut rien prouver ; partager n'est pas « couper la poire en deux » mais reconnaître que chacun a *peut-être* raison. Avis écarté : aucun ici (sougya sans mahloket) — ce qui est l'occasion de dire que toutes les sougyot ne finissent pas en désaccord.

**Ma page** — relecture de la première idée + une ligne. Question suspendue possible : « et si l'un des deux ment, le serment sert à quoi ? » → île voisine : Chevouot (le serment).

---

## 5. Décisions à prendre / questions ouvertes
1. **Annotation des rôles** : à la main pour les 9 sougyot du corpus (≈130 segments), ou pré-annotation par Claude relue ? (Je recommande : Claude annote, un humain relit — c'est 2 h de travail.)
2. **Profondeur par défaut** à l'ouverture d'une sougya : *Histoire* (plus accueillant) ou *Texte* (plus Steinsaltz) ? À tester avec 3-4 ados.
3. **Ton des « cas »** : transposés dans le monde de l'ado (téléphone dans la cour) ou gardés d'époque (talit) avec une phrase d'accroche ? Les deux ont des défenseurs ; le risque de la transposition est l'anachronisme halakhique.
4. **Place de l'hébreu** : afficher l'original *par défaut* sous le texte (toujours là, discret) ou seulement au geste ? Je penche pour « toujours là, discret ».
5. **Le prototype** : commencer par l'écran page + hevrouta sur une seule sougya (BM 2a), avant la carte du débat.
