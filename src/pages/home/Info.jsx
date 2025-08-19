import InfoCard from "./InfoCard";
import {
  infoCardImg1,
  infoCardImg2,
  infoCardImg3,
  infoItemImg1,
  infoItemImg2,
  infoItemImg3,
  infoItemImg4,
} from "./../../assets/index.js";

const cardItems = [
  {
    id: 1,
    image: infoCardImg1,
    title: "Was ist Gesichtsyoga",
    desc: `Gesichtsyoga ist ein liebevoller Schritt zu dir selbst - eine natürliche 
    Methode, die yogaähnliche Haltungen und spezielle Gesichtsübungen kombiniert, 
    um Körper und Geist zu entspannen, die Stimmung zu heben und dein natürliches 
    Strahlen zu entfalten.`,
  },
  {
    id: 2,
    image: infoCardImg2,
    title: "Vorteile von Gesichtsyoga",
    desc: `Physisch fördert es die Durchblutung, verbessert den Sauerstofffluss, 
    reduziert Schwellungen und Falten, stellt die Hautelastizität wieder her, stärkt 
    die Muskeln und verbessert die Gesichtskonturen. Energetisch steigert es das 
    Wohlbefinden und reduziert Stress.`,
  },
  {
    id: 3,
    image: infoCardImg3,
    title: "Kernelemente",
    desc: `Gesichtsbewegungen, tiefes Atmen, Gesichtsausdrücke, Körperhaltungen und 
    Massage - einfache, aber kraftvolle Werkzeuge, um Körper, Geist und Seele zu 
    verbinden und die natürliche Schönheit zu fördern.`,
  },
];

const coreElements = [
  {
    id: 1,
    image: infoItemImg1,
    text: "Gesichtsbewegungen",
    bgColor: "bg-[#FFDAB99C]",
  },
  { id: 2, image: infoItemImg2, text: "Tiefes Atmen", bgColor: "bg-[#FFFACD]" },
  { id: 3, image: infoItemImg3, text: "Massage", bgColor: "bg-[#AEC6CF6B]" },
  { id: 4, image: infoItemImg4, text: "Massage", bgColor: "bg-[#FFD1DCBA]" },
];

function Info() {
  return (
    <div className="bg-white py-10" id="info_sec">
      <div className="container mx-auto px-4 flex flex-col gap-6">
        <h2 className="text-center text-[#403905] font-bold text-2xl">
          Was ist Gesichtsyoga?
        </h2>
        <p className="text-center text-[#6A652C] font-normal text-sm max-w-[700px] mx-auto">
          Face Yoga ist ein liebevoller Schritt zu dir selbst - eine kraftvolle
          Methode, die dir innere und äußere Ausstrahlung, Entspannung für
          Körper und Geist sowie einen natürlichen Energieschub bringt.
        </p>
        <div className="flex flex-wrap gap-6 mt-8">
          {cardItems.map((cardItem) => (
            <InfoCard
              key={cardItem.id}
              image={cardItem.image}
              title={cardItem.title}
              desc={cardItem.desc}
            />
          ))}
        </div>
        <div
          data-aos="fade-up"
          className="py-10 px-6 mt-8 border border-neutral-100 rounded-lg shadow-md"
        >
          <h3 className="text-center text-[#403905] text-lg font-bold mb-10">
            Kernelemente
          </h3>
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {coreElements.map((item) => (
              <li
                key={item.id}
                className={`${item.bgColor} flex items-center gap-3 px-3 py-2 rounded-4xl`}
              >
                <img src={item.image} alt={item.text} width={20} />
                <span className="text-[#8B9D83] text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Info;
