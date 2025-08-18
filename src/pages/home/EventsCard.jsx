import { calenderSvgImg, locationSvgImg } from "./../../assets/index.js";

function EventsCard({ image, title, desc, date, location, offer }) {
  return (
    <div
      className="flex flex-col gap-2 border border-neutral-100 rounded-lg shadow-md
        py-6 px-4 w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
    >
      <div className="h-40 relative">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover rounded-md"
        />
        <div
          className="text-white bg-[#F4B860] text-xs px-2 py-1 rounded-xl
          absolute top-2 right-2"
        >
          {offer}
        </div>
      </div>
      <h4 className="text-[#2C2C2C] text-base font-semibold mt-4">{title}</h4>
      <p className="text-[#4B5563] font-medium text-sm mb-2">{desc}</p>
      <ul className="flex flex-col gap-2 mt-auto">
        <li className="flex items-center gap-1">
          <img src={calenderSvgImg} alt="Calender image" width={20} />
          <p className="text-sm text-[#8B9D83] font-normal">{date}</p>
        </li>
        <li className="flex items-center gap-1">
          <img src={locationSvgImg} alt="Location image" width={20} />
          <p className="text-sm text-[#8B9D83] font-normal">{location}</p>
        </li>
      </ul>
      <button
        className="utline-0 border-0 h-8 w-full rounded-4xl text-white bg-[#8B9D83] mt-4
        text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out"
      >
        Jetzt anmelden
      </button>
    </div>
  );
}

export default EventsCard;
