import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setEmailError("");

    if (!email) {
      setEmailError("Please enter your email");
      setLoading(false);
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email, Please enter a valid email");
      setLoading(false);
      return;
    } else {
      setEmailError("");
    }

    try {
      const res = await axios.post(`${API_BASE}/api/auth/forgot-password`, {
        email,
      });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-6 py-10 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Forgot your password ?
        </h2>
        <p className="mb-6 text-sm text-gray-600 text-center">
          Please enter your email address below and we'll send you a link to
          reset your password.
        </p>
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="text"
            value={email}
            placeholder="John@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="outline-0 w-full border border-gray-300 px-3 py-2 rounded mb-4 
          focus:border-gray-400 transition-all duration-200 ease-in-out"
          />
          {emailError && (
            <p className="text-red-500 text-xs mb-4">* {emailError}</p>
          )}
        </div>

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-600 text-sm">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
