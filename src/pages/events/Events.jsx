import { useContext } from "react";
import EventsCard from "../home/EventsCard.jsx";
import { EventsContext } from "../../context/EventsContext.jsx";
import Loading from "../../components/loading/Loading.jsx";

function Events() {
  const { publishedEvents, loading } = useContext(EventsContext);

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
            {publishedEvents.map((event) => (
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
                offer={event.offer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
