import React from "react";
import "./service.css";
import { IoIosAdd } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { LuBriefcase } from "react-icons/lu";
import { LiaCheckCircle } from "react-icons/lia";
import { LuTrendingUp } from "react-icons/lu";



const Service = () => {
  return (
    <>
      <div className="service section">
        <div className="service-head head" data-aos="fade-up">
          <div className="service-title">
            <h1>Services</h1>
            <p>Manage your service offerings and pricing</p>
          </div>
          <button className="flex items-center justify-center w-auto min-w-10.5 lg:w-47.5 px-2 lg:px-0">
            <IoIosAdd className="icn-add" />
            <span className="lg:inline">Add Service</span>
          </button>
        </div>
        <div className="service-carts">
          <div
            className="cart-service shadow-lg rounded-xl"
            data-aos="zoom-in"
            data-aos-delay="0"
          >
            <div className="cart-head-service">
              <p>Total Services</p>
              <LuBriefcase className="cart-icn text-blue-600" />
            </div>
            <h1 className="text-blue-600">50</h1>
          </div>
          <div
            className="cart-service shadow-lg rounded-xl"
            data-aos="zoom-in"
            data-aos-delay="0"
          >
            <div className="cart-head-service">
              <p>Active</p>
              <LiaCheckCircle className="cart-icn text-lg text-green-600" />
            </div>
            <h1 className="text-green-600">50</h1>
          </div>
          <div
            className="cart-service shadow-lg rounded-xl"
            data-aos="zoom-in"
            data-aos-delay="0"
          >
            <div className="cart-head-service">
              <p>Total Bookings</p>
              <LuTrendingUp className="cart-icn text-cyan-500" />
            </div>
            <h1 className="text-cyan-500">50</h1>
          </div>
          <div
            className="cart-service shadow-lg rounded-xl"
            data-aos="zoom-in"
            data-aos-delay="0"
          >
            <div className="cart-head-service">
              <p>Avg. Price</p>
              <FaDollarSign className="cart-icn text-orange-400" />
            </div>
            <h1 className="text-orange-400">50</h1>
          </div>
        </div>
        <div className="flex flex-row mt-6 items-center gap-2 mb-6 bg-white p-1 rounded-xl shadow-sm border border-slate-100 w-full h-13 overflow-hidden">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <CiSearch className="text-slate-400 text-base" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full h-10 pl-9 pr-2 py-1.5 bg-slate-50 border-none rounded-lg text-[15px] text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all outline-none"
              // onChange={(e) => searchClients(e.target.value)}
            />
          </div>

          <div className="h-6 w-px bg-slate-100"></div>

          <div className="relative flex items-center min-w-25">
            <select
              className="w-full bg-transparent text-slate-500 font-bold text-[11px] py-1.5 pl-2 pr-6 outline-none cursor-pointer hover:text-blue-600 transition-colors appearance-none"
              // onChange={(e) => console.log("Filter by:", e.target.value)}
            >
              <option value="all">All</option>
              <option value="recent">Recent</option>
              <option value="top">Top</option>
            </select>

            <div className="absolute right-1 pointer-events-none">
              <svg
                className="w-2.5 h-2.5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <div className="relative flex items-center min-w-25">
            <select
              className="w-full bg-transparent text-slate-500 font-bold text-[11px] py-1.5 pl-2 pr-6 outline-none cursor-pointer hover:text-blue-600 transition-colors appearance-none"
              // onChange={(e) => console.log("Filter by:", e.target.value)}
            >
              <option value="all">All</option>
              <option value="recent">Recent</option>
              <option value="top">Top</option>
            </select>

            <div className="absolute right-1 pointer-events-none">
              <svg
                className="w-2.5 h-2.5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
