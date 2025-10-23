import { useContext, useEffect } from "react";
import { EventsContext } from "../../context/EventsContext.jsx";
import Loading from "../../components/loading/Loading.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import EventsCard from "./EventsCard.jsx";
import { FaArrowRight } from "react-icons/fa";

function Events() {
  const { publishedEvents, loading, fetchEvents } = useContext(EventsContext);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromDashboard) {
      fetchEvents();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-[#2C2C2C] font-bold text-2xl">Kommende Events</h2>
        {loading ? (
          <Loading fullscreen={false} />
        ) : (
          <div className="flex flex-wrap gap-6 mt-8">
            {publishedEvents
              .slice(0, 3)
              .sort((event1, event2) => event1.order - event2.order)
              .map((event) => (
                <EventsCard
                  key={event._id}
                  id={event.slug}
                  image={event.imageUrl}
                  title={event.title}
                  desc={event.desc}
                  detailedDesc={event.detailedDesc}
                  start_date={event.date.start}
                  end_date={event.date.end}
                  location={event.location}
                  price={event.price}
                />
              ))}
          </div>
        )}
        <button
          onClick={() => {
            navigate("/events");
            window.scrollTo({ top: 0 });
          }}
          className="utline-0 border-0 h-12 flex items-center justify-center gap-2 px-12 rounded-4xl text-white bg-[#8B9D83]
          text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out w-fit mx-auto mt-10"
        >
          Mehr <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Events;
