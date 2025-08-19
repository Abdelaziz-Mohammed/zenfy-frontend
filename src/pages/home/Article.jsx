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
    detailedDesc: `Moderne Studien zeigen, dass unsere Gesichtsausdrücke eng mit unserem emotionalen Zustand verbunden sind. 
    Wenn wir lächeln oder unsere Gesichtsmuskeln entspannen, sendet das Gehirn Signale, die Angst und Depression reduzieren können. 
    Face Yoga bietet eine praktische Möglichkeit, von dieser Verbindung zu profitieren. Regelmäßige Übungen helfen dabei, Spannungen 
    zu lösen, Kiefer und Stirn zu entspannen und ein Gefühl innerer Ruhe zu fördern. Es kann überall praktiziert werden - im Büro, 
    zu Hause oder sogar unterwegs. Dadurch wird es zu einem wirksamen Werkzeug, um die Stimmung im Alltag zu heben. In Kombination mit 
    tiefem Atmen wirkt Face Yoga wie eine natürliche Therapie, die die mentale Gesundheit stärkt und das Energieniveau erhöht.`,
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
