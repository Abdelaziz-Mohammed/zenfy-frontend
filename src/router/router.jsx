import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Home from "./../pages/home/Home";
import Events from "./../pages/events/Events";
import Article from "./../pages/article/Article";
import Contact from "./../pages/contact/Contact";
import Error from "./../pages/error/Error";
import ArticleDetails from "../pages/article/ArticleDetails";
import EventBooking from "./../pages/eventBooking/EventBooking";
import Dashboard from "./../pages/dashboard/Dashboard";
import DashboardArticles from "./../pages/dashboard/DashboardArticles";
import DashboardEvents from "./../pages/dashboard/DashboardEvents";
import DashboardAdmins from "./../pages/dashboard/DashboardAdmins";
import ProtectedRoute from "./../components/protectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // pages
      {
        path: "",
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "events/:id",
        element: <EventBooking />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "article/:id",
        element: <ArticleDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      // admin dashboard
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/articles",
        element: (
          <ProtectedRoute>
            <DashboardArticles />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/events",
        element: (
          <ProtectedRoute>
            <DashboardEvents />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admins",
        element: (
          <ProtectedRoute>
            <DashboardAdmins />
          </ProtectedRoute>
        ),
      },
      // error page
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
