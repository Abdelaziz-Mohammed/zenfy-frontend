import { useContext, useEffect } from "react";
import EventsCard from "../home/EventsCard.jsx";
import { EventsContext } from "../../context/EventsContext.jsx";
import Loading from "../../components/loading/Loading.jsx";
import { useLocation } from "react-router-dom";

function Events() {
  const { publishedEvents, loading, fetchEvents } = useContext(EventsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromDashboard) {
      fetchEvents();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 mt-16 pt-10 pb-20">
        <h2 className="text-[#403905] font-bold text-2xl mb-6">
          Kommende Events
        </h2>
        {loading ? (
          <Loading fullscreen={false} />
        ) : (
          <div className="flex flex-wrap gap-6 mt-8">
            {publishedEvents
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
      </div>
    </div>
  );
}

export default Events;
