import { trainerImg } from "./../../assets/index.js";
import {
  FaGlobe,
  FaChalkboardTeacher,
  FaSpa,
  FaCertificate,
  FaLeaf,
} from "react-icons/fa";

const aboutItems = [
  {
    id: 1,
    text: "Leidenschaft für Sprachen, Kulturen und ganzheitliche Schönheit.",
    icon: <FaGlobe className="text-xl text-[#403905]" />,
  },
  {
    id: 2,
    text: "Mehr als 20 Jahre Erfahrung in Sprachunterricht und Dolmetschen.",
    icon: <FaChalkboardTeacher className="text-xl text-[#403905]" />,
  },
  {
    id: 3,
    text: "Expertin für Yoga, Energiearbeit und Hautpflege.",
    icon: <FaSpa className="text-xl text-[#403905]" />,
  },
  {
    id: 4,
    text: "Seit 2024 zertifizierte Face-Yoga-Trainerin.",
    icon: <FaCertificate className="text-xl text-[#403905]" />,
  },
  {
    id: 5,
    text: "Hilft dir, deine natürliche Schönheit zu entfalten, Energie zu tanken und innere Harmonie zu finden.",
    icon: <FaLeaf className="text-xl text-[#403905]" />,
  },
];

function AboutTrainer() {
  return (
    <>
      <div className="bg-[#F5E6CC80] py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-y-6 md:gap-1">
          <img
            src={trainerImg}
            alt="Trainer image"
            className="max-w-[400px] w-72 md:w-auto max-md:mx-auto"
          />
          <div className="self-center">
            <h2 className="text-[#403905] font-bold text-2xl mb-6 md:mb-10">
              Über die Trainerin Zhanna
            </h2>
            <ul className="flex flex-col gap-4 md:gap-6">
              {aboutItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-sm text-[#374151]/95">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutTrainer;
