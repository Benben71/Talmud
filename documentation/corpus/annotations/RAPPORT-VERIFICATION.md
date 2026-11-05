# Rapport de vérification des annotations (9 sougyot)

> Relecture indépendante, 5 nov. 2026. **Aucun fichier d'annotation n'a été modifié.**
> Méthode : chaque `resume_fr`, `role`, `repond_a` et encadré a été comparé à `english_steinsaltz[i]`, et à l'araméen ou l'hébreu quand il y avait un doute. Les références marquées **[vérifié Sefaria]** ont été contrôlées dans le texte hébreu/araméen téléchargé depuis l'API Sefaria pendant cette relecture. Les autres viennent de ma connaissance du texte, et leur degré de certitude est indiqué.
> Les 9 fichiers sont traités, dans l'ordre demandé.

---

## 1. Synthèse

- **État général : bon.** Les résumés sont presque tous fidèles. Le découpage en actes est sensé, et la plupart des rôles et des liens `repond_a` sont justes. Les erreurs se concentrent dans **les encadrés et les « Et alors ? »**. C'est là que l'IA a ajouté de l'interprétation que le texte ne contient pas.
- **15 problèmes bloquants** : 3 attributions ou contenus absents du texte, 3 références fausses, 4 lectures qui inversent le ton ou la thèse du texte, 2 « principes » contredits par la sougya elle-même, 1 halakha présentée sans source, 1 formulation dangereuse pour des ados, 1 omission de bornes qui change le sens.
- **≈ 55 problèmes mineurs** : imprécisions, interpolations de Steinsaltz présentées comme du texte, rôles à affiner, liens à préciser.
- **B1 à B9** : 3 points sont confirmés (B5 en partie, B6, B7), 3 sont à reformuler (B1, B5, B8), 1 a une **référence fausse** (B2 : le Tossafot existe, mais en **Berakhot 52a**), 2 sont à retirer ou à remplacer (B3, B4). Pour B9, le lien est acceptable mais doit être précisé.
- Fichiers les plus solides : **bava-metzia-2a, berakhot-2a, taanit-7a**. Fichiers à reprendre en priorité : **eruvin-13b** (4 bloquants), **shabbat-31a** (le cadre moral du récit est neutralisé), **bava-metzia-59b**.
- Problème transversal : les encadrés « Déjà rencontré en… » supposent un ordre de lecture entre parcours qui n'existe pas (Taanit 7a → BM 59b → BM 62a). Il faudrait les générer dynamiquement.

---

## 2. Problèmes bloquants

Format : `fichier · segment · champ` → ce qui est écrit → ce qui est juste → source → certitude.

### B-01 · bava-metzia-2a · et_alors.principe (et seg 5, encadré HALAKHA)
- **Écrit** : « Voir n'est pas posséder » présenté comme *le* principe tiré de la sougya.
- **Juste** : c'est précisément la lecture que la sougya **abandonne**. Aux segments 4 à 8, la Guemara croyait tirer « la vue n'acquiert pas » de la double déclaration. Au segment 9, elle réfute la thèse « une seule déclaration ». Au segment 10, Rav Pappa lit deux cas différents (objet trouvé / achat). La dérivation tombe donc. La règle reste vraie, mais elle vient d'ailleurs : Mishna BM 1:4 (10a), « il a vu l'objet et s'est jeté dessus, un autre l'a saisi : celui qui l'a saisi l'acquiert ». L'encadré du seg. 9 le dit déjà (« la rejette maintenant »), ce qui rend l'`et_alors` incohérent avec le fichier lui-même.
- **Correction proposée** : « La Guemara a cru trouver dans la Mishna que voir ne suffit pas pour acquérir, puis elle a lu la Mishna autrement. La règle reste vraie (Mishna BM 10a), mais ce n'est pas d'ici qu'on la tire. Ce que la sougya enseigne, c'est la méthode : une explication peut être abandonnée sur un détail du texte. »
- **Source** : le texte du passage, seg. 9-10 ; Mishna BM 1:4.
- **Certitude** : haute.

