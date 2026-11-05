import { useEffect, useState } from "react";
import type { ChatMessage, Depth, Layer, Sougya } from "./types";
import { useMaPage } from "./store";
import { navigate, options, useRoute, type Route, type Screen } from "./router";
import { CATALOGUE, DEFAULT_SLUG, SOUGYOT } from "./content/registry";
import { Page } from "./components/Page";
import { Hevrouta } from "./components/Hevrouta";
import { Cas, PremiereIdee, EtAlors, MaPageScreen } from "./components/Temps";
import { Carte } from "./components/Carte";
import { Home } from "./components/Home";
import { Reperes } from "./components/Reperes";
import { Adulte } from "./components/Adulte";
import { Nav, type NavKey } from "./components/Nav";

const STEPS: { screen: Screen; label: string }[] = [
  { screen: "cas", label: "Le cas" }, { screen: "idee", label: "Première idée" }, { screen: "page", label: "Les voix & le débat" },
  { screen: "etalors", label: "Et alors ?" }, { screen: "mapage", label: "Ma page" },
];
const MOTTO_HE = "לֹא עָלֶיךָ הַמְּלָאכָה לִגְמֹר"; // Avot 2:16 — « Ce n'est pas à toi d'achever l'ouvrage »

function useMode() {
  const [mode, setMode] = useState("…");
  useEffect(() => { fetch("/api/status").then((r) => r.json()).then((d) => setMode(d.mode)).catch(() => setMode("hors ligne")); }, []);
  return mode;
}

// Le dernier slug ouvert, pour que l'onglet « Lire » ait un sens depuis l'accueil ou les repères.
function lastSlug(): string {
  try { return localStorage.getItem("talmud:last") ?? DEFAULT_SLUG; } catch { return DEFAULT_SLUG; }
}

export default function App() {
  const route = useRoute();
  const mode = useMode();
  const slug = route.kind === "sougya" && SOUGYOT[route.slug] ? route.slug : null;
  useEffect(() => { if (slug) try { localStorage.setItem("talmud:last", slug); } catch { /* ignore */ } }, [slug]);

  const home = () => navigate({ kind: "home" });
  const openSougya = (s: string, screen: Screen = "cas", seg?: number) => navigate({ kind: "sougya", slug: s, screen, seg });

  const navActive: NavKey | null = route.kind === "home" ? "mer" : route.kind === "reperes" || route.kind === "adulte" ? "reperes" : null;
  const onNavGlobal = (k: NavKey) => {
    if (k === "mer") home();
    else if (k === "reperes") navigate({ kind: "reperes", sujet: "histoire" });
    else if (k === "lire" || k === "hevrouta") openSougya(lastSlug(), "page");
    else if (k === "carte") openSougya(lastSlug(), "carte");
    else if (k === "mapage") openSougya(lastSlug(), "mapage");
  };

  return (
    <div className="h-full overflow-hidden md:p-5 print:p-0">
      <div className="sheet relative flex h-full flex-col overflow-hidden print:shadow-none">
        <div className="sheet-edge hidden md:block print:hidden" />
        {slug ? (
          <SougyaShell key={slug} sougya={SOUGYOT[slug]} route={route} mode={mode} onHome={home} />
        ) : (
          <>
            <header className="relative z-10 px-4 pt-2 md:px-8">
              <div className="flex items-baseline justify-between text-sm">
                <button onClick={home} className="sc-up text-ink hover:text-rubric">Mahloket</button>
                <span className="he hidden text-base text-ink-2 md:inline">{MOTTO_HE}</span>
                <span className="sc text-ink-2">avot 2:16</span>
              </div>
              <div className="rule-double mt-1" />
            </header>
            <div className="flex min-h-0 flex-1">
              <Nav variant="rail" active={navActive} onGo={onNavGlobal} />
              <div className="relative min-w-0 flex-1 overflow-y-auto">
                {route.kind === "home" && <Home catalogue={CATALOGUE} texture={SOUGYOT[DEFAULT_SLUG]} onStart={(s) => openSougya(s, "cas")} onResume={(s, seg) => openSougya(s, "page", seg)} onReperes={() => navigate({ kind: "reperes", sujet: "histoire" })} onAdulte={() => navigate({ kind: "adulte" })} />}
                {route.kind === "reperes" && <Reperes sujet={route.sujet} onSujet={(s) => navigate({ kind: "reperes", sujet: s })} catalogue={CATALOGUE} onStart={(s) => openSougya(s, "cas")} />}
                {route.kind === "adulte" && <Adulte catalogue={CATALOGUE} onStart={(s) => openSougya(s, "cas")} />}
              </div>
            </div>
            <Nav variant="tabs" active={navActive} onGo={onNavGlobal} />
          </>
        )}
      </div>
    </div>
  );
}

