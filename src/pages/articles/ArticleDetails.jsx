import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

function ArticleDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDescOpen, setIsDescOpen] = useState(true);
  const { image, title, desc, detailedDesc } = location.state || {};

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 mt-16 py-10">
        <div className="flex flex-col gap-6">
          <img
            data-aos="fade-up"
            data-aos-offset="0"
            src={image}
            alt={title}
            className="w-full h-auto max-h-[500px] rounded-md shadow-md border border-neutral-100"
          />
          <h2
            data-aos="fade-up"
            data-aos-offset="0"
            className="text-[#403905] text-center text-2xl font-bold"
          >
            {title}
          </h2>
          <div
            data-aos="fade-up"
            data-aos-offset="0"
            onClick={() => setIsDescOpen(!isDescOpen)}
            className="py-6 px-4 rounded-t-lg border border-neutral-400 bg-neutral-100
            flex items-center justify-between gap-8 cursor-pointer"
          >
            <p className="text-[#6A652C] font-normal text-sm">{desc}</p>
            <button
              onClick={() => setIsDescOpen(!isDescOpen)}
              className="outline-0 border-neutral-300 bg-white text-[#6A652C] text-lg cursor-pointer
              p-2 rounded-full hover:text-white hover:bg-[#6A652C] transition-all duration-500 ease-in-out"
            >
              {isDescOpen ? <FaMinus /> : <FaPlus />}
            </button>
          </div>
          {isDescOpen && (
            <p
              data-aos="fade-up"
              data-aos-offset="0"
              className="-mt-6 text-[#6A652C] font-medium text-base tracking-wide leading-8 py-8 px-4 
              border border-t-0 border-neutral-400 rounded-b-lg transition duration-500 ease-in-out"
            >
              {detailedDesc}
            </p>
          )}
          <button
            data-aos="fade-up"
            data-aos-offset="0"
            onClick={() => {
              navigate("/articles");
              window.scrollTo(0, 0);
            }}
            className="sm:my-10 outline-0 border-0 h-10 flex items-center justify-center px-6 rounded-4xl text-white bg-[#4f793dec]
            text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out"
          >
            Return to Articles
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;
