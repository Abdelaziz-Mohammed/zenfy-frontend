import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 100,
      // once: true, // animate only on mount
    });
  }, []);

  const { pathname } = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/verify-email"];
  const hideFooterRoutes = ["/login", "/register", "/verify-email"];

  return (
    <>
      {!hideNavbarRoutes.includes(pathname) && <Navbar />}
      <Outlet />
      {!hideFooterRoutes.includes(pathname) && <Footer />}
      <ScrollToTop />
    </>
  );
}

export default App;
