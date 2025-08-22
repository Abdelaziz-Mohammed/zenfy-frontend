import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import {
  articleCardImg1,
  articleCardImg2,
  articleCardImg3,
} from "./../../assets/index.js";
import { FaArrowRight } from "react-icons/fa";

const cardItems = [
  {
    id: 1,
    image: articleCardImg1,
    title: "Entspannt durch Gesichtsyoga",
    desc: "Entdecke tägliche Übungen, die Spannungen lösen, Durchblutung fördern und deinem Gesicht neue Vitalität schenken.",
    detailedDesc: `Face Yoga ist weit mehr als nur eine Reihe von Gesichtsübungen - es ist eine ganzheitliche 
    Lebensweise, die Körperbewusstsein und geistige Entspannung miteinander verbindet. Die Grundidee ist, 
    dass auch das Gesicht - wie der restliche Körper - Muskeln besitzt, die regelmäßig trainiert werden 
    müssen, um flexibel und jugendlich zu bleiben. Durch regelmäßiges Face Yoga können Spannungen gelöst, 
    die Durchblutung verbessert und die Hautelastizität auf natürliche Weise gesteigert werden - ganz ohne 
    künstliche Eingriffe. Darüber hinaus stärkt Face Yoga das Selbstvertrauen. Wenn die Gesichtszüge strahlender 
    und entspannter wirken, spiegelt sich dies positiv auf die psychische Verfassung und das innere Wohlbefinden 
    wider. Es ist nicht nur ein äußerliches Training, sondern eine Reise zu mehr Balance im Innen und Außen.`,
  },
  {
    id: 2,
    image: articleCardImg2,
    title: "Natürliche Energiequelle",
    desc: "Entdecke, wie Atemübungen und Face Yoga deine Lebensenergie aktivieren, Stress abbauen und für mehr Vitalität im Alltag sorgen.",
    detailedDesc: `Was ist Energie?
    Wovon kommt Energie? Warum fühlt man sich manchmal voll von Energie - glücklich, erleichtert und zufrieden - und an einem anderen Tag kommen Gefühle von Lustlosigkeit, Unsicherheit, Mutlosigkeit, Distanzierung vom eigenen Körper? Was passiert? 
    Jeder hat nicht nur eine, sondern viele Entitäten von sich selbst. Sie alle möchten ihren Platz finden. Nur wenn wir alle unsere Seiten wahrnehmen und einschätzen, können wir unsere Ganzheit erleben.
    Die Ganzheit - die Ankopplung mit sich selbst, mit der Natur, mit dem Universum, mit Gott - schenkt uns die Möglichkeit, positive Energie und Lust am Leben zu gewinnen, uns auszugleichen und uns seelig und beruhigt zu fühlen.
    Sehr oft finden wir uns jedoch in Spannungen. Wenn dazu noch Schuld, Unzufriedenheit und Selbstkritik kommen, verliert man sich selbst - und natürlich auch die Lebensenergie.
    Ich habe diesen Zustand mehrmals erlebt. Es spielte keine Rolle, ob es mit Beziehungen, Arbeitsbedingungen oder Abwertung gegenüber mir selbst verbunden war - der Schluss war immer gleich: Burnout oder ähnliche Gefühle wie Unbeholfenheit und Unbehaglichkeit.
    Was hat mir geholfen?
    Hochwertiger Schlaf
    Schlaf hilft, physische Energie aufzubauen. Die Stunden zählen nicht, wichtig ist, den biologischen Rhythmen zu folgen. Wenn ich nicht schlafe, bin ich nicht mehr böse oder frustriert, sondern entspannt, weil ich weiss, dass die Wachsamkeit wichtig ist. Mit der Zeit lernt man sogar zu verstehen, warum es wichtig ist, wach um diese Uhrzeit zu bleiben. Danach gelingt es mir normalerweise, wieder einzuschlafen.
    · Schönheit der Natur, Musik & Tanz
    Natur, Musik hören, Musikinstrumente spielen oder Tanzen wechseln den Fokus und lassen uns in der Aktivität aufgehen. Ich erinnere mich, wie ich als kleines Mädchen weinend am Klavier saß, alles spielte, was ich kannte - und danach mit einem Lächeln weitermachte. Phänomenal!
    · Meditation & Yoga
    Regelmässigkeit und die richtige Person sind entscheidend. Man spürt es sofort, wenn Vertrauen und Harmonie da sind.
    · Sport treiben
    Schwimmen, Wandern, Ski-, Velo- oder Motorradfahren... alles bringt den Körper in Bewegung und schenkt Energie.
    · Ruhe & Schweigen
    In der Stille habe ich Märchen und Gedichte geschrieben oder eigene Übungen erfunden. Ich habe verstanden: Unser Körper weiss selbst, was er braucht, wenn wir ihm zuhören.
    · Sanfte Berührungen
    Mit Face Yoga habe ich gelernt, Kopf, Gesicht und Augen sanft zu berühren - das hilft mir beim Einschlafen. Noch schöner ist eine Ganzkörpermassage: Man fühlt sich wie auf Wolken!
    · Singen & Schreien
    Singen, auch ohne perfekte Stimme, oder Schreien in den Bergen - beides befreit und schenkt positive Gefühle.
    · Tagebuch schreiben
    Ich habe Briefe an meinen Beleidiger geschrieben, je schlimmer desto besser - und danach verbrannt. Das war unglaublich befreiend.
    · Dankbarkeit
    So wichtig! Ich wiederhole oft vier Sätze, die mich beruhigen, mein Herz öffnen und positive Emotionen schenken:
    Es tut mir leid. Verzeih mir. Danke Dir. Ich liebe Dich.
    · Fasten
    Zweimal pro Jahr faste ich. Das lässt mich das Göttliche in mir spüren, meine Gedanken und meinen Körper entlasten und Erleichterung genießen. Ohne den Fokus auf Essen wird die Energie stärker und das innere Licht heller.
    · Kaltes Wasser
    100 Spritzer kaltes Wasser ins Gesicht - sofortige Frische und Energie! Für den Körper: Body Brush und eine kontrastreiche Wechseldusche - garantiert gute Laune.
    · Kleine Naturfreuden
    Pilze, Erdbeeren oder Blumen pflücken, Muscheln sammeln - in dieser Versenkung kann man ein tiefes Glücksgefühl erleben und sich stark mit Mutter Erde verbunden fühlen.
    · Himmel & Elemente beobachten
    Sonnenaufgang, Sonnenuntergang, Mond, Sterne, Feuer oder fliessendes Wasser - beruhigend, mystisch und kraftvoll.
    · Nähe & Umarmungen
    Den Partner, die Eltern oder die Kinder umarmen und gemeinsam etwas unternehmen - das schenkt Freude und Energie.
    Fazit
    Wir sind glücklich, dass wir hier und jetzt leben, dass wir immer Emotionen fühlen und eine Wahl haben.
    Ich finde, dass unser Leben geheimnisvoll und einzigartig ist!`,
  },
  {
    id: 3,
    image: articleCardImg3,
    title: "Ursprung des Face Yoga",
    desc: "Erfahre, wie Face Yoga entstanden ist und wie diese alte Praxis Gesichtstraining mit Atemtechniken verbindet, um natürliche Gesundheit und Schönheit zu fördern.",
    detailedDesc: `Mit zunehmendem Alter verliert die Haut an Elastizität, und Falten sowie feine Linien werden sichtbar. Face Yoga bietet 
    eine natürliche Lösung für dieses Problem, indem die Gesichtsmuskeln ähnlich wie beim Körpertraining gestärkt werden. Durch die Aktivierung 
    dieser Muskeln verbessert sich die Durchblutung, und die Haut erhält mehr Sauerstoff und Nährstoffe - was zu einem strahlenden und vitalen 
    Aussehen führt. Darüber hinaus helfen die Übungen, die Haut zu straffen und die darunterliegenden Muskeln zu kräftigen. Dadurch wird die 
    Gesichtskontur deutlicher und ein Absacken der Haut reduziert. Bei regelmäßiger Praxis lassen sich spürbare Veränderungen beobachten: 
    feine Falten verschwinden, die Haut fühlt sich glatter an und das Gesicht wirkt natürlich verjüngt - ganz ohne Spritzen oder chirurgische Eingriffe.`,
  },
];

function Article() {
  const navigate = useNavigate();

  const navigateToArticles = () => {
    navigate("/article");
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#F9FAFB] py-10">
      <div className="container mx-auto px-4 flex flex-col gap-6">
        <h2 className="text-[#403905] font-bold text-2xl">Artikel</h2>
        <p className="text-[#6A652C] font-normal text-sm max-w-[500px]">
          Entdecken Sie unsere neuesten Tipps zu Face Yoga, Wellness und
          natürlicher Schönheit
        </p>
        <div className="flex flex-wrap gap-6 mt-8">
          {cardItems.map((cardItem) => (
            <ArticleCard
              key={cardItem.id}
              id={cardItem.id}
              image={cardItem.image}
              title={cardItem.title}
              desc={cardItem.desc}
              detailedDesc={cardItem.detailedDesc}
            />
          ))}
        </div>
        <button
          onClick={navigateToArticles}
          className="utline-0 border-0 h-12 flex items-center justify-center gap-2 px-6 rounded-4xl text-white bg-[#8B9D83]
            text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out w-fit mx-auto mt-10"
        >
          Mehr Artikel ansehen <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Article;
