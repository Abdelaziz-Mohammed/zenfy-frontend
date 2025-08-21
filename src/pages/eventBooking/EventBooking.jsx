import { useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import dayjs from "dayjs";
import { calenderSvgImg, locationSvgImg } from "./../../assets/index.js";

function EventBooking() {
  const location = useLocation();
  const { title, desc, date, location: eventLocation } = location.state || {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [participants, setParticipants] = useState(1);
  const [message, setMessage] = useState("");
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [policyError, setPolicyError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [participantsError, setParticipantsError] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    console.log("from handleSubmit");

    // input validation
    if (name.trim() === "") {
      setNameError("Name is required");
      return;
    } else {
      setNameError("");
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      return;
    } else {
      setEmailError("");
    }

    if (phone.trim() === "") {
      setPhoneError("Phone number is required");
      return;
    } else {
      setPhoneError("");
    }

    if (!(participants > 0 && participants <= 10)) {
      setParticipantsError(
        "Please enter a valid number of participants (1-10)"
      );
      return;
    } else {
      setParticipantsError("");
    }

    if (!policyAccepted) {
      setPolicyError("You must accept the policy");
      return;
    } else {
      setPolicyError("");
    }

    setLoading(true);
    setSuccess("");
    setError("");

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      participants: participants,
      message: message || "No additional message.",
      event_title: title,
      event_date: date,
      event_location: eventLocation,
    };

    try {
      await emailjs.send(
        "service_zik9br9",
        "template_zxbryok",
        templateParams,
        "IwozADpQzOUpYuYhi"
      );

      setSuccess("🎉 Booking successful! Check your email for confirmation.");
      setTimeout(() => {
        setSuccess("");
      }, 7000);
      setName("");
      setEmail("");
      setPhone("");
      setParticipants(1);
      setMessage("");
      setPolicyAccepted(false);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("❌ Something went wrong. Please try again.");
      setTimeout(() => {
        setError("");
      }, 7000);
    } finally {
      setLoading(false);
    }
  };

  const startDate = dayjs(date).format("YYYYMMDD");
  const endDate = dayjs(date).add(1, "day").format("YYYYMMDD");

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title || "Zenfy Event"
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
    desc || "Join our Face Yoga session"
  )}&location=${encodeURIComponent(eventLocation)}`;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    eventLocation
  )}`;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 mt-16 py-10">
        <h2 className="text-[#403905] font-bold text-2xl mb-3">
          Buchen sie ihre face yoga seccion
        </h2>
        <p className="text-[#6A652C] font-normal text-sm mb-10">
          Reservieren sie ihren platz und erleben sie die transformative kraft
          des face yoga
        </p>
        <div className="mb-10">
          <h2 className="text-[#403905] font-bold text-[20px] mb-6 pt-6 border-t border-t-neutral-200">
            {title}
          </h2>
          <ul className="flex flex-col gap-2 mt-auto">
            <li className="flex items-center gap-3">
              <img src={calenderSvgImg} alt="Calendar image" width={20} />
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#8B9D83] font-normal underline hover:text-[#676625]"
              >
                {date}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <img src={locationSvgImg} alt="Location image" width={20} />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#8B9D83] font-normal underline hover:text-[#676625]"
              >
                {eventLocation}
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-6 border border-neutral-300 shadow-lg rounded-xl px-4 py-8">
          {/* name input */}
          <div className="flex flex-col gap-1 w-full md:w-[calc(50%-12px)]">
            <label htmlFor="name" className="text-black/70 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ihr Name"
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out"
            />
            {nameError && (
              <p className="text-[13px] text-red-500">
                {"* "} {nameError}
              </p>
            )}
          </div>
          {/* email input */}
          <div className="flex flex-col gap-1 w-full md:w-[calc(50%-12px)]">
            <label htmlFor="email" className="text-black/70 font-medium">
              E-mail Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ihre.email@example.com"
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out"
            />
            {emailError && (
              <p className="text-[13px] text-red-500">
                {"* "} {emailError}
              </p>
            )}
          </div>
          {/* phone input */}
          <div className="flex flex-col gap-1 w-full md:w-[calc(50%-12px)]">
            <label htmlFor="phone" className="text-black/70 font-medium">
              Telefonnummer
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+49 123 456789"
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out"
            />
            {phoneError && (
              <p className="text-[13px] text-red-500">
                {"* "} {phoneError}
              </p>
            )}
          </div>
          {/* participants input */}
          <div className="flex flex-col gap-1 w-full md:w-[calc(50%-12px)]">
            <label htmlFor="participants" className="text-black/70 font-medium">
              Teilnehmerzahl
            </label>
            <input
              type="number"
              id="participants"
              min="1"
              max="10"
              placeholder="1"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out"
            />
            {participantsError && (
              <p className="text-[13px] text-red-500">
                {"* "} {participantsError}
              </p>
            )}
          </div>
          {/* comment/message input */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="message" className="text-black/70 font-medium">
              Kommentar / Nachricht (optional)
            </label>
            <textarea
              id="message"
              value={message}
              maxLength={800}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Haben Sie spezielle Wünsche oder Fragen"
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out min-h-24 max-h-[210px]"
            />
          </div>
          {/* policy checkbox */}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="policy"
                checked={policyAccepted}
                onChange={(e) => setPolicyAccepted(e.target.checked)}
                className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out"
              />
              <label
                htmlFor="policy"
                className="text-black/70 font-medium cursor-pointer"
              >
                Ich akzeptiere die AGB und die Datenschutzerklärung
              </label>
            </div>
            {policyError && (
              <p className="text-[13px] text-red-500">
                {"* "} {policyError}
              </p>
            )}
          </div>
          {/* submit btn */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="outline-0 border-0 h-10 w-full rounded-lg text-white bg-[#8B9D83] mt-4
            text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Sending..." : "Jetzt anmelden"}
          </button>
        </div>
        {/* success / error messages */}
        {success && (
          <p className="mt-8 text-green-600 font-medium">{success}</p>
        )}
        {error && <p className="mt-8 text-red-500 font-medium">{error}</p>}
      </div>
    </div>
  );
}

export default EventBooking;
