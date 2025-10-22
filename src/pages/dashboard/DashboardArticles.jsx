import { useContext, useEffect, useState } from "react";
import { ArticlesContext } from "./../../context/ArticlesContext";
import { AuthContext } from "./../../context/AuthContext";
import { FaEdit, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePublish, MdOutlineUnpublished } from "react-icons/md";
import { PiShuffleAngularThin } from "react-icons/pi";
import Loading from "../../components/loading/Loading";
import ArticleModal from "./ArticleModal";
import DeleteArticleModal from "./DeleteArticleModal";
import OrderArticlesModal from "./OrderArticlesModal";
import { useNavigate } from "react-router-dom";

function DashboardArticles() {
  const {
    allArticles,
    loading,
    fetchArticles,
    fetchAllArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    publishArticle,
    unpublishArticle,
    reorderArticles,
  } = useContext(ArticlesContext);

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [articleCreatingLoading, setArticleCreatingLoading] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const reload = async () => {
    if (token) await fetchAllArticles(token);
    else await fetchArticles();
  };

  useEffect(() => {
    reload();
  }, [token]);

  const handleModalSubmit = async (e, formData, setFormError) => {
    e.preventDefault();

    // simple validation
    if (!formData.title.trim()) {
      setFormError((p) => ({ ...p, title: "Title is required" }));
      return;
    }

    if (!formData.desc.trim()) {
      setFormError((p) => ({ ...p, desc: "Short description is required" }));
      return;
    }

    if (!formData.detailedDesc.trim()) {
      setFormError((p) => ({
        ...p,
        detailedDesc: "Detailed description required",
      }));
      return;
    }

    if (!isEditing && !formData.image) {
      setFormError((p) => ({ ...p, image: "Image is required" }));
      return;
    }

    setArticleCreatingLoading(true);

    try {
      if (isEditing && currentArticle)
        await updateArticle(currentArticle._id, formData, token);
      else await createArticle(formData, token);
      await reload();
      setIsModalOpen(false);
      setCurrentArticle(null);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setArticleCreatingLoading(false);
    }
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (id, isPublished) => {
    if (isPublished) await unpublishArticle(id, token);
    else await publishArticle(id, token);
    await reload();
  };

  const openDeleteModal = (articleId) => {
    setArticleToDelete(articleId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (articleToDelete) {
      await deleteArticle(articleToDelete, token);
      await reload();
    }
    setIsDeleteModalOpen(false);
    setArticleToDelete(null);
  };

  const handleSaveOrder = async (orderedArticles) => {
    try {
      const orderedIds = orderedArticles.map((a) => a._id);
      await reorderArticles(orderedIds, token);
      await reload();
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  return (
    <div className="border border-neutral-200 px-4 py-6 rounded-xl">
      {/* Button to open modal */}
      <div className="flex flex-wrap items-center justify-between gap-6 gap-y-0 mb-6">
        <h4 className="text-center text-lg font-semibold my-4">
          Articles List
        </h4>
        <div className="flex items-center gap-4 ms-auto">
          <button
            onClick={() => {
              setIsEditing(false);
              setCurrentArticle(null);
              setIsModalOpen(true);
            }}
            className="bg-[#8B9D83] text-white px-4 py-2 rounded-lg hover:bg-[#676625df] transition flex items-center gap-1 text-sm"
          >
            <FaPlus className="text-sm" />
            Create Article
          </button>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="bg-[#8B9D83] text-white px-4 py-2 rounded-lg hover:bg-[#7C724F] transition flex items-center gap-1 text-sm"
          >
            <PiShuffleAngularThin className="text-lg" />
            ReOrder Articles
          </button>
        </div>
      </div>

      {loading ? (
        <Loading fullscreen={false} />
      ) : (
        <ul className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-xl">
          {allArticles.map((article) => (
            <li
              key={article._id}
              className="flex flex-col gap-4 not-last:mb-4 not-last:border-b border-b-neutral-200 not-last:pb-8 relative"
            >
              <span className="absolute top-0 left-0 bg-[#676625] text-white text-xs px-2 py-1 rounded-br-lg rounded-tl-lg">
                #{article.order + 1}
              </span>
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="rounded-lg border border-neutral-300 w-[140px] h-[80px] object-cover shadow-lg cursor-pointer"
                    onClick={() => {
                      navigate(`/articles/${article.slug}`, {
                        state: { ...article, image: article.imageUrl },
                      });
                      window.scrollTo(0, 0);
                    }}
                  />
                )}
                <div className="flex-1 overflow-hidden flex flex-col justify-between gap-1">
                  <h3 className="text-[#676625] text-sm font-semibold">
                    {article.title}
                  </h3>
                  <p className="text-[#374151] font-medium text-sm text-nowrap overflow-hidden text-ellipsis max-w-[95%]">
                    {article.desc}
                  </p>
                  <p className="text-xs text-neutral-500">
                    <span className="text-[13px] font-semibold">Status:</span>{" "}
                    <span className="font-medium text-red-500">
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full flex gap-4 max-[450px]:flex-col">
                <button
                  onClick={() =>
                    handleTogglePublish(article._id, article.published)
                  }
                  className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                    hover:bg-blue-600 transition flex items-center justify-center gap-1"
                >
                  {article.published ? (
                    <MdOutlineUnpublished />
                  ) : (
                    <MdOutlinePublish />
                  )}
                  {article.published ? "Unpublish" : "Publish"}
                </button>

                <button
                  onClick={() => handleEdit(article)}
                  className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                    hover:bg-green-600 transition flex items-center justify-center gap-1"
                >
                  <FaEdit /> Update
                </button>

                <button
                  onClick={() => openDeleteModal(article._id)}
                  className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                  hover:bg-red-600 transition flex items-center justify-center gap-1"
                >
                  <FaRegTrashAlt /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add and UpdateModal */}
      <ArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isEditing={isEditing}
        currentArticle={currentArticle}
        articleCreatingLoading={articleCreatingLoading}
      />

      {/* Delete Modal */}
      <DeleteArticleModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Order Articles Modal */}
      <OrderArticlesModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        articles={allArticles}
        onSaveOrder={handleSaveOrder}
      />
    </div>
  );
}

export default DashboardArticles;
