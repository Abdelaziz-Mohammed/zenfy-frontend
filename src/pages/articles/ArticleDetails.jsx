import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

function ArticleDetails() {
  const location = useLocation();
  const [isDescOpen, setIsDescOpen] = useState(true);
  const { image, title, desc, detailedDesc } = location.state || {};

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 mt-16 py-10">
        <div
          data-aos="fade-up"
          data-aos-offset="0"
          className="flex flex-col gap-6"
        >
          <img
            src={image}
            alt={title}
            className="rounded-md w-full max-w-xl max-h-[500px] object-contain"
          />
          <h2 className="text-[#403905] text-left text-2xl font-bold">
            {title}
          </h2>
          <div>
            <div
              onClick={() => setIsDescOpen(!isDescOpen)}
              className={`pb-6 px-1 rounded-t-lg ${
                isDescOpen && "border-b border-neutral-300"
              } mb-4
              flex items-center justify-between gap-8 cursor-pointer`}
            >
              <p className="text-[#6A652C] text-sm sm:text-base font-semibold">
                {desc}
              </p>
              <button
                onClick={() => setIsDescOpen(!isDescOpen)}
                className="outline-0 border border-neutral-300 bg-white text-[#6A652C] text-lg cursor-pointer
                p-2 rounded-full hover:text-white hover:bg-[#6A652C] transition-all duration-500 ease-in-out"
              >
                {isDescOpen ? <FaAngleUp /> : <FaAngleDown />}
              </button>
            </div>
            {isDescOpen && (
              <div
                data-aos="fade-up"
                data-aos-offset="0"
                className="detailed-description"
                dangerouslySetInnerHTML={{ __html: detailedDesc }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;
