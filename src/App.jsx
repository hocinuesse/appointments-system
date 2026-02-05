import "./App.css";
import InfoSection from "./component/Info/InfoSection";
import Modul from "./component/Info/Modul";
import Navbar from "./component/navbar/Navbar";
import Sidebar from "./component/sidebar/Sidebar";
import useNotificationsStore from "./store/notificationsStore";
import NotificationPanel from "./component/Info/Notification";
import Appointments from "./component/appointments/Appointments";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginUI from "./login/Login";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import MainPage from "./login/MainPage";
import SignUp from "./login/SignUp";
import Clients from "./component/clients/Clients";
import Reports from "./component/reports/Reports";
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from "./firebase";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import Service from "./component/servicees/Service";

function App() {
  const status = useNotificationsStore((state) => state.Modul);
  const notificationModul = useNotificationsStore(
    (state) => state.notificationModul,
  );
  const loading = useAuthStore((state) => state.loading);
  const initAuth = useAuthStore((state) => state.initAuth);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const radar = initAuth();
    return () => radar();
  }, [initAuth]);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence).catch((e) =>
      console.error("Persistence error", e),
    );
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#050816]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginUI />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      ) : (
        <div className="nav-side">
          <Sidebar />
          <div className="nav-info">
            <Navbar />
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <>
                    <InfoSection />
                    {status && <Modul />}
                  </>
                }
              />
              <Route
                path="/appointments"
                element={
                  <>
                    <Appointments /> {status && <Modul />}
                  </>
                }
              />
              <Route
                path="/clients"
                element={
                  <>
                    <Clients /> {status && <Modul />}
                  </>
                }
              />
              <Route
                path="/reports"
                element={
                  <>
                    <Reports /> {status && <Modul />}
                  </>
                }
              />
              <Route
                path="/services"
                element={
                  <>
                    <Service /> {status && <Modul />}
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      )}
      {notificationModul && <NotificationPanel />}
    </>
  );
}

export default App;
