import { EventsContext } from "./EventsContext.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const EventsProvider = ({ children }) => {
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch published events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/events`);
      setPublishedEvents(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all events (admin only)
  const fetchAllEvents = async (token) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/events/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllEvents(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to transform payload into FormData
  const buildEventFormData = (data) => {
    const formData = new FormData();

    // Handle date transformation
    if (data.startDate && data.endDate) {
      formData.append("date[start]", new Date(data.startDate).toISOString());
      formData.append("date[end]", new Date(data.endDate).toISOString());
    }

    // Append the rest of the fields
    Object.keys(data).forEach((key) => {
      if (key !== "startDate" && key !== "endDate" && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    return formData;
  };

  // Admin actions (requires auth token)
  const createEvent = async (data, token) => {
    try {
      const formData = buildEventFormData(data);

      const res = await axios.post(`${API_BASE}/api/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const updateEvent = async (id, data, token) => {
    try {
      const formData = buildEventFormData(data);

      const res = await axios.put(`${API_BASE}/api/events/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const deleteEvent = async (id, token) => {
    try {
      const res = await axios.delete(`${API_BASE}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const publishEvent = async (id, token) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/api/events/${id}/publish`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const unpublishEvent = async (id, token) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/api/events/${id}/unpublish`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  // Reorder events
  const reorderEvents = async (orderedIds, token) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/api/events/reorder`,
        { order: orderedIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllEvents(res.data); // Update context state with new order
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  // Load events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{
        publishedEvents, // for public
        allEvents, // for admin
        loading,
        error,
        fetchEvents,
        // admin only
        fetchAllEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        publishEvent,
        unpublishEvent,
        reorderEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
