import { useContext, useEffect } from "react";
import { ArticlesContext } from "../../context/ArticlesContext.jsx";
import Loading from "../../components/loading/Loading.jsx";
import ArticleCard from "../home/ArticleCard.jsx";
import { useLocation } from "react-router-dom";

function Articles() {
  const { publishedArticles, loading, fetchArticles } =
    useContext(ArticlesContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromDashboard) {
      fetchArticles();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="mt-16 pt-10 pb-20">
      <div className="container mx-auto px-4">
        <h2 className="text-[#403905] font-bold text-2xl mb-6">Artikel</h2>
        <p className="text-[#6A652C] font-normal text-sm max-w-[500px] mb-10">
          Entdecken Sie unsere neuesten Tipps zu Face Yoga, Wellness und
          natürlicher Schönheit
        </p>
        {loading ? (
          <Loading fullscreen={false} />
        ) : (
          <div className="flex flex-wrap gap-6 mt-8">
            {publishedArticles
              .sort((article1, article2) => article1.order - article2.order)
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
      </div>
    </div>
  );
}

export default Articles;
