import { Link } from "react-router-dom";
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
    text: "Seit 2024 zertifizierte Face-Yoga-Trainerin",
    icon: <FaCertificate className="text-xl text-[#403905]" />,
  },
  {
    id: 2,
    text: "Pädagogin & Sprachmittlerin zwischen verschiedenen Kulturen",
    icon: <FaChalkboardTeacher className="text-xl text-[#403905]" />,
  },
  {
    id: 3,
    text: "Leidenschaft für ganzheitliche Schönheit, Energiearbeit & Hautpflege",
    icon: <FaGlobe className="text-xl text-[#403905]" />,
  },
  {
    id: 4,
    text: "Hilft dir, Energie zu tanken, innere Harmonie zu finden & deine natürliche Schönheit zu entfalten",
    icon: <FaLeaf className="text-xl text-[#403905]" />,
  },
];

function AboutTrainer() {
  return (
    <>
      <div className="bg-[#F5E6CC80] py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-y-6 md:gap-4">
          <img
            data-aos="fade-up"
            src={trainerImg}
            alt="Trainer image"
            className="max-w-[400px] w-72 md:w-auto max-md:mx-auto"
          />
          <div className="self-center">
            <h2
              data-aos="fade-up"
              className="text-[#403905] font-bold text-2xl mb-6 md:mb-10"
            >
              Über mich
            </h2>
            <ul className="flex flex-col gap-4 md:gap-6">
              {aboutItems.map((item) => (
                <li
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={`${item.id * 100}`}
                  className="flex items-center gap-4"
                >
                  {item.icon}
                  <span className="text-sm text-[#374151]/95">{item.text}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              data-aos="fade-up"
              data-aos-delay="600"
              className="mt-10 px-20 py-2 text-[#403905] border border-[#403905] bg-transparent rounded-4xl inline-block
              font-bold hover:bg-[#403905] hover:text-white transition-colors duration-300 ease-in-out self-center"
            >
              Mehr
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutTrainer;
