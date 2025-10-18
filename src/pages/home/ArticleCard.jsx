import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ArticleCard({ id, image, title, desc, detailedDesc }) {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/articles/${id}`, {
      state: { image, title, desc, detailedDesc },
    });
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={navigateToDetails}
      data-aos="fade-up"
      className="flex flex-col gap-1 border border-neutral-100 rounded-lg shadow-md
      py-6 px-4 w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)] cursor-pointer
      hover:shadow-lg hover:scale-[1.01] transition-all duration-500 ease-in-out"
    >
      <img
        src={image}
        alt={title}
        className="h-80 object-contain shadow-sm rounded-lg bg-white/20 backdrop-blur-2xl"
      />
      <h4 className="text-[#676625] text-base font-semibold mt-3 line-clamp-1">
        {title}
      </h4>
      <p className="text-[#374151] font-medium text-sm line-clamp-2 mb-3">
        {desc}
      </p>
      <button
        className="outline-0 border-0 bg-transparent text-[#676625] text-sm cursor-pointer
        flex items-center gap-3 hover:translate-x-2 transition duration-300 ease-in-out mt-auto"
      >
        Read more <FaArrowRight />
      </button>
    </div>
  );
}

export default ArticleCard;
