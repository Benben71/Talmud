# Mahloket — prototype d'initiation au Talmud pour ados

Prototype de l'écran « page » + hevrouta sur une seule sougya (Bava Metzia 2a), selon [documentation/06-conception-editoriale-interface-pedagogie.md](../documentation/06-conception-editoriale-interface-pedagogie.md).

## Lancer

```bash
cd app && npm install
```
```bash
npm run dev
```

Ouvre http://localhost:5173. Deux processus : Vite (web, :5173) et le serveur hevrouta (Express, :8787, proxifié sous `/api`).

**Hevrouta avec OpenAI** : renseigner `OPENAI_API_KEY` dans `app/.env` (ou copier `.env.example` en `.env`). Le modèle par défaut est `gpt-6-luna`, modifiable avec `OPENAI_MODEL`. Le serveur lit la clé au démarrage ; relancer `npm run dev` après l'avoir ajoutée. Le fichier `.env` est ignoré par Git et la clé reste côté serveur. [Documentation officielle OpenAI](https://developers.openai.com/api/docs/quickstart).

**Claude en option** : si `OPENAI_API_KEY` est vide, renseigner `ANTHROPIC_API_KEY` et, au besoin, `HEVROUTA_MODEL` (défaut : `claude-opus-5-5`). Si les deux clés sont présentes, OpenAI est choisi. Sans clé, l'app tourne en **mode démo** (réponses scriptées à partir des amorces de l'éditeur) — tout le reste fonctionne. Pour Claude, le serveur active le repli serveur (`fallbacks: "default"`) en cas de refus de sécurité ; retirer `betas`/`fallbacks` dans `server/index.mjs` si on n'en veut pas.

**Vercel** : définir `app` comme dossier racine du projet et ajouter `OPENAI_API_KEY` aux variables d'environnement de Production. Sa valeur doit contenir uniquement la clé, sans `OPENAI_API_KEY=`, guillemets ni commentaire. Le build génère les fichiers de contenu, et `api/status.mjs` ainsi que `api/hevrouta.mjs` exposent les deux routes serveur. Après une modification de variable, redéployer le projet pour que la fonction utilise la nouvelle valeur.

## Ce que fait le prototype
Les six temps d'une sougya : **le cas** (transposé + d'époque) → **ta première idée** (écrite avant de lire) → **les voix & le débat** (lecture segment par segment) → **et alors ?** → **ma page**.

L'écran page :
- **trois profondeurs** commutables : Histoire (paraphrase), Texte (traduction interpolée : gras = littéral, normal = Steinsaltz), Original (araméen vocalisé, mot tactile → lexique Sefaria) ;
- **trois couches** : ◀ Rachi (résumé, encadrés MOT / PERSONNAGE / HALAKHA), Texte, Tossafot ▶ (encadrés OUTIL / CONTEXTE + *ta page sur ce segment* : tes kouchiot et teikou — la quatrième couche) ;
- chaque segment porte son **rôle** (Question, Réponse, Objection…) et « répond à [n] » ;
- **anticipation** : avant un segment de la Guemara, « que fait la Guemara maintenant ? » — on devine la forme, pas le contenu ;
- **hevrouta** à coups : Explique-moi / Je t'explique / Kouchia / Ta chma / Chani / Et lui, il dirait quoi ? / Teikou, plus un champ libre. Les kouchiot et teikou sont notés dans « Ma page » ;
- **carte du débat** (bouton « Carte ») : Lire (l'arbre réel, cliquable), Reconstruire (pour chaque coup de la Guemara, choisir son rôle et le coup auquel il répond), Mélangé (retrouver aussi l'ordre). À la fin : score et comparaison avec la carte réelle.

Dispositifs repris du carnet *Ouvrir le Talmud* (Ayeka) : **Ce texte** (contexte en tête de sougya), **Idée clé**, **Plus tard** (commentaires postérieurs datés), **À toi** (questions à écrire), **Repères** (histoire, qui est qui, la page, le daf, glossaire, mots araméens — `#/reperes/<sujet>`), **Pour l'adulte qui accompagne** (`#/adulte`), impression A5 de Ma page.

Quatre sougyot ouvertes : Bava Metsia 2a (le talit), Pessahim 10b (la souris, deux teikou), Houlin 90b (les exagérations), Berakhot 10a (Beruria). Registre dans `src/content/registry.ts`.

Tout ce que l'ado écrit est gardé dans `localStorage` (prototype : pas de compte).

**Navigation** : routeur sur le hash (`src/router.ts`) — `#/` la mer, `#/s/<slug>/cas|idee|page/<n>|carte|etalors|mapage` ; le bouton retour du navigateur fonctionne et un lien peut pointer sur un segment. Rail d'icônes à gauche (grand écran) ou barre d'onglets en bas (téléphone) : La mer · Lire · Carte · Hevrouta · Ma page (`src/components/Nav.tsx`). Flèches ← → au clavier et balayage tactile entre segments ; « Reprendre » sur l'accueil revient au dernier segment lu.

## Exporter les écrans en JPG
```bash
npm run screens
```
Chrome headless (déjà installé sur le Mac) capture chaque écran, `sips` convertit en JPG → `documentation/ecrans/` (9 vues grand écran + 5 vues téléphone). L'app doit tourner. Les captures utilisent l'état de démonstration (`?seed=1` dans l'adresse) et `&h=1` pour ouvrir la hevrouta.

## Graphisme
Sobre, inspiré de la page de Vilna : papier, encre, une seule couleur d'accent (le rouge de rubrique pour les coups du débat et les actions), EB Garamond pour le français, Frank Ruhl Libre pour l'hébreu, filets fins, petites capitales, titre courant (traité · chapitre · daf) sous un double filet, trois colonnes sur grand écran (Rachi · texte · Tossafot), marques מתני׳ / גמ׳. Principes et tokens dans [documentation/08-graphisme.md](../documentation/08-graphisme.md) ; tout est dans `src/index.css`.

## Structure
```
app/
  scripts/build-content.mjs   assemble documentation/corpus → src/content/*.json (lancé avant dev/build)
  server/index.mjs            POST /api/hevrouta (OpenAI, Claude ou démo), GET /api/status
  src/
    App.tsx                   les six temps, état global
    components/Page.tsx       l'écran page (profondeurs, couches, anticipation)
    components/Hevrouta.tsx   la palette de coups + chat
    components/Carte.tsx      la carte du débat : lire / reconstruire / mélangé
    components/Home.tsx       la page d'accueil en forme de daf
    components/Archipel.tsx   la mer du Talmud (SVG : une île par sougya)
    components/Temps.tsx      Cas, PremiereIdee, EtAlors, MaPage
    components/Original.tsx   araméen mot à mot + lexique Sefaria
    components/Interp.tsx     rendu « **littéral** explication »
    store.ts                  « Ma page » (localStorage)
    types.ts                  types + libellés des rôles et outils
```

Le contenu vient de `documentation/corpus/` : texte Sefaria (`<slug>.json`), annotations (`annotations/<slug>.json`), adaptation française (`fr/<slug>.fr.json`). Pour ajouter une sougya : écrire ses trois fichiers, l'ajouter à `SLUGS` dans `scripts/build-content.mjs`, puis la charger dans `App.tsx`.

## Licence du contenu
Texte : *The William Davidson Talmud* (Koren Noé Talmud), traduction et commentaire de R. Adin Even-Israel Steinsaltz — **CC BY-NC 4.0** — via Sefaria.org. L'app doit rester non commerciale et afficher cette attribution. L'adaptation française est un brouillon non relu.
