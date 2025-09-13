import { useContext, useEffect, useState } from "react";
import { EventsContext } from "./../../context/EventsContext";
import { AuthContext } from "./../../context/AuthContext";
import { FaArrowRight, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePublish, MdOutlineUnpublished } from "react-icons/md";
import { calenderSvgImg, locationSvgImg } from "./../../assets/index";
import Loading from "../../components/loading/Loading";
import dayjs from "dayjs";

function DashboardEvents() {
  const {
    allEvents,
    loading,
    fetchEvents,
    fetchAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    publishEvent,
    unpublishEvent,
  } = useContext(EventsContext);

  const { token } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [currentEvent, setCurrentEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    detailedDesc: "",
    image: null,
    location: "",
    offer: "",
    startDate: "",
    endDate: "",
  });

  const [formError, setFormError] = useState({
    title: "",
    desc: "",
    detailedDesc: "",
    image: "",
    location: "",
    offer: "",
    startDate: "",
    endDate: "",
  });

  const [editingId, setEditingId] = useState(null);

  const reload = async () => {
    if (token) {
      await fetchAllEvents(token);
    } else {
      await fetchEvents();
    }
  };

  useEffect(() => {
    reload();
  }, [token]);

  useEffect(() => {
    if (currentEvent) {
      setFormData({
        title: currentEvent.title,
        desc: currentEvent.desc,
        detailedDesc: currentEvent.detailedDesc || "",
        image: null, // new image only if selected
        location: currentEvent.location,
        offer: currentEvent.offer || "",
        startDate: currentEvent.date?.start || "",
        endDate: currentEvent.date?.end || "",
      });
      setIsEditing(true);
    } else {
      setFormData({
        title: "",
        desc: "",
        detailedDesc: "",
        image: null,
        location: "",
        offer: "",
        startDate: "",
        endDate: "",
      });
      setIsEditing(false);
    }
  }, [currentEvent]);

  const resetFormData = () => {
    setFormData({
      title: "",
      desc: "",
      detailedDesc: "",
      image: null,
      location: "",
      offer: "",
      startDate: "",
      endDate: "",
    });
    setEditingId(null);
    setCurrentEvent(null);
  };

  const [eventCreatingLoading, setEventCreatingLoading] = useState(false);

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
    } else {
      setFormError((prevFormError) => ({
        ...prevFormError,
        image: "",
      }));
    }

    if (formData.image) {
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

    if (!formData.location.trim()) {
      setFormError((prev) => ({ ...prev, location: "Location is required" }));
      return;
    } else {
      setFormError((prev) => ({ ...prev, location: "" }));
    }

    if (!formData.startDate) {
      setFormError((prev) => ({
        ...prev,
        startDate: "Start date is required",
      }));
      return;
    } else {
      setFormError((prev) => ({ ...prev, startDate: "" }));
    }

    if (!formData.endDate) {
      setFormError((prev) => ({ ...prev, endDate: "End date is required" }));
      return;
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setFormError((prev) => ({
        ...prev,
        endDate: "End date cannot be earlier than start date",
      }));
      return;
    } else {
      setFormError((prev) => ({ ...prev, endDate: "" }));
    }

    setEventCreatingLoading(true);

    try {
      if (isEditing && currentEvent) {
        await updateEvent(currentEvent._id, formData, token);
      } else {
        await createEvent(formData, token);
      }
      await reload();
      resetFormData();
    } catch (err) {
      console.error(err);
    } finally {
      setEventCreatingLoading(false);
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id, token);
      await reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleTogglePublish = async (id, isPublished) => {
    try {
      if (isPublished) {
        await unpublishEvent(id, token);
      } else {
        await publishEvent(id, token);
      }
      await reload();
    } catch (err) {
      console.error("Publish toggle failed:", err);
    }
  };

  return (
    <div className="border border-neutral-200 px-4 py-6 rounded-xl">
      {/* Create/Update form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-neutral-300 rounded-xl py-6 px-4 mb-6"
      >
        <h4 className="text-center text-lg font-semibold mb-2">
          {isEditing ? "Update Event" : "Create New Event"}
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
          <textarea
            name="detailedDesc"
            placeholder="Detailed Description"
            value={formData.detailedDesc}
            onChange={(e) =>
              setFormData({ ...formData, detailedDesc: e.target.value })
            }
            rows={4}
            className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
            transition duration-300 ease-in-out min-h-24 max-h-[210px]"
          />
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
        <div className="flex flex-col gap-1">
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
        <div className="flex flex-col gap-1">
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
        <button
          type="submit"
          className="outline-0 border-0 h-10 w-full rounded-lg text-white bg-[#8B9D83] mt-4
            text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out"
        >
          {editingId
            ? eventCreatingLoading
              ? "Updating Event..."
              : "Update Event"
            : eventCreatingLoading
            ? "Creating Event..."
            : "Create Event"}
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

      {/* Events list */}
      {loading ? (
        <Loading fullscreen={false} />
      ) : (
        <>
          <h4 className="text-center text-lg font-semibold my-4">
            Events List
          </h4>
          <ul className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-xl">
            {allEvents.map((event) => {
              const formattedDate = `${dayjs(event.date.start).format(
                "MMMM D, YYYY HH:mm"
              )} - ${dayjs(event.date.end).format("HH:mm")}`;

              const googleStart = dayjs(event.date.start).format(
                "YYYYMMDDTHHmmss[Z]"
              );
              const googleEnd = dayjs(event.date.end).format(
                "YYYYMMDDTHHmmss[Z]"
              );

              const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                event.title || "Zenfy Event"
              )}&dates=${googleStart}/${googleEnd}&details=${encodeURIComponent(
                event.desc || "Join our Face Yoga session"
              )}&location=${encodeURIComponent(event.location)}`;

              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.location
              )}`;

              return (
                <li
                  key={event._id}
                  className={`flex flex-col gap-4 mb-4 not-last:border-b not-last:border-b-neutral-200 not-last:pb-8`}
                >
                  <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="rounded-lg border border-neutral-300 w-[140px] h-[80px] object-cover shadow-lg"
                      />
                    )}
                    <div className="flex-1 overflow-hidden flex flex-col justify-between gap-1">
                      <h3 className="text-[#676625] text-sm font-semibold">
                        {event.title}
                      </h3>
                      <p className="text-[#374151] font-medium text-sm text-nowrap overflow-hidden text-ellipsis max-w-[95%]">
                        {event.desc}
                      </p>
                      <p className="text-xs text-neutral-500">
                        <span className="text-[13px] font-semibold">
                          Status:
                        </span>{" "}
                        <span className="font-medium text-red-500">
                          {event.published ? "Published" : "Draft"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2 mt-auto">
                    <li className="flex items-center gap-1">
                      <img
                        src={calenderSvgImg}
                        alt="Calendar image"
                        width={20}
                      />
                      <a
                        href={calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#8B9D83] font-normal underline hover:text-[#676625]"
                      >
                        {formattedDate}
                      </a>
                    </li>
                    <li className="flex items-center gap-1">
                      <img
                        src={locationSvgImg}
                        alt="Location image"
                        width={20}
                      />
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#8B9D83] font-normal underline hover:text-[#676625]"
                      >
                        {event.location}
                      </a>
                    </li>
                  </ul>
                  <div className="w-full flex gap-4 max-[450px]:flex-col">
                    <button
                      onClick={() =>
                        handleTogglePublish(event._id, event.published)
                      }
                      className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                    hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center gap-1"
                    >
                      {event.published ? (
                        <MdOutlineUnpublished />
                      ) : (
                        <MdOutlinePublish />
                      )}
                      {event.published ? "Unpublish" : "Publish"}{" "}
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                    hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center gap-1"
                    >
                      <FaEdit /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                    hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center gap-1"
                    >
                      <FaRegTrashAlt /> Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default DashboardEvents;
