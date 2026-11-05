# Relecture : état après le rapport de vérification

Le [RAPPORT-VERIFICATION.md](RAPPORT-VERIFICATION.md) (relecture indépendante, 5 nov. 2026) a été **intégralement reporté dans les JSON** : les 15 problèmes bloquants et la quasi-totalité des mineurs. `validate.py` passe ; [RELECTURE.md](RELECTURE.md) est régénéré.

```bash
python3 -I documentation/corpus/validate.py
```
```bash
python3 -I documentation/corpus/render_relecture.py
```

## Ce qui a changé (résumé)
- **Principes réécrits** là où ils contredisaient le texte : BM 2a (la règle « voir n'est pas posséder » est vraie mais la sougya *abandonne* sa dérivation — c'est la méthode qu'on retient), Chabbat 31a (le Talmud *tranche* : patient comme Hillel — prologue de 30b téléchargé), Erouvin 13b (Rabbi Meïr : trop profond pour ses collègues, pas « convaincant ≠ vrai » ; la dispute « mieux vaut ne pas être créé » n'attribue pas les positions), BM 59b (la mer se calme : la défense de Rabban Gamliel est acceptée ; c'est l'humiliation, pas la victoire, qui coûte), BM 62a (la Guemara ne tranche pas ici), Taanit 23a (principe reformulé sans « préfère mourir » ; Honi est un maître, pas un « faiseur de pluie populaire »), Sanhedrin 37a (contrepoids de 37b : il faut témoigner).
- **Références corrigées** : Tossafot sur la voix céleste → **Berakhot 52a** (+ Yevamot 14a) ; Makkot 7a = quatre voix + teikou ; Sifra Behar **5:3** ; Yevamot 14b avec la baraïta ; Taanit 23b pour Abba Hilkiya ; Talmud de Jérusalem Sanhédrin 4:9 pour « une vie ».
- **Retiré** : la lecture « netsah » (remplacée par Pessahim 119a) ; la tradition « la loi suivra Beit Chammaï » ; « il tranche durement » ; « le parieur l'a choisi exprès » ; « pas un rabbin au sens classique ».
- **Schéma** : `repond_a` accepte une liste ; les suites de Mishna ont `null` ; règle « Steinsaltz explique… » quand c'est une interpolation ; « on le retrouve en… » au lieu de « déjà rencontré en… ».
- **Rôles** : BM 2a seg. 10 → DISTINCTION ; Erouvin 13b seg. 7 → ENSEIGNEMENT ; Taanit 23a seg. 9 → REPONSE, seg. 10 répond à 8.
- **Vigilance** : encadré ajouté sur les moqueries ethniques du parieur (Chabbat 31a) ; renvoi vers un adulte prévu sur la mort de Honi ; Sanhedrin 37a seg. 5 (sujet intime) signalé.

## Ce qui reste à trancher (choix éditoriaux, ton avis suffit)
| # | Point | Choix actuel | Alternative |
|---|---|---|---|
| A1 | Ton des cas transposés | Transposé + cas d'époque | Cas d'époque seul |
| A2 | Bornes larges (prologue Rabbi Meïr, pari des 400 zouz, Taanit 7a dès le fer) | Larges | Resserrer |
| A3 | Segments mixtes | Rôle dominant + `decoupage_suggere` | Découper dès maintenant |
| A4 | Rôle ENSEIGNEMENT | Gardé (8 segments en Erouvin 13b, 5 en Taanit 7a) | Fusionner dans PREUVE/RECIT |
| A5 | BM 62a (2 segments) | Gardé, enrichi du Sifra 5:3 en encadré | Remplacer |
| A6 | **Fusion des prologues/épilogues téléchargés** : Chabbat 30b seg. 11 en tête de Chabbat 31a ; Sanhedrin 37b seg. 0 en queue de Sanhedrin 37a | Signalé dans `sougya.note`, non fusionné (les index Sefaria changeraient) | Fusionner maintenant dans des fichiers `*-sougya.json` dédiés |
| A7 | **Makkot 7a** comme sougya « teikou » (segments 2 et 8 : quatre voix sur la peine de mort, et la Guemara laisse la question ouverte) | Téléchargé, non annoté | Annoter (≈1 h) |

## Ce qui reste invérifiable (pour un enseignant)
Numéros de paragraphes du Rambam et du Choulhan Aroukh (marqués « à confirmer » dans les JSON) ; manuscrits Kaufmann/Parma pour Sanhedrin 37a ; Derachot HaRan sermon 7 ; Yerouchalmi Taanit 3:9 (version du dormeur) ; Yerouchalmi Berakhot 4:1 (Rabbi Yehochoua aiguilletier) ; discussions des Aharonim sur la gourde commune.

## Vigilance ado (à valider par un enseignant / un parent)
| # | Fichier · segment | Point |
|---|---|---|
| C1 | eruvin-13b · 13 | « Mieux aurait valu ne pas être créé » — toujours avec « qu'il examine ses actes » |
| C2 | taanit-23a · 16 | Mort de Honi — renvoi vers un adulte prévu, à concrétiser dans l'app |
| C3 | bava-metzia-59b · 7-10 | Excommunication, mort de Rabban Gamliel |
| C4 | bava-metzia-62a | Dilemme de survie — jamais présenté comme conseil pratique |
| C5 | taanit-7a · 12-13 | « Élève digne » = conduite, pas niveau (Rambam) |
| C6 | shabbat-31a · 0-2 | Moqueries ethniques du parieur — encadré ajouté |
| C7 | sanhedrin-37a · 5 | Sujet intime (nidda) hors sougya — ne pas afficher sans encadrement |

## Corpus : téléchargé / manquant
- ✅ `shabbat-30b.json` (prologue « patient comme Hillel », seg. 11), `sanhedrin-37b.json` (« il faut témoigner », seg. 0), `makkot-7a.json` (quatre voix + teikou, seg. 2 et 8).
- ❌ Bava Metzia 58b-59a (le four lui-même, et « la blessure par les mots est plus grave que celle sur l'argent »), Taanit 23b (Abba Hilkiya), Berakhot 61b, Menahot 29b.
