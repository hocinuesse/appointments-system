import React, { useEffect } from "react";
import "./clients.css";
import { GoPeople } from "react-icons/go";
import { LuTrendingUp } from "react-icons/lu";
import ClientsCard from "./ClientForm";
import { CiSearch } from "react-icons/ci";
import useClientsStore from "../../store/clientsStore";
import useAnalyticsStore from "../../store/analyticsStore";
import useAuthStore from "../../store/useAuthStore";

const Clients = () => {
  const clients = useClientsStore((state) => state.clients);
  const searchClients = useClientsStore((state) => state.searchClients);
  const totalRevenu = useAnalyticsStore((state) => state.totalRevenu);
  const total = useAnalyticsStore((state) => state.total);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user?.uid) {
      const unsub = totalRevenu(user.uid);
      return () => unsub && unsub();
    }
  }, [user?.uid]);

  return (
    <>
      <div className="clients section">
        <div className="clients-head head">
          <h1>Clients</h1>
          <p>Clients who have interacted with us</p>
        </div>
        <div className="clients-carts">
          <div className="cart-clients shadow-lg rounded-xl ">
            <div className="cart-head">
              <p>Total Clients</p>
              <GoPeople className="cart-total-icn cart-icn" />
            </div>
            <h1 className=" text-blue-600 ">{clients?.length}</h1>
          </div>
          <div className="cart-clients  shadow-lg rounded-xl ">
            <div className="cart-head">
              <p>Total Revenue</p>
              <LuTrendingUp className="cart-total-icn cart-icn" />
            </div>
            <h1 className=" text-blue-600 ">${total || 0}</h1>
          </div>
        </div>
        <div className="flex flex-row mt-4 items-center gap-2 mb-6 bg-white p-1 rounded-xl shadow-sm border border-slate-100 w-full overflow-hidden">
          {/* حاوية البحث - جعلناها مرنة flex-1 لتأخذ المساحة الأكبر */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <CiSearch className="text-slate-400 text-base" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-9 pr-2 py-1.5 bg-slate-50 border-none rounded-lg text-[12px] text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all outline-none"
              onChange={(e) => searchClients(e.target.value)}
            />
          </div>

          {/* خط فاصل صغير بين البحث والفلتر */}
          <div className="h-6 w-px bg-slate-100"></div>

          {/* حاوية الفلتر - صغرنا العرض والخط */}
          <div className="relative flex items-center min-w-25">
            <select
              className="w-full bg-transparent text-slate-500 font-bold text-[11px] py-1.5 pl-2 pr-6 outline-none cursor-pointer hover:text-blue-600 transition-colors appearance-none"
              onChange={(e) => console.log("Filter by:", e.target.value)}
            >
              <option value="all">All</option>
              <option value="recent">Recent</option>
              <option value="top">Top</option>
            </select>

            {/* أيقونة السهم المنسدل بجانب كلمة الفلتر */}
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

        <ClientsCard />
      </div>
    </>
  );
};

export default Clients;
