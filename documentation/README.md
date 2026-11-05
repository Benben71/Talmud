# Documentation — App d'initiation au Talmud pour ados (méthode Steinsaltz)

Recherche du 5 novembre 2026.

| Fichier | Contenu |
|---|---|
| [01-adin-steinsaltz.md](01-adin-steinsaltz.md) | Qui était Steinsaltz, sa méthode pédagogique, ses livres d'initiation |
| [02-sources-api-licences.md](02-sources-api-licences.md) | Où trouver les textes Steinsaltz (Sefaria), l'API, Sefaria-Export, **licence CC BY-NC** |
| [03-corpus-passages.md](03-corpus-passages.md) | 9 passages choisis pour des ados, avec questions de débat |
| [04-bases-du-talmud.md](04-bases-du-talmud.md) | Contenu des modules « bases » : structure, acteurs, glossaire |
| [05-pistes-app-ados.md](05-pistes-app-ados.md) | Idées de fonctionnalités, usage de Claude, points de vigilance, stack |
| [06-conception-editoriale-interface-pedagogie.md](06-conception-editoriale-interface-pedagogie.md) | **Conception** : 9 traits de la pensée talmudique → structure éditoriale (sougya en 6 temps, 3 profondeurs, parcours thématiques), interface (page en couches, carte du débat, hevrouta à coups, arène), mode d'apprentissage, fil rouge BM 2a |
| [07-prototype.md](07-prototype.md) | **Prototype v0** (`app/`) : ce qui est fait, ce qui manque, ce qu'il faut pour continuer |
| [09-comparaison-ayeka.md](09-comparaison-ayeka.md) | **Comparaison** avec le carnet « Ouvrir le Talmud » (Ayeka, Rav Emile Ackermann) : cours vs atelier, ce qu'on devrait prendre, ce qu'on apporte |
| [08-graphisme.md](08-graphisme.md) | **Univers graphique** : ce qu'on prend à la page de Vilna, tokens (papier, encre, rubrique, EB Garamond / Frank Ruhl Libre), règles |
| [`corpus/`](corpus/) | Textes JSON téléchargés (araméen vocalisé + anglais Steinsaltz + commentaire hébreu Steinsaltz) |
| [`corpus/fr/`](corpus/fr/) | Adaptations françaises (texte interpolé + histoire) — BM 2a seulement pour l'instant, non relues |
| [`corpus/annotations/`](corpus/annotations/) | Annotations éditoriales des 9 sougyot (rôles, carte du débat, cas, encadrés, hevrouta) — format dans [SCHEMA.md](corpus/annotations/SCHEMA.md), contrôle par `corpus/validate.py` |
| [corpus/annotations/RELECTURE.md](corpus/annotations/RELECTURE.md) | **Pour relire** : les annotations rendues lisibles, texte anglais Steinsaltz en regard (généré par `corpus/render_relecture.py`) |
| [corpus/annotations/POINTS-A-TRANCHER.md](corpus/annotations/POINTS-A-TRANCHER.md) | Les décisions de relecture : choix éditoriaux, points de contenu à vérifier, vigilance ado, manques du corpus |

## À retenir en 4 points
1. **Les traductions de Steinsaltz sont libres** (anglais + hébreu moderne + araméen vocalisé) sur Sefaria, sous **CC BY-NC 4.0** → l'app doit être **non commerciale** et citer la source.
2. **Pas de français libre** : l'édition française Steinsaltz (Biblieurope, achevée en 2026) est sous copyright → on adapte en français depuis l'anglais/l'hébreu (avec relecture humaine) ou on demande une licence.
3. **L'API Sefaria est gratuite et sans clé**, mais il faut cacher les résultats et rester sobre (1–2 s entre requêtes) ; pour le volume, utiliser Sefaria-Export.
4. La méthode Steinsaltz (texte découpé + traduction interpolée + encadrés) + la **hevrouta** (étude en binôme) jouée par Claude = le cœur pédagogique de l'app.

**Attribution à afficher dans l'app :**
> Texte : *The William Davidson Talmud* (Koren Noé Talmud), traduction et commentaire de R. Adin Even-Israel Steinsaltz — CC BY-NC 4.0 — via Sefaria.org. Adaptation française : [nom du projet].