### B-02 · shabbat-31a · et_alors.avis_ecarte + seg 8 encadré « Chammaï avait-il tort ? » + sougya.note
- **Écrit** : « Deux stratégies, pas un gentil et un méchant ». Chammaï est présenté comme une « voix conservée », « avis écarté » d'une sorte de mahloket.
- **Juste** : le récit n'est pas une mahloket. C'est un enseignement moral **explicite**, introduit par la baraïta de **Chabbat 30b** : « Que l'homme soit toujours humble (*anvetan*) comme Hillel, et non irascible (*kapdan*) comme Chammaï ». La conclusion des trois convertis (seg 8) le confirme : « l'irascibilité (*kapdanouto*) de Chammaï a voulu nous chasser du monde ». Le texte prend donc parti. L'annotation le neutralise, ce qui revient à engager le texte là où il ne l'est pas, mais en sens inverse. On peut garder la question « Chammaï avait-il tort ? » pour la hevrouta (les conditions des candidats posaient vraiment problème), mais l'encadré ne doit pas affirmer ce que le texte dément.
- **Correction proposée** : (1) Étendre la sougya au début du récit sur 30b (« Que l'homme soit toujours humble… », puis le pari) ; la note dit déjà que ce début manque. (2) Mettre l'`et_alors` en type RECIT avec `avis_ecarte: null`. (3) Reformuler l'encadré : « Le Talmud tranche : sois humble comme Hillel. Mais tu peux te demander ce que Chammaï voulait protéger. »
- **Source** : Chabbat 30b [vérifié Sefaria] ; seg 8 (araméen *קפדנותו*).
- **Certitude** : haute.

### B-03 · shabbat-31a · et_alors.avis_ecarte (« tradition kabbalistique… la loi suivra Beit Chammaï »)
- Voir **B4** ci-dessous. En plus de la question de source, il y a ici une confusion de catégorie : ce passage parle de **Chammaï l'homme** (son tempérament), pas des **décisions halakhiques de Beit Chammaï**. La phrase est hors sujet ici.
- **Correction** : la retirer de ce fichier.
- **Certitude** : haute.

### B-04 · eruvin-13b · seg 13 · resume_fr + encadré « Un vote, pas une voix céleste »
- **Écrit** : « Beit Chammaï : oui (mieux vaut ne pas être créé). Beit Hillel : non. » / « c'est Beit Chammaï qui l'emporte ».
- **Juste** : la baraïta **n'attribue pas** les positions : *הללו אומרים… והללו אומרים* (« ceux-ci disent… ceux-là disent »). L'attribution est une conjecture d'interprète. Tout l'encadré « deux disputes, deux vainqueurs » repose sur elle.
- **Correction** : « Les uns disent… les autres disent… (le texte ne précise pas qui) ». Supprimer « c'est Beit Chammaï qui l'emporte ». On peut en faire une question de hevrouta : « D'après toi, quelle école a dit quoi, et pourquoi ? »
- **Source** : araméen du seg 13 (vérifié dans `corpus/eruvin-13b.json`).
- **Certitude** : haute.

### B-05 · eruvin-13b · seg 6 · encadré « Est-ce un compliment ? »
- **Écrit** : « Prouver le contraire de la Torah avec 150 raisons, c'est jouer, pas chercher. »
- **Juste** : la tradition valorise cette capacité. **Sanhédrin 17a** : « On ne fait siéger au Sanhédrin que celui qui sait purifier le reptile à partir de la Torah » (Rav). L'élève de Yavné est qualifié de *talmid vatik*, un élève distingué. Le texte admire, il ne dénonce pas. L'encadré est doctrinalement engagé contre le texte et sera jugé irrespectueux par un enseignant.
- **Correction** : « C'est une prouesse que le Talmud admire : pour juger, il faut savoir construire le meilleur argument du camp adverse (Sanhédrin 17a). Mais un argument brillant ne suffit pas à faire la loi. »
- **Source** : Sanhédrin 17a [vérifié Sefaria].
- **Certitude** : haute.

### B-06 · eruvin-13b · seg 2 · encadré OUTIL « Être convaincant ≠ avoir raison » + et_alors.principe
- **Écrit** : « Le Talmud le dit sans détour : un argument qui peut tout prouver ne prouve rien. On ne suit pas Rabbi Meïr parce qu'il est trop fort. » / « celui qui peut tout prouver (Rabbi Meïr) n'est pas suivi ».
- **Juste** : le texte fait porter la limite sur **les collègues** : *שלא יכלו חביריו לעמוד על סוף דעתו*, « ses collègues ne pouvaient pas aller au bout de sa pensée ». Le passage s'ouvre sur un éloge (« personne dans sa génération ne l'égalait »). Dire que « on ne suit pas Rabbi Meïr » est aussi faux en général : la Mishna anonyme est attribuée à Rabbi Meïr (*stam mishna Rabbi Meïr*, Sanhédrin 86a) et fait loi. Le passage explique pourquoi la loi n'a pas été fixée selon lui **dans ses désaccords avec ses collègues**.
- **Correction** : « Rabbi Meïr était si profond que ses collègues ne pouvaient pas suivre son raisonnement jusqu'au bout ; dans ses désaccords avec eux, on n'a donc pas fixé la loi selon lui. » Supprimer « un argument qui peut tout prouver ne prouve rien ».
- **Source** : seg 2 ; Sanhédrin 86a.
- **Certitude** : haute pour le texte, moyenne-haute pour la formulation de la règle générale.

### B-07 · eruvin-13b · questions_hevrouta[2].piste + bava-metzia-59b · questions_hevrouta[2].piste (point B2)
- **Écrit** : « Les Tossafot (ici, s.v. *lo bashamayim*) répondent : en Erouvin la voix confirmait la majorité. »
- **Juste** : **il n'y a pas de Tossafot s.v. *lo bashamayim hi* en BM 59a-b** (dans l'édition de Vilna sur Sefaria, la seule glose de 59b porte sur « *zeh tanour shel akhnaï* »). La question et la réponse annoncées existent bien, mais dans **Tossafot Berakhot 52a, s.v. *ve-Rabbi Yehochoua hi de-amar ein machgihin be-vat kol*** : la voix céleste du four d'Akhnaï allait *contre* la majorité (« *aharei rabbim lehatot* »), alors que Beit Hillel étaient la majorité. La Guemara elle-même soulève la question en **Yevamot 14a** (« *Rabbi Yehochoua hi, de-amar ein machgihin be-vat kol* »).
- **Correction** : remplacer la référence par « Tossafot Berakhot 52a ; voir aussi Yevamot 14a ». Le moment « ta question est celle des Tossafot » reste valable.
- **Source** : Tossafot BM 59a, 59b, Berakhot 52a ; Yevamot 14a [tous vérifiés Sefaria].
- **Certitude** : haute pour Berakhot 52a. Haute également pour l'absence en BM 59b dans l'édition de Vilna (d'autres éditions de Tossafot n'ont pas été consultées).

### B-08 · bava-metzia-59b · seg 4 · encadré OUTIL « Rov — la majorité »
- **Écrit** : « dans le verset d'origine, c'est presque le contraire (« ne suis pas la majorité pour faire le mal ») […] Un ado en droit de demander : est-ce une lecture honnête ? »
- **Juste** : Exode 23:2 contient **les deux** : « ne suis pas la multitude pour le mal… *aharei rabbim lehatot* ». La fin du verset, lue seule, dit littéralement « d'après la majorité, faire pencher ». Ce n'est donc pas « presque le contraire ». L'écart entre sens obvie et lecture des Sages est réel, mais Rachi lui-même le signale sur ce verset : on peut en parler sans soupçonner les Sages de malhonnêteté. « Est-ce une lecture honnête ? » sera reçu comme tendancieux en école juive, orthodoxe comme libérale.
- **Correction** : « Le verset dit à la fois “ne suis pas la majorité pour le mal” et “d'après la majorité, fais pencher”. Les Sages en tirent la règle de la majorité ; Rachi, sur ce verset, montre aussi un sens plus simple. Compare les deux lectures. »
- **Source** : Ex. 23:2 ; Rachi ad loc. ; Sanhédrin 2a.
- **Certitude** : haute pour le verset, moyenne-haute pour la formulation exacte de Rachi.

### B-09 · bava-metzia-59b · seg 8 · encadré PERSONNAGE Rabban Gamliel
- **Écrit** : « Sa défense est sincère — et le texte ne la juge pas suffisante. »
- **Juste** : dans ce segment, le texte **accepte** la défense : « la mer s'apaisa de sa colère » (*nach hayam mi-za'apo*). C'est la suite (seg 9-10, la prière de Rabbi Eliézer après l'oubli d'Imma Chalom) qui montre que la douleur de l'humilié reste entendue. L'encadré contredit le segment qu'il commente.
- **Correction** : « Le Ciel accepte sa défense : la mer se calme. Mais la suite montre que la douleur de celui qu'on a humilié n'est pas effacée pour autant. »
- **Certitude** : haute.

