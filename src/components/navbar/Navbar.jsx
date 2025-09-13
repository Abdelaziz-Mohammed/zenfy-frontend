import { Link } from "react-router-dom";
import { logoImg } from "./../../assets/index.js";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaRegNewspaper,
  FaEnvelope,
  FaUserAlt,
} from "react-icons/fa";

const navItems = [
  {
    id: 1,
    title: "Startseite",
    link: "/",
    icon: <FaHome />,
    color: "text-blue-500",
    hoverColor: "hover:text-blue-500",
  },
  {
    id: 2,
    title: "Events",
    link: "/events",
    icon: <FaCalendarAlt />,
    color: "text-green-500",
    hoverColor: "hover:text-green-500",
  },
  {
    id: 3,
    title: "Artikel",
    link: "/articles",
    icon: <FaRegNewspaper />,
    color: "text-orange-500",
    hoverColor: "hover:text-orange-500",
  },
  {
    id: 4,
    title: "Kontakt",
    link: "/contact",
    icon: <FaEnvelope />,
    color: "text-red-500",
    hoverColor: "hover:text-red-500",
  },
  {
    id: 5,
    title: "Dashboard",
    link: "/dashboard",
    icon: <FaUserAlt />,
    color: "text-purple-500",
    hoverColor: "hover:text-purple-500",
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black h-16 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-10">
        {/* logo */}
        <Link
          to="/"
          data-aos="zoom-in"
          className="flex items-center justify-center gap-1"
        >
          <img src={logoImg} alt="Zenfy logo" className="w-12 h-1w-12" />
          <span className="text-xl font-bold font-['Montserrat',sans-serif]">
            Zenfy
          </span>
        </Link>
        {/* link for large */}
        <nav className="hidden md:block">
          <ul className="flex items-center">
            {navItems.map((navItem) => (
              <li
                key={navItem.id}
                data-aos="zoom-in"
                className={`text-base font-medium text-[#2C2C2C]/95 font-['Barlow',sans-serif] 
                  p-3 ${navItem.hoverColor} transition-all duration-500`}
              >
                <Link to={navItem.link} className="">
                  {navItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* links for mobile */}
        <div className="md:hidden">
          {/* menu toggler */}
          <button
            data-aos="zoom-in"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-8 h-8 cursor-pointer"
          >
            {isMenuOpen ? (
              <FaTimes
                className="w-5 h-5 text-black"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            ) : (
              <FaBars
                className="w-5 h-5 text-black"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
          </button>
          {/* nav items for mobile */}
          {isMenuOpen && (
            <ul
              className={`flex flex-col gap-1 bg-transparent rounded absolute z-10 top-[68px] left-6 right-6  
              transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {navItems.map((navItem) => (
                <li
                  key={navItem.id}
                  data-aos="fade-up"
                  data-aos-delay={`${navItem.id * 100}`}
                  className="px-4 bg-white/30 backdrop-blur-2xl rounded-2xl shadow-md
                hover:bg-white/60 transition duration-300 ease-in-out"
                >
                  <Link
                    to={navItem.link}
                    className={`text-gray-800 ${navItem.hoverColor} hover:translate-x-2 ease-in-out 
                    duration-200 cursor-pointer py-[6px] flex items-center gap-4 text-sm`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={`${navItem.color} text-lg`}>
                      {navItem.icon}
                    </span>
                    <span className="tracking-wider">{navItem.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
