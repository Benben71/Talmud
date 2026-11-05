# « Ouvrir le Talmud » (Ayeka) et Mahloket : deux approches

Source : `Ayeka/Ouvrir le Talmud.html` — un **carnet imprimable A5 de 44 pages**, « Treize chapitres pour découvrir comment pense le Talmud », réalisé par Rav Emile Ackermann. Textes hébreux/araméens de Sefaria (William Davidson, CC BY-NC), traductions françaises propres au carnet, Cormorant Garamond + Frank Ruhl Libre, palette marine/or/papier, mode sombre, CSS d'impression (livret plié A4).

## En une phrase
**Ayeka est un cours** : treize idées sur la façon dont le Talmud pense, chacune illustrée par un ou deux extraits courts, avec une question à écrire à la main et un adulte à côté. **Mahloket est un atelier** : une seule sougya à la fois, lue coup par coup jusqu'au bout, seul avec une hevrouta, pour pratiquer le raisonnement plutôt que le survoler.

## Tableau
| | Ayeka — *Ouvrir le Talmud* | Mahloket (notre prototype) |
|---|---|---|
| **Objet** | Carnet imprimé A5, 44 pages, à remplir au stylo (« Ce carnet appartient à », lignes « Mes notes ») | App web, écran-page, notes dans le navigateur |
| **Unité** | Le **chapitre thématique** (« Le Talmud garde les avis qui ont perdu », « Les sages exagèrent parfois »…), 2-3 pages, 1 à 3 extraits de 2 à 8 lignes | La **sougya entière** (12 à 18 segments), lue segment par segment |
| **Étendue** | 13 thèmes, ~25 textes, histoire, « Qui est qui », anatomie de la page, guématria, glossaire, sources, notes pour l'adulte | 1 sougya ouverte (9 annotées), 4 parcours thématiques, pas encore d'histoire ni de glossaire dans l'app |
| **Progression** | Linéaire, numérotée, « réponds avant de tourner la page » | Non linéaire (la mer, les îles), mais six temps fixes par sougya |
| **Dispositifs récurrents** | **Le texte** (original + traduction + référence + encadré « Ce texte : » qui dit qui parle, où, quand, en quelle langue) · **À toi** (question ouverte à écrire) · **Idée clé** (ce qu'on retient) · **Mot araméen** · **Plus tard** (commentaire postérieur, toujours signalé) | Le cas · Ta première idée · rôle de chaque coup (Question/Réponse/Objection…) et « répond à » · trois profondeurs (Histoire / Texte interpolé / Original tactile) · couches Rachi / Tossafot / ta page · anticipation « que fait la Guemara ? » · hevrouta à coups · carte du débat à reconstruire · Et alors ? · Ma page |
| **Ce qui est enseigné** | Des **idées** sur le Talmud (il garde les perdants, il exagère, il raisonne par cas bizarres, il répond aux inventions nouvelles, il contient des femmes et des règles qui les écartent…) | Une **méthode** : voir la forme du débat, jouer les coups, reformuler l'avis adverse |
| **Rapport au texte** | Extraits courts, traduits proprement, sans interpolation ; mots araméens choisis | Texte intégral en traduction interpolée (gras = littéral), mot tactile vers le lexique Sefaria |
| **Qui parle, quand** | Très soigné : chaque texte est daté et situé ; les commentaires tardifs (Hazon Ish, Weinberg, Jacobs, Chajes, Meiri, Meshekh Hokhma) sont étiquetés « Plus tard » | Encadrés PERSONNAGE / CONTEXTE ; on s'arrête à Rachi et aux Tossafot |
| **Sujets sensibles** | Abordés de front, avec une page « Pour l'adulte qui accompagne » : la mort (gourde), les femmes (Berouria, Yalta, et les règles qui les écartent), les non-Juifs et les fausses citations en ligne, les miracles (faut-il croire que le caroubier a bougé ?), les exagérations | Champ `vigilance` dans les annotations ; renvoi vers un adulte dans le prompt de la hevrouta ; pas de chapitre dédié |
| **L'autre** | La havrouta humaine (ch. 12, « Les règles du jeu ») | La hevrouta IA (Claude), à coups ; la havrouta humaine prévue en v2 |
| **Mémoire** | « Ma question » : à relire **dans un an** | « Ma page » : première idée relue, notes en marge, export |
| **Graphisme** | Marine, or, papier ; cartes encadrées « Le texte » ; schéma de la page de Vilna ; typographie de livre | Papier, encre, rubrique ; feuille sur table, portail gravé, carte marine ; typographie de livre |

## Ce que les deux ont en commun (sans s'être concertés)
- Le **tutoiement**, le refus de résumer le Talmud, l'honnêteté sur ce qu'on ne sait pas (« certaines dates sont discutées », « la question reste ouverte »).
- **Répondre avant de lire** : « Réponds avant de tourner la page » (Ayeka, ch. 5) = « Ta première idée » et l'anticipation (Mahloket).
- **Reformuler l'avis adverse** : « Écris d'abord l'argument le plus fort de l'avis que tu ne partages pas » (Ayeka, ch. 4) = le coup obligatoire de l'arène de mahloket.
- Les **mêmes textes** : six de nos neuf sougyot sont dans le carnet (Berakhot 2a, Érouvin 13b, Bava Metsia 62a, Shabbat 31a, Bava Metsia 59b, Taanit 7a), et **Avot 2:16** — notre devise d'accueil — est son dernier chapitre.
- Le mot de la fin : « va, étudie » (זיל גמור) chez Hillel, « et examine encore » (ודוק) chez le Maharsha — le dernier mot est une tâche confiée au lecteur.
- Sefaria, CC BY-NC, Frank Ruhl Libre.

## Ce qu'Ayeka fait mieux, et qu'on devrait prendre
1. **« Ce texte : »** — trois lignes avant chaque extrait : quel livre, quel ordre, quelle langue, qui parle, quand, où. C'est plus clair que nos encadrés dispersés. À ajouter en tête de chaque sougya et de chaque segment qui change de voix.
2. **« Plus tard »** — nommer explicitement les commentaires postérieurs, et en citer des modernes (Hazon Ish et Rav Weinberg sur la gourde, Chajes sur l'aggada, Jacobs sur Beit Hillel). Notre app s'arrête aux Tossafot ; un ado a le droit de savoir que la discussion continue au XXe siècle.
3. **« Idée clé »** — une phrase à retenir par chapitre. Notre « Et alors ? » est plus long ; il lui manque cette phrase courte.
4. **Le cadre** : la petite histoire du Talmud, « Qui est qui ? » dans l'ordre du temps, l'anatomie de la page, le daf/amoud, la guématria, le glossaire. Tout cela est dans notre `04-bases-du-talmud.md` mais pas dans l'app. Ce sont des îles « hors parcours » à créer.
5. **Les chapitres qu'on n'a pas** : *Des questions bizarres, mais sérieuses* (Pessahim 10b — la souris, la belette, et un **teikou** : exactement la sougya « teikou » qui nous manquait) ; *Une règle ancienne devant une invention nouvelle* (shofar à la radio, machine à matsa, électricité — parle directement à un ado) ; *Les sages exagèrent parfois* (Houlin 90b) ; *Et les femmes dans le Talmud ?* (Berouria, Yalta) ; *Le Talmud et les autres peuples* (contre les fausses citations en ligne).
6. **« Pour l'adulte qui accompagne »** — une page qui dit où encadrer et ce qui a été simplifié. Notre champ `vigilance` devrait devenir cette page.
7. **Le papier** : le carnet se remplit au stylo et se relit dans un an. Notre « Ma page » devrait s'imprimer en A5.

## Ce que Mahloket fait que le carnet ne peut pas faire
1. **Rendre la forme visible** : le rôle de chaque coup, « répond à », la carte du débat, l'exercice de reconstruction. Le carnet dit « la Guemara pose deux questions » ; l'app fait jouer le coup suivant.
2. **Le texte entier** plutôt que l'extrait : on voit la Guemara avancer, revenir en arrière (BM 2a, segment 9), trancher — une sougya a une durée.
3. **Trois profondeurs sur le même segment**, et l'original mot à mot avec lexique.
4. **La hevrouta disponible à toute heure**, qui ne donne pas la réponse et fait reformuler l'adversaire.
5. **La quatrième couche** : les questions de l'ado imprimées dans la marge, en regard du segment.
6. **Pas de chemin obligé** : la mer, les îles, « on commence toujours au daf 2 ».

## Ce qui a été intégré (5 nov. 2026)
- **« Ce texte »**, **« Idée clé »**, **« Plus tard »**, **« À toi »** : champs ajoutés au schéma d'annotation et aux dix sougyot ; affichés dans l'app (écran du cas, « Et alors ? », après les segments concernés, Ma page).
- **Pessahim 10b** (ch. 6 d'Ayeka, la souris) : téléchargé, annoté, traduit, ouvert dans l'app — c'est la sougya « teikou » qui manquait. Nouveau parcours « Lire comme un sage ».
- **Repères** : histoire, Qui est qui, la page, le feuillet et ses lettres, glossaire, mots araméens — rédigés pour l'app dans nos mots (pas le texte d'Ayeka), structure créditée.
- **Pour l'adulte qui accompagne** : page `#/adulte` générée depuis les vigilances.
- **Impression A5** de Ma page.
- **Houlin 90b** (ch. 9, les exagérations) et **Berakhot 10a** (ch. 10, Beruria) : annotés, traduits, ouverts dans l'app — avec « Plus tard » (Rambam, Chajes, la remarque de lecture d'Ayeka sur *hataïm*), « À toi » (le classement « à la lettre / exagération / impossible à savoir »), et pour Beruria un encadré « Et les femmes dans le Talmud ? » qui ne lisse pas la contradiction, plus une vigilance sur la tradition rapportée par Rachi.
- Téléchargés, pas encore annotés : Roch Hachana 27b (le chofar et l'écho), Sanhédrin 56a (lois de Noé), Bava Kamma 113a (la loi du royaume ; le double standard et sa limitation).

## Conclusion : complémentaires, pas concurrents
Le carnet est le **cours** (13 idées, en classe, avec un adulte) ; l'app est l'**atelier** (une sougya, en profondeur, seul ou à deux). Les deux partagent déjà six textes, une devise, une pédagogie du « réponds avant » et une typographie. La jonction naturelle : chaque chapitre du carnet renvoie vers l'île correspondante de l'app (« pour lire la sougya entière et jouer le débat »), et chaque sougya de l'app renvoie vers l'« Idée clé » et les lectures « Plus tard » du carnet. Si Ayeka est partenaire, les traductions françaises du carnet (« établies pour ce carnet ») sont aussi la pièce qui nous manque le plus.
