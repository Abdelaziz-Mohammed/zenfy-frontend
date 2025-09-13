import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import { EventsProvider } from "./context/EventsProvider.jsx";
import { ArticlesProvider } from "./context/ArticlesProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { AdminsProvider } from "./context/AdminsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminsProvider>
      <EventsProvider>
        <ArticlesProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </ArticlesProvider>
      </EventsProvider>
    </AdminsProvider>
  </AuthProvider>
);
