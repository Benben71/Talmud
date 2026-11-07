// Les grandes questions : les débats de l'aggada qui ne portent pas sur la vie pratique, mais sur
// le sens, le mal, la liberté, la vérité. Chaque fiche résume un ou plusieurs passages (paraphrase,
// pas traduction) et renvoie au texte sur Sefaria. Les sougyot du catalogue sont liées par leur slug.

export interface Voix { qui: string; dit: string }
export interface Source { ref: string; sefaria: string }

export interface GrandeQuestion {
  id: string;
  question: string;
  he: string;
  heLabel: string;
  domaine: string;
  accroche: string;
  recit: string[];
  voix: Voix[];
  issue: string;
  a_toi: string;
  sources: Source[];
  sougya?: string;
}

const s = (ref: string, path: string): Source => ({ ref, sefaria: `https://www.sefaria.org/${path}` });

export const DOMAINES = ["Exister", "Le mal", "Liberté", "Vérité", "Éthique", "Dieu et le monde"] as const;

export const QUESTIONS: GrandeQuestion[] = [
  {
    id: "naitre",
    question: "Valait-il mieux ne pas naître ?",
    he: "נוֹחַ לוֹ שֶׁלֹּא נִבְרָא",
    heLabel: "« mieux pour lui de ne pas avoir été créé »",
    domaine: "Exister",
    accroche: "La question la plus vertigineuse du Talmud n'est pas posée par un philosophe isolé, mais par deux écoles entières, pendant des années.",
    recit: [
      "Pendant deux ans et demi, l'école de Chammaï et l'école de Hillel débattent : pour l'être humain, aurait-il mieux valu ne pas être créé, ou est-ce mieux qu'il l'ait été ?",
      "On finit par voter. Conclusion : il aurait mieux valu ne pas être créé. Mais le Talmud ajoute aussitôt : maintenant qu'il l'a été, qu'il examine ses actes.",
    ],
    voix: [
      { qui: "Beit Chammaï", dit: "Il aurait mieux valu que l'homme ne soit pas créé." },
      { qui: "Beit Hillel", dit: "C'est mieux pour lui d'avoir été créé." },
      { qui: "La conclusion", dit: "Mieux valait ne pas naître… mais puisque tu es là, regarde ce que tu fais de ta vie." },
    ],
    issue: "Le Talmud ne répond pas à la question « pourquoi exister ? » : il la retourne en « que fais-tu de ton existence ? ». Pessimiste ou réaliste ? Les commentateurs en discutent encore.",
    a_toi: "La conclusion te paraît-elle triste, ou au contraire libératrice ? Pourquoi passer de « pourquoi suis-je là ? » à « qu'est-ce que je fais ? » change-t-il quelque chose ?",
    sources: [s("Érouvin 13b", "Eruvin.13b")],
    sougya: "eruvin-13b",
  },
  {
    id: "souffrance",
    question: "Pourquoi les justes souffrent-ils ?",
    he: "צַדִּיק וְרַע לוֹ",
    heLabel: "« un juste à qui il arrive du mal »",
    domaine: "Le mal",
    accroche: "Si Dieu est juste, pourquoi des gens bien vivent-ils des malheurs ? Le Talmud pose la question à plusieurs endroits, et ose ne pas y répondre.",
    recit: [
      "Moïse demande à Dieu de lui montrer ses voies : pourquoi un juste souffre-t-il, pourquoi un méchant prospère-t-il ? Le Talmud propose plusieurs explications, puis rapporte l'avis de Rabbi Meïr : cette demande-là n'a pas été accordée.",
      "Ailleurs, Moïse voit en vision Rabbi Akiva enseigner, puis mourir sous la torture des Romains. Il s'écrie : « C'est ça, la Torah, et c'est ça, sa récompense ? » Dieu répond : « Tais-toi. C'est ainsi que Je l'ai pensé. »",
      "Elisha ben Abouya, un grand sage, voit un enfant mourir en accomplissant deux commandements qui promettent pourtant une longue vie. Il perd la foi. Son petit-fils, Rabbi Yaakov, en tire une autre conclusion : la récompense n'est pas dans ce monde-ci.",
    ],
    voix: [
      { qui: "Moïse", dit: "Pose la question à Dieu lui-même, sans détour." },
      { qui: "Rabbi Meïr", dit: "Même Moïse n'a pas reçu la réponse." },
      { qui: "Elisha ben Abouya", dit: "Devant l'injustice, il cesse de croire : on l'appelle désormais « Aher », « l'autre »." },
      { qui: "Rabbi Yaakov", dit: "La récompense existe, mais pas dans ce monde." },
    ],
    issue: "Le Talmud garde côte à côte la question, le silence de Dieu, le doute d'un sage et une réponse de foi. Il ne cache pas que la question reste ouverte.",
    a_toi: "Pourquoi, selon toi, le Talmud a-t-il gardé l'histoire d'un sage qui a perdu la foi au lieu de l'effacer ? Une question sans réponse peut-elle quand même être utile ?",
    sources: [s("Berakhot 7a", "Berakhot.7a"), s("Menahot 29b", "Menachot.29b"), s("Kiddouchin 39b", "Kiddushin.39b")],
  },
  {
    id: "liberte",
    question: "Sommes-nous libres ?",
    he: "הַכֹּל בִּידֵי שָׁמַיִם",
    heLabel: "« tout est entre les mains du Ciel »",
    domaine: "Liberté",
    accroche: "Si tout est écrit d'avance, est-on responsable de ce qu'on fait ? Les sages tracent une frontière précise entre ce qui nous est donné et ce qui dépend de nous.",
    recit: [
      "Avant la naissance, raconte le Talmud, un ange présente la goutte d'où naîtra l'enfant et demande : sera-t-il fort ou faible ? sage ou sot ? riche ou pauvre ? Mais il ne demande pas : sera-t-il juste ou méchant ?",
      "Rabbi Hanina en tire une formule célèbre : tout est entre les mains du Ciel, sauf la crainte du Ciel. Ta force, ton intelligence, ta fortune te sont données. Ce que tu en fais moralement, non.",
      "Dans la Mishna, Rabbi Akiva tient les deux bouts à la fois : tout est prévu, et pourtant la liberté est donnée.",
    ],
    voix: [
      { qui: "Rabbi Hanina", dit: "Tout est décidé d'avance, sauf ton choix moral." },
      { qui: "Rabbi Akiva", dit: "Tout est prévu, et la liberté est donnée : les deux sont vrais en même temps." },
    ],
    issue: "Le Talmud ne résout pas le paradoxe logique. Il protège un point : la responsabilité morale, sans laquelle juger, punir ou pardonner n'aurait plus de sens.",
    a_toi: "Fais deux listes : ce qui t'a été « donné » (talents, famille, pays…) et ce qui dépend vraiment de toi. Où places-tu ton caractère ? Tes amitiés ?",
    sources: [s("Nidda 16b", "Niddah.16b"), s("Berakhot 33b", "Berakhot.33b"), s("Pirkei Avot 3:15", "Pirkei_Avot.3.15")],
  },
  {
    id: "astres",
    question: "Les astres décident-ils de ta vie ?",
    he: "אֵין מַזָּל לְיִשְׂרָאֵל",
    heLabel: "« il n'y a pas de destin astral pour Israël »",
    domaine: "Liberté",
    accroche: "L'astrologie était la science de l'époque. Les sages ne la rejettent pas d'un bloc : ils débattent de son pouvoir sur nous.",
    recit: [
      "Rabbi Hanina affirme que l'astre sous lequel on naît rend sage et rend riche. Rabbi Yohanan répond : Israël n'est pas soumis aux astres.",
      "Pour appuyer Rabbi Yohanan, le Talmud raconte l'histoire de la fille de Rabbi Akiva. Des astrologues avaient prédit qu'un serpent la mordrait le jour de son mariage. Ce soir-là, elle plante sa broche dans le mur, sans le savoir dans l'œil d'un serpent. Pourquoi a-t-elle été sauvée ? Pendant le festin, alors que tout le monde était occupé, elle seule avait entendu un pauvre à la porte et lui avait donné sa part.",
    ],
    voix: [
      { qui: "Rabbi Hanina", dit: "Les astres influencent l'intelligence et la richesse, même pour Israël." },
      { qui: "Rabbi Yohanan", dit: "Israël n'est pas soumis aux astres." },
      { qui: "Rabbi Akiva", dit: "Après l'histoire de sa fille : « la générosité sauve de la mort »." },
    ],
    issue: "Le Talmud garde les deux avis. Mais ses histoires vont toutes dans le même sens : même si un destin existe, un acte libre peut le changer.",
    a_toi: "Aujourd'hui, qu'est-ce qui joue le rôle des « astres » : les gènes ? le milieu social ? les algorithmes ? Jusqu'où décident-ils pour toi ?",
    sources: [s("Chabbat 156a-b", "Shabbat.156a")],
  },
  {
    id: "verite",
    question: "La vérité vient-elle du ciel ou du débat ?",
    he: "לֹא בַּשָּׁמַיִם הִיא",
    heLabel: "« elle n'est pas dans le ciel »",
    domaine: "Vérité",
    accroche: "Si Dieu lui-même te donne raison, as-tu gagné le débat ? Le Talmud répond non, et Dieu en rit.",
    recit: [
      "Rabbi Eliézer est seul contre tous les sages sur une question de pureté rituelle. Pour prouver qu'il a raison, il fait des miracles : un caroubier se déplace, une rivière remonte son cours, les murs de la maison d'étude se penchent. Puis une voix céleste déclare que la loi suit Rabbi Eliézer.",
      "Rabbi Yehochoua se lève : « Elle n'est pas dans le ciel. » La Torah a été donnée aux humains ; c'est à eux de trancher, à la majorité.",
      "Plus tard, un sage demande au prophète Élie ce que Dieu a fait à ce moment-là. Réponse : Il a souri et a dit « Mes enfants m'ont vaincu ».",
    ],
    voix: [
      { qui: "Rabbi Eliézer", dit: "La vérité se prouve, même par des miracles et une voix du ciel." },
      { qui: "Rabbi Yehochoua", dit: "Une fois la Torah donnée, c'est le raisonnement humain qui décide." },
      { qui: "Ailleurs (Érouvin 13b)", dit: "Quand Hillel et Chammaï s'opposent, « les unes et les autres sont les paroles du Dieu vivant »." },
    ],
    issue: "Deux idées très fortes : la vérité se construit ensemble, par le débat ; et un avis perdant peut rester vrai. Le récit se termine pourtant mal pour Rabbi Eliézer, exclu par ses collègues : le Talmud n'en fait pas une victoire sans prix.",
    a_toi: "Si un avis peut être vrai sans être retenu, à quoi sert-il de trancher ? Connais-tu un désaccord où les deux côtés ont une part de vérité ?",
    sources: [s("Bava Metsia 59b", "Bava_Metzia.59b"), s("Érouvin 13b", "Eruvin.13b")],
    sougya: "bava-metzia-59b",
  },
  {
    id: "gourde",
    question: "Ta vie passe-t-elle avant celle de l'autre ?",
    he: "חַיֶּיךָ קוֹדְמִין",
    heLabel: "« ta vie passe en premier »",
    domaine: "Éthique",
    accroche: "Deux dilemmes extrêmes, deux réponses qui semblent opposées. Les philosophes d'aujourd'hui en discutent encore.",
    recit: [
      "Deux hommes marchent dans le désert. L'un a une gourde : s'ils la partagent, ils meurent tous les deux ; si un seul boit, il atteindra un lieu habité.",
      "Un autre cas : un homme vient voir le sage Rava. Le gouverneur de sa ville lui a ordonné de tuer quelqu'un, sinon c'est lui qui sera tué. Que faire ?",
    ],
    voix: [
      { qui: "Ben Petoura", dit: "Qu'ils boivent tous les deux et meurent, plutôt que l'un voie mourir l'autre." },
      { qui: "Rabbi Akiva", dit: "« Ta vie passe en premier » : celui qui a la gourde boit." },
      { qui: "Rava", dit: "Laisse-toi tuer, mais ne tue pas. « Qui te dit que ton sang est plus rouge que le sien ? »" },
    ],
    issue: "Il n'y a pas de contradiction : tu as le droit de te sauver toi-même (Rabbi Akiva), mais pas de sauver ta vie en prenant celle d'un autre (Rava). Deux vies ont exactement la même valeur.",
    a_toi: "La position de Ben Petoura est-elle généreuse ou absurde ? Imagine une situation d'aujourd'hui (secours, médecine…) où cette question se pose vraiment.",
    sources: [s("Bava Metsia 62a", "Bava_Metzia.62a"), s("Pessahim 25b", "Pesachim.25b")],
    sougya: "bava-metzia-62a",
  },
  {
    id: "etude",
    question: "Vaut-il mieux savoir ou agir ?",
    he: "תַּלְמוּד גָּדוֹל אוֹ מַעֲשֶׂה גָּדוֹל",
    heLabel: "« l'étude est-elle plus grande, ou l'action ? »",
    domaine: "Éthique",
    accroche: "Pendant les persécutions romaines, des sages réunis en secret dans un grenier de Lod se demandent ce qui compte le plus.",
    recit: [
      "Rabbi Tarfon et les anciens sont réunis dans la chambre haute d'une maison de Lod. On leur pose la question : qu'est-ce qui est plus grand, l'étude ou l'action ?",
      "Rabbi Tarfon répond : l'action. Rabbi Akiva répond : l'étude. Tous finissent par dire : l'étude est plus grande, parce qu'elle mène à l'action.",
    ],
    voix: [
      { qui: "Rabbi Tarfon", dit: "L'action est plus grande." },
      { qui: "Rabbi Akiva", dit: "L'étude est plus grande." },
      { qui: "Tous", dit: "L'étude, parce qu'elle conduit à agir." },
    ],
    issue: "La réponse finale donne raison à l'étude… pour une raison qui vient de l'action. Chaque camp y retrouve une part de ce qu'il défendait.",
    a_toi: "Une étude qui ne mène à rien a-t-elle encore de la valeur ? Et une bonne action faite sans réfléchir ?",
    sources: [s("Kiddouchin 40b", "Kiddushin.40b")],
  },
  {
    id: "dieu-laisse-faire",
    question: "Pourquoi Dieu laisse-t-il faire ?",
    he: "עוֹלָם כְּמִנְהָגוֹ נוֹהֵג",
    heLabel: "« le monde suit son cours »",
    domaine: "Dieu et le monde",
    accroche: "Des philosophes de Rome viennent mettre les sages au défi. Le Talmud rapporte la discussion, avec les objections.",
    recit: [
      "Les philosophes demandent : si votre Dieu ne veut pas qu'on adore des idoles, pourquoi ne les détruit-il pas ? Les sages répondent : on adore aussi le soleil, la lune, les étoiles. Faudrait-il qu'Il détruise le monde à cause des sots ?",
      "Les philosophes insistent : qu'Il détruise au moins les idoles dont le monde n'a pas besoin ! Réponse : les idolâtres diraient alors que les autres sont de vrais dieux, puisqu'ils n'ont pas été détruits.",
      "Le Talmud ajoute une image : si quelqu'un vole du blé et le sème, il ne devrait pas pousser. Pourtant il pousse. « Le monde suit son cours », et ceux qui ont mal agi en répondront.",
    ],
    voix: [
      { qui: "Les philosophes", dit: "Un Dieu tout-puissant devrait empêcher le mal." },
      { qui: "Les sages", dit: "Le monde a ses lois ; Dieu ne les interrompt pas à chaque faute humaine." },
    ],
    issue: "C'est une ébauche de réponse au problème du mal : un monde stable, où les lois de la nature valent pour tous, laisse la responsabilité aux humains.",
    a_toi: "Préférerais-tu un monde où chaque mauvaise action échoue automatiquement ? Qu'est-ce qu'on y perdrait ?",
    sources: [s("Avoda Zara 54b", "Avodah_Zarah.54b")],
  },
  {
    id: "corps-ame",
    question: "Qui est responsable : le corps ou l'âme ?",
    he: "חִיגֵּר וְסוּמָא",
    heLabel: "« le boiteux et l'aveugle »",
    domaine: "Exister",
    accroche: "Un empereur romain et Rabbi Yehouda ha-Nassi discutent en amis. Et à la fin, c'est le rabbin qui reconnaît avoir appris quelque chose.",
    recit: [
      "L'empereur Antonin demande : le corps et l'âme peuvent échapper au jugement. Le corps dira « c'est l'âme qui a péché, sans elle je suis une pierre » ; l'âme dira « c'est le corps, sans lui je vole comme un oiseau ».",
      "Rabbi répond par une parabole. Un roi fait garder son verger par un boiteux et un aveugle. Le boiteux voit les figues, l'aveugle peut marcher : l'aveugle porte le boiteux sur ses épaules, et ils mangent les fruits. Chacun nie ensuite. Le roi met le boiteux sur l'aveugle et les juge ensemble.",
      "Antonin pose une autre question : quand l'âme entre-t-elle dans le corps, à la conception ou plus tard ? Rabbi répond : plus tard. Antonin objecte, et Rabbi reconnaît : « Antonin m'a appris cela. »",
    ],
    voix: [
      { qui: "Antonin", dit: "Corps et âme peuvent se renvoyer la faute." },
      { qui: "Rabbi", dit: "Ils ne sont responsables qu'ensemble, comme le boiteux et l'aveugle." },
    ],
    issue: "L'être humain n'est ni un esprit enfermé dans un corps, ni un corps sans esprit : c'est l'ensemble qui agit et qui répond. Le Talmud montre aussi qu'un sage peut apprendre d'un non-Juif.",
    a_toi: "Quand tu fais quelque chose sous le coup de la colère ou de la fatigue, est-ce « toi » qui l'as fait ? Où places-tu la limite ?",
    sources: [s("Sanhédrin 91a-b", "Sanhedrin.91a")],
  },
  {
    id: "limites",
    question: "Peut-on tout chercher à comprendre ?",
    he: "אַרְבָּעָה נִכְנְסוּ לַפַּרְדֵּס",
    heLabel: "« quatre entrèrent dans le Pardès »",
    domaine: "Dieu et le monde",
    accroche: "Le Talmud débat de l'origine du monde, mais met aussi en garde : certaines questions peuvent faire perdre pied.",
    recit: [
      "Le ciel a-t-il été créé avant la terre ? L'école de Chammaï dit le ciel, l'école de Hillel la terre. D'autres sages disent : les deux ensemble.",
      "La Mishna fixe pourtant une limite : qui scrute ce qui est en haut, en bas, avant le monde et après lui, « mieux vaudrait pour lui ne pas être venu au monde ».",
      "Quatre sages entrent dans le « Pardès », le verger de la connaissance mystique. Ben Azzaï regarde et meurt. Ben Zoma regarde et perd la raison. Elisha ben Abouya « coupe les plantes » : il devient hérétique. Seul Rabbi Akiva entre en paix et sort en paix.",
    ],
    voix: [
      { qui: "Beit Chammaï / Beit Hillel", dit: "Débattent librement de l'ordre de la création." },
      { qui: "La Mishna", dit: "Certaines questions sont réservées à quelques-uns, avec un maître." },
      { qui: "Rabbi Akiva", dit: "Le seul qui revient intact : la recherche est possible, mais pas pour tout le monde ni sans préparation." },
    ],
    issue: "Le Talmud n'interdit pas la curiosité : il la prend assez au sérieux pour la juger dangereuse. Penser les questions ultimes demande de garder les pieds sur terre.",
    a_toi: "Y a-t-il des questions qui t'ont déjà donné le vertige ? Vaut-il mieux les explorer seul ou avec quelqu'un ?",
    sources: [s("Haguiga 12a", "Chagigah.12a"), s("Haguiga 11b (Mishna)", "Chagigah.11b"), s("Haguiga 14b", "Chagigah.14b")],
  },
];
