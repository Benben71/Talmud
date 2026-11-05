// La page d'accueil a la forme d'un daf — mais le « texte » au centre de la page, c'est la mer :
// la navigation est visible sans défiler. En haut, dans la bande de commentaire : le mot, la promesse,
// et deux lignes sur le Talmud et sur la méthode. Dans les marges : les parcours, les voix, les outils,
// et le vrai texte hébreu. Chaque bloc est une porte.
import type { Catalogue, Sougya } from "../types";
import { OUTIL_LABEL, PARCOURS } from "../types";
import { readProgress } from "../store";
import { Archipel } from "./Archipel";
import { Fleuron } from "./Fleuron";

export function Home({ catalogue, texture, onStart, onResume, onReperes, onAdulte }: {
  catalogue: Catalogue[]; texture: Sougya;
  onStart: (slug: string) => void; onResume: (slug: string, seg: number) => void; onReperes: () => void; onAdulte: () => void;
}) {
  const ouverts = catalogue.filter((c) => c.disponible);
  const enCours = ouverts.map((c) => ({ c, p: readProgress(c.slug) })).filter((x) => x.p.started && x.p.last_segment !== null);
  const resume = enCours[0] ?? null;
  const first = ouverts[0];
  const personnages = [...new Set(catalogue.flatMap((c) => c.personnages))];
  const outils = [...new Set(catalogue.flatMap((c) => c.outils))];
  const byParcours = (id: string) => catalogue.filter((c) => c.parcours.includes(id));
  const heLeft = texture.segments.slice(0, 4).map((s) => s.hebrew).join(" ");
  const heRight = texture.segments.slice(4, 9).map((s) => s.hebrew).join(" ");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-3 md:px-6">
      <Fleuron className="mb-3" />

      {/* Le haut de la page : le mot et la promesse à gauche, deux lignes de commentaire à droite */}
      <section className="grid items-end gap-x-10 gap-y-4 md:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-5">
            <span className="he text-[3.4rem] font-bold leading-none tracking-tight md:text-[4.2rem]">מַחְלוֹקֶת</span>
            <span className="sc text-[13px] text-ink-2">mahloket · le désaccord qu'on garde</span>
          </div>
          <h1 className="mt-2 text-[1.6rem] leading-tight md:text-[1.9rem]">Entre dans le plus grand débat de l'histoire.</h1>
          <p className="mt-2 max-w-xl text-[15px] leading-snug text-ink-2">
            Une initiation au Talmud pour les 12-17 ans, dans la méthode du rabbin Adin Steinsaltz : le texte original à portée de main, une traduction qui explique en marchant, et une hevrouta qui ne te lâche pas tant que tu n'as pas posé ta question.
          </p>
        </div>
        <div className="grid gap-3 text-[13.5px] leading-snug text-ink-2">
          <p><span className="sc text-rubric">c'est quoi, le Talmud</span> — Un débat vieux de quinze siècles, mis par écrit sans ponctuation, où l'on a gardé les avis perdants et les questions sans réponse. On ne le lit pas : on y entre, et on prend la parole. <button className="underline decoration-rule underline-offset-2 hover:text-ink" onClick={onReperes}>Les repères</button> racontent le reste.</p>
          <p><span className="sc text-rubric">comment on apprend ici</span> — Jamais seul : avec une <em>hevrouta</em>, un binôme qui lit avec toi et te demande « pourquoi ? ». Chaque passage commence par un cas concret et par <em>ta</em> réponse, avant celle des sages. <button className="underline decoration-rule underline-offset-2 hover:text-ink" onClick={onAdulte}>Pour l'adulte qui accompagne</button>.</p>
        </div>
      </section>

      <div className="rule-double mt-4" />

      {/* Le corps de la page : marge · la mer · marge */}
      <section className="mt-4 grid gap-x-6 gap-y-6 lg:grid-cols-[190px_1fr_190px]">
        <aside className="order-2 lg:order-1">
          <div className="sc mb-2 border-t hairline pt-2 text-sm text-rubric">les parcours</div>
          <ul className="space-y-2.5">
            {PARCOURS.map((p) => {
              const list = byParcours(p.id);
              if (list.length === 0) return null;
              const dispo = list.filter((c) => c.disponible).length;
              return (
                <li key={p.id} className="text-[14px] leading-snug">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{p.label}</span>
                    <span className="sc text-[11px] text-ink-2">{dispo}/{list.length}</span>
                  </div>
                  <div className="text-[12.5px]">
                    {list.map((c, k) => (
                      <span key={c.slug}>
                        {k > 0 && <span className="text-rule"> · </span>}
                        {c.disponible
                          ? <button className="underline decoration-rule underline-offset-2 hover:decoration-ink" onClick={() => onStart(c.slug)} title={c.idee_cle ?? undefined}>{c.court}</button>
                          : <span className="italic text-ink-2">{c.court}</span>}
                      </span>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 hidden border-t hairline pt-2 lg:block">
            <div className="he mb-1 text-[12px] font-bold">רש״י · שטיינזלץ</div>
            <p className="he-texture">{heLeft}</p>
          </div>
        </aside>

        <main className="order-1 min-w-0 lg:order-2">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <Archipel items={catalogue} onOpen={onStart} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              {resume
                ? <>
                    <button onClick={() => onResume(resume.c.slug, resume.p.last_segment!)} className="btn btn-primary">Reprendre · {resume.c.court}, segment {resume.p.last_segment} →</button>
                    <button onClick={() => onStart(first.slug)} className="sc text-[13px] text-ink-2 underline decoration-rule underline-offset-2 hover:text-ink">ou commencer par {first.court.toLowerCase()}</button>
                  </>
                : <>
                    <button onClick={() => onStart(first.slug)} className="btn btn-primary">Commencer · {first.titre} →</button>
                    <span className="sc text-[12px] text-ink-2">{first.ref.replace("_", " ").replace(".", " ")} · {first.duree_min} min</span>
                  </>}
            </div>
            <div className="text-[12.5px] text-ink-2">Une île en trait plein est ouverte, en pointillé elle arrive. Pas de chemin obligé.</div>
          </div>
          <p className="mt-3 border-l hairline pl-3 text-[14px] italic leading-snug text-ink-2">{first.cas}</p>
        </main>

        <aside className="order-3">
          <div className="sc mb-2 border-t hairline pt-2 text-sm text-rubric">les voix</div>
          <ul className="columns-2 text-[13.5px] leading-snug lg:columns-1">
            {personnages.slice(0, 8).map((p) => <li key={p}><span className="rubric">⋄</span> {p}</li>)}
            {personnages.length > 8 && <li className="italic text-ink-2">… et {personnages.length - 8} autres</li>}
          </ul>
          <div className="sc mb-2 mt-4 border-t hairline pt-2 text-sm text-rubric">la boîte à outils</div>
          <ul className="text-[13.5px] leading-snug">
            {outils.slice(0, 6).map((o) => <li key={o}><span className="rubric">⋄</span> {OUTIL_LABEL[o] ?? o}</li>)}
            {outils.length > 6 && <li className="italic text-ink-2">… et {outils.length - 6} autres, en chemin</li>}
          </ul>
          <div className="mt-5 hidden border-t hairline pt-2 lg:block">
            <div className="he mb-1 text-[12px] font-bold">תוספות · שטיינזלץ</div>
            <p className="he-texture">{heRight}</p>
          </div>
        </aside>
      </section>

      <footer className="mt-8 border-t hairline pt-2 text-[12px] leading-snug text-ink-2">
        Texte : <em>The William Davidson Talmud</em> (Koren Noé Talmud), traduction et commentaire de R. Adin Even-Israel Steinsaltz — CC BY-NC 4.0 — via Sefaria.org. Adaptation française non relue. Prototype, non commercial. Dispositifs « Ce texte », « Idée clé », « Plus tard », « À toi », repères et page pour l'adulte inspirés du carnet <em>Ouvrir le Talmud</em> (Ayeka, Rav Emile Ackermann).
      </footer>
    </div>
  );
}
