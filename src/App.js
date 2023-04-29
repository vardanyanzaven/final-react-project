import { useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import { useAuth } from "./hooks/useAuth";
import { UserSettings } from "./components/header/UserSettings";
import NotFoundPage from "./components/NotFoundPage";
import { useAuthListener } from "./services/handleAuth";
import ServicesPage from "./components/navigation/ServicesPage";
import AboutPage from "./components/navigation/AboutPage";
import HomePage from "./components/navigation/HomePage";
import Footer from "./components/navigation/Footer";
import CataloguePage from "./components/navigation/CataloguePage";
import "./App.css";

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
