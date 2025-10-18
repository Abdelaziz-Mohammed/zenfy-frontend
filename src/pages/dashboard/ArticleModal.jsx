import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./../../components/toolbar/Toolbar";
import { FaArrowRight } from "react-icons/fa";

function ArticleModal({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  currentArticle,
  articleCreatingLoading,
}) {
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

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.detailedDesc,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        detailedDesc: editor.getHTML(),
      }));
    },
  });

  useEffect(() => {
    if (currentArticle) {
      setFormData({
        title: currentArticle.title,
        desc: currentArticle.desc,
        detailedDesc: currentArticle.detailedDesc || "",
        image: null,
      });
    } else {
      setFormData({
        title: "",
        desc: "",
        detailedDesc: "",
        image: null,
      });
    }
  }, [currentArticle]);

  useEffect(() => {
    if (editor && formData.detailedDesc !== editor.getHTML()) {
      editor.commands.setContent(formData.detailedDesc || "");
    }
  }, [formData.detailedDesc, editor]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg w-[95%] max-w-2xl p-6 relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg font-bold"
        >
          ✕
        </button>

        <h4 className="text-center text-lg font-semibold mb-4">
          {isEditing ? "Update Article" : "Create New Article"}
        </h4>

        <form
          onSubmit={(e) => onSubmit(e, formData, setFormError)}
          className="flex flex-col gap-4"
        >
          {/* Title */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400 transition duration-300"
            />
            {formError.title.length > 0 && (
              <p className="text-[13px] text-red-500">* {formError.title}</p>
            )}
          </div>

          {/* Short Desc */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Short Description"
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400 transition duration-300"
            />
            {formError.desc.length > 0 && (
              <p className="text-[13px] text-red-500">* {formError.desc}</p>
            )}
          </div>

          {/* Detailed Desc */}
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

          {/* Image */}
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
                <span className="text-sm text-neutral-700 truncate bg-neutral-100 text-center py-3 font-medium flex-1">
                  {formData.image.name}
                </span>
              )}
            </div>
            {formError.image && (
              <p className="text-[13px] text-red-500">* {formError.image}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="outline-0 border-0 h-10 w-full rounded-lg text-white bg-[#8B9D83]
              text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out"
            >
              {isEditing
                ? articleCreatingLoading
                  ? "Updating Article..."
                  : "Update Article"
                : articleCreatingLoading
                ? "Creating Article..."
                : "Create Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleModal;
