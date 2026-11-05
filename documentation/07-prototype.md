# Prototype v0 — « Mahloket » (5 nov. 2026)

Code dans [`app/`](../app/README.md). Une seule sougya (Bava Metzia 2a), les six temps, l'écran page complet, la hevrouta.

## Ce qui est fait
| Élément de la conception (§06) | État |
|---|---|
| 6 temps : cas → première idée → voix & débat → et alors ? → ma page | ✅ |
| 3 profondeurs (Histoire / Texte interpolé / Original tactile) | ✅ — l'Original interroge le lexique Sefaria au tap |
| Page en couches (Rachi / Texte / Tossafot) + 4ᵉ couche (les questions de l'ado) | ✅ — boutons, pas encore de swipe |
| Rôle de chaque segment + « répond à » | ✅ |
| Anticipation « que fait la Guemara maintenant ? » | ✅ — score affiché dans « Et alors ? » |
| Hevrouta à coups (7 coups + libre), ancrée sur la sougya | ✅ — Claude (`claude-opus-5-5`, prompt système mis en cache) ou mode démo sans clé |
| Et alors ? (principe, halakha, avis écarté, outils, personnages, carte du débat) | ✅ — carte en texte, pas encore interactive |
| Ma page (première idée relue, kouchiot/teikou, texte libre, export) | ✅ — localStorage |
| Carte du débat interactive (bouton « Carte » dans la page) : mode Lire (arbre cliquable), **Reconstruire** (pour chaque coup de la Guemara : quel rôle ? à quoi répond-il ?) et **Mélangé** (il faut aussi retrouver l'ordre). Score rôles / liens / ordre, comparaison vert-rouge avec la carte réelle, meilleur score gardé et rappelé dans « Et alors ? » | ✅ |
| Arène de mahloket | ❌ (BM 2a n'a pas de mahloket ; attendre Erouvin 13b / BM 62a) |
| **Page d'accueil en forme de daf** : מַחְלוֹקֶת et la promesse en haut, **la mer du Talmud au centre** (archipel des 12 sougyot, SVG dessiné à la plume, visible sans défiler), parcours et voix en marge | ✅ — quatre îles ouvertes |
| **« Ta page » imprimée** : les notes de l'ado dans la marge du texte | ✅ |
| **Navigation d'app** : adresses par écran (`#/`, `#/s/<slug>/page/4`…) avec bouton retour, rail d'icônes à gauche sur grand écran, barre d'onglets en bas sur téléphone (La mer · Lire · Carte · Hevrouta · Ma page), stepper des temps, hevrouta en panneau coulissant sur mobile, flèches clavier et balayage entre segments, « Reprendre au segment n » sur l'accueil | ✅ |
| **Dispositifs repris du carnet Ayeka** : « Ce texte » (fiche de contexte sur l'écran du cas), « Idée clé » (en tête de « Et alors ? », sur les îles), « Plus tard » (commentaires postérieurs nommés et datés), « À toi » (questions à écrire après certains segments, rangées dans Ma page) | ✅ — champs ajoutés aux 10 annotations |
| **Quatre sougyot ouvertes** : Bava Metsia 2a (le talit), Pessahim 10b (la souris, deux teikou), Houlin 90b (les exagérations), Berakhot 10a (Beruria) — parcours « Lire comme un sage » et « Toi et l'autre » | ✅ |
| **Repères** (onglet) : une petite histoire du Talmud, Qui est qui, à quoi ressemble une page, le feuillet et ses lettres, glossaire, mots araméens | ✅ — rédigés pour l'app, structure inspirée d'Ayeka |
| **Pour l'adulte qui accompagne** (`#/adulte`) : ce que l'app fait et ne fait pas, vigilances sougya par sougya | ✅ |
| **Impression A5** de « Ma page » | ✅ — `@page A5`, bouton Imprimer |
| App multi-sougyot (registre `src/content/registry.ts`, titre courant par sougya, « Reprendre » sur la dernière commencée) | ✅ |
| Personnages à débloquer (fiches), outils comme collection | ❌ listes seulement |
| Hevrouta à deux, mode classe | ❌ v2 |

## Ce qu'il faut pour aller plus loin
1. **Une clé API** dans `app/.env` pour tester la vraie hevrouta (le prompt système est écrit, pas encore éprouvé sur de vrais échanges).
2. **Tester avec 3-4 ados** sur BM 2a : la profondeur par défaut (Texte aujourd'hui), le ton du cas transposé, la durée réelle (15 min visées), si l'anticipation est perçue comme un jeu ou une corvée.
3. **Traduire les autres sougyot** (`documentation/corpus/fr/<slug>.fr.json`, 12 à 18 segments chacune) — BM 59b (four d'Akhnaï) et Chabbat 31a (Hillel) en premier : ce sont les récits forts.
4. Découper les segments mixtes (`decoupage_suggere`) en sous-segments pour que l'anticipation porte sur un seul coup.
5. **Mineurs et API Claude** : vérifier la Usage Policy d'Anthropic avant tout test avec de vrais ados ; prévoir le renvoi vers un adulte (déjà dans le prompt) et la modération.

## Décisions prises dans le prototype (à revoir si besoin)
- Profondeur par défaut : **Texte** (interpolé). L'Histoire est à un tap.
- L'original n'est jamais « la version difficile » : il est toujours repliable sous le texte (« la vraie page »).
- L'anticipation ne porte que sur les segments de la Guemara (pas sur la Mishna ni les récits).
- Les kouchiot posées dans la hevrouta deviennent automatiquement des notes de « Ma page » et apparaissent dans la couche Tossafot du segment.
- Pas de compte, pas de serveur de données : tout est dans le navigateur. La clé API ne quitte jamais le serveur Node.
