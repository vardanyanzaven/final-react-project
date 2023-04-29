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

function App() {
  const [activeLinkId, setActiveLinkId] = useState();
  const [loading, setLoading] = useState(true);
<<<<<<< HEAD
  const { isAuth } = useAuth();

  useAuthListener(setLoading);
=======
  const { isAuth, userInfo } = useAuth();

  useAuthListener(setLoading);
<<<<<<< HEAD
  console.log(userInfo);
>>>>>>> 6e2238d (connecting db coll and coll push in redux store, authChangeHook logic moved to handleAuth.js)
=======
>>>>>>> edadecb (+)

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
