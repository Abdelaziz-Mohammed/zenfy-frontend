import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Home from "./../pages/home/Home";
import Events from "./../pages/events/Events";
import Articles from "./../pages/articles/Articles";
import Contact from "./../pages/contact/Contact";
import Error from "./../pages/error/Error";
import ArticleDetails from "../pages/articles/ArticleDetails";
import EventBooking from "./../pages/eventBooking/EventBooking";
import Dashboard from "./../pages/dashboard/Dashboard";
import ProtectedRoute from "./../components/protectedRoute/ProtectedRoute";
import Login from "./../auth/login/Login";
import Register from "./../auth/register/Register";
import VerifyEmail from "../pages/verifyEmail/VerifyEmail";

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
        path: "events/:id/booking",
        element: <EventBooking />,
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "articles/:id",
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
          <ProtectedRoute requiredRole={["admin", "super_admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/articles",
        element: (
          <ProtectedRoute requiredRole={["admin", "super_admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/events",
        element: (
          <ProtectedRoute requiredRole={["admin", "super_admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/admins",
        element: (
          <ProtectedRoute requiredRole={["super_admin"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      // auth
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      // verify email
      {
        path: "verify-email",
        element: <VerifyEmail />,
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
