import { Link } from "react-router-dom";
import { FaInstagram, FaLongArrowAltRight, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

const socialLinks = [
  {
    id: 1,
    title: "Instagram",
    link: "https://www.instagram.com/zhanna.energy.face.yoga?igsh=ZDNlZDc0MzIxNw==",
    icon: <FaInstagram className="text-lg text-[#E4405F]" />,
    hoverColor: "hover:text-[#E4405F]",
  },
  {
    id: 4,
    title: "Whatsapp",
    link: "https://api.whatsapp.com/send?phone=+41798429831&text=Hallo%20Zhanna%2C%20ich%20interessiere%20mich%20f%C3%BCr%20dein%20Face%E2%80%91Yoga%E2%80%91Training%20und%20deine%20Arbeit%20rund%20um%20nat%C3%BCrliche%20Sch%C3%B6nheit%20und%20innere%20Harmonie.%20K%C3%B6nntest%20du%20mir%20bitte%20mehr%20Informationen%20zu%20deinen%20Kursen%20und%20Terminen%20senden%3F%20Vielen%20Dank%20und%20liebe%20Gr%C3%BC%C3%9Fe%21",
    icon: <FaWhatsapp className="text-lg text-[#25D366]" />,
    hoverColor: "hover:text-[#25D366]",
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
  const [isSectionOneOpen, setIsSectionOneOpen] = useState(false);
  const [isSectionTwoOpen, setIsSectionTwoOpen] = useState(false);

  return (
    <footer className="bg-[#F5E6D3]">
      <div className="container mx-auto px-4">
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-0">
          <div className="flex flex-col gap-4">
            <h2 className="text-black font-medium text-lg">
              Über Zhanna´s Energy Face Yoga
            </h2>
            <p className="text-sm text-[#333333] flex flex-col gap-1 w-fit">
              Let yourself shine from inside{" "}
              <Link
                to="/let-yourself-shine"
                onClick={() => scrollTo({ top: 0 })}
                className="text-primary-color ms-auto font-medium text-sm sm:text-base translate-x-10 hover:translate-x-12
                hover:underline transition duration-200 flex flex-row items-center gap-1"
              >
                <FaLongArrowAltRight /> Mehr
              </Link>
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
                  onClick={() => scrollTo({ top: 0 })}
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
        <div className="text-[#333333] text-sm sm:text-[15px] text-center py-6 border-t border-t-[#D1D5DB] italic">
          <b>Impressum</b>{" "}
          <button
            onClick={() => {
              setIsSectionOneOpen(!isSectionOneOpen);
              setIsSectionTwoOpen(false);
              setTimeout(() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }, 50);
            }}
            className="text-[#8B9D83] text-[12px] sm:text-[13px] translate-y-1 underline"
          >
            {isSectionOneOpen ? "Weniger" : "Mehr"}
          </button>{" "}
          | <b>Datenschutz</b>{" "}
          <button
            onClick={() => {
              setIsSectionTwoOpen(!isSectionTwoOpen);
              setIsSectionOneOpen(false);
              setTimeout(() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }, 50);
            }}
            className="text-[#8B9D83] text-[12px] sm:text-[13px] translate-y-1 underline"
          >
            {isSectionTwoOpen ? "Weniger" : "Mehr"}
          </button>{" "}
          | © <span className="fo">2025</span> <b>Zhanna’s Energy Face Yoga</b>
        </div>
        {isSectionOneOpen && (
          <div className="text-[#333333] text-sm sm:text-base py-6 border-t border-t-[#D1D5DB]">
            <p className="font-bold mb-3">
              Zhanna’s Energy Face Yoga – Let Yourself Shine from Inside
            </p>
            <p>
              <b className="font-bold">Inhaberin:</b> Zhanna Zheleznyak
            </p>
            <p>
              <b className="font-bold">Ort:</b> Baden, Schweiz
            </p>
            <p>
              <b className="font-bold">E-Mail:</b> contact1@zenfy.net
            </p>
            <p>
              <b className="font-bold">Telefon:</b> +41 79 842 98 31
            </p>
            <p>
              <b className="font-bold">Website:</b> www.zenfy.net
            </p>
            <p>
              <b className="font-bold">
                Verantwortlich für den Inhalt dieser Website:
              </b>{" "}
              Zhanna Zheleznyak
            </p>
            <p className="italic">
              (Die vollständige Postadresse kann bei berechtigtem Interesse über
              die oben genannten Kontaktmöglichkeiten angefordert werden.)
            </p>
            <p>
              <b className="font-bold">Technische Unterstützung:</b> Abdelaziz
              Mohamed | <i>abdelazizmo2022@gmail.com</i>
            </p>
            <p className="font-bold mt-3">Haftungsausschluss</p>{" "}
            <p>
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              kann jedoch keine Gewähr übernommen werden.{" "}
            </p>
            <p>
              Trotz sorgfältiger Kontrolle übernehmen wir keine Haftung für
              externe Links. Für den Inhalt der verlinkten Seiten sind
              ausschliesslich deren Betreiber verantwortlich.
            </p>
            <p className="font-bold mt-3">Urheberrecht</p>
            <p>
              Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf
              dieser Website unterliegen dem Schweizer Urheberrecht.
            </p>
            <p>
              Die Vervielfältigung, Bearbeitung, Verbreitung oder jede Art der
              Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen der
              schriftlichen Zustimmung der Autorin.
            </p>
          </div>
        )}
        {isSectionTwoOpen && (
          <div className="text-[#333333] text-sm sm:text-base py-6 border-t border-t-[#D1D5DB]">
            <p className="font-bold">Datenschutzerklärung</p>
            <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.</p>
            <p>
              Personenbezogene Daten (z. B. Name, E-Mail-Adresse,
              Telefonnummer), die Sie uns über das{" "}
              <b className="font-bold">Kontaktformular</b> oder per E-Mail
              mitteilen, werden ausschliesslich zur Bearbeitung Ihrer Anfrage
              und zur Organisation von Kursen oder Veranstaltungen verwendet.
            </p>
            <p className="mb-3">
              Ihre Daten werden nicht an Dritte weitergegeben und nach Abschluss
              der Kommunikation gelöscht, sofern keine gesetzliche
              Aufbewahrungspflicht besteht.
            </p>
            <p>
              Beim Besuch dieser Website werden keine personenbezogenen Daten
              automatisch gespeichert, ausser technisch notwendige Informationen
              (z. B. IP-Adresse, Browsertyp) zur sicheren Bereitstellung der
              Seite. Sie haben jederzeit das Recht auf Auskunft, Berichtigung
              und Löschung Ihrer gespeicherten Daten. Kontaktieren Sie uns dazu
              unter: contact1@zenfy.net
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