### B-10 · sanhedrin-37a · liens[Makkot.7a].pourquoi
- **Écrit** : « Un Sanhédrin qui exécute une fois en 70 ans est appelé « destructeur ». »
- **Juste** : la Mishna (Makkot 1:10) dit : « un Sanhédrin qui exécute une fois **en sept ans** (*be-chavoua*) est appelé destructeur ; **Rabbi Élazar ben Azaria** dit : une fois en soixante-dix ans ». Suivent Rabbi Tarfon et Rabbi Akiva (« personne n'aurait jamais été exécuté ») puis **Rabban Chimon ben Gamliel**, qui objecte : « ils multiplieraient les meurtriers en Israël ». La Guemara laisse en *teikou* la question de savoir si « une fois en 70 ans » est déjà destructeur.
- **Correction** : citer les quatre voix. C'est une mahloket complète, idéale pour l'app, et elle comporte même un *teikou* (cf. POINTS-A-TRANCHER D).
- **Source** : Makkot 7a [vérifié Sefaria].
- **Certitude** : haute.

### B-11 · sanhedrin-37a · sougya.segments (bornes) + cas.transpose
- **Problème** : la sougya s'arrête au seg 14. Or la Mishna se poursuit sur 37b (seg 15, « Et peut-être direz-vous… ») avec le **contrepoids** : « Pourquoi nous mêler de ce malheur ? N'est-il pas écrit : *s'il ne témoigne pas, il portera sa faute* (Lév. 5:1) ». Le `cas.transpose` met l'ado dans la peau du témoin. Sans la fin, il peut retenir qu'il vaut mieux ne pas témoigner.
- **Correction** : inclure la fin de la Mishna (37b), au moins en acte 3 « Et pourtant, il faut parler », ou en encadré CONTEXTE obligatoire.
- **Source** : Mishna Sanhédrin 4:5 (fin).
- **Certitude** : haute pour le contenu, moyenne pour la nécessité pédagogique.

### B-12 · bava-metzia-62a · et_alors.halakha + principe + seg 1 encadrés HALAKHA et « Jusqu'à ce que vienne Rabbi Akiva » (point B8)
- **Écrit** : « Celui qui possède l'eau la boit ; sa vie a priorité (Rabbi Akiva). » / « l'autre réponse a été, un temps, la bonne ».
- **Juste** :
  1. La Guemara ne dit pas « *hilkheta ke-Rabbi Akiva* ». Elle cite la baraïta pour expliquer l'usage du verset par Rabbi Yohanan. La décision repose sur la règle générale « la halakha suit Rabbi Akiva contre un collègue isolé » et sur les décisionnaires ultérieurs. À ma connaissance, ni le Rambam ni le Choulhan Aroukh ne codifient explicitement le cas des deux voyageurs. Il faut le dire au lieu de présenter une halakha sans source.
  2. Dans la source parallèle, **Sifra Behar (section 5:3)**, la formule « jusqu'à ce que vienne Rabbi Akiva » est **absente** : on lit « *amar lo Rabbi Akiva* », et Ben Petouri tire son avis **du même verset**. « A été, un temps, la bonne » sur-interprète donc une formule propre au Bavli. Voir B8.
- **Correction** : `halakha` : « Les décisionnaires suivent en général Rabbi Akiva (la vie de celui qui a l'eau passe d'abord). La Guemara ne le tranche pas explicitement ici. » `principe` : « …la formule du Talmud indique que l'enseignement de Ben Petoura avait cours jusqu'à ce que Rabbi Akiva enseigne autrement ».
- **Source** : BM 62a (araméen seg 1) ; Sifra Behar 5:3 [vérifié Sefaria] ; Erouvin 46b pour la règle générale.
- **Certitude** : haute pour le Sifra, moyenne pour l'absence de codification explicite.

### B-13 · taanit-7a · seg 13 · encadré CONTEXTE « Vigilance »
- **Écrit** : « Le sens traditionnel : la disposition de l'élève (son désir d'apprendre), pas son niveau. »
- **Juste** : « pas son niveau » est exact. Mais le sens traditionnel de *talmid hagoun* est la **conduite morale**, pas le désir d'apprendre. Rambam, Talmud Torah 4:1 : « on n'enseigne la Torah qu'à un élève digne, aux actes convenables, ou à un simple ; s'il suit une mauvaise voie, on le ramène d'abord au bien ». Cf. aussi Houlin 133a (*ein chonin le-talmid she-eino hagoun*).
- **Correction** : « Digne = qui se conduit bien, pas qui est fort. Et même celui qui se conduit mal, on commence par l'aider à changer (Rambam). »
- **Certitude** : moyenne-haute (Rambam cité de mémoire, sans vérification sur Sefaria).

