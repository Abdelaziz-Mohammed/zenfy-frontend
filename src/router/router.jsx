import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Home from "./../pages/home/Home";
import About from "./../pages/about/About";
import Events from "./../pages/events/Events";
import Article from "./../pages/article/Article";
import Contact from "./../pages/contact/Contact";
import Error from "./../pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
