import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef(null);

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

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          const msUntilExpiry = decoded.exp * 1000 - Date.now();
          logoutTimerRef.current = setTimeout(() => {
            logout();
          }, msUntilExpiry);
        }
      } catch (err) {
        console.error("Invalid token in localStorage", err);
        logout();
      }
    }
    setLoading(false);

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err?.response?.status;
        if (status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // Login
  const login = (jwtToken, userFromApi = null) => {
    if (!jwtToken) return;
    try {
      const decoded = jwtDecode(jwtToken);
      setUser(userFromApi || decoded);
      setToken(jwtToken);
      localStorage.setItem("zenfy-authToken", jwtToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

      if (decoded.exp) {
        const expiresAt = decoded.exp * 1000;
        const msUntilExpiry = expiresAt - Date.now();

        if (msUntilExpiry <= 0) {
          logout();
        } else {
          if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
          }

          logoutTimerRef.current = setTimeout(() => {
            logout();
          }, msUntilExpiry);
        }
      }
    } catch (err) {
      console.error("Failed to decode token", err);
      logout();
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("zenfy-authToken");

    delete axios.defaults.headers.common["Authorization"];

    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
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
