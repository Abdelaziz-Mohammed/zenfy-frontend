import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./../../components/toolbar/Toolbar";
import { FaArrowRight } from "react-icons/fa";
import dayjs from "dayjs";

function EventModal({
  isOpen,
  onClose,
  onSubmit,
  isEditing,
  currentEvent,
  eventCreatingLoading,
}) {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    detailedDesc: "",
    image: null,
    location: "",
    price: 0,
    startDate: "",
    endDate: "",
  });

  const [formError, setFormError] = useState({
    title: "",
    desc: "",
    detailedDesc: "",
    image: "",
    location: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: formData.detailedDesc,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, detailedDesc: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (currentEvent) {
      setFormData({
        title: currentEvent.title,
        desc: currentEvent.desc,
        detailedDesc: currentEvent.detailedDesc || "",
        image: null, // new image only if selected
        location: currentEvent.location,
        price: currentEvent.price || 0,
        startDate: currentEvent.date?.start || "",
        endDate: currentEvent.date?.end || "",
      });
    } else {
      setFormData({
        title: "",
        desc: "",
        detailedDesc: "",
        image: null,
        location: "",
        price: 0,
        startDate: "",
        endDate: "",
      });
    }
  }, [currentEvent]);

  useEffect(() => {
    if (editor && formData.detailedDesc !== editor.getHTML()) {
      editor.commands.setContent(formData.detailedDesc || "");
    }
  }, [formData.detailedDesc, editor]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg p-6 w-[95%] max-w-2xl relative overflow-y-auto max-h-[95vh]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-lg font-bold"
        >
          ✕
        </button>

        <h4 className="text-center text-lg font-semibold mb-4">
          {isEditing ? "Update Event" : "Create New Event"}
        </h4>

        <form onSubmit={(e) => onSubmit(e, formData, setFormError)}>
          <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
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

            {/* Short Desc */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="desc"
                placeholder="Short Description"
                value={formData.desc}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, desc: e.target.value }))
                }
                className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400
                transition duration-300 ease-in-out"
              />
              {formError.desc.length > 0 && (
                <p className="text-[13px] text-red-500">
                  {"* "} {formError.desc}
                </p>
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

            {/* price */}
            <div className="flex flex-col gap-1">
              <label className="text-base text-neutral-700">Event Price</label>
              <input
                type="number"
                name="price"
                placeholder="Event Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                min="0"
                className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400
                transition duration-300 ease-in-out"
              />
              {formError.price.length > 0 && (
                <p className="text-[13px] text-red-500">
                  {"* "} {formError.price}
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
                  <span>Choose Event Image</span>
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

            {/* Location */}
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="location"
                placeholder="Event Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400
                transition duration-300 ease-in-out"
              />
              {formError.location.length > 0 && (
                <p className="text-[13px] text-red-500">
                  {"* "} {formError.location}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-1">
              <label className="text-base text-neutral-700">
                Event Start Date
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={
                  formData.startDate
                    ? dayjs(formData.startDate).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400
                transition duration-300 ease-in-out"
              />
              {formError.startDate.length > 0 && (
                <p className="text-[13px] text-red-500">
                  {"* "} {formError.startDate}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-1">
              <label className="text-base text-neutral-700">
                Event End Date
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={
                  formData.endDate
                    ? dayjs(formData.endDate).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="outline-0 border border-neutral-300 p-3 rounded-lg focus:border-neutral-400
                transition duration-300 ease-in-out"
              />
              {formError.endDate.length > 0 && (
                <p className="text-[13px] text-red-500">
                  {"* "} {formError.endDate}
                </p>
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
                className="px-4 py-2 bg-[#8B9D83] hover:bg-[#676625df] rounded-md text-white"
              >
                {isEditing
                  ? eventCreatingLoading
                    ? "Updating Event..."
                    : "Update Event"
                  : eventCreatingLoading
                  ? "Creating Event..."
                  : "Create Event"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