### B-14 · taanit-23a · et_alors.principe
- **Écrit** : « celui qui se retrouve sans personne avec qui étudier préfère mourir ».
- **Juste** : c'est exactement ce que le champ `vigilance` et l'encadré du seg 16 disent de **ne pas** faire (« pas comme un éloge de la mort »). Pour un public de 12-17 ans, un « principe » affiché disant que l'isolement fait préférer la mort pose un vrai risque. Ce n'est pas non plus ce que dit le texte : Honi « pria et mourut » (*ba'a rahamei u-met*). Rava en tire un proverbe sur le **besoin** de compagnie, pas une conduite.
- **Correction** : « …on plante pour ceux qu'on ne verra pas ; et personne ne peut vivre sans compagnons : *o hevrouta o mitouta*. » Prévoir aussi, dans l'app, un renvoi vers un adulte ou une ressource d'aide sur ce segment. C'est à valider par l'équipe pédagogique (C2).
- **Certitude** : haute.

### B-15 · taanit-23a · seg 3 · encadré PERSONNAGE Honi
- **Écrit** : « Faiseur de pluie, figure populaire — pas un rabbin au sens classique. »
- **Juste** : c'est une thèse d'historiens modernes (le « *hassid* charismatique »), contraire au texte étudié. Ses élèves l'appellent « Rabbi » (seg 4 et 5), et la maison d'étude dit de lui (seg 16) : « quand Honi entrait au beit midrach, il résolvait toutes les difficultés des Sages ». L'encadré contredit le texte et sera jugé tendancieux.
- **Correction** : « Sage de l'époque du Second Temple (Ier s. av. l'ère commune), contemporain de Chimon ben Chetah. Le Talmud le montre à la fois comme un homme dont la prière est exaucée et comme un maître dont les explications éclairaient la maison d'étude. »
- **Certitude** : haute pour le texte. Pour la datation : Flavius Josèphe, *Antiquités* XIV, 2, 1 (« Onias », vers 65 av. l'ère commune), moyenne-haute.

---

## 3. Problèmes mineurs

### bava-metzia-2a
- **seg 1, 2, 3 · repond_a = 0** : ce ne sont pas des réponses mais la **suite** de la Mishna. Mettre `null`, ou ajouter un type de lien « suite » au schéma. Sinon la carte du débat dessine trois réponses fictives. Certitude : moyenne.
- **seg 1 · encadré OUTIL** : « Le Talmud commence par cerner ce sur quoi les deux sont d'accord… ». Ce raisonnement est l'interpolation de Steinsaltz, la Mishna ne fait que statuer. Écrire « Steinsaltz explique… ». Certitude : haute.
- **seg 5 · encadré HALAKHA** : « on acquiert un objet perdu en le prenant ». C'est simplifié : on acquiert aussi par sa cour (*hatser*) et, dans certains lieux, par les quatre coudées (BM 10a-11a). Dire « en le prenant (ou par un autre mode d'acquisition reconnu), pas en le voyant ». Retirer aussi « principe de tout le chapitre ». Certitude : moyenne-haute.
- **seg 8 · resume_fr** : correct en substance (*be-alma de-katani metsatiha bi-r'iya be-alma kani*), mais peu lisible. Proposition : « on aurait pu croire que, partout où la Mishna dit “j'ai trouvé”, elle veut dire qu'on acquiert par la simple vue ». Certitude : haute.
- **seg 10 · role CONCLUSION** : c'est la **réponse** à l'objection du seg 9 par une **distinction** (deux cas). Mettre `DISTINCTION`. La sougya ne se clôt pas là : le seg 11 et la page 2b continuent (*tsrikha*). Certitude : moyenne-haute.
- **seg 6 · Rabbenaï** : « un sage dont on sait peu de choses » est acceptable. Invérifiable au-delà.
- **et_alors.principe, 2e phrase** (« faire porter à chacun la responsabilité d'un serment ») : la Guemara donne sa propre raison en **BM 3a**. Le serment est d'institution rabbinique, « pour que chacun n'aille pas saisir le vêtement d'autrui en disant : il est à moi » [vérifié Sefaria]. Citer cette raison, plus forte et sourcée. La `piste` « décourage le menteur » y correspond.
- **et_alors.halakha** : exacte. Ajouter la source : Choulhan Aroukh HM 138:1 (certitude moyenne sur le numéro).
- **questions_hevrouta[0].piste** : « Le Talmud traite le tirage au sort ailleurs ». Donner une référence, par exemple Bava Batra 106b (partage entre frères au sort) [vérifié Sefaria].
- **questions_hevrouta[2].amorce** : « la Guemara perd-elle 7 segments » sonne péjoratif. Préférer « consacre-t-elle ».

### berakhot-2a
- **seg 3 · resume_fr** : « les Sages sont d'accord avec moi ; quand ils disent minuit, c'est une limite de précaution ». La seconde moitié est dans la Mishna (fin du seg 4). « Les Sages sont d'accord avec moi » est la lecture de la **Guemara 4b** (*le-olam ke-Rabban Gamliel savra lehou*) [vérifié Sefaria], interpolée par Steinsaltz. Le signaler, car cela transforme trois avis en deux. Certitude : haute.
- **seg 0 · MOT « Veille »** : « trois (ou quatre) veilles… = environ un tiers de la nuit ». Ce n'est juste que dans l'hypothèse des trois veilles (Rabbi ; Rabbi Natan en compte quatre, Berakhot 3a). La Guemara 3a conclut que Rabbi Eliézer compte trois veilles. Formulation acceptable, à nuancer. Certitude : moyenne.
- **seg 2 · PERSONNAGE Rabban Gamliel** : « parfois dure » doit être sourcé (destitution, Berakhot 27b-28a) ou adouci. « C'est lui qui fera excommunier Rabbi Eliézer, son beau-frère » : exact selon BM 59b (Imma Chalom, sœur de Rabban Gamliel ; sa prière « je n'ai pas agi pour mon honneur »).
- **seg 6 · resume_fr** : « la plupart des commandements se font le jour » est une explication de Steinsaltz (citant les Tossefot HaRoch), pas la Guemara.
- **seg 7 · repond_a = 5** : la réponse vaut pour **5 et 6** (« une seule réponse aux deux questions »). Le schéma devrait accepter une liste.
- **seg 7 · encadré « Ta chma — la preuve par le verset »** : terme technique impropre. *Ta chma* (« viens entends ») introduit d'ordinaire une source tannaïtique. Ici, la formule est *tana akra kaï* (« le tanna s'appuie sur le verset »). « La réponse est presque toujours un verset » est faux : très souvent, c'est une mishna, une baraïta ou un raisonnement. Certitude : haute.
- **seg 9 · repond_a = 7** : le « *i hakhi* » suit immédiatement le seg 8 et vise les deux réponses. 8, ou [7, 8].
- **Liens** : Berakhot 4b est correct [vérifié : *Rabbi Yehochoua ben Levi*, Chema au lit, et la haie des Sages].

