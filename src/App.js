import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import { auth } from "./firebase";
import { setUser } from "./store/slicers/userSlice";
import { useAuth } from "./hooks/useAuth";
import { UserSettings } from "./components/header/UserSettings";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  const [activeLinkId, setActiveLinkId] = useState();
  const [loading, setLoading] = useState(true);
  const disp = useDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("auth changed");
      disp(
        setUser({
          userInfo: {
            photoURL: user?.photoURL,
            phoneNumber: user?.phoneNumber,
          },
          email: user?.email,
          token: user?.accessToken,
          id: user?.uid,
        })
      );
      setLoading(false);
    });
  }, []);

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
