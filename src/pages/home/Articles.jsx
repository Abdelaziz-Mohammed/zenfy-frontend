import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArticlesContext } from "../../context/ArticlesContext.jsx";
import Loading from "../../components/loading/Loading.jsx";
import ArticleCard from "./ArticleCard.jsx";
import { FaArrowRight } from "react-icons/fa";

function Articles() {
  const { publishedArticles, loading, fetchArticles } =
    useContext(ArticlesContext);
  const navigate = useNavigate();

  const navigateToArticles = () => {
    navigate("/articles");
    window.scrollTo(0, 0);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromDashboard) {
      fetchArticles();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="bg-[#F9FAFB] py-10">
      <div className="container mx-auto px-4 flex flex-col gap-6">
        <h2 className="text-[#403905] font-bold text-2xl">Artikel</h2>
        <p className="text-[#6A652C] font-normal text-sm max-w-[500px]">
          Entdecke inspirierende Tipps zu Face Yoga, Wellness & natürlicher
          Schönheit
        </p>
        {loading ? (
          <Loading fullscreen={false} />
        ) : (
          <div className="flex flex-wrap gap-6 mt-8">
            {publishedArticles
              .sort((article1, article2) => article1.order - article2.order)
              .slice(0, 3)
              .map((article) => (
                <ArticleCard
                  key={article._id}
                  id={article.slug}
                  image={article.imageUrl}
                  title={article.title}
                  desc={article.desc}
                  detailedDesc={article.detailedDesc}
                />
              ))}
          </div>
        )}
        <button
          onClick={navigateToArticles}
          className="utline-0 border-0 h-12 flex items-center justify-center gap-2 px-6 rounded-4xl text-white bg-[#8B9D83]
            text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out w-fit mx-auto mt-10"
        >
          Mehr Artikel ansehen <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Articles;