### shabbat-31a
- **seg 0 · MOT « Zouz »** : « 400 zouz : la valeur d'une dot ». La *ketouba* minimale d'une jeune mariée est de **200 zouz** (Ketoubot 10b). 400 zouz, c'est donc le double. Écrire : « deux fois la somme minimale de la ketouba ». Certitude : haute.
- **seg 0 · CONTEXTE « Le vendredi après-midi »** : « Le parieur l'a choisi exprès » ne figure pas dans le texte. L'araméen dit seulement *oto ha-yom erev Chabbat haya* (« ce jour-là était veille de chabbat »). Retirer, ou écrire « peut-être exprès ». Certitude : haute.
- **seg 0-2 · vigilance (C6)** : aucun encadré ne traite les « questions » du parieur, qui sont des moqueries ethniques. Voir la réponse en section 4.
- **seg 4 · PERSONNAGE Chammaï** : « bâtisseur de métier » est déduit de ce seul récit (*amat ha-binyan*, « coudée de bâtisseur ») par Steinsaltz. Écrire « d'après ce récit, il tenait une règle de bâtisseur ».
- **seg 7 · voix** : « la Guemara ». C'est la suite de la baraïta (« les Sages ont enseigné »), comme les seg 4-6.
- **seg 8 · resume_fr** : « La rigueur de Chammaï » adoucit *kapdanout*, qui signifie irascibilité ou impatience. Steinsaltz traduit « impatience ». Garder le mot fort, cohérent avec B-02.
- **et_alors.principe** : « Hillel accepte… parce qu'il sait que l'étude les fera tomber ». C'est une interprétation classique, mais je n'ai pas retrouvé sa source dans les Tossafot de Chabbat 31a ou Yevamot 24b sur Sefaria. À sourcer ou à présenter comme une hypothèse. Pour la `piste` « Chammaï a-t-il eu tort ? », on peut ajouter Bekhorot 30b (on ne reçoit pas un candidat qui accepte toute la Torah sauf un point), qui donne un appui textuel à Chammaï. Certitude sur Bekhorot 30b : moyenne-haute.
- **seg 5 · encadré Lévitique 19:18** : exact. On peut ajouter que Rachi donne deux lectures de « ton prochain » (Dieu, ou vraiment l'autre) : c'est un bon sujet de hevrouta.
- **Liens** : Avot 1:12 est correct.

### eruvin-13b
- **seg 5 · voix** : « Rabbi Yohanan ». C'est en fait Rabbi Abbahou au nom de Rabbi Yohanan.
- **seg 7 · role PREUVE** : Ravina ne prouve rien, il **illustre** la virtuosité par un kal va-homer qui sera réfuté. Mettre `ENSEIGNEMENT`. Le lien du seg 8 en OBJECTION reste juste. Certitude : moyenne.
- **seg 9 · CONTEXTE « Plus de 300 désaccords recensés dans la Mishna »** : le chiffre courant (≈ 316) porte sur l'ensemble de la littérature talmudique, pas sur la seule Mishna. Écrire « environ 300 dans la littérature rabbinique ». Certitude : moyenne.
- **seg 10 · encadré « Reformuler l'avis adverse »** : le texte dit **enseigner** les deux avis et **citer** Beit Chammaï en premier, pas « reformuler ». Garder le titre de l'exercice de l'app, mais ne pas l'attribuer au texte.
- **seg 11** : donner la référence de la mishna citée, **Soucca 2:7** (Soucca 28a).
- **seg 13 · resume_fr** : la fin est omise (« et certains disent : qu'il examine ses actes **à venir** », *yemachmech*).
- **et_alors.halakha** : « (sauf exceptions listées) » ne dit pas où. Préciser : « quelques cas où la loi suit Beit Chammaï, signalés au fil du Talmud ; et un avis de Beit Chammaï contraire à Beit Hillel “n'est pas une mishna” (Berakhot 36b) ». Certitude sur Berakhot 36b : moyenne.
- **et_alors.principe** : ajouter que **Yevamot 14a** donne une autre raison, la majorité (« Beit Hillel étaient plus nombreux, Beit Chammaï plus aiguisés ») [vérifié Sefaria]. Cela justifie l'outil ROV et enrichit l'arène.
- **seg 3 · MOT** : exact (*meïr*, hébreu ; *nehoraï*, de l'araméen *nehora*, lumière).

### bava-metzia-59b
- **seg 0 · PERSONNAGE Rabbi Eliézer** : « élève préféré » est à préciser. Selon Avot 2:8, Rabban Yohanan ben Zakkaï disait qu'il pèserait plus que tous les sages réunis ; Abba Chaoul attribue ce mot à Rabbi Élazar ben Arakh. « Fidèle aux traditions reçues » : exact (Soucca 28a, « il ne disait rien qu'il n'eût entendu de son maître »).
- **seg 4 · encadré « Déjà rencontré en Taanit 7a »** : problème d'ordre (Taanit 7a est dans un autre parcours). Voir la synthèse.
- **seg 4 · CONTEXTE « nitshouni »** : voir B3.
- **seg 5 · MOT « Nidouï »** : « pas une expulsion définitive » est vrai en droit (30 jours renouvelables), mais ici la mise à l'écart dura **jusqu'à sa mort** : Sanhédrin 68a, « *hutar ha-neder* » prononcé par Rabbi Yehochoua après le décès [vérifié Sefaria]. Le préciser.
- **et_alors.principe** : « la victoire de la majorité a coûté la vie du Nassi » confond deux choses. C'est l'**humiliation** qui est en cause, ce que le point 2) dit bien. Reformuler : « l'humiliation infligée au vaincu a coûté… ».
- **et_alors.avis_ecarte** : « peut-être avait-il raison “au ciel” ». C'est défendable et classique (cf. Derachot HaRan, sermon 7, de mémoire, certitude moyenne). Citer la source plutôt que « le texte le laisse entendre ».
- **et_alors.halakha** : ajouter une source, Rambam, Yessodei HaTorah 9:1-4 (un prophète ne peut trancher une halakha). Certitude : moyenne sur la numérotation.
- **seg 10 · repond_a = 5** : acceptable. 9 → 10 serait plus fidèle à l'enchaînement narratif.
- **Liens** : BM 58b (*gadol ona'at devarim me-ona'at mamon*) et Sanhédrin 68a sont corrects [vérifiés Sefaria].
- **seg 10 · MOT « Ona'a »** : exact (BM 58b : « celle-ci peut être remboursée, l'autre non » — Rabbi Chmouel bar Nahmani) [vérifié].

### bava-metzia-62a
- **seg 0 · voix** : « la Guemara ». C'est la dérivation de l'avis opposé à Rabbi Yohanan, Rabbi Élazar selon le contexte de 61b. Certitude : moyenne.
- **liens[Sifra, Behar 5]** : cette référence ne se résout pas sur Sefaria. Écrire **`Sifra, Behar, Section 5:3`** [vérifié]. Le `pourquoi` peut ajouter que Ben Petouri y tire son avis du **même verset**.
- **seg 1 · PERSONNAGE Ben Petoura** : « il n'existe dans le Talmud que par cette position ». C'est exact pour le Bavli. Le Sifra le nomme Ben Petouri, avec la même position.
- **seg 1 · PERSONNAGE Rabbi Akiva** : « il tranche durement » est un jugement de valeur à retirer. « Aime ton prochain… grand principe de la Torah » : exact (Sifra Kedochim 4:12 ; Yerouchalmi Nedarim 9:4). Certitude : moyenne-haute.
- **seg 1 · encadré HALAKHA** : « Les commentateurs discutent : … et si l'autre est ton enfant ? ». Invérifiable pour l'enfant. Présenter cela comme une question ouverte, pas comme une discussion des commentateurs. Pour la gourde commune, la discussion existe chez les Ahronim (certitude moyenne).
- **Liens** : Pesahim 25b, « qui te dit que ton sang est plus rouge ? », est correct [vérifié]. Le passage est aussi en Sanhédrin 74a et Yoma 82b.

### sanhedrin-37a
- **seg 7 · CONTEXTE « Bonus »** : « les sages avaient tort, et le texte le dit ». Le texte ne le dit pas, il le **montre** (« ils se repentirent »). La phrase « Rabbi Zeira's actions were proven correct » est de Steinsaltz.
- **seg 5** (hors sougya) : sujet intime (*nidda*, isolement d'un couple). Si le seg 7 est montré en bonus, ne pas afficher le seg 5 sans encadrement.
- **seg 9 · MOT « Dinei nefachot »** : « au point que l'exécution devient presque impossible (Makkot 7a) ». C'est l'avis de Rabbi Tarfon et Rabbi Akiva. Rabban Chimon ben Gamliel s'y oppose (voir B-10). Afficher les deux voix.
- **seg 10 · OUTIL « Chani »** : *chani* désigne une résolution dialectique (« ici c'est différent »). Ici, la Mishna énonce simplement un contraste. Parler plutôt de « comparaison ».
- **seg 12** : voir B1.
- **liens[Mishnah_Sanhedrin.4.5]** : « et ses variantes textuelles ». Le texte Sefaria (Torat Emet) lit *נפש אחת מישראל* et n'affiche **pas** de variantes [vérifié]. Ajouter **`Jerusalem_Talmud_Sanhedrin.4.9`**, qui lit *נפש אחת* sans « d'Israël » [vérifié].
- **personnages** : Rabbi Zeira n'apparaît que hors sougya.

### taanit-7a
- **seg 9 · resume_fr** : l'euphémisme est omis. Le texte dit « une épée sur **les ennemis** des disciples des sages qui étudient seuls », formule pour ne pas maudire les sages eux-mêmes. Utile pour la hevrouta « c'est violent ? ».
- **seg 10 · encadré « Gezera chava »** : au sens technique, la *gezera chava* est un procédé halakhique reçu par tradition (Pessahim 66a). Ici, c'est une analogie verbale aggadique (*ketiv hakha… ketiv hatam*). Écrire « analogie de mots (sur le modèle de la gezera chava) ». La 2e preuve (Isaïe 19:13) est omise dans le résumé.
- **seg 11 · PERSONNAGE Rabbi Hanina** : signaler que **Makkot 10a** attribue la même phrase à **Rabbi** (Yehouda HaNassi) [vérifié Sefaria]. « Médecin » : tradition existante, non vérifiée ici (certitude moyenne).
- **seg 16** : voir B5.
- **seg 11 · role CONCLUSION** : acceptable comme clôture de l'acte 1.
- **Liens** : Avot 1:6 et Taanit 7b sont corrects.

### taanit-23a
- **seg 8 · PERSONNAGE Chimon ben Chetah** : voir B6. « Chef des Pharisiens » est un terme anachronique et approximatif. Écrire : « l'une des “paires” (*zougot*) de maîtres, avec Yehouda ben Tabbaï (Avot 1:8) ». « Restaurateur de l'école » : le Yerouchalmi (Ketoubot 8:11) lui attribue l'institution de l'école pour les enfants [vérifié Sefaria], mais le Bavli (Bava Batra 21a) l'attribue à Yehochoua ben Gamla. Mentionner les deux.
- **seg 8** : la critique de Chimon ben Chetah figure déjà dans la **Mishna** Taanit 3:8. C'est utile de le signaler, car c'est une voix « canonique ».
- **seg 9 · role CONCLUSION** : c'est la **suite** du propos de Chimon ben Chetah (concession). Mettre `OBJECTION` (suite), ou `REPONSE` avec `repond_a: 8`.
- **seg 10-12 · et_alors.principe** : « l'institution a raison de s'en inquiéter ». Or l'institution suprême, le Sanhédrin (Chambre de pierre taillée), **fait l'éloge** de Honi (seg 10-12). C'est Chimon ben Chetah, personnellement, qui s'inquiète. Le principe simplifie : il y a deux voix institutionnelles opposées, et c'est plus riche.
- **seg 5 · resume_fr** : « gouttes grosses comme des tonneaux ». Le texte dit grosses comme **l'ouverture** d'un tonneau.
- **seg 13** : le Yerouchalmi (Taanit 3:9) raconte une version où le dormeur est le **grand-père** de Honi, endormi de la destruction du Premier Temple à la construction du Second (certitude moyenne). C'est utile si l'on veut nuancer l'issue tragique.
- **seg 16 · resume_fr** : « Il demande la mort ». Le texte dit *ba'a rahamei u-met* (« il pria et mourut ») ; c'est Rachi qui précise « pour mourir ». Rester au plus près du texte (cf. B-14).
- **seg 16 · MOT** : « Sans personne avec qui apprendre, Honi ne veut plus vivre ». Le texte insiste sur le fait **qu'on ne le croit pas et qu'on ne l'honore pas** (*lo havmanouhou, ve-la avdi leih yekara*), à la maison comme au beit midrach. Ce n'est pas seulement l'absence de partenaire d'étude.
- **seg 3 · « Son nom vient de cette histoire »** : c'est l'explication la plus courante, mais d'autres existent. Écrire « selon l'explication la plus courante ».
- **Liens** : `Taanit.23a` → Abba Hilkiya pointe vers la page elle-même. Pointer vers **`Taanit.23b`**. Le lien `Taanit.7a` cite « ou la hevrouta ou la mort », phrase qui est en **23a**, pas en 7a : reformuler le `pourquoi` (« on n'apprend pas seul : le feu ne prend pas sur une bûche seule »).

### Transversal
- **« Déjà rencontré en… »** (BM 59b → Berakhot 2a, Taanit 7a ; BM 62a → BM 59b ; Taanit 7a → « c'est lui qui dira ») : ces renvois supposent un ordre de lecture entre parcours que l'app ne garantit pas. Les générer selon l'historique de l'ado.
- **`repond_a` unique** : plusieurs segments répondent à deux coups (Berakhot 2a seg 7 ; Erouvin 13b seg 12). Prévoir une liste.
- **Interpolations de Steinsaltz** : dans une dizaine de résumés, une explication de Steinsaltz est présentée comme du texte (relevés ci-dessus). Pour la profondeur « Histoire », c'est acceptable. Pour la carte du débat et les encadrés OUTIL (« le Talmud dit… »), il faut distinguer.

---

## 4. Réponses aux points B1–B9

**B1 · sanhedrin-37a · seg 12 (« une vie » / « une vie d'Israël »)**
- **Confirmé** : le Bavli imprimé (texte du corpus) lit *נפש אחת מישראל* [vérifié dans `corpus/sanhedrin-37a.json`]. La Mishna imprimée (Torat Emet, Sefaria) aussi [vérifié].
- **Confirmé** : le **Talmud de Jérusalem** (Sanhédrin 4:9) lit *נפש אחת*, sans « d'Israël » [vérifié Sefaria].
- **De mémoire, certitude moyenne** : le manuscrit Kaufmann de la Mishna (Budapest A50) lit aussi sans « d'Israël ». Le Rambam (Hilkhot Sanhédrin 12:3) lit avec. L'étude de référence est celle d'E. E. Urbach (*Tarbiz* 40, 1971), qui soutient l'antériorité de la version universelle.
- **Formulation proposée** : « Le Talmud de Babylone imprimé lit “une vie d'Israël” ; le Talmud de Jérusalem et plusieurs manuscrits anciens de la Mishna lisent “une vie”. C'est cette seconde version qui est inscrite sur la médaille des Justes parmi les Nations de Yad Vashem. » Je ne recommande pas « la version universelle » comme étiquette, car elle sous-entend que l'autre ne l'est pas. Garder « à vérifier avec un enseignant ».

**B2 · bava-metzia-59b · seg 4 (Tossafot)**
- **Référence fausse, contenu juste.** Il n'y a pas de Tossafot s.v. *lo bashamayim hi* en BM 59a-b dans l'édition de Vilna [vérifié Sefaria].
- La question (« pourquoi suit-on la voix céleste pour Beit Hillel et pas pour Rabbi Eliézer ? ») et la réponse (« dans le four d'Akhnaï, la voix allait contre la majorité ; Beit Hillel étaient la majorité ») se trouvent dans **Tossafot Berakhot 52a, s.v. *ve-Rabbi Yehochoua hi*** [vérifié].
- Les mêmes Tossafot ajoutent une nuance : un tanna peut refuser la voix céleste même quand elle soutient la majorité, « puisque Beit Chammaï étaient plus aiguisés ». La Guemara pose déjà le problème en **Yevamot 14a** [vérifié].

**B3 · bava-metzia-59b · seg 4 (« nitshouni » / « rendu éternel »)**
- Je ne connais pas de source classique pour la lecture « *netsah* » (éternité). Elle semble homilétique et moderne. Certitude moyenne : je n'ai pas fait de recherche exhaustive.
- **Recommandation** : retirer cette lecture ou l'étiqueter « lecture moderne ». La remplacer par une source talmudique solide : **Pessahim 119a**, « Viens et vois : un être de chair, quand on le vainc, est triste ; le Saint, béni soit-Il, quand on le vainc, se réjouit » [vérifié Sefaria]. Elle dit exactement la même chose que le sourire de BM 59b.

**B4 · shabbat-31a · et_alors (« aux temps messianiques la loi suivra Beit Chammaï »)**
- La tradition existe dans la littérature tardive, attribuée à l'Arizal (XVIe s.). Je ne peux pas en vérifier la source primaire : elle est citée de seconde main chez des auteurs hassidiques et kabbalistes. Statut : **invérifiable ici**.
- **Recommandation : retirer** de ce fichier dans tous les cas (voir B-03), car ce passage porte sur le tempérament de Chammaï, pas sur les décisions de son école. Si on la garde ailleurs (Erouvin 13b), la formuler ainsi : « selon une tradition rapportée au nom de l'Arizal, cabaliste du XVIe siècle ». En faire une ouverture, jamais une affirmation.

**B5 · taanit-7a · seg 16 (Rabbi Yehochoua ben Hanania)**
- **Lévite chanteur au Temple** : exact. Arakhin 11b, Rabbi Yohanan ben Goudgeda lui dit : « tu es des chantres, pas des portiers » [vérifié Sefaria]. Certitude haute.
- **Forgeron** : approximatif. Berakhot 28a : Rabban Gamliel voit les murs noircis de sa maison et lui dit « tu es *pehami* » [vérifié]. Le mot désigne un charbonnier ou un forgeron selon les commentateurs. Le Yerouchalmi (Berakhot 4:1) dit qu'il fabriquait des aiguilles (de mémoire, certitude moyenne). Proposition : « artisan pauvre (charbonnier ou forgeron) ».
- **Interlocuteur de l'empereur** : exact (Houlin 59b-60a ; Bekhorot 8b). Certitude moyenne-haute.
- **« Tanna »** : exact (2e génération).

**B6 · taanit-23a · seg 8 (Chimon ben Chetah, frère de la reine)**
- **Exact comme tradition talmudique** : Berakhot 48a, « on fit venir Chimon ben Chetah, son frère » (de la reine, femme de Yannaï) [vérifié Sefaria]. Les sources historiques non rabbiniques (Josèphe) ne le mentionnent pas.
- Écrire « selon le Talmud (Berakhot 48a), frère de la reine Chlomtsion (Salomé Alexandra) ». Reformuler « chef des Pharisiens » (voir section 3).

**B7 · berakhot-2a · et_alors (halakha du Chema du soir)**
- **Exact.** Les sources :
  - Choulhan Aroukh OH 235:1 : à partir de la sortie des étoiles.
  - Choulhan Aroukh OH 235:3 : jusqu'à minuit ; *be-di'avad*, jusqu'à l'aube.
  - Rambam, Keriat Chema 1:9.
  - Guemara 4b : les Sages tiennent en fait comme Rabban Gamliel ; « minuit » est une haie [vérifié Sefaria].
  - Certitude : haute sur le fond, moyenne-haute sur les numéros de paragraphes.
- **Formulation pour ados** : « Le Chema du soir se dit après la sortie des étoiles. Il faut le dire avant minuit ; si on a laissé passer minuit, on peut encore le dire jusqu'à l'aube. »
- Nuance utile : beaucoup de communautés prient Arvit avant la nuit et répètent alors le Chema après la sortie des étoiles (OH 235:1). Cela évitera la question « mais à la synagogue on le dit à 18 h ».

**B8 · bava-metzia-62a · seg 1 (« jusqu'à ce que vienne Rabbi Akiva »)**
- L'araméen dit *darach Ben Petora… ad she-ba Rabbi Akiva ve-limmed*. La lecture « c'était l'avis reçu avant » est celle de Steinsaltz (« *This was the accepted opinion until…* ») ; elle est plausible.
- Mais dans la source parallèle, **Sifra Behar 5:3**, la formule est **absente** : *amar lo Rabbi Akiva* [vérifié Sefaria]. Ben Petouri y tire son avis **du même verset**.
- **Recommandation** : « La formule du Talmud de Babylone suggère que l'enseignement de Ben Petoura avait cours jusqu'à ce que Rabbi Akiva enseigne autrement ; dans le Sifra, c'est un simple échange entre les deux. » Retirer « a été, un temps, la bonne » (voir B-12).
- Certitude : haute pour le Sifra, moyenne pour l'interprétation.

**B9 · eruvin-13b · liens (Yevamot 14b)**
- La Mishna Yevamot 1:4 (« Beit Chammaï n'ont pas cessé d'épouser des femmes de Beit Hillel, ni l'inverse ») se trouve dans le Bavli en **13b** [vérifié Sefaria]. La Guemara en discute en 14a-b.
- La **baraïta** qui en tire la leçon, « pour t'apprendre qu'ils se témoignaient affection et amitié, pour accomplir *aimez la vérité et la paix* » (Zacharie 8:19), est en **14b** [vérifié].
- **Conclusion** : le lien 14b est bon si le `pourquoi` cite la baraïta. Sinon, corriger « (Mishna Yevamot 1:4) » en `Yevamot.13b` ou `Mishnah_Yevamot.1.4`. Je recommande de garder 14b et de citer la baraïta : c'est la phrase la plus forte pour des ados.

---

## 5. Propositions de bornes ou de rôles alternatifs

| Fichier | Proposition | Raison | Certitude |
|---|---|---|---|
| shabbat-31a | Commencer la sougya au début du récit sur **30b** (« Que l'homme soit toujours humble comme Hillel… », puis le pari). Télécharger la fin de 30b. | Le cadre moral explicite manque (B-02). | haute |
| sanhedrin-37a | Ajouter un acte 3 avec la fin de la Mishna sur **37b** (obligation de témoigner, Lév. 5:1). | Contrepoids indispensable (B-11). | haute |
| bava-metzia-2a | seg 10 : `DISTINCTION` au lieu de `CONCLUSION`. seg 1-3 : `repond_a: null` (ou lien « suite »). | La sougya continue sur 2b ; la Mishna n'est pas une réponse. | moyenne-haute |
| berakhot-2a | seg 7 : `repond_a: [5, 6]`. seg 9 : `repond_a: 8` ou `[7, 8]`. | Réponse commune ; « *i hakhi* » suit le seg 8. | moyenne |
| eruvin-13b | seg 7 : `ENSEIGNEMENT` au lieu de `PREUVE`. | Démonstration de virtuosité, pas une preuve. | moyenne |
| taanit-23a | seg 9 : `OBJECTION` (suite) ou `REPONSE` au lieu de `CONCLUSION`. seg 10 : `repond_a: 8` (le Sanhédrin répond à Chimon ben Chetah par l'éloge). | Rend visible l'opposition entre les deux voix. | moyenne |
| sanhedrin-37a | Le passage de **Makkot 7a** (4 voix + *teikou* de la Guemara) est un candidat pour la « sougya avec *teikou* explicite » recherchée en D. | Court, adapté aux ados, débat réel. | moyenne-haute |
| bava-metzia-62a (A5) | Garder BM 62a. Ajouter en encadré le texte du **Sifra Behar 5:3**, où les deux avis sont tirés du même verset : c'est un très bon exercice de *diyouk* comparé. | Enrichit la sougya de 2 segments sans changer de passage. | moyenne |

---

## 6. Ce que je n'ai pas pu vérifier, et pourquoi

- **Manuscrits de la Mishna** (Kaufmann, Parma) pour B1 : pas d'accès aux fac-similés. Je les cite de mémoire.
- **Tradition de l'Arizal** (B4) : je n'ai pas trouvé de source primaire, et elle est citée de seconde main dans la littérature tardive.
- **Numéros de paragraphes** du Rambam (Talmud Torah 4:1 ; Yessodei HaTorah 9 ; Sanhédrin 12:3 ; Keriat Chema 1:9) et du Choulhan Aroukh (OH 235 ; HM 138) : cités de mémoire, non contrôlés sur Sefaria. Le fond est sûr, la numérotation est à confirmer.
- **Source de l'idée « Hillel savait que la condition tomberait »** (Chabbat 31a) : je ne l'ai pas trouvée dans les Tossafot de Chabbat 31a ni de Yevamot 24b sur Sefaria. Elle est peut-être dans une autre édition ou chez un autre commentateur (Maharcha ?).
- **Rabbenaï** (BM 2a), **Rabbi Hanina « médecin »** (Taanit 7a), **Rabbi Yehochoua aiguilletier** (Yerouchalmi Berakhot 4:1), **la version du Yerouchalmi de l'histoire de Honi** (Taanit 3:9) : souvenirs non vérifiés.
- **Discussions des Ahronim sur la gourde** (« si elle n'appartient à personne », « si l'autre est ton enfant ») : je n'ai pas fait de recherche bibliographique, d'où le statut invérifiable.
- **Lectures de Rachi** sur Exode 23:2 et Chabbat 31a : citées de mémoire, certitude moyenne-haute.
- Je n'ai **pas relu `RELECTURE.md`** : la vérification a porté sur les JSON (la source de vérité) et sur le corpus.
- Je n'ai pas jugé les **cas transposés** ni le choix des passages, conformément à la consigne, sauf là où ils induisent une erreur (sanhedrin-37a, B-11).
