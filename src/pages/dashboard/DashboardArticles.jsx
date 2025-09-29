import { useContext, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArticlesContext } from "./../../context/ArticlesContext";
import { AuthContext } from "./../../context/AuthContext";
import { FaArrowRight, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePublish, MdOutlineUnpublished } from "react-icons/md";
import Loading from "../../components/loading/Loading";
import Toolbar from "../../components/toolbar/Toolbar";
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
  } = useContext(ArticlesContext);

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [currentArticle, setCurrentArticle] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    detailedDesc: "",
    image: null,
  });

  const [formError, setFormError] = useState({
    title: "",
    desc: "",
    detailedDesc: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);

  const reload = async () => {
    if (token) {
      await fetchAllArticles(token);
    } else {
      await fetchArticles();
    }
  };

  useEffect(() => {
    reload();
  }, [token]);

  useEffect(() => {
    if (currentArticle) {
      setFormData({
        title: currentArticle.title,
        desc: currentArticle.desc,
        detailedDesc: currentArticle.detailedDesc || "",
        image: null, // new image only if selected
      });
      setIsEditing(true);
    } else {
      setFormData({ title: "", desc: "", detailedDesc: "", image: null });
      setIsEditing(false);
    }
  }, [currentArticle]);

  const resetFormData = () => {
    setFormData({ title: "", desc: "", detailedDesc: "", image: null });
    setFormError({ title: "", desc: "", detailedDesc: "", image: "" });
    setIsEditing(false);
    setEditingId(null);
    setCurrentArticle(null);
  };

  const [articleCreatingLoading, setArticleCreatingLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (formData.title.trim() === "") {
      setFormError((prevFormError) => ({
        ...prevFormError,
        title: "Title is required",
      }));
      return;
    } else {
      setFormError((prevFormError) => ({
        ...prevFormError,
        title: "",
      }));
    }

    if (!formData.desc.trim()) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        desc: "Short description is required",
      }));
      return;
    } else {
      setFormError((prevFormError) => ({
        ...prevFormError,
        desc: "",
      }));
    }

    if (!formData.detailedDesc.trim()) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        detailedDesc: "Detailed description is required",
      }));
      return;
    } else {
      setFormError((prevFormError) => ({
        ...prevFormError,
        detailedDesc: "",
      }));
    }

    if (formData.image === null && !isEditing) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        image: "Image is required",
      }));
      return;
    } else {
      setFormError((prevFormError) => ({
        ...prevFormError,
        detailedDesc: "",
      }));
    }

    if (formData.image === null && !isEditing) {
      setFormError((prevFormError) => ({
        ...prevFormError,
        image: "Image is required",
      }));
      return;
    } else if (formData.image) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(formData.image.type)) {
        setFormError((prevFormError) => ({
          ...prevFormError,
          image: "Invalid image type",
        }));
        return;
      }
    } else {
      setFormError((prevFormError) => ({
        ...prevFormError,
        image: "",
      }));
    }

    setArticleCreatingLoading(true);

    try {
      if (isEditing && currentArticle) {
        await updateArticle(currentArticle._id, formData, token);
      } else {
        await createArticle(formData, token);
      }
      await reload();
      resetFormData();
    } catch (err) {
      console.error(err);
    } finally {
      setArticleCreatingLoading(false);
    }
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setEditingId(article._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id, token);
      await reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleTogglePublish = async (id, isPublished) => {
    try {
      if (isPublished) {
        await unpublishArticle(id, token);
      } else {
        await publishArticle(id, token);
      }
      await reload();
    } catch (err) {
      console.error("Publish toggle failed:", err);
    }
  };

  // handle rich text editor (tiptap) for detailedDesc
  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.detailedDesc,
    onUpdate: ({ editor }) => {
      setFormData((prevData) => ({
        ...prevData,
        detailedDesc: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    if (editor && formData.detailedDesc !== editor.getHTML()) {
      editor.commands.setContent(formData.detailedDesc || "");
    }
  }, [formData.detailedDesc, editor]);

  return (
    <div className="border border-neutral-200 px-4 py-6 rounded-xl">
      {/* Create/Update form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-neutral-300 rounded-xl py-6 px-4 mb-6"
      >
        <h4 className="text-center text-lg font-semibold mb-2">
          {isEditing ? "Update Article" : "Create New Article"}
        </h4>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400 
            transition duration-300 ease-in-out"
          />
          {formError.title.length > 0 && (
            <p className="text-[13px] text-red-500">
              {"* "} {formError.title}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="desc"
            placeholder="Short Description"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400 
            transition duration-300 ease-in-out"
          />
          {formError.desc.length > 0 && (
            <p className="text-[13px] text-red-500">
              {"* "} {formError.desc}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div
            className="bg-[#f1f1f136] overflow-hidden rounded-lg"
            placeholder="Detailed Description"
          >
            <p className="text-neutral-600 px-4 py-2 text-center font-medium border border-b-0 border-neutral-300 rounded-t-lg">
              Detailed Description
            </p>
            <Toolbar editor={editor} />
            <div className="border border-t-0 border-neutral-300 rounded-b-lg min-h-[300px] max-h-[500px] overflow-y-auto">
              <EditorContent
                editor={editor}
                className="outline-0 min-h-[140px] h-full text-black bg-transparent rounded-b-lg"
              />
            </div>
          </div>
          {formError.detailedDesc.length > 0 && (
            <p className="text-[13px] text-red-500">
              {"* "} {formError.detailedDesc}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div
            className={`h-10 flex items-center border border-neutral-200 ${
              formData.image ? "bg-neutral-100" : ""
            } shadow rounded overflow-hidden`}
          >
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-primary/90 font-semibold flex items-center gap-1
              hover:text-primary hover:translate-x-0 transition bg-primary/10 py-2 pr-5 pl-7 -translate-x-3"
            >
              <span>Choose Article Image</span>
              <FaArrowRight className="pt-1 text-xl" />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.files[0] })
              }
              className="hidden"
            />
            {formData.image && (
              <span
                className="text-sm text-neutral-700 truncate bg-neutral-100
              text-center py-3 font-medium flex-1"
              >
                {formData.image.name}
              </span>
            )}
          </div>
          {formError.image.length > 0 && (
            <p className="text-[13px] text-red-500">
              {"* "} {formError.image}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="outline-0 border-0 h-10 w-full rounded-lg text-white bg-[#8B9D83] mt-4
            text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out"
        >
          {editingId
            ? articleCreatingLoading
              ? "Updating Article..."
              : "Update Article"
            : articleCreatingLoading
            ? "Creating Article..."
            : "Create Article"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetFormData}
            className="outline-0 border border-[#8B9D83] h-10 w-full rounded-lg text-[#798873] bg-transparent mt-2
            text-sm sm:text-base cursor-pointer hover:bg-[#676625df] hover:text-white hover:border-[#676625df] transition duration-300 ease-in-out"
          >
            Cancel
          </button>
        )}
      </form>
      {/* Articles list */}
      {loading ? (
        <Loading fullscreen={false} />
      ) : (
        <>
          <h4 className="text-center text-lg font-semibold my-4">
            Articles List
          </h4>
          <ul className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-xl">
            {allArticles.map((article) => (
              <li
                key={article._id}
                className={`flex flex-col gap-4 mb-4 not-last:border-b not-last:border-b-neutral-200 not-last:pb-8`}
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="rounded-lg border border-neutral-300 w-[140px] h-[80px] object-cover shadow-lg cursor-pointer"
                      onClick={() => {
                        navigate(`/articles/${article.slug}`, {
                          state: {
                            image: article.imageUrl,
                            title: article.title,
                            desc: article.desc,
                            detailedDesc: article.detailedDesc,
                          },
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
                    hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center gap-1"
                  >
                    {article.published ? (
                      <MdOutlineUnpublished />
                    ) : (
                      <MdOutlinePublish />
                    )}
                    {article.published ? "Unpublish" : "Publish"}{" "}
                  </button>
                  <button
                    onClick={() => handleEdit(article)}
                    className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                    hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center gap-1"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                    hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center gap-1"
                  >
                    <FaRegTrashAlt /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default DashboardArticles;
