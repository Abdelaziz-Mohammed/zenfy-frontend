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
  },
  {
    id: 2,
    image: articleCardImg2,
    title: "Natürliche Energiequelle",
    desc: "Entdecke, wie Atemübungen und Face Yoga deine Lebensenergie aktivieren, Stress abbauen und für mehr Vitalität im Alltag sorgen.",
  },
  {
    id: 3,
    image: articleCardImg3,
    title: "Ursprung des Face Yoga",
    desc: "Erfahre, wie Face Yoga entstanden ist und wie diese alte Praxis Gesichtstraining mit Atemtechniken verbindet, um natürliche Gesundheit und Schönheit zu fördern.",
  },
];

function Article() {
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
              image={cardItem.image}
              title={cardItem.title}
              desc={cardItem.desc}
            />
          ))}
        </div>
        <button
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
