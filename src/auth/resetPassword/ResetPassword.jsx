import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    } else if (!token || !email) {
      setError("Invalid or missing token/email");
      setLoading(false);
      return;
    } else {
      setError("");
    }

    try {
      const res = await axios.post(`${API_BASE}/api/auth/reset-password`, {
        token,
        email,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setNewPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-6 py-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="outline-0 w-full border border-gray-300 px-3 py-2 rounded mb-4
          focus:border-gray-400 transition-all duration-200 ease-in-out"
        />

        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
