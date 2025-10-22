import { ArticlesContext } from "./ArticlesContext";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const ArticlesProvider = ({ children }) => {
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch published articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/articles`);
      setPublishedArticles(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all articles (admin only)
  const fetchAllArticles = async (token) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/articles/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllArticles(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Admin actions (requires auth token)
  const createArticle = async (data, token) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null) formData.append(key, data[key]);
      });

      const res = await axios.post(`${API_BASE}/api/articles`, formData, {
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

  const updateArticle = async (id, data, token) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null) formData.append(key, data[key]);
      });

      const res = await axios.put(`${API_BASE}/api/articles/${id}`, formData, {
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

  const deleteArticle = async (id, token) => {
    try {
      const res = await axios.delete(`${API_BASE}/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  const publishArticle = async (id, token) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/api/articles/${id}/publish`,
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

  const unpublishArticle = async (id, token) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/api/articles/${id}/unpublish`,
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

  // Reorder articles
  const reorderArticles = async (orderedIds, token) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/api/articles/reorder`,
        { order: orderedIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllArticles(res.data); // Update context state with new order
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  };

  // Load articles on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider
      value={{
        publishedArticles, // for public
        allArticles, // for admin
        loading,
        error,
        fetchArticles,
        // admin only
        fetchAllArticles,
        createArticle,
        updateArticle,
        deleteArticle,
        publishArticle,
        unpublishArticle,
        reorderArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
