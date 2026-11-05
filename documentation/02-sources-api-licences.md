# Sources de texte, API Sefaria et licences

## La bonne nouvelle : Steinsaltz est en accès libre sur Sefaria
Grâce à la **William Davidson Foundation**, Sefaria publie l'édition **Koren Noé** du Talmud de Babylone avec les traductions complètes de Steinsaltz :

| Version (`versionTitle`) | Langue | Contenu | Licence |
|---|---|---|---|
| `William Davidson Edition - Vocalized Aramaic` | he | Texte original **vocalisé et ponctué** par Steinsaltz | CC BY-NC |
| `William Davidson Edition - Aramaic` | he | Texte original non vocalisé | CC BY-NC |
| `William Davidson Edition - English` | en | Traduction anglaise **interpolée** (littéral + explications) | CC BY-NC |
| `William Davidson Edition - Hebrew` (livre `Steinsaltz on <Traité>`) | he | Commentaire/traduction en **hébreu moderne** | CC BY-NC |

⚠️ **Pas de version française libre** : la traduction française Steinsaltz (Biblieurope) est sous copyright. Pour une app francophone, deux options :
1. Faire **traduire/adapter en français par Claude** le texte anglais ou hébreu (adaptation autorisée par CC BY-NC *si* non commercial + attribution + mention des modifications) ;
2. Négocier une licence avec Biblieurope / le Centre Steinsaltz.

## Ce que la licence CC BY-NC 4.0 impose à l'app
- **NC — Non commercial** : pas de vente, pas d'abonnement payant, pas de pub monétisant ce contenu. (Une app gratuite d'une école / association = OK ; une app payante = non sans accord de Koren.)
- **BY — Attribution** : afficher par ex. *« Texte : The William Davidson Talmud, Koren Noé Talmud, R. Adin Even-Israel Steinsaltz, CC BY-NC 4.0, via Sefaria.org »* + lien vers la licence + indiquer si le texte a été modifié/traduit.
- Le code Sefaria est AGPLv3 (ne concerne que si on réutilise leur code, pas l'API).

## API Sefaria (aucune clé nécessaire)
Base : `https://www.sefaria.org`

| Endpoint | Usage dans l'app |
|---|---|
| `GET /api/v3/texts/{ref}?version=english\|William Davidson Edition - English&version=hebrew\|William Davidson Edition - Vocalized Aramaic&return_format=text_only` | Texte d'une page (amud) : araméen + anglais Steinsaltz, segment par segment |
| `GET /api/v3/texts/Steinsaltz_on_{Traité}.{daf}` | Commentaire hébreu moderne de Steinsaltz, aligné segment par segment |
| `GET /api/related/{ref}` | Liens : versets bibliques cités, Rashi, Tosafot, halakha, thèmes |
| `GET /api/calendars` | **Daf Yomi** du jour (idée : « défi du jour ») |
| `GET /api/topics/{slug}` | Textes par thème (ex. `shabbat`, `kindness`) |
| `GET /api/texts/versions/{titre}` | Lister les versions disponibles |
| `GET /api/v2/raw/index/{titre}` | Structure d'un traité (nombre de dapim, chapitres) |
| `GET /api/words/{mot}` | Dictionnaire (Jastrow, etc.) → popup « clique sur un mot » |

**Format des références** : `Berakhot.2a`, `Bava_Metzia.59b`, `Berakhot.2a.1` (segment 1), `Berakhot.2a.1-5` (plage).

Exemple testé (✅ fonctionne, 5 nov. 2026) :
```bash
curl "https://www.sefaria.org/api/v3/texts/Berakhot.2a.1?version=english&version=hebrew&return_format=text_only"
```
La réponse contient `versions[]` avec `text` = un tableau de segments, aligné entre langues (segment *i* anglais ↔ segment *i* araméen ↔ segment *i* de `Steinsaltz_on_…`).

### Règles d'usage demandées par Sefaria (llms.txt)
- Pas de scraping massif ; **≈1–2 s entre requêtes**, pas de boucles parallèles.
- Mettre en **cache** les textes (ils ne changent pas).
- Au-delà de quelques dizaines de requêtes → utiliser **Sefaria-Export**.
- Citer : référence + version + « via Sefaria.org ». Contact : developers@sefaria.org.

## Sefaria-Export (pour embarquer le contenu hors-ligne dans l'app)
- Fichiers dans le bucket public GCS `gs://sefaria-export/` (~26 Go au total, mais on ne prend que ce qu'il faut).
- Chemin type : `json/Talmud/Bavli/Seder Moed/Shabbat/English/William Davidson Edition - English.json`
- Un traité à la fois :
  ```bash
  curl -O "https://storage.googleapis.com/sefaria-export/json/Talmud/Bavli/Seder%20Zeraim/Berakhot/English/merged.json"
  ```
  (⚠️ `merged.json` mélange les versions → préférer le fichier nommé par `versionTitle` pour rester 100 % Steinsaltz/CC BY-NC.)
- `links/` (CSV des liens intertextuels), `schemas/`, `books.json` (index régénéré chaque mois).

## Corpus déjà téléchargé
Voir [`corpus/`](corpus/) et [03-corpus-passages.md](03-corpus-passages.md).

## Sources
- [Sefaria — The William Davidson Talmud](https://www.sefaria.org/william-davidson-talmud)
- [Sefaria — « Setting the Talmud Free »](https://www.sefaria.org/sheets/299315)
- [Sefaria — Steinsaltz (catégorie)](https://www.sefaria.org/texts/Talmud/Bavli/Modern%20Commentary%20on%20Talmud/Steinsaltz)
- [Sefaria Developers — Getting started](https://developers.sefaria.org/reference/getting-started)
- [Sefaria Developers — Texts v3](https://developers.sefaria.org/reference/text)
- [Sefaria llms.txt](https://www.sefaria.org/llms.txt)
- [GitHub — Sefaria-Export](https://github.com/Sefaria/Sefaria-Export)
- [Licence CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.fr)
