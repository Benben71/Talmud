// Repères : le cadre qu'un carnet donne et qu'une app oublie — une petite histoire, qui est qui,
// la page, le feuillet et ses lettres, un glossaire, les mots araméens. Rédigé pour l'app (voir
// documentation/04-bases-du-talmud.md) ; la structure s'inspire du carnet « Ouvrir le Talmud » (Ayeka).
import type { Sujet, Vue } from "../router";
import { SUJETS } from "../router";
import { QUESTIONS } from "../content/questions";
import { Fleuron } from "./Fleuron";

const TITRE: Record<Sujet, string> = {
  histoire: "Une petite histoire du Talmud", "qui-est-qui": "Qui est qui ?", "la-page": "À quoi ressemble une page",
  "le-daf": "Le feuillet et ses lettres", glossaire: "Glossaire", mots: "Les mots araméens",
};

const HISTOIRE: { quand: string; quoi: string }[] = [
  { quand: "vers −450", quoi: "Après le retour de Babylone, Ezra lit la Torah devant le peuple et l'explique (Néhémie 8). La Torah écrite s'accompagne déjà d'explications transmises de maître à élève : la Torah orale, qu'on n'écrit pas." },
  { quand: "Ier s. av.", quoi: "Hillel, venu de Babylonie, et Chammaï enseignent à Jérusalem. Leurs écoles se disputeront pendant plus d'un siècle — et le Talmud gardera les deux voix." },
  { quand: "70", quoi: "Rome détruit le Temple. Rabban Yohanan ben Zakkaï obtient « Yavné et ses sages » : sans Temple, la vie juive se reconstruit autour de l'étude et de la prière." },
  { quand: "132-135", quoi: "La révolte de Bar Kokhba échoue ; Rome interdit d'enseigner. Rabbi Akiva continue, est arrêté et meurt en martyr. Le centre se déplace en Galilée." },
  { quand: "vers 200", quoi: "Rabbi Yehouda ha-Nassi met la Torah orale par écrit : la Mishna, en hébreu, courte et précise, en six ordres et 63 traités. Ses sages sont les tannaïm." },
  { quand: "200-500", quoi: "Pendant trois siècles, les amoraïm discutent la Mishna, en Terre d'Israël (Tibériade, Césarée) et en Babylonie (Soura, Poumbedita, Nehardea, Mehoza). Les deux pays échangent sans cesse." },
  { quand: "vers 400", quoi: "Les persécutions affaiblissent la Terre d'Israël : on rassemble vite les discussions. C'est le Talmud de Jérusalem." },
  { quand: "vers 500", quoi: "En Babylonie, plus tranquille, Rav Achi commence la rédaction du Talmud de Babylone, retouché encore après. Plus complet, mieux rédigé : c'est lui qu'on étudie. En araméen mêlé d'hébreu." },
  { quand: "VIIe-XIe s.", quoi: "Les Gueonim, chefs des écoles de Babylonie, répondent par lettres aux communautés. Le Talmud gagne l'Afrique du Nord, l'Espagne, la France, l'Allemagne. Un Talmud complet, copié à la main, coûte une fortune." },
  { quand: "1040-1105", quoi: "À Troyes, Rachi explique le Talmud mot à mot. Ses élèves et descendants écrivent les Tossafot, qui comparent les pages entre elles." },
  { quand: "1242", quoi: "À Paris, après un procès, vingt-quatre charretées de manuscrits sont brûlées. D'autres autodafés suivront ; des censeurs modifieront des mots, et certaines modifications sont restées dans nos éditions." },
  { quand: "1520-1523", quoi: "À Venise, l'imprimeur Daniel Bomberg publie le premier Talmud complet et fixe la mise en page et la numérotation qu'on utilise encore." },
  { quand: "1880-1886", quoi: "L'édition de Vilna devient la référence : c'est la page que cette app imite." },
  { quand: "1923", quoi: "Le Daf Yomi : des Juifs du monde entier étudient chaque jour le même feuillet, et font le tour du Talmud en sept ans et demi." },
  { quand: "1965-2010", quoi: "Adin Steinsaltz traduit et commente tout le Talmud en hébreu moderne, puis en anglais ; la version française est achevée en 2026. Son texte est celui de cette app." },
];

