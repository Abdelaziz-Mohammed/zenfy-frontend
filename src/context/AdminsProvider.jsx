import { useState, useEffect, useContext } from "react";
import { AdminsContext } from "./AdminsContext";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const AdminsProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pendingAdmins, setPendingAdmins] = useState([]);

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete admin
  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(admins.filter((a) => a._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting admin");
    }
  };

  // Fetch pending admins
  const fetchPendingAdmins = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/admins/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingAdmins(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Approve request
  const approveRequest = async (id) => {
    try {
      const res = await axios.put(
        `${API_BASE}/api/admins/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // remove from pending and add to admins
      setPendingAdmins(pendingAdmins.filter((admin) => admin._id !== id));
      setAdmins([...admins, res.data.admin]);
    } catch (err) {
      setError(err.response?.data?.message || "Error approving request");
    }
  };

  // Reject request
  const rejectRequest = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/admins/${id}/reject`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // remove from pending
      setPendingAdmins(pendingAdmins.filter((admin) => admin._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error rejecting request");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdmins();
      fetchPendingAdmins();
    }
  }, [token]);

  return (
    <AdminsContext.Provider
      value={{
        admins,
        loading,
        error,
        fetchAdmins,
        deleteAdmin,
        approveRequest,
        rejectRequest,
        pendingAdmins,
        fetchPendingAdmins,
      }}
    >
      {children}
    </AdminsContext.Provider>
  );
};
