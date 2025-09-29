import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    id: 1,
    title: "Instagram",
    link: "https://www.instagram.com/zhanna.energy.face.yoga?igsh=ZDNlZDc0MzIxNw==",
    icon: <FaInstagram className="text-lg text-[#E4405F]" />,
    hoverColor: "hover:text-[#E4405F]",
  },
  {
    id: 2,
    title: "Facebook",
    link: "https://www.facebook.com/",
    icon: <FaFacebook className="text-lg text-[#1877F2]" />,
    hoverColor: "hover:text-[#1877F2]",
  },
  {
    id: 3,
    title: "YouTube",
    link: "https://www.youtube.com/",
    icon: <FaYoutube className="text-lg text-[#FF0000]" />,
    hoverColor: "hover:text-[#FF0000]",
  },
];

const navLinks = [
  {
    id: 1,
    title: "Startseite",
    link: "/",
    hoverColor: "hover:text-purple-500",
  },
  {
    id: 2,
    title: "Events",
    link: "/events",
    hoverColor: "hover:text-green-500",
  },
  {
    id: 3,
    title: "Artikel",
    link: "/articles",
    hoverColor: "hover:text-orange-500",
  },
  {
    id: 4,
    title: "Kontakt",
    link: "/contact",
    hoverColor: "hover:text-red-500",
  },
];

function Footer() {
  return (
    <footer className="bg-[#F5E6D3]">
      <div className="container mx-auto px-4">
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-0">
          <div className="flex flex-col gap-4">
            <h2 className="text-black font-medium text-lg">Über Zenfy</h2>
            <p className="text-sm text-[#333333]">
              Let yourself shine from inside
            </p>
            <ul className="flex flex-col gap-1">
              {socialLinks.map((socialLink) => (
                <li
                  key={socialLink.id}
                  className={`text-[#333333] ${socialLink.hoverColor} hover:translate-x-2 transition duration-300`}
                >
                  <Link
                    to={socialLink.link}
                    target="_blank"
                    className="flex items-center gap-2 py-2"
                  >
                    {socialLink.icon}
                    <span className="text-xs font-medium">
                      {socialLink.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-black font-medium text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((navLink) => (
                <li
                  key={navLink.id}
                  className={`text-[#333333] text-sm ${navLink.hoverColor} hover:underline transition duration-300`}
                >
                  <Link to={navLink.link}>{navLink.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-black font-medium text-lg">
              Erhalten Sie monatliche Tipps für Ihre Schönheit und Entspannung
            </h3>
            <p className="text-[#333333] text-sm">
              Jetzt abonnieren und Angebote erhalten.{" "}
            </p>
            <form className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center gap-4">
              <input
                type="email"
                placeholder="Deine E-Mail-Adresse hier"
                className="max-sm:flex-none max-lg:flex-1 outline-0 border border-[#D1D5DB] bg-white h-10 px-4 rounded-4xl max-sm:w-full lg:w-full xl:w-auto"
              />
              <Link
                to="/contact"
                className="outline-0 border-0 h-10 flex items-center justify-center px-6 rounded-4xl text-white bg-[#8B9D83]
                text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out w-fit max-sm:w-full lg:w-full xl:w-auto"
              >
                Abonnieren
              </Link>
            </form>
          </div>
        </div>
        <p className="text-[#333333] text-sm text-center py-6 border-t border-t-[#D1D5DB]">
          © 2025{" "}
          <a href="https://zenfy.net/">
            <b className="text-[#2C2C2C]">zenfy.net</b>
          </a>{" "}
          Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