const QUI: { nom: string; quand: string; ou: string; quoi: string }[] = [
  { nom: "Hillel et Chammaï", quand: "Ier s. av.", ou: "Jérusalem", quoi: "Deux maîtres aux styles opposés : Hillel patient, Chammaï exigeant. Leurs écoles, Beit Hillel et Beit Chammaï, se disputent sur des centaines de questions." },
  { nom: "Rabban Yohanan ben Zakkaï", quand: "Ier s.", ou: "Yavné", quoi: "Sort de Jérusalem assiégée et refonde l'étude après la destruction du Temple." },
  { nom: "Rabbi Tarfon", quand: "vers 100", ou: "Lod", quoi: "Pense que l'action compte plus que l'étude — et le dit devant Rabbi Akiva." },
  { nom: "Ben Petoura", quand: "IIe s.", ou: "", quoi: "Dans le désert avec une seule gourde : plutôt mourir à deux que voir l'autre mourir." },
  { nom: "Rabbi Eliézer et Rabbi Yehochoua", quand: "vers 100", ou: "Yavné", quoi: "Ses deux grands élèves, souvent en désaccord — jusqu'au four d'Akhnaï." },
  { nom: "Rabban Gamliel", quand: "vers 100", ou: "Yavné", quoi: "Le Nassi, chef des sages : autorité forte, parfois contestée." },
  { nom: "Rabbi Akiva", quand: "mort vers 135", ou: "Bnei Brak", quoi: "Berger devenu savant à quarante ans, le plus grand maître de son temps, mort en martyr en récitant le Chema." },
  { nom: "Elisha ben Abouya (« Aher »)", quand: "IIe s.", ou: "", quoi: "Grand sage qui perd la foi devant l'injustice ; le Talmud garde pourtant son histoire, et ses élèves." },
  { nom: "Ben Azzaï et Ben Zoma", quand: "IIe s.", ou: "", quoi: "Deux des quatre sages entrés dans le « Pardès » : l'un en meurt, l'autre en perd la raison." },
  { nom: "Rabbi Meïr et Beruria", quand: "IIe s.", ou: "Galilée", quoi: "Élève de Rabbi Akiva, si brillant que ses collègues ne pouvaient le suivre ; et sa femme, savante, qui discute les versets." },
  { nom: "Rabbi Yaakov", quand: "IIe s.", ou: "", quoi: "Petit-fils d'Elisha ben Abouya : la récompense n'est pas dans ce monde-ci." },
  { nom: "Rabbi Yehouda ha-Nassi", quand: "vers 200", ou: "Galilée", quoi: "« Rabbi », tout court. Met la Mishna par écrit, et discute de l'âme avec son ami l'empereur Antonin." },
  { nom: "Rav et Chmouel", quand: "IIIe s.", ou: "Soura et Nehardea", quoi: "Les premiers grands amoraïm de Babylonie." },
  { nom: "Rabbi Hanina", quand: "IIIe s.", ou: "Sepphoris", quoi: "« Tout est entre les mains du Ciel, sauf la crainte du Ciel. » Croit aussi à l'influence des astres." },
  { nom: "Rabbi Yohanan", quand: "IIIe s.", ou: "Tibériade", quoi: "Le grand maître du Talmud de Jérusalem. « Il n'y a pas de destin astral pour Israël. »" },
  { nom: "Abayé et Rava", quand: "IVe s.", ou: "Poumbedita et Mehoza", quoi: "Deux amis dont les débats remplissent des centaines de pages. Rava aime les questions en série." },
  { nom: "Rav Pappa", quand: "IVe s.", ou: "Naresh", quoi: "Élève d'Abayé et de Rava ; ses conclusions concilient souvent les positions." },
  { nom: "Rav Achi", quand: "vers 400", ou: "Soura", quoi: "Commence la rédaction du Talmud de Babylone." },
  { nom: "Maïmonide et le Raavad", quand: "XIIe s.", ou: "Égypte et Provence", quoi: "Bien après le Talmud : Maïmonide se demande comment être libre si Dieu sait tout d'avance ; le Raavad lui reproche de ne pas vraiment répondre." },
  { nom: "Rachi", quand: "1040-1105", ou: "Troyes", quoi: "Le commentateur. Explique chaque phrase ; imprimé du côté de la reliure." },
  { nom: "Les Tossafot", quand: "XIIe-XIIIe s.", ou: "France, Allemagne", quoi: "Élèves et descendants de Rachi ; comparent les pages et contredisent parfois Rachi." },
  { nom: "Adin Steinsaltz", quand: "1937-2020", ou: "Jérusalem", quoi: "Traduit et commente tout le Talmud pour que chacun puisse l'ouvrir. Sa méthode est celle de cette app." },
];

