import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import { CartProvider } from "./context/CartContext.jsx";

AOS.init({
  duration: 300,
  easing: "ease-out-cubic",
  once: true,
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelmetProvider>
      <CartProvider>
        <ScrollToTop />
        <App />
      </CartProvider>
    </HelmetProvider>
  </BrowserRouter>
);
