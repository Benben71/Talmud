// Pour l'adulte qui accompagne — repris du carnet Ayeka : dire où encadrer, ce qui a été simplifié,
// ce que l'app ne fait pas.
import type { Catalogue } from "../types";
import type { Vue } from "../router";
import { QUESTIONS } from "../content/questions";
import { Fleuron } from "./Fleuron";

const GENERAL: { titre: string; texte: string }[] = [
  { titre: "Des grandes questions, pas des règles", texte: "L'app part de débats philosophiques du Talmud (le sens de la vie, la souffrance, la liberté, la vérité, l'éthique), surtout tirés de l'aggada. L'ado prend parti, lit les sages tour par tour, leur répond, puis revoit son avis. Les tours de parole sont des résumés rédigés pour l'app, pas des traductions ; chaque fiche renvoie au texte sur Sefaria. Quelques voix plus tardives (Maïmonide, le Raavad) sont datées pour ne pas être confondues avec le Talmud." },
  { titre: "Ce que l'app est, et n'est pas", texte: "Une porte d'entrée, pas un cours ni un substitut à un maître. Chaque sougya se termine sur « va, étudie » : l'ado doit pouvoir en parler à quelqu'un — vous, un enseignant, un rav." },
  { titre: "La hevrouta", texte: "C'est une IA (OpenAI ou Claude), ancrée sur le texte de la sougya, à qui il est demandé de ne pas donner la réponse du segment suivant, de faire reformuler l'avis adverse, de citer ses sources et de renvoyer vers un adulte pour toute question de pratique personnelle. Elle peut se tromper ; elle est là pour poser des questions, pas pour trancher la loi. Sans clé API, elle fonctionne en mode démonstration (réponses préparées)." },
  { titre: "Les traductions", texte: "Le texte original et la traduction anglaise sont ceux de Rabbi Adin Steinsaltz (édition William Davidson, via Sefaria, CC BY-NC). L'adaptation française est un brouillon établi pour ce prototype, non relu par un enseignant. Les encadrés et les « Idées clés » ont été vérifiés par une relecture indépendante ; quelques références sont marquées « à confirmer »." },
  { titre: "Ce que l'ado écrit", texte: "Tout reste dans son navigateur (pas de compte, rien n'est envoyé ailleurs que les messages de la hevrouta, transmis à l'API avec le texte de la sougya). « Ma page » s'imprime en A5 : relisez-la avec lui dans un an." },
  { titre: "Les cas transposés", texte: "Chaque sougya s'ouvre sur une situation dans le monde de l'ado (un téléphone dans la cour…). C'est une accroche, pas une équivalence halakhique : le cas d'époque est toujours donné juste après." },
];

export function Adulte({ catalogue, onStart, onQuestion }: { catalogue: Catalogue[]; onStart: (slug: string) => void; onQuestion: (id: string | null, vue?: Vue) => void }) {
  const avec = catalogue.filter((c) => c.vigilance);
  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8">
      <Fleuron className="mb-4" />
      <div className="sc text-sm text-rubric">pour l'adulte qui accompagne</div>
      <h1 className="text-3xl">Où encadrer, ce qui a été simplifié</h1>
      <p className="mt-2 text-[calc(15px*var(--text-scale))] text-ink-2">Parent, enseignant, rav : cette page est pour vous. Elle dit ce que l'app fait, ce qu'elle ne fait pas, et les passages où un ado a besoin de quelqu'un à côté.</p>

      <div className="mt-6 space-y-4">
        {GENERAL.map((g) => (
          <div key={g.titre} className="border-t hairline pt-2">
            <div className="font-semibold">{g.titre}</div>
            <p className="text-[calc(15px*var(--text-scale))] leading-snug">{g.texte}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-2xl">Question par question</h2>
      <p className="text-[calc(14px*var(--text-scale))] text-ink-2">Certaines questions touchent à la mort, au deuil, au harcèlement. Voici où un ado peut avoir besoin de vous.</p>
      <ul className="mt-3 space-y-3">
        {QUESTIONS.map((q) => (
          <li key={q.id} className="border-t hairline pt-2 text-[calc(15px*var(--text-scale))] leading-snug">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <button className="text-left font-semibold underline decoration-rule underline-offset-2" onClick={() => onQuestion(q.id)}>{q.question}</button>
              <span className="sc text-[calc(12px*var(--text-scale))] text-ink-2">{q.sources.map((s) => s.ref).join(" · ")}</span>
            </div>
            {q.vigilance ? <p className="rubric">⚠ {q.vigilance}</p> : <p className="text-ink-2">Rien de particulier à signaler.</p>}
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-2xl">Les passages à lire en entier</h2>
      <p className="text-[calc(14px*var(--text-scale))] text-ink-2">Les points de vigilance notés par l'éditeur pour les passages rattachés à une question.</p>
      <ul className="mt-3 space-y-3">
        {catalogue.map((c) => (
          <li key={c.slug} className="border-t hairline pt-2 text-[calc(15px*var(--text-scale))] leading-snug">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="font-semibold">{c.titre}</span>
              <span className="sc text-[calc(12px*var(--text-scale))] text-ink-2">{c.ref.replace("_", " ").replace(".", " ")} · {c.disponible ? <button className="underline" onClick={() => onStart(c.slug)}>ouverte</button> : "à venir"}</span>
            </div>
            {c.vigilance ? <p className="rubric">⚠ {c.vigilance}</p> : <p className="text-ink-2">Rien de particulier à signaler.</p>}
            {c.idee_cle && <p className="text-ink-2"><span className="sc">idée clé</span> — {c.idee_cle}</p>}
          </li>
        ))}
      </ul>
      {avec.length === 0 && <p className="mt-3 text-[calc(14px*var(--text-scale))] text-ink-2">Aucune vigilance signalée pour l'instant.</p>}

      <p className="mt-8 border-t hairline pt-2 text-[calc(12px*var(--text-scale))] text-ink-2">Cette page s'inspire de « Pour l'adulte qui accompagne » dans le carnet <em>Ouvrir le Talmud</em> (Ayeka, Rav Emile Ackermann).</p>
    </div>
  );
}