const LETTRES: [string, number][] = [["א", 1], ["ב", 2], ["ג", 3], ["ד", 4], ["ה", 5], ["ו", 6], ["ז", 7], ["ח", 8], ["ט", 9], ["י", 10], ["כ", 20], ["ל", 30], ["מ", 40], ["נ", 50], ["ס", 60], ["ע", 70], ["פ", 80], ["צ", 90], ["ק", 100], ["ר", 200], ["ש", 300], ["ת", 400]];

const GLOSSAIRE: [string, string][] = [
  ["Aggada", "les récits, paraboles et maximes du Talmud, sur les mêmes pages que la loi."],
  ["Amora (pl. amoraïm)", "sage de l'époque de la Guemara (200-500)."],
  ["Baraïta", "enseignement de l'époque de la Mishna, resté en dehors de la Mishna, cité dans la Guemara."],
  ["Bat kol", "« voix céleste » — écoutée en Érouvin 13b, refusée dans le four d'Akhnaï."],
  ["Daf, amoud", "le feuillet, et chacune de ses deux faces (a : recto, b : verso)."],
  ["Drash / pchat", "lecture qui s'écarte du sens simple / le sens simple."],
  ["Guemara", "la discussion des sages sur la Mishna, surtout en araméen."],
  ["Halakha", "la loi, la règle pratique. Les grandes questions de cette app viennent surtout de l'aggada, rarement tranchée."],
  ["Hevrouta", "l'étude à deux ; aussi le partenaire d'étude — et, dans cette app, le binôme qui lit avec toi."],
  ["Kouchia / terouts", "l'objection / la réponse."],
  ["Mazal", "l'astre sous lequel on naît, le destin — « il n'y a pas de mazal pour Israël », dit Rabbi Yohanan."],
  ["Mahloket", "le désaccord — que le Talmud garde au lieu de l'effacer."],
  ["Pardès", "« le verger » : la spéculation mystique, où quatre sages sont entrés et dont un seul est sorti indemne."],
  ["Mishna", "les règles en hébreu mises par écrit vers 200 par Rabbi Yehouda ha-Nassi ; six ordres, 63 traités."],
  ["Rachi", "Rabbi Chlomo ben Yitshak (1040-1105), le commentateur."],
  ["Sougya", "une unité de discussion de la Guemara — l'unité de cette app."],
  ["Talmud", "la Mishna et la Guemara ensemble. Celui de Babylone (vers 500) est le plus étudié ; celui de Jérusalem (vers 400) existe aussi."],
  ["Tanna (pl. tannaïm)", "sage de l'époque de la Mishna."],
  ["Techouva", "le retour, le repentir : changer de chemin. Beruria demande de prier pour la techouva des méchants, pas pour leur mort."],
  ["Teikou", "« qu'elle reste debout » : question laissée sans réponse."],
  ["Torah orale", "la tradition qui explique et complète la Torah écrite ; longtemps apprise par cœur, jamais écrite."],
  ["Tossafot", "« ajouts » : les commentaires des élèves et descendants de Rachi."],
];

const MOTS: [string, string, string][] = [
  ["מַאי", "maï", "quoi ? pourquoi ? — ouvre presque toutes les questions."],
  ["תָּא שְׁמַע", "ta chma", "« viens, écoute » : on apporte une preuve."],
  ["אִי בָּעֵית אֵימָא", "i ba'it eima", "« si tu veux, dis » : une autre réponse possible, sans effacer la première."],
  ["אִיבַּעְיָא לְהוּ", "iba'ya lehou", "« il leur fut demandé » : une question ouverte."],
  ["בָּעֵי", "ba'ei", "« il a demandé » : un vrai doute, pas une objection."],
  ["תֵּיקוּ", "teikou", "« qu'elle reste debout » : pas de réponse."],
  ["קָשְׁיָא", "kachya", "« c'est difficile » : une contradiction qu'on n'a pas résolue."],
  ["שָׁאנֵי הָתָם", "chani hatam", "« là-bas c'est différent » : une distinction entre deux cas."],
  ["וּצְרִיכָא", "outsrikha", "« et il fallait » les deux cas : pourquoi l'un ne suffisait pas."],
  ["הֲלָכָה כְּ…", "halakha ke…", "« la loi suit » l'avis de…"],
  ["מַתְנִי׳ / גְּמָ׳", "matni / guemara", "les abréviations qui ouvrent la Mishna et la Guemara sur la page."],
];

