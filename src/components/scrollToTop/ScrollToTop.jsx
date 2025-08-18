import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 200); // Show button when scrolled 200px down
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="300"
      className="fixed bottom-4 right-4 z-50"
    >
      {isVisible && (
        <button
          onClick={handleScroll}
          className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-yellow-600 shadow-lg 
          hover:bg-yellow-700/75 ease-linear duration-200 cursor-pointer"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default ScrollToTop;
