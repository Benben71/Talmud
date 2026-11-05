#!/usr/bin/env python3
"""Contrôle de cohérence des annotations de sougya.

Usage :  python3 -I documentation/corpus/validate.py
Vérifie, pour chaque annotations/<slug>.json :
  - qu'un corpus/<slug>.json existe et que chaque segment i y correspond ;
  - que tous les segments du corpus sont annotés (0..n-1, sans trou ni doublon) ;
  - que les rôles, types d'encadrés et outils sont dans les listes autorisées ;
  - que repond_a pointe vers un segment antérieur ;
  - que les bornes de la sougya et des actes sont valides ;
  - que les segments dans_sougya forment exactement l'intervalle sougya.segments.
"""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ROLES = {"MISHNA","RECIT","ENSEIGNEMENT","QUESTION","REPONSE","OBJECTION","PREUVE","DISTINCTION","CONCLUSION","TEIKOU"}
ENCADRES = {"PERSONNAGE","MOT","CONTEXTE","HALAKHA","OUTIL"}
OUTILS = {"DIYOUK","KAL_VAHOMER","TSRIKHA","CHANI","TA_CHMA","ROV","SEYAG","MAHLOKET","DERACHA","LECTURE_PLURIEL","CAS_LIMITE","TEIKOU","GUZMA","FIN_DU_VERSET"}
ET_ALORS = {"HALAKHA","TEIKOU","OUVERTURE","RECIT"}

def check(path):
    errs = []
    a = json.loads(path.read_text())
    slug = a["slug"]
    src = ROOT / f"{slug}.json"
    if not src.exists():
        return [f"{slug}: corpus manquant {src.name}"]
    c = json.loads(src.read_text())
    n = len(c["english_steinsaltz"])
    if a["ref"] != c["ref"]:
        errs.append(f"{slug}: ref {a['ref']} != corpus {c['ref']}")
    idx = [s["i"] for s in a["segments"]]
    if idx != list(range(n)):
        errs.append(f"{slug}: segments annotés {idx} != attendus 0..{n-1}")
    lo, hi = a["sougya"]["segments"]
    if not (0 <= lo <= hi < n):
        errs.append(f"{slug}: bornes sougya invalides {lo}-{hi} (n={n})")
    for act in a["sougya"].get("actes", []):
        alo, ahi = act["segments"]
        if not (lo <= alo <= ahi <= hi):
            errs.append(f"{slug}: acte « {act['titre']} » {alo}-{ahi} hors sougya {lo}-{hi}")
    for s in a["segments"]:
        i = s["i"]
        if s["role"] not in ROLES:
            errs.append(f"{slug}[{i}]: rôle inconnu {s['role']}")
        r = s.get("repond_a")
        for rr in ([] if r is None else (r if isinstance(r, list) else [r])):
            if not (isinstance(rr, int) and 0 <= rr < i):
                errs.append(f"{slug}[{i}]: repond_a={r} doit contenir des index < {i}")
        if s["dans_sougya"] != (lo <= i <= hi):
            errs.append(f"{slug}[{i}]: dans_sougya={s['dans_sougya']} incohérent avec {lo}-{hi}")
        if not s.get("resume_fr"):
            errs.append(f"{slug}[{i}]: resume_fr vide")
        for e in s.get("encadres", []):
            if e["type"] not in ENCADRES:
                errs.append(f"{slug}[{i}]: encadré type inconnu {e['type']}")
    for o in a.get("outils", []):
        if o not in OUTILS:
            errs.append(f"{slug}: outil inconnu {o}")
    if a["et_alors"]["type"] not in ET_ALORS:
        errs.append(f"{slug}: et_alors.type inconnu {a['et_alors']['type']}")
    for q in a.get("a_toi", []):
        if not (lo <= q.get("apres_segment", -1) <= hi):
            errs.append(f"{slug}: a_toi.apres_segment={q.get('apres_segment')} hors sougya {lo}-{hi}")
    for p in a.get("plus_tard", []):
        if not p.get("qui") or not p.get("texte"):
            errs.append(f"{slug}: plus_tard incomplet (qui/texte)")
    for k in ("ce_texte", "idee_cle"):
        if k not in a:
            errs.append(f"{slug}: champ manquant {k} (avertissement)")
    return errs

def main():
    files = sorted((ROOT / "annotations").glob("*.json"))
    total_err = 0
    for f in files:
        errs = check(f)
        total_err += len(errs)
        a = json.loads(f.read_text())
        lo, hi = a["sougya"]["segments"]
        roles = {}
        for s in a["segments"]:
            if s["dans_sougya"]:
                roles[s["role"]] = roles.get(s["role"], 0) + 1
        status = "OK " if not errs else "ERR"
        print(f"{status} {a['slug']:<18} sougya {lo:>2}-{hi:<2} ({hi-lo+1:>2} seg)  {dict(sorted(roles.items()))}")
        for e in errs:
            print("     -", e)
    print(f"\n{len(files)} fichiers, {total_err} erreur(s)")
    sys.exit(1 if total_err else 0)

if __name__ == "__main__":
    main()