function Lettres() {
  return (
    <div>
      <p className="text-[calc(15px*var(--text-scale))] leading-snug">Chaque lettre a une valeur. C'est ainsi qu'on numérote les feuillets, les chapitres et les versets. On additionne de la plus grande à la plus petite : <span className="he">סב</span> = 60 + 2 = 62.</p>
      <div className="mt-3 grid grid-cols-11 gap-1 text-center">
        {LETTRES.map(([l, v]) => <div key={l} className="border hairline py-1"><div className="he text-xl">{l}</div><div className="text-[calc(11px*var(--text-scale))] text-ink-2">{v}</div></div>)}
      </div>
      <ul className="mt-3 space-y-1 text-[calc(15px*var(--text-scale))] leading-snug">
        <li>15 s'écrit <span className="he">טו</span> (9 + 6) et 16 <span className="he">טז</span> (9 + 7), pour ne pas écrire les lettres qui commencent le Nom divin.</li>
        <li>Chaque traité commence au daf <span className="he">ב</span> (2) : le daf 1 est la page de titre. « Bava Metsia 62a » s'écrit <span className="he">בבא מציעא סב.</span> ; le côté b porte deux points : <span className="he">סב:</span></li>
        <li>Un livre hébreu s'ouvre de droite à gauche. Livre ouvert, la page de droite est le verso d'un feuillet, la page de gauche le recto du suivant.</li>
      </ul>
      <div className="mt-4 border-t hairline pt-2">
        <div className="sc text-sm text-rubric">à toi</div>
        <p className="text-[calc(15px*var(--text-scale))]">Écris en lettres : 2, 10, 15, 31, 62, 90, 113. Lis : <span className="he">כד · נו · צא · קכב</span>.</p>
        <details className="mt-1 text-[calc(14px*var(--text-scale))] text-ink-2"><summary className="cursor-pointer">Réponses</summary><span className="he">ב · י · טו · לא · סב · צ · קיג</span> ; 24, 56, 91, 122.</details>
      </div>
    </div>
  );
}

function LaPage() {
  return (
    <div>
      <p className="text-[calc(15px*var(--text-scale))] leading-snug">Une page de Talmud est une conversation imprimée. Au centre, le texte le plus ancien ; autour, des commentaires écrits des siècles plus tard, qui l'expliquent et se répondent. Cette mise en page vient de l'imprimeur Daniel Bomberg (Venise, 1520-1523) ; presque toutes les éditions l'ont reprise, donc « Berakhot 2a » désigne la même page partout.</p>
      <div className="mt-4 grid grid-cols-[1fr_2fr_1fr] gap-2 border hairline p-3 text-center text-[calc(12px*var(--text-scale))]">
        <div className="border hairline bg-surface/30 p-2"><div className="he font-bold">רש״י</div>Rachi — explique phrase par phrase. Toujours du côté de la reliure.</div>
        <div className="border border-ink bg-surface/40 p-3"><div className="he font-bold">מתני׳ · גמ׳</div>Mishna (hébreu, vers 200), puis Guemara (araméen, vers 500). En gros caractères carrés.</div>
        <div className="border hairline bg-surface/30 p-2"><div className="he font-bold">תוספות</div>Tossafot — comparent les pages entre elles, contredisent parfois Rachi.</div>
        <div className="col-span-3 text-ink-2">Dans les marges : des renvois vers d'autres pages du Talmud et vers les codes de lois. En haut : le nom du chapitre, son numéro, le traité, le feuillet.</div>
      </div>
      <p className="mt-3 text-[calc(14px*var(--text-scale))] leading-snug text-ink-2">Les commentaires sont imprimés dans une police semi-cursive appelée « écriture de Rachi ». Le nom vient des imprimeurs ; Rachi lui-même écrivait autrement. Dans cette app, la colonne de gauche joue le rôle de Rachi (qu'est-ce que ça dit ?), la colonne de droite celui des Tossafot (qu'est-ce que ça pose comme question ?) — et tes notes y sont imprimées aussi.</p>
      <div className="mt-4 border-t hairline pt-2">
        <div className="sc text-sm text-rubric">à toi</div>
        <p className="text-[calc(15px*var(--text-scale))]">Ouvre un Talmud imprimé (ou le fac-similé sur Sefaria) à Berakhot 2a et trouve : l'abréviation <span className="he">מתני׳</span>, l'abréviation <span className="he">גמ׳</span>, le premier mot de Rachi, le numéro du feuillet en haut de page.</p>
      </div>
    </div>
  );
}

