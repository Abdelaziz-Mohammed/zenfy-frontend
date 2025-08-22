import { useNavigate } from "react-router-dom";
import EventsCard from "./EventsCard.jsx";
import {
  eventsCardImg1,
  eventsCardImg2,
  eventsCardImg3,
} from "./../../assets/index.js";
import { FaArrowRight } from "react-icons/fa";

const cardItems = [
  {
    id: 1,
    image: eventsCardImg1,
    title: "Vita-Parcours Mellingen",
    desc: "Verbringen Sie einen Nachmittag inmitten der Natur! Entdecken Sie Aktivitäten und probieren Sie Zhanna's Energy Face Yoga am P9 - für mehr Energie und gute Laune",
    detailedDesc: ``,
    date: "August 24, 2025  13:30-17:30",
    location: "Waldhütte Mellingen, P9",
    offer: "gratis",
  },
  {
    id: 2,
    image: eventsCardImg2,
    title: "Morning Rituals Vita-Parcours Mellingen",
    desc: "Finden Sie Ihre innere Kraft und verbinden Sie die Energien Ihres Körpers zwischen Sonnenstrahlen und Vogelzwitschern!",
    detailedDesc: `Ich lade Sie herzlich zu “Morning Rituals” mit Face Yoga mitten in der Natur ein!
    Finden Sie Ihre innere Kraft und verbinden Sie die Energien Ihres Körpers zwischen Sonnenstrahlen und Vogelzwitschern! 
    Vom 7. September  bis zum 5. Oktober, jeden Sonntag um 08:30 haben Sie die Möglichkeit, Ihre Gesichtsmuskeln von Stress und Energieblockaden zu befreien, mitten in der Natur Energie zu wecken und zu stärken. 
    Die Treffen finden bei trockenem Wetter statt und die Übungen können auf 4 Sprachen erklärt werden (Deutsch, Englisch, Russisch, Ukrainisch).                                                         Kosten: 20 Franken einmal, 80 Franken fünfmal.
    Lasst uns zusammen positiv in den Tag starten!`,
    date: "Vom 7. September bis zum 5. Oktober 2025  jeden Sonntag, von 08:30 bis 09:30",
    location: "Waldhütte Mellingen, P9",
    offer: "20 CHF",
  },
  {
    id: 3,
    image: eventsCardImg3,
    title: "Zhanna's Energy Face Yoga Workshops",
    desc: "Effektive Gesichts- und Körperübungen",
    detailedDesc: `Einmal pro Monat von Ende September 25 bis Anfang Juli 26 von 10.00 bis 12.00 Uhr 
    Zhanna's Energy Face Yoga Workshops. 
    Sie lernen effektive und heitere Übungen für alle Gesichtspartien sowie Körperbewegungen für Achtsamkeit und Energieaufbau.  
    Anmeldungen bitte bis spätestens eine Woche vorher. Bringen Sie eine Freundin mit und erhalten Sie für sich 50% Rabatt auf den jeweiligen Termin.   
    Kosten: 70 CHF 
    Ort: Limmatpromenade 28, 5400 Baden, Hotel Limmathof im grossen Saal
    Termine für 2025: 27. September, 26. Oktober , 29. November
    Termine für 2026: 25. Januar, 21. Februar, 29. März, 25. April, 17. Mai, 6. Juni, 5. Juli`,
    date: "ab dem 27. September 2025  10:00 - 12:00",
    location: "Limmatpromenade 28, Baden Hotel Limmathof",
    offer: "70 CHF",
  },
];

function Events() {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-[#2C2C2C] font-bold text-2xl">Kommende Events</h2>
        <div className="flex flex-wrap gap-6 mt-8">
          {cardItems.map((cardItem) => (
            <EventsCard
              key={cardItem.id}
              id={cardItem.id}
              image={cardItem.image}
              title={cardItem.title}
              desc={cardItem.desc}
              detailedDesc={cardItem.detailedDesc}
              date={cardItem.date}
              location={cardItem.location}
              offer={cardItem.offer}
            />
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/events");
            window.scrollTo({ top: 0 });
          }}
          className="utline-0 border-0 h-12 flex items-center justify-center gap-2 px-6 rounded-4xl text-white bg-[#8B9D83]
          text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out w-fit mx-auto mt-10"
        >
          Mehr sehen <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Events;
