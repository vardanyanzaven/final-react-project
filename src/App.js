import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";

function App() {
  const [activeLinkId, setActiveLinkId] = useState();
  return (
    <>
      <Header activeLinkId={activeLinkId} setActiveLinkId={setActiveLinkId} />
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="services"
          element={<ServicesPage setActiveLinkId={setActiveLinkId} />}
        />
        <Route
          path="catalogue"
          element={<CataloguePage setActiveLinkId={setActiveLinkId} />}
        />
        <Route
          path="about"
          element={<AboutPage setActiveLinkId={setActiveLinkId} />}
        />
      </Routes>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
