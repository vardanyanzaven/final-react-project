import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Header from "./components/header/Header";
import { useAuth } from "./hooks/useAuth";
import { UserSettings } from "./components/header/UserSettings";
import NotFoundPage from "./components/NotFoundPage";
import { useAuthListener } from "./services/handleAuth";
import AboutPage from "./components/main/about_page/AboutPage";
import CataloguePage from "./components/main/catalogue/CataloguePage";
import { Services } from "./components/main/services_tab/Services";
import Footer from "./components/footer/Footer";
import SelectedService from "./components/main/services_tab/SelectedService";
import Main from "./components/main/Main";
import ScrollToTop from "./components/ScrollToTop";
import ShowStatus from "./shared/show_bar/ShowStatus";
import { HomePage } from "./components/main/home/HomePage";
import "./App.css";
import User from "./components/user_page/User";
import SavedCars from "./components/header/SavedCars";
import UserHistory from "./components/header/UserHistory";

function App() {
  const [activeLinkId, setActiveLinkId] = useState();
  const [loading, setLoading] = useState(true);
  const { isAuth } = useAuth();

  useAuthListener(setLoading);

  if (loading) return <LinearProgress />;

  return (
    <div className="app">
      <ShowStatus />
      <Header activeLinkId={activeLinkId} setActiveLinkId={setActiveLinkId} />
      <ScrollToTop />
      <Main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="services"
            element={<Services setActiveLinkId={setActiveLinkId} />}
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
            <>
              <Route path="settings" element={<UserSettings />} />
              <Route path="user" element={<User />} />
              <Route path="saved" element={<SavedCars />} />
              <Route path="history" element={<UserHistory />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Main>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