function SougyaShell({ sougya, route, mode, onHome }: { sougya: Sougya; route: Route; mode: string; onHome: () => void }) {
  const { state, update, reset } = useMaPage(sougya.slug);
  const [depth, setDepth] = useState<Depth>("texte");
  const [layer, setLayer] = useState<Layer>("texte");
  const [hevroutaOpen, setHevroutaOpen] = useState(() => options(location.hash).h === "1");

  const screen: Screen = route.kind === "sougya" ? route.screen : "cas";
  const routeSeg = route.kind === "sougya" ? route.seg : undefined;
  const firstSeg = sougya.segments[0].i;
  const index = screen === "page" && routeSeg !== undefined ? routeSeg : (state.last_segment ?? firstSeg);
  const seg = sougya.segments.find((s) => s.i === index) ?? sougya.segments[0];

  useEffect(() => {
    if (screen === "page" && routeSeg !== undefined && routeSeg !== state.last_segment) update({ last_segment: routeSeg });
  }, [screen, routeSeg, state.last_segment, update]);

  const go = (s: Screen, segI?: number) => navigate({ kind: "sougya", slug: sougya.slug, screen: s, seg: s === "page" ? (segI ?? index) : undefined });
  const userQuestions = state.notes.filter((n) => n.kind === "kouchia" || n.kind === "teikou").map((n) => ({ segment: n.segment, text: n.text }));

  function onMessage(m: ChatMessage) {
    update((s) => ({
      chat: [...s.chat, m],
      notes: m.role === "user" && m.move === "kouchia" && m.content ? [...s.notes, { at: new Date().toISOString(), segment: m.segment ?? null, kind: "kouchia", text: m.content }] : s.notes,
    }));
  }
  function onTeikou(q: string) {
    update((s) => ({ notes: [...s.notes, { at: new Date().toISOString(), segment: index, kind: "teikou", text: q }] }));
  }
  // « À toi » : une réponse écrite, rangée dans les notes (une seule par segment, remplacée si on réécrit).
  function onAToi(segI: number, text: string) {
    update((s) => ({ notes: [...s.notes.filter((n) => !(n.kind === "note" && n.segment === segI)), ...(text.trim() ? [{ at: new Date().toISOString(), segment: segI, kind: "note" as const, text }] : [])] }));
  }

  const navActive: NavKey = hevroutaOpen ? "hevrouta" : screen === "carte" ? "carte" : screen === "mapage" ? "mapage" : "lire";
  const onNav = (k: NavKey) => {
    if (k === "hevrouta") { if (screen !== "page") go("page"); setHevroutaOpen((v) => !v); return; }
    setHevroutaOpen(false);
    if (k === "mer") onHome();
    else if (k === "reperes") navigate({ kind: "reperes", sujet: "histoire" });
    else if (k === "lire") go(state.visited.length || state.premiere_idee ? "page" : "cas");
    else if (k === "carte") go("carte");
    else if (k === "mapage") go("mapage");
  };
  const stepIndex = STEPS.findIndex((s) => s.screen === (screen === "carte" ? "page" : screen));

  return (
    <>
      <header className="relative z-10 px-4 pt-2 md:px-8 print:hidden">
        <div className="flex items-baseline justify-between text-sm">
          <button onClick={onHome} className="sc-up text-ink hover:text-rubric">Mahloket</button>
          <span className="he hidden text-base text-ink-2 md:inline">{sougya.he.chapter}</span>
          <span className="he text-lg font-medium">{sougya.he.tractate} <span className="font-bold">{sougya.he.daf}</span></span>
        </div>
        <div className="rule-double mt-1" />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-y-1 pb-2">
          <nav className="flex flex-wrap items-baseline gap-x-1 text-sm" aria-label="Étapes">
            {STEPS.map((s, k) => {
              const done = k < stepIndex; const now = k === stepIndex;
              return (
                <span key={s.screen} className="flex items-baseline">
                  {k > 0 && <span className="mx-1.5 text-rule">—</span>}
                  <button onClick={() => go(s.screen)} className={`sc flex items-baseline gap-1.5 ${now ? "rubric font-semibold" : done ? "text-ink" : "text-ink-2 hover:text-ink"}`}>
                    <span className={`inline-block h-[9px] w-[9px] translate-y-[-1px] rounded-full border ${now ? "border-rubric bg-rubric" : done ? "border-ink bg-ink" : "border-rule"}`} />
                    <span className="hidden md:inline">{s.label}</span>
                    <span className="md:hidden" style={{ fontVariant: "normal" }}>{k + 1}</span>
                  </button>
                </span>
              );
            })}
          </nav>
          {screen === "page" && (
            <div className="hidden gap-2 md:flex">
              <button onClick={() => go("carte")} className="btn btn-sm">Carte</button>
              <button onClick={() => setHevroutaOpen((v) => !v)} className={`btn btn-sm ${hevroutaOpen ? "btn-on" : ""}`}>
                Hevrouta{state.chat.length > 0 && <span className="ml-1 opacity-70" style={{ fontVariant: "normal" }}>({state.chat.length})</span>}
              </button>
            </div>
          )}
          {screen === "carte" && <button onClick={() => go("page")} className="btn btn-sm hidden md:inline-block">← Retour à la page</button>}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 border-t hairline print:border-0">
        <Nav variant="rail" active={navActive} onGo={onNav} badge={{ hevrouta: state.chat.length || undefined }} />
        <div className="relative min-w-0 flex-1 overflow-y-auto">
          {screen === "cas" && <Cas s={sougya} onNext={() => go("idee")} />}
          {screen === "idee" && <PremiereIdee s={sougya} value={state.premiere_idee} onChange={(v) => update({ premiere_idee: v })} onNext={() => go("page", firstSeg)} />}
          {screen === "carte" && (
            <Carte sougya={sougya} best={state.carte} onGo={(i) => go("page", i)}
              onScore={(s) => update((st) => ({ carte: !st.carte || s.roles + s.liens + s.ordre > st.carte.roles + st.carte.liens + st.carte.ordre ? s : st.carte }))} />
          )}
          {screen === "page" && (
            <Page sougya={sougya} index={index} depth={depth} layer={layer} anticipations={state.anticipations}
              onDepth={setDepth} onLayer={setLayer}
              onGo={(i) => { go("page", i); update((s) => ({ visited: s.visited.includes(i) ? s.visited : [...s.visited, i] })); }}
              onAnticipate={(segI, guess, correct) => update((s) => ({ anticipations: { ...s.anticipations, [segI]: { guess, correct } } }))}
              userQuestions={userQuestions}
              aToiAnswers={Object.fromEntries(state.notes.filter((n) => n.kind === "note" && n.segment !== null).map((n) => [n.segment as number, n.text]))}
              onAToi={onAToi}
              onFinish={() => go("etalors")} />
          )}
          {screen === "etalors" && <EtAlors s={sougya} anticipations={state.anticipations} carte={state.carte} onNext={() => go("mapage")} />}
          {screen === "mapage" && <MaPageScreen s={sougya} page={state} onChange={(v) => update({ ma_page: v })} onRestart={() => { reset(); go("cas"); }} onHome={onHome} />}

          {screen === "page" && hevroutaOpen && (
            <div className="absolute inset-x-0 bottom-0 top-[14%] z-20 flex flex-col border-t border-ink bg-paper shadow-[0_-12px_30px_rgba(0,0,0,.18)] md:hidden">
              <button onClick={() => setHevroutaOpen(false)} className="flex items-center justify-center py-1.5" aria-label="Fermer la hevrouta">
                <span className="h-[3px] w-10 rounded-full bg-rule" />
              </button>
              <div className="min-h-0 flex-1"><Hevrouta sougya={sougya} segment={seg} history={state.chat} onMessage={onMessage} onTeikou={onTeikou} mode={mode} /></div>
            </div>
          )}
        </div>
        {screen === "page" && hevroutaOpen && (
          <div className="hidden w-[380px] border-l hairline bg-paper-2/50 md:block">
            <Hevrouta sougya={sougya} segment={seg} history={state.chat} onMessage={onMessage} onTeikou={onTeikou} mode={mode} />
          </div>
        )}
      </div>
      <Nav variant="tabs" active={navActive} onGo={onNav} badge={{ hevrouta: state.chat.length || undefined }} />
    </>
  );
}
