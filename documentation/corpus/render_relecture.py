#!/usr/bin/env python3
"""Génère annotations/RELECTURE.md : les annotations rendues lisibles, segment par segment,
avec le texte anglais Steinsaltz en regard pour vérifier chaque rôle et chaque résumé.

Usage :  python3 -I documentation/corpus/render_relecture.py
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ANN = ROOT / "annotations"
SYM = {"MISHNA": "▣", "RECIT": "✎", "ENSEIGNEMENT": "¶", "QUESTION": "?", "REPONSE": "↳",
       "OBJECTION": "✗", "PREUVE": "≡", "DISTINCTION": "⋔", "CONCLUSION": "★", "TEIKOU": "∞"}
ORDER = ["bava-metzia-2a", "berakhot-2a", "shabbat-31a", "eruvin-13b", "bava-metzia-59b",
         "bava-metzia-62a", "sanhedrin-37a", "taanit-7a", "taanit-23a"]

def strip_intro(en: str) -> str:
    # Les segments d'ouverture contiennent parfois une intro éditoriale avant « MISHNA: » / « GEMARA: ».
    for marker in ("MISHNA: ", "GEMARA: "):
        if marker in en and en.index(marker) > 0:
            return "[…] " + en[en.index(marker):]
    return en

def render(slug: str) -> str:
    a = json.loads((ANN / f"{slug}.json").read_text())
    c = json.loads((ROOT / f"{slug}.json").read_text())
    en = c["english_steinsaltz"]
    lo, hi = a["sougya"]["segments"]
    out = []
    out.append(f"\n\n---\n\n# {a['titre']}\n")
    out.append(f"**{a['ref'].replace('_', ' ').replace('.', ' ')}** · parcours *{', '.join(a['parcours'])}* · ~{a['duree_min']} min · "
               f"sougya = segments **{lo}–{hi}** sur {len(en)} · [annotations/{slug}.json](annotations/{slug}.json) · [{c['url']}]({c['url']})\n")
    if a["sougya"].get("actes"):
        out.append("**Actes :** " + " · ".join(f"{x['titre']} ({x['segments'][0]}–{x['segments'][1]})" for x in a["sougya"]["actes"]) + "\n")
    out.append(f"> *Note sur les bornes :* {a['sougya']['note']}\n")
    out.append(f"**Cas transposé :** {a['cas']['transpose']}\n\n**Cas d'époque :** {a['cas']['epoque']}\n\n**Première idée :** {a['premiere_idee']}\n")
    if a.get("vigilance"):
        out.append(f"⚠️ **Vigilance :** {a['vigilance']}\n")

    out.append("\n## Carte du débat (segments de la sougya)\n")
    out.append("```")
    for s in a["segments"]:
        if not s["dans_sougya"]:
            continue
        def first(r):
            return r[0] if isinstance(r, list) else r
        depth = 0
        p = first(s["repond_a"])
        seen = set()
        while p is not None and p not in seen:
            seen.add(p)
            depth += 1
            p = first(a["segments"][p]["repond_a"])
        r = s["repond_a"]
        arrow = ("→" + ",".join(map(str, r)) if isinstance(r, list) else f"→{r}") if r is not None else "  "
        out.append(f"{'  ' * depth}{SYM[s['role']]} [{s['i']:>2}] {s['role']:<12} {arrow:<4} {s['voix']}")
    out.append("```\n")

    out.append("\n## Segments\n")
    for s in a["segments"]:
        i = s["i"]
        tag = "" if s["dans_sougya"] else " *(hors sougya)*"
        out.append(f"### [{i}] {SYM[s['role']]} {s['role']} — {s['voix']}{tag}")
        if s["repond_a"] is not None:
            rr = s["repond_a"] if isinstance(s["repond_a"], list) else [s["repond_a"]]
            out.append("répond à " + ", ".join(f"**[{x}]**" for x in rr) + "  ")
        out.append(f"\n**Résumé FR :** {s['resume_fr']}\n")
        if s.get("decoupage_suggere"):
            out.append("**Découpage suggéré :** " + " → ".join(s["decoupage_suggere"]) + "\n")
        for e in s.get("encadres", []):
            out.append(f"- **[{e['type']}] {e['titre']}** — {e['texte']}")
        if s.get("encadres"):
            out.append("")
        text = strip_intro(en[i]) if i == 0 else en[i]
        out.append(f"<details><summary>Texte anglais Steinsaltz (segment {i})</summary>\n\n{text}\n\n</details>\n")

    ea = a["et_alors"]
    out.append("\n## Et alors ?\n")
    out.append(f"**Type :** {ea['type']}  \n**Principe :** {ea['principe']}  \n**Avis écarté :** {ea.get('avis_ecarte') or '—'}  \n**Halakha :** {ea.get('halakha') or '—'}\n")
    out.append(f"**Outils :** {', '.join(a['outils'])} · **Personnages :** {', '.join(a['personnages'])}\n")
    out.append("\n## Amorces de hevrouta\n")
    for q in a["questions_hevrouta"]:
        out.append(f"- **« {q['amorce']} »** → {q['piste']}")
    out.append("\n## Liens\n")
    for l in a["liens"]:
        out.append(f"- `{l['ref']}` — {l['pourquoi']}")
    return "\n".join(out)

def main():
    head = ["# Relecture des annotations — 9 sougyot",
            "",
            "Document généré par `render_relecture.py` à partir de `annotations/*.json` : **ne pas éditer ici**, corriger le JSON puis régénérer.",
            "Pour chaque segment : le rôle attribué, le résumé français, les encadrés, et (dépliable) le texte anglais Steinsaltz pour vérifier.",
            "",
            "Légende des rôles : " + " · ".join(f"{v} {k}" for k, v in SYM.items()),
            "",
            "## Sommaire",
            ""]
    body = []
    for slug in ORDER:
        a = json.loads((ANN / f"{slug}.json").read_text())
        anchor = a["titre"].lower()
        for ch in "«»'’:,?!.()":
            anchor = anchor.replace(ch, "")
        anchor = "-".join(anchor.split())
        head.append(f"- [{a['titre']}](#{anchor}) — {a['ref'].replace('_', ' ').replace('.', ' ')}")
        body.append(render(slug))
    (ANN / "RELECTURE.md").write_text("\n".join(head) + "\n".join(body) + "\n")
    print("écrit", ANN / "RELECTURE.md")

if __name__ == "__main__":
    main()
