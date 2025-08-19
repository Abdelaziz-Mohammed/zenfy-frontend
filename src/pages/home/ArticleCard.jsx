import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ArticleCard({ id, image, title, desc, detailedDesc }) {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    navigate(`/article/${id}`, { state: { image, title, desc, detailedDesc } });
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
      <img src={image} alt={title} className="h-40 object-cover rounded-md" />
      <h4 className="text-[#676625] text-base font-semibold mt-3">{title}</h4>
      <p className="text-[#374151] font-medium text-sm sm:h-[100px]">{desc}</p>
      <button
        className="outline-0 border-0 bg-transparent text-[#676625] text-sm cursor-pointer
        flex items-center gap-3 hover:translate-x-2 transition duration-300 ease-in-out mt-4"
      >
        Read more <FaArrowRight />
      </button>
    </div>
  );
}

export default ArticleCard;
