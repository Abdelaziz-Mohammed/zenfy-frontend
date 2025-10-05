import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "./../loading/Loading";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token, loading } = useContext(AuthContext);

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
