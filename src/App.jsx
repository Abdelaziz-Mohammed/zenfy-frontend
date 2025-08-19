import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 100,
      // once: true, // animate only on mount
    });
  }, []);

  return (
    <>
      <Navbar logoTitle={location.pathname === "/" ? "Zenfy" : "FaceEnergy"} />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
