import EventsCard from "../home/EventsCard.jsx";
import {
  eventsCardImg1,
  eventsCardImg2,
  eventsCardImg3,
} from "./../../assets/index.js";

const cardItems = [
  {
    id: 1,
    image: eventsCardImg1,
    title: "Vita-Parcours Mellingen",
    desc: "Verbringen Sie einen Nachmittag inmitten der Natur! Entdecken Sie Aktivitäten und probieren Sie Zhannas Energy Face Yoga am P8 - für mehr Energie und gute Laune",
    date: "August 24, 2025  08:30 - 09:30",
    location: "Waldhütte Mellingen, P8",
    offer: "20 CHF",
  },
  {
    id: 2,
    image: eventsCardImg2,
    title: "Zhannas Energy Face Yoga Workshops",
    desc: "Effektive Gesichts- und Körperübungen",
    date: "September 27, 2025  10:00 - 12:00",
    location: "Limmatpromenade 28, Baden - Hotel Limmathof",
    offer: "70 CHF",
  },
  {
    id: 3,
    image: eventsCardImg3,
    title: "Vita-Parcours Mellingen",
    desc: "Verbringen Sie einen Nachmittag inmitten der Natur! Entdecken Sie Aktivitäten und probieren Sie Zhannas Energy Face Yoga am P8 – für mehr Energie und gute Laune",
    date: "August 24, 2025  13:30 - 17:30",
    location: "Waldhütte Mellingen, P8",
    offer: "gratis",
  },
];

function Events() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 mt-16 py-10">
        <h2 className="text-[#403905] font-bold text-2xl mb-6">
          Kommende Events
        </h2>
        <div className="flex flex-wrap gap-6 mt-8 mb-10">
          {cardItems.map((cardItem) => (
            <EventsCard
              key={cardItem.id}
              image={cardItem.image}
              title={cardItem.title}
              desc={cardItem.desc}
              date={cardItem.date}
              location={cardItem.location}
              offer={cardItem.offer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
