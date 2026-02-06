import React, { use, useState } from "react";
import "./sidebar.css";
import { GoChevronLeft, GoChevronRight, GoPeople } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { FaRegChartBar, FaRegFolder } from "react-icons/fa";
import { FiNavigation2 } from "react-icons/fi";
import { IoMenuOutline } from "react-icons/io5"; 
import useSidebarToggle from "./useSidebarToggle";
import { useLocation, Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Sidebar = () => {
  const sidestatus = useSidebarToggle((state) => state.sidebar);
  const toggle = useSidebarToggle((state) => state.togglesidebar);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button 
        onClick={toggle}
        className={`fixed top-4 left-4 z-999 p-2 bg-[#0F1729] text-white rounded-lg lg:hidden transition-opacity duration-300 ${!sidestatus ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <IoMenuOutline size={20} />
      </button>

      {!sidestatus && (
        <div 
          className="fixed inset-0 bg-black/50 z-999 lg:hidden" 
          onClick={toggle} 
        />
      )}

      <div className={`sidebar ${sidestatus && "hid"} 
        ${sidestatus ? "-translate-x-full lg:translate-x-0" : "translate-x-0"} 
        fixed z-1000 transition-all duration-300 lg:transition-[width,transform]`}
      >
        <div className="aside">
          <div className={`side-head ${sidestatus && "side-hid"} `}>
            {sidestatus && (
              <button onClick={toggle}>
                <GoChevronRight
                  className={`icn-side text-xl w-9 h-9 p-2 rounded-xl  `}
                />
              </button>
            )}
            <div className={` logo ${sidestatus && "hid-link"}`}>
              <div className="w-9 h-9 bg-[#0081ff] rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600">
                <FiNavigation2 className="w-5 h-5 fill-white transition-transform" />
              </div>
              <h2>Nexus</h2>
            </div>
            <button onClick={toggle}>
              <GoChevronLeft
                className={`icn-side text-xl w-9 h-9 p-2 rounded-xl ${
                  sidestatus && "hid-link"
                } `}
              />
            </button>
          </div>
          
          <div className="sid-links">
            <div className="sidebar-links-container">
              <div className="link">
                <Link to="/dashboard" className={`a ${sidestatus && "hiddd"} ${isActive("/dashboard") ? "active" : ""}`}>
                  <MdOutlineDashboard className="icn-link" />
                  <span className={`${sidestatus && "hid-link"}`}>Dashboard</span>
                </Link>
              </div>

              <div className="link">
                <Link to="/appointments" className={`a ${sidestatus && "hiddd"} ${isActive('/appointments') ? "active" : ""}`}>
                  <CiCalendar className="icn-link" />
                  <span className={`${sidestatus && "hid-link"}`}>Appointments</span>
                </Link>
              </div>

              <div className="link">
                <Link to="/clients" className={`a ${sidestatus && "hiddd"} ${isActive('/clients') ? "active" : ""}`}>
                  <GoPeople className="icn-link" />
                  <span className={`${sidestatus && "hid-link"}`}>Clients</span>
                </Link>
              </div>

              <div className="link">
                <Link to="/reports" className={`a ${sidestatus && "hiddd"} ${isActive('/reports') ? "active" : ""}`}>
                  <FaRegChartBar className="icn-link" />
                  <span className={`${sidestatus && "hid-link"}`}>Reports</span>
                </Link>
              </div>

              <div className="link">
                <Link to="/services" className={`a ${sidestatus && "hiddd"} ${isActive('services') ? "active" : ""}`}>
                  <FaRegFolder className="icn-link" />
                  <span className={`${sidestatus && "hid-link"}`}>Services</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="user">
          <div className={`user-profile ${sidestatus && "hiddd-user"} `}>
            <Link className=" cursor-pointer ">
              <div className="w-9 h-9 bg-[#0081ff] rounded-full flex items-center justify-center text-white shadow-md shadow-blue-600">
                <FiNavigation2 className="w-5 h-5 fill-white transition-transform" />
              </div>
            </Link>
            <div className={`user-name ${sidestatus && "hid-link"} `}>
              <h4>{user.displayName?.toUpperCase()}</h4>
              <h5>Admin</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;