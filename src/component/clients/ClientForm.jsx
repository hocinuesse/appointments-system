import React, { useEffect, useState } from "react";
import {
  HiDotsHorizontal,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import "./clients.css";
import useClientsStore from "../../store/clientsStore";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";

import useAuthStore from "../../store/useAuthStore";

const ClientsCard = () => {
  const [showMenu, setShowMenu] = useState(null);
  const user = useAuthStore((state) => state.user);
  const fetchClient = useClientsStore((state) => state.fetchClient);
  useEffect(() => {
    if (user?.uid) {
      const unsub = fetchClient(user.uid);
      return () => unsub && unsub();
    }
  }, [user?.uid]);
  const clientFiltred = useClientsStore((state) => state.clientsFiltred);
  console.log(clientFiltred);

  return (
    <>
      <div className="clients-form ">
        {clientFiltred?.length > 0 ? (
          clientFiltred.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03] w-full max-w-[320px]"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#1e40af] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {client.name.toUpperCase().slice(0, 2)}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="text-[16px] font-bold text-slate-800 truncate leading-tight">
                      {client.name}
                    </h3>
                    <p className="text-[12px] text-slate-400 font-medium">
                      Joined <span></span>
                       {new Date(client.joinedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setShowMenu(showMenu === client.id ? null : client.id);
                      console.log(client.id);
                    }}
                    className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer "
                  >
                    <HiDotsHorizontal size={18} />
                  </button>

                  {showMenu === client.id && (
                    <div className="absolute right-0 mt-1 w-28 bg-white rounded-xl shadow-xl border border-slate-50 z-50 py-1 overflow-hidden">
                      <button className="w-full text-left px-3 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                        Edit
                      </button>
                      <button className="w-full text-left px-3 py-2 text-[13px] font-semibold text-red-500 hover:bg-red-50 transition-colors">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 mb-4 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <HiOutlineMail size={13} className="text-slate-400" />
                  <span className="text-[13px] truncate">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <HiOutlinePhone size={13} className="text-slate-400" />
                  <span className="text-[13px] font-medium">
                    {client.number}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-center">
                <div>
                  <p className="text-[15px] font-bold text-slate-800 leading-none">
                    {client.appointments.length}
                  </p>
                  <p className="text-[11px] uppercase tracking-tighter font-bold text-slate-400 mt-1">
                    Appts
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-bold text-cyan-500 leading-none">
                    ${client.totalSpent}
                  </p>
                  <p className="text-[11px] uppercase tracking-tighter font-bold text-slate-400 mt-1">
                    Total
                  </p>
                </div>
                <div>
                  <p className="text-[15px] font-bold text-slate-800 leading-none">
                    {new Date(client.lastVisit).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-[11px] uppercase tracking-tighter font-bold text-slate-400 mt-1">
                    Last Visit
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <HiOutlineUserGroup className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No clients found yet
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
              Your client list is currently empty. Start growing your business
              by adding Appointments Add your first client today.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientsCard;
