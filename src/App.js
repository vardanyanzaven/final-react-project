import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import { useAuth } from "./hooks/useAuth";
import { UserSettings } from "./components/header/UserSettings";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuthListener } from "./services/handleAuth";
import "./App.css";
import { useAuthListener } from "./services/authChangeHook";

function App() {
  const [activeLinkId, setActiveLinkId] = useState();
  const [loading, setLoading] = useState(true);
  const { isAuth } = useAuth();

  useAuthListener(setLoading);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Header
            activeLinkId={activeLinkId}
            setActiveLinkId={setActiveLinkId}
          />
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
            <Route
              path="contact"
              element={<ContactUsPage setActiveLinkId={setActiveLinkId} />}
            />
            {isAuth ? (
              <Route path="settings" element={<UserSettings />} />
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
