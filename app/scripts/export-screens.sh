#!/usr/bin/env bash
# Exporte chaque écran de l'app en JPG, avec Chrome headless (déjà installé) et sips (macOS).
# Prérequis : l'app tourne (npm run dev) sur http://localhost:5173.
# Usage : scripts/export-screens.sh [dossier de sortie]   (défaut : ../documentation/ecrans)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="${1:-$HERE/../../documentation/ecrans}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="http://localhost:5173"
S="#/s/bava-metzia-2a"
mkdir -p "$OUT"
TMP="$(mktemp -d)"

shot() { # nom largeur hauteur url
  local name="$1" w="$2" h="$3" url="$4"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run --no-default-browser-check \
    --user-data-dir="$TMP/profile" --window-size="$w,$h" --virtual-time-budget=6000 \
    --screenshot="$TMP/$name.png" "$BASE/$url" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 88 "$TMP/$name.png" --out "$OUT/$name.jpg" >/dev/null
  echo "  $name.jpg  (${w}x${h})"
}

echo "→ $OUT"
# Grand écran
shot "01-accueil"               1440 1000 "#/?seed=1"
shot "01b-accueil-complet"      1440 1900 "#/?seed=1"
shot "02-le-cas"                1440 1000 "$S/cas?seed=1"
shot "03-premiere-idee"         1440 1000 "$S/idee?seed=1"
shot "04-la-page"               1440 1000 "$S/page/4?seed=1"
shot "05-la-page-hevrouta"      1440 1000 "$S/page/4?seed=1&h=1"
shot "06-carte-du-debat"        1440 1000 "$S/carte?seed=1"
shot "07-et-alors"              1440 1300 "$S/etalors?seed=1"
shot "08-ma-page"               1440 1500 "$S/mapage?seed=1"
shot "09-pesachim-le-cas"       1440 1000 "#/s/pesachim-10b/cas"
shot "10-pesachim-teikou"       1440 1000 "#/s/pesachim-10b/page/7"
shot "11-pesachim-et-alors"     1440 1300 "#/s/pesachim-10b/etalors"
shot "12-reperes-histoire"      1440 1300 "#/reperes/histoire"
shot "13-reperes-mots"          1440 1000 "#/reperes/mots"
shot "14-adulte"                1440 1300 "#/adulte"
shot "15-houlin-et-alors"       1440 1300 "#/s/chullin-90b/etalors"
shot "16-beruria-page"          1440 1000 "#/s/berakhot-10a/page/1"
# Téléphone (Chrome impose une fenêtre d'au moins 500 px de large)
shot "m1-accueil"               500 1000 "#/?seed=1"
shot "m4-la-page"               500 1000 "$S/page/4?seed=1"
shot "m5-hevrouta"              500 1000 "$S/page/4?seed=1&h=1"
shot "m6-carte"                 500 1000 "$S/carte?seed=1"
shot "m8-ma-page"               500 1000 "$S/mapage?seed=1"
rm -rf "$TMP"
echo "✓ $(ls "$OUT"/*.jpg | wc -l | tr -d ' ') images"
