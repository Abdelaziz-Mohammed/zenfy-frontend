import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Home from "./../pages/home/Home";
import Events from "./../pages/events/Events";
import Articles from "./../pages/articles/Articles";
import Contact from "./../pages/contact/Contact";
import About from "../pages/about/About";
import Error from "./../pages/error/Error";
import ArticleDetails from "../pages/articles/ArticleDetails";
import EventBooking from "./../pages/eventBooking/EventBooking";
import Dashboard from "./../pages/dashboard/Dashboard";
import ProtectedRoute from "./../components/protectedRoute/ProtectedRoute";
import Login from "./../auth/login/Login";
// import Register from "./../auth/register/Register";
import VerifyEmail from "../pages/verifyEmail/VerifyEmail";
import ForgotPassword from "../auth/forgotPassword/ForgotPassword";
import ResetPassword from "../auth/resetPassword/ResetPassword";
import LetYourSelfShine from "../pages/docs/LetYourSelfShine";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
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
      {
        path: "about",
        element: <About />,
      },
      {
        path: "let-yourself-shine",
        element: <LetYourSelfShine />,
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
    ],
  },
  // auth
  {
    path: "login",
    element: <Login />,
  },
  // {
  //   path: "register",
  //   element: <Register />,
  // },
  // verify email
  {
    path: "verify-email",
    element: <VerifyEmail />,
  },
  // forgot password
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  // reset password
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
