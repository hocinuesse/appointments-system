import React, { useState, useEffect } from "react";
import "./navbar.css";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { FaRegBell } from "react-icons/fa6";
import useAppointmentsStore from "../../store/appointmentsStore";
import useNotificationsStore from "../../store/notificationsStore";
import useAuthStore from "../../store/useAuthStore";
import { FiLogOut } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import useSidebarToggle from "../sidebar/useSidebarToggle";

const Navbar = () => {
  const toggle = useNotificationsStore((state) => state.togglemodul);
  const ToggleNotifcation = useNotificationsStore((state) => state.ToggleNotifcation);
  const notification = useNotificationsStore((state) => state.notification);
  const searchAppointments = useAppointmentsStore((state) => state.searchAppointments);
  const user = useAuthStore((state) => state.user);
  const sidestatus = useSidebarToggle((state) => state.sidebar);
  
  const notificationFiltred = notification.filter((not) => not.uid === user.uid);
  const logout = useAuthStore((state) => state.logout);

  const ModulAdd = useNotificationsStore((state) => state.Modul);
  const notificationModul = useNotificationsStore((state) => state.notificationModul);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const location = useLocation();

  const scroll = isLogoutModalOpen || notificationModul || ModulAdd;
  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflow = scroll ? "hidden" : "";
    };
    handleScroll();
    return () => { document.body.style.overflow = ""; };
  }, [scroll]);

  return (
    <>
      <div className={`navbar flex items-center justify-between transition-all duration-300
        ${sidestatus ? "w-full lg:w-[calc(100%-70px)] lg:left-17.5" : "w-full lg:w-[calc(100%-260px)] lg:left-65"}
      `}>
        

        <div className={`search-bar flex items-center transition-all flex-1 lg:flex-none
          ml-14 lg:ml-0  /* ترك مساحة لزر الهمبرغر في الجوال */
        `}>
          <CiSearch className="icn-search shrink-0" />
          <input
            className="w-full lg:w-107.5 max-w-full" 
            type="text"
            placeholder="Search..."
            onChange={(e) => searchAppointments(e.target.value)}
          />
        </div>

        <div className="Add-btn flex items-center gap-2 lg:gap-5 shrink-0">
          <div className="notification relative">
            {notificationFiltred?.length > 0 && (
              <span className="red-note">{notificationFiltred.length}</span>
            )}
            <span
              onClick={() => ToggleNotifcation()}
              className={`icn-bell cursor-pointer ${notificationFiltred?.length > 0 ? "icn-notification" : ""}`}
            >
              <FaRegBell />
            </span>
          </div>


          <button 
            onClick={toggle}
            className="flex items-center justify-center w-auto min-w-10.5 lg:w-47.5 px-2 lg:px-0"
          >
            <IoIosAdd className="icn-add" />
            <span className="lg:inline">New Appointment</span>
          </button>

          <FiLogOut
            onClick={() => setIsLogoutModalOpen(true)}
            className="logout-icn m-0"
          />
        </div>
      </div>


      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-2000 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLogoutModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl animate-modal-scale text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Sign Out</h3>
              <p className="text-slate-500 mb-8">Are you sure you want to log out?</p>
              <div className="flex gap-4">
                <button onClick={() => logout()} className="flex-1 px-6 py-3 rounded-2xl border-2 border-slate-100 font-semibold">Yes</button>
                <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold">Cancel</button>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;