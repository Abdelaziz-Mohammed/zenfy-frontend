import { useContext, useEffect, useState } from "react";
import { EventsContext } from "./../../context/EventsContext";
import { AuthContext } from "./../../context/AuthContext";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlinePublish, MdOutlineUnpublished } from "react-icons/md";
import { calenderSvgImg, locationSvgImg } from "./../../assets/index";
import Loading from "../../components/loading/Loading";
import EventModal from "./EventModal";
import DeleteEventModal from "./DeleteEventModal";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventCreatingLoading, setEventCreatingLoading] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const reload = async () => {
    if (token) await fetchAllEvents(token);
    else await fetchEvents();
  };

  useEffect(() => {
    reload();
  }, [token]);

  const handleModalSubmit = async (e, formData, setFormError) => {
    e.preventDefault();

    // basic validation
    if (!formData.title.trim()) {
      setFormError((p) => ({ ...p, title: "Title is required" }));
      return;
    } else {
      setFormError((p) => ({ ...p, title: "" }));
    }

    if (!formData.desc.trim()) {
      setFormError((p) => ({ ...p, desc: "Short Description is required" }));
      return;
    } else {
      setFormError((p) => ({ ...p, desc: "" }));
    }

    if (!formData.detailedDesc.trim()) {
      setFormError((p) => ({
        ...p,
        detailedDesc: "Detailed description is required",
      }));
      return;
    } else {
      setFormError((p) => ({
        ...p,
        detailedDesc: "",
      }));
    }

    if (formData.image === null && !isEditing) {
      setFormError((p) => ({
        ...p,
        image: "Image is required",
      }));
      return;
    } else {
      setFormError((p) => ({
        ...p,
        image: "",
      }));
    }

    if (formData.image) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(formData.image.type)) {
        setFormError((p) => ({
          ...p,
          image: "Invalid image type",
        }));
        return;
      }
    } else {
      setFormError((p) => ({
        ...p,
        image: "",
      }));
    }

    if (!formData.location.trim()) {
      setFormError((p) => ({ ...p, location: "Location is required" }));
      return;
    } else {
      setFormError((p) => ({ ...p, location: "" }));
    }

    if (!formData.startDate) {
      setFormError((p) => ({
        ...p,
        startDate: "Start date is required",
      }));
      return;
    } else {
      setFormError((p) => ({ ...p, startDate: "" }));
    }

    if (!formData.endDate) {
      setFormError((p) => ({ ...p, endDate: "End date is required" }));
      return;
    } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setFormError((p) => ({
        ...p,
        endDate: "End date cannot be earlier than start date",
      }));
      return;
    } else {
      setFormError((p) => ({ ...p, endDate: "" }));
    }

    setEventCreatingLoading(true);

    try {
      if (isEditing && currentEvent)
        await updateEvent(currentEvent._id, formData, token);
      else await createEvent(formData, token);
      await reload();
      setIsModalOpen(false);
      setCurrentEvent(null);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setEventCreatingLoading(false);
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (id, isPublished) => {
    if (isPublished) await unpublishEvent(id, token);
    else await publishEvent(id, token);
    await reload();
  };

  const openDeleteModal = (eventId) => {
    setEventToDelete(eventId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete) {
      await deleteEvent(eventToDelete, token);
      await reload();
    }
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className="border border-neutral-200 px-4 py-6 rounded-xl">
      {/* Button to open modal */}
      <div className="flex items-center justify-between gap-6 mb-6">
        <h4 className="text-center text-lg font-semibold my-4">Events List</h4>
        <button
          onClick={() => {
            setIsEditing(false);
            setCurrentEvent(null);
            setIsModalOpen(true);
          }}
          className="bg-[#8B9D83] text-white px-4 py-2 rounded-lg hover:bg-[#676625df] transition"
        >
          + Create Event
        </button>
      </div>

      {loading ? (
        <Loading fullscreen={false} />
      ) : (
        <ul className="flex flex-col gap-4 p-4 border border-neutral-200 rounded-xl">
          {allEvents.map((event) => {
            const formattedDate = `${dayjs(event.date.start).format(
              "MMMM D, YYYY HH:mm"
            )}-${dayjs(event.date.end).format("HH:mm")}`;

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
                className="flex flex-col gap-4 not-last:mb-4 not-last:border-b border-b-neutral-200 not-last:pb-8"
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="rounded-lg border border-neutral-300 w-[140px] h-[80px] object-cover shadow-lg cursor-pointer"
                      onClick={() => {
                        navigate(`/events/${event.slug}/booking`, {
                          state: {
                            title: event.title,
                            desc: event.desc,
                            detailedDesc: event.detailedDesc,
                            formattedDate,
                            location: event.location,
                            calendarUrl,
                            mapsUrl,
                            price: event.price,
                          },
                        });
                        window.scrollTo(0, 0);
                      }}
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
                      <span className="text-sm font-semibold">Status:</span>{" "}
                      <span
                        className={`font-medium ${
                          event.published ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {event.published ? "Published" : "Draft"}
                      </span>
                    </p>
                    <p className="text-xs text-neutral-500">
                      <span className="text-sm font-semibold">Price:</span>{" "}
                      <span className="font-semibold text-[13px] text-black">
                        {event.price ? `${event.price} CHF` : "Free"}
                      </span>
                    </p>
                  </div>
                </div>

                <ul className="flex flex-col gap-2 mt-auto">
                  <li className="flex items-center gap-1">
                    <img src={calenderSvgImg} alt="Calendar image" width={20} />
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
                    <img src={locationSvgImg} alt="Location image" width={20} />
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
                    {event.published ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    onClick={() => handleEdit(event)}
                    className="outline-0 border-0 w-[calc((100%-32px)/3)] max-[450px]:w-full h-8 rounded-sm text-white bg-[#778970] text-sm cursor-pointer 
                    hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center gap-1"
                  >
                    <FaEdit /> Update
                  </button>

                  <button
                    onClick={() => openDeleteModal(event._id)}
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
      )}

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isEditing={isEditing}
        currentEvent={currentEvent}
        eventCreatingLoading={eventCreatingLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default DashboardEvents;
