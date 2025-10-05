import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      login(token, user);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            Welcome back to{" "}
            <Link to="/" className="text-blue-600 ps-2">
              Zenfy
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-10 text-center">Admin Login</h2>
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
          {error && <p className="text-red-500 text-sm mb-8">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700
            transition disabled:opacity-50 cursor-pointer mb-4"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="mb-3 flex items-center justify-start border-b border-gray-200 pb-2 overflow-hidden">
            <Link
              to="/forgot-password"
              className="text-blue-600/80 font-medium cursor-pointer flex items-center gap-2 -translate-x-6
              hover:text-blue-600 text-[13px] hover:translate-x-0 transition-all duration-300 ease-in-out py-2"
            >
              <FaLongArrowAltRight className="text-lg" /> Forgot Your Password ?
            </Link>
          </div>
          <p className="text-neutral-500 text-sm text-center italic">
            Don't have an account ?
            <Link
              to="/register"
              className="text-black text-sm font-semibold ml-2 cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
