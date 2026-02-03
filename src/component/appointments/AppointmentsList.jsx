import React, { useState, useEffect } from "react";
import { HiOutlineCalendar, HiOutlineMail } from "react-icons/hi";
import {
  MdOutlineAccessTime,
  MdOutlineDoneAll,
  MdOutlineClose,
} from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import useAppointmentsStore from "../../store/appointmentsStore";
import useAuthStore from "../../store/useAuthStore";
import FiltreStatus from "./FiltreStatus";
import FiltreService from "./FiltreService";
import "./appointments.css";

const AppointmentsList = () => {
  const [status, setStatus] = useState("All Status");
  const [service, setService] = useState("All Service");
  const [openMenuId, setOpenMenuId] = useState(null);

  const data = useAppointmentsStore((state) => state.filteredData);
  const sortData = [...data].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const filterByStatus = useAppointmentsStore((state) => state.filterByStatus);
  const confermBtn = useAppointmentsStore((state) => state.confermBtn);
  const cancelBtn = useAppointmentsStore((state) => state.cancelBtn);
  const user = useAuthStore((state) => state.user);

  const handleConfirm = async (id, name, price) => {
    const res = await confermBtn(id, {
      id: id,
      type: "confirmed",
      title: "New Confirmed Appointment",
      clientName: name,
      amount: price,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      uid: user.uid,
    });
  };

  const handleCancel = async (id, name, price) => {
    const res = await cancelBtn(id, {
      id: id,
      type: "cancelled",
      title: "New Cancelled Appointment ",
      clientName: name,
      amount: price,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      uid: user.uid,
    });
  };

  useEffect(() => {
    filterByStatus(status, service);
  }, [status, service]);

  return (
    <>
      <div className="filtre-appointments rounded-xl" data-aos="fade-up">
        <FiltreStatus onSelect={(status) => setStatus(status)} />
        <FiltreService onSelect={(service) => setService(service)} />
      </div>

      <div className="w-full mt-3 bg-white rounded-2xl shadow-sm border border-slate-100" data-aos="fade-up">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 w-[30%]">
                Clients
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 w-[20%]">
                Service
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 w-[20%]">
                The appointment
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 w-[15%]">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 w-[10%]">
                Amount
              </th>
              <th className="px-6 py-4 w-[5%]"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 w-full tbody min-h-50 ">
            {sortData && sortData.length > 0 ? (
              sortData.map((doc, i) => (
                <tr
                  key={doc.id}
                  className="appointment hover:bg-slate-50/80 transition-all group w-full"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  {/* Column 1: Client Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                        {doc.name ? doc.name.slice(0, 2).toUpperCase() : "??"}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                          <HiOutlineMail
                            size={14}
                            className="text-indigo-400"
                          />
                          {doc.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Column 2: Service */}
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                      {doc.service}
                    </span>
                  </td>
                  {/* Column 3: Date & Time */}
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <HiOutlineCalendar className="text-slate-400" />
                        {doc.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <MdOutlineAccessTime className="text-slate-400" />
                        {doc.time}
                      </div>
                    </div>
                  </td>
                  {/* Column 4: Status Badge */}
                  <td className="px-6 py-4">
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black border w-26.5 uppercase transition-all ${
                        doc.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" // أخضر للمؤكد
                          : doc.status === "cancelled"
                            ? "bg-rose-50 text-rose-700 border-rose-200" // أحمر للملغي
                            : "bg-amber-50 text-amber-700 border-amber-200" // أصفر للمنتظر
                      }`}
                    >
                      {doc.status === "confirmed" && (
                        <MdOutlineDoneAll size={14} />
                      )}
                      {doc.status === "pending" && <IoTimerOutline size={14} />}
                      {doc.status === "cancelled" && (
                        <MdOutlineClose size={14} />
                      )}
                      <span>{doc.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 price font-semibold">
                    <h1>${doc.price}</h1>
                  </td>
                  {/* Column 5: Action Menu */}
                  <td className="px-6 py-4 text-right">
                    <div className="edite inline-block">
                      <button
                        type="button"
                        className="edite-btn"
                        onClick={() =>
                          setOpenMenuId(openMenuId === doc.id ? null : doc.id)
                        }
                      >
                        <BsThreeDots size={18} />
                      </button>
                      {openMenuId === doc.id && (
                        <div className="edite-menu shadow-xl border border-slate-100">
                          <button
                            type="button"
                            className={`edite-item hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${doc.status === "confirmed" ? "hidden" : ""}`}
                            onClick={() => {
                              handleConfirm(doc.id, doc.name, doc.price);
                              setOpenMenuId(null);
                            }}
                          >
                            Confirm Appointment
                          </button>
                          <button
                            type="button"
                            className={`edite-item hover:bg-rose-50 hover:text-rose-700 transition-colors ${doc.status === "cancelled" ? "hidden" : ""}`}
                            onClick={() => {
                              handleCancel(doc.id, doc.name, doc.price);
                              setOpenMenuId(null);
                            }}
                          >
                            Cancel Appointment
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-slate-400 italic"
                >
                  "No appointments found. Start by scheduling one!"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AppointmentsList;
