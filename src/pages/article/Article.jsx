import ArticleCard from "../home/ArticleCard.jsx";
import {
  articleCardImg1,
  articleCardImg2,
  articleCardImg3,
  articleCardImg4,
  articleCardImg5,
  articleCardImg6,
} from "./../../assets/index.js";

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
  {
    id: 4,
    image: articleCardImg4,
    title: "Was ist Face Yoga in der Tiefe",
    desc: "Face Yoga ist mehr als Übungen - es ist ein Lebensstil für innere Ruhe und äußere Schönheit.",
    detailedDesc: `Die Verbindung zwischen Körper und Geist spielt im Face Yoga eine zentrale Rolle. Studien zeigen, dass regelmäßige Gesichtsübungen 
    nicht nur Muskeln stärken, sondern auch das emotionale Gleichgewicht fördern. Die Übungen regen das parasympathische Nervensystem an, was zu innerer 
    Ruhe, besserem Schlaf und einer positiveren Stimmung führt. Viele Menschen nutzen Face Yoga daher als tägliches Ritual, um Stress abzubauen, Klarheit 
    im Kopf zu gewinnen und sich emotional stabiler zu fühlen. Es ist eine einfache, aber kraftvolle Methode, um Wohlbefinden zu kultivieren.`,
  },
  {
    id: 5,
    image: articleCardImg5,
    title: "Face Yoga gegen Altersanzeichen",
    desc: "Natürliche Übungen für ein strafferes Gesicht und weniger Falten - ganz ohne Eingriff.",
    detailedDesc: `Das Altern ist ein natürlicher Prozess, aber wie wir altern, liegt oft in unserer Hand. Face Yoga bietet eine Möglichkeit, Falten zu 
    reduzieren, die Haut zu straffen und gleichzeitig die eigene Natürlichkeit zu bewahren. Durch gezielte Übungen werden erschlaffte Muskeln wieder 
    aktiviert und die Haut erhält mehr Spannkraft. Anstatt gegen das Alter zu kämpfen, lädt Face Yoga dazu ein, es mit Würde und Selbstbewusstsein zu 
    akzeptieren - mit einem frischen, vitalen Ausdruck, der Ihre innere Lebenskraft widerspiegelt.`,
  },
  {
    id: 6,
    image: articleCardImg6,
    title: "Face Yoga für Stimmung & Wohlbefinden",
    desc: "Die Übungen helfen, Stress abzubauen, sich zu entspannen und neue Energie zu tanken.",
    detailedDesc: `Wie bei jeder anderen Praxis zeigt auch Face Yoga seine Wirkung vor allem durch Regelmäßigkeit. Einzelne Übungen bringen Entspannung, 
    aber erst eine konstante Routine führt zu langfristigen Ergebnissen: straffere Haut, mehr Ausstrahlung und ein stabileres Wohlbefinden.
    Ein tägliches Ritual von nur 10-15 Minuten reicht aus, um sichtbare Veränderungen zu erreichen. Face Yoga wird dadurch zu einem nachhaltigen Teil der 
    Selbstfürsorge, der sowohl äußerlich als auch innerlich wirkt.`,
  },
];

function Article() {
  return (
    <div className="mt-16 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-[#403905] font-bold text-2xl mb-6">Artikel</h2>
        <p className="text-[#6A652C] font-normal text-sm max-w-[500px] mb-10">
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
      </div>
    </div>
  );
}

export default Article;
