import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "./../loading/Loading";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token, loading, logout } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("zenfy-authToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp && decoded.exp < currentTime) {
          logout();
        }
      } catch (err) {
        console.error("Invalid token:", err);

        logout();
      }
    }
  }, [logout]);

  if (loading) {
    return <Loading />;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (
    requiredRole &&
    requiredRole.some((role) => user.role === role) === false
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
