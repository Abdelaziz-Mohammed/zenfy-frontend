import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth data from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("zenfy-authToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          logout();
        } else {
          setUser(decoded);
          setToken(storedToken);
        }
      } catch (err) {
        console.error("Invalid token in localStorage", err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  // Login
  const login = (jwtToken, userFromApi = null) => {
    try {
      const decoded = jwtDecode(jwtToken);
      setUser(userFromApi || decoded);
      setToken(jwtToken);
      localStorage.setItem("zenfy-authToken", jwtToken);
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("zenfy-authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
