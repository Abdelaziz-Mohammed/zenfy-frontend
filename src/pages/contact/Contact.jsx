import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    first_name: null,
    last_name: null,
    email: null,
    message: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (formData.first_name.trim() === "") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        first_name: "First name is required",
      }));
      return;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        first_name: null,
      }));
    }

    if (formData.last_name.trim() === "") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        last_name: "Last name is required",
      }));
      return;
    } else {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        last_name: null,
      }));
    }

    if (formData.email.trim() === "") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        email: "Email is required",
      }));
      return;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        email: "Email is invalid",
      }));
      return;
    } else {
      setFormErrors((prevFormErrors) => ({ ...prevFormErrors, email: null }));
    }

    if (formData.message.trim() === "") {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        message: "Message is required",
      }));
      return;
    } else {
      setFormErrors((prevFormErrors) => ({ ...prevFormErrors, message: null }));
    }

    // send the form data to your server
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ first_name: "", last_name: "", email: "", message: "" });
      } else {
        setErrorMessage(`Failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }

    // Reset form data
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 mt-16 py-10">
        <h2 className="text-[#2C2C2C] font-bold text-2xl">Kontakt</h2>
        <p className="text-[#6A652C] font-normal text-sm max-w-[500px] mb-10">
          Für Anfragen und Terminvereinbarungen erreichen Sie mich unter der
        </p>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-8">
          <div className="flex flex-col gap-1 w-full sm:w-[calc(50%-16px)]">
            <label htmlFor="first_name" className="text-black/70 font-medium">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out"
            />
            {formErrors.first_name && (
              <span className="text-red-500 text-xs">
                {formErrors.first_name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-[calc(50%-16px)]">
            <label htmlFor="last_name" className="text-black/70 font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out"
            />
            {formErrors.last_name && (
              <span className="text-red-500 text-xs">
                {formErrors.last_name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-black/70 font-medium">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out"
            />
            {formErrors.email && (
              <span className="text-red-500 text-xs">{formErrors.email}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="message" className="text-black/70 font-medium">
              Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="outline-0 border border-neutral-300 p-2 rounded-lg focus:border-neutral-400 
              transition duration-300 ease-in-out min-h-24 max-h-[210px]"
            ></textarea>
            {formErrors.message && (
              <span className="text-red-500 text-xs">{formErrors.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="outline-0 border-0 h-10 w-full rounded-lg text-white bg-[#8B9D83] mt-4
            text-sm sm:text-base cursor-pointer hover:bg-[#676625df] transition duration-300 ease-in-out"
          >
            Senden
          </button>
          {/* success or error message */}
          {successMessage && (
            <div className="mt-4 text-green-500">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="mt-4 text-red-500">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;
