import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // optional full name
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        email,
        password,
      });

      setSuccess(
        res.data?.message ||
          "Registration successful. Waiting for super admin approval."
      );

      // redirect to login after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg px-6 py-10 w-full max-w-lg"
        >
          <div
            className="text-2xl font-bold font-['Montserrat',sans-serif] flex items-center justify-center mb-8
          border-b border-gray-200 pb-4"
          >
            Join{" "}
            <Link to="/" className="text-blue-600 ps-2">
              Zenfy
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-10 text-center">Register</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none
              focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none
              focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none
              focus:ring focus:border-blue-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 
            transition disabled:opacity-50 cursor-pointer mb-12"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-neutral-500 text-sm text-center italic">
            Already have an account ?
            <Link
              to="/login"
              className="text-black text-sm font-semibold ml-2 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
