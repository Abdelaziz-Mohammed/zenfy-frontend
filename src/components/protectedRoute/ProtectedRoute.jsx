import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "./../../utils/supabase";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        let { data } = await supabase
          .from("admins")
          .select("*")
          .eq("email", user.email)
          .single();

        if (data) setIsAdmin(true);
      }

      setLoading(false);
    }

    checkAdmin();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) return <Navigate to="/" />;

  return children;
}
