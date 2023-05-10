import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import { useAuth } from "./hooks/useAuth";
import { UserSettings } from "./components/header/UserSettings";
import NotFoundPage from "./components/NotFoundPage";
import { useAuthListener } from "./services/handleAuth";
import AboutPage from "./components/main/AboutPage";
import HomePageSlider from "./components/main/home/HomePageSlider";
import CataloguePage from "./components/main/catalogue/CataloguePage";
import ServicesPage from "./components/main/services_tab/ServicesPage";
import Footer from "./components/footer/Footer";
import { LinearProgress } from "@mui/material";
import SelectedService from "./components/main/services_tab/SelectedService";
import Main from "./components/main/Main";
import ScrollToTop from "./components/ScrollToTop";
import ShowStatus from "./shared/show_bar/ShowStatus";
import "./App.css";
import { HomePage } from "./components/main/home/HomePage";

function App() {
  const [activeLinkId, setActiveLinkId] = useState();
  const [loading, setLoading] = useState(true);
  const { isAuth } = useAuth();

  useAuthListener(setLoading);

  if (loading) return <LinearProgress />;

  return (
    <>
      <>
        <ShowStatus />
        <Header activeLinkId={activeLinkId} setActiveLinkId={setActiveLinkId} />
        <ScrollToTop />
        <Main>
          <Routes>
            <Route index element={<HomePage />} />
            <Route
              path="services"
              element={<ServicesPage setActiveLinkId={setActiveLinkId} />}
            />
            <Route path="services/:serve" element={<SelectedService />} />
            <Route
              path="catalogue"
              element={<CataloguePage setActiveLinkId={setActiveLinkId} />}
            />
            <Route
              path="about"
              element={<AboutPage setActiveLinkId={setActiveLinkId} />}
            />
            {isAuth ? (
              <Route path="settings" element={<UserSettings />} />
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Main>
        <Outlet />
        <Footer />
      </>
    </>
  );
}

export default App;
