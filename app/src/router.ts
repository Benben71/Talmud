// Un routeur minuscule sur le hash : chaque écran a une adresse, le bouton « retour » fonctionne,
// un lien peut pointer sur un segment précis.
//   #/                                   accueil (la mer)
//   #/s/<slug>/cas | idee | page/<n> | carte | etalors | mapage
//   #/reperes/<sujet>                    histoire, qui-est-qui, la-page, le-daf, glossaire, mots
//   #/adulte                             pour l'adulte qui accompagne
//   #/questions[/<id>[/carte|hevrouta]]  les grandes questions : la liste, puis le débat, sa carte, sa hevrouta
//   #/ma-page                            ma page : mes avis et mes réponses sur toutes les questions
// Options après « ? » : h=1 ouvre la hevrouta, seed=1 charge un état de démonstration.
import { useEffect, useState } from "react";

export type Screen = "cas" | "idee" | "page" | "carte" | "etalors" | "mapage";
export type Sujet = "histoire" | "qui-est-qui" | "la-page" | "le-daf" | "glossaire" | "mots";
export type Route =
  | { kind: "home" }
  | { kind: "sougya"; slug: string; screen: Screen; seg?: number }
  | { kind: "reperes"; sujet: Sujet }
  | { kind: "adulte" }
  | { kind: "questions"; id: string | null; vue: Vue }
  | { kind: "mapage" };

// Les trois vues d'une grande question : le débat (lire), la carte des camps, la hevrouta.
export type Vue = "debat" | "carte" | "hevrouta";
const VUES: Vue[] = ["debat", "carte", "hevrouta"];

const SCREENS: Screen[] = ["cas", "idee", "page", "carte", "etalors", "mapage"];
export const SUJETS: Sujet[] = ["histoire", "qui-est-qui", "la-page", "le-daf", "glossaire", "mots"];

export function options(hash: string): Record<string, string> {
  const q = hash.split("?")[1] ?? "";
  return Object.fromEntries(q.split("&").filter(Boolean).map((kv) => kv.split("=") as [string, string]));
}

export function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, "").split("?")[0].split("/").filter(Boolean);
  if (parts[0] === "s" && parts[1]) {
    const screen = (SCREENS as string[]).includes(parts[2]) ? (parts[2] as Screen) : "cas";
    const seg = screen === "page" && parts[3] !== undefined && !Number.isNaN(Number(parts[3])) ? Number(parts[3]) : undefined;
    return { kind: "sougya", slug: parts[1], screen, seg };
  }
  if (parts[0] === "reperes") return { kind: "reperes", sujet: (SUJETS as string[]).includes(parts[1]) ? (parts[1] as Sujet) : "histoire" };
  if (parts[0] === "adulte") return { kind: "adulte" };
  if (parts[0] === "questions") return { kind: "questions", id: parts[1] ?? null, vue: (VUES as string[]).includes(parts[2]) ? (parts[2] as Vue) : "debat" };
  if (parts[0] === "ma-page") return { kind: "mapage" };
  return { kind: "home" };
}

export function build(r: Route): string {
  if (r.kind === "home") return "#/";
  if (r.kind === "reperes") return `#/reperes/${r.sujet}`;
  if (r.kind === "adulte") return "#/adulte";
  if (r.kind === "questions") return r.id ? `#/questions/${r.id}${r.vue !== "debat" ? `/${r.vue}` : ""}` : "#/questions";
  if (r.kind === "mapage") return "#/ma-page";
  return `#/s/${r.slug}/${r.screen}${r.screen === "page" && r.seg !== undefined ? `/${r.seg}` : ""}`;
}

export function navigate(r: Route, replace = false) {
  const h = build(r);
  if (replace) history.replaceState(null, "", h);
  else if (location.hash !== h) location.hash = h;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(location.hash));
  useEffect(() => {
    const on = () => setRoute(parse(location.hash));
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return route;
}