export function Reperes({ sujet, onSujet, onQuestion }: { sujet: Sujet; onSujet: (s: Sujet) => void; onQuestion: (id: string | null, vue?: Vue) => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
      <Fleuron className="mb-4" />
      <div className="sc text-sm text-rubric">repères</div>
      <h1 className="text-3xl">{TITRE[sujet]}</h1>
      <nav className="mt-3 flex flex-wrap gap-1" aria-label="Sujets">
        {SUJETS.map((s) => <button key={s} onClick={() => onSujet(s)} className={`btn btn-sm btn-quiet ${s === sujet ? "btn-on" : ""}`}>{TITRE[s]}</button>)}
      </nav>

      <div className="mt-6">
        {sujet === "histoire" && (
          <ol className="relative border-l hairline pl-5">
            {HISTOIRE.map((h, k) => (
              <li key={k} className="relative mb-4">
                <span className="absolute -left-[26px] top-2 h-2 w-2 rounded-full bg-rubric" />
                <div className="sc text-sm text-rubric">{h.quand}</div>
                <p className="text-[calc(15px*var(--text-scale))] leading-snug">{h.quoi}</p>
              </li>
            ))}
            <li className="text-[calc(13px*var(--text-scale))] text-ink-2">Les dates anciennes sont approximatives ; certaines sont discutées par les historiens. « av. » = avant notre ère.</li>
          </ol>
        )}
        {sujet === "qui-est-qui" && (
          <div>
            <p className="mb-3 text-[calc(15px*var(--text-scale))] text-ink-2">Les sages que tu rencontreras dans les grandes questions, dans l'ordre du temps.</p>
            <dl className="grid gap-x-6 gap-y-3 md:grid-cols-2">
              {QUI.map((q) => (
                <div key={q.nom} className="border-t hairline pt-2">
                  <dt className="flex items-baseline justify-between"><span className="font-semibold">{q.nom}</span><span className="sc text-[calc(12px*var(--text-scale))] text-ink-2">{q.quand}{q.ou && ` · ${q.ou}`}</span></dt>
                  <dd className="text-[calc(14px*var(--text-scale))] leading-snug text-ink-2">{q.quoi}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {sujet === "la-page" && <LaPage />}
        {sujet === "le-daf" && <Lettres />}
        {sujet === "glossaire" && (
          <dl className="grid gap-x-6 gap-y-2 md:grid-cols-2">
            {GLOSSAIRE.map(([t, d]) => <div key={t} className="border-t hairline pt-1 text-[calc(15px*var(--text-scale))] leading-snug"><dt className="font-semibold">{t}</dt><dd className="text-ink-2">{d}</dd></div>)}
          </dl>
        )}
        {sujet === "mots" && (
          <div>
            <p className="mb-3 text-[calc(15px*var(--text-scale))] text-ink-2">Le Talmud est écrit en araméen, la langue parlée de l'époque, mêlée d'hébreu. Quelques mots qui structurent chaque discussion — tu les reconnaîtras dans l'original.</p>
            <dl className="space-y-2">
              {MOTS.map(([he, tr, d]) => (
                <div key={tr} className="grid grid-cols-[1fr_1fr_2fr] items-baseline gap-3 border-t hairline pt-1">
                  <dt className="he text-xl">{he}</dt><dd className="sc text-sm">{tr}</dd><dd className="text-[calc(14px*var(--text-scale))] leading-snug text-ink-2">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="mt-8 border-t hairline pt-3 text-[calc(14px*var(--text-scale))] text-ink-2">
        Pour débattre plutôt que lire : {QUESTIONS.slice(0, 5).map((q, k) => <span key={q.id}>{k > 0 && " · "}<button className="underline decoration-rule underline-offset-2 hover:text-ink" onClick={() => onQuestion(q.id)}>{q.question}</button></span>)} · <button className="underline decoration-rule underline-offset-2 hover:text-ink" onClick={() => onQuestion(null)}>toutes les questions</button>.
        <span className="ml-2">La structure de ces repères s'inspire du carnet <em>Ouvrir le Talmud</em> (Ayeka).</span>
      </div>
    </div>
  );
}
