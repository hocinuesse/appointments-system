import React, { useEffect, useState } from "react";
import "./info.css";
import { LuCalendar } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import useAppointmentsStore from "../../store/appointmentsStore";
import useClientsStore from "../../store/clientsStore";
import useAuthStore from "../../store/useAuthStore";
import useNotificationsStore from "../../store/notificationsStore";

const InfoSection = () => {
  const trigger = useAppointmentsStore((state) => state.fetchAppoint);
  const data = useAppointmentsStore((state) => state.Appointments);
  const data2 = useAppointmentsStore((state) => state.filteredData);
  const user = useAuthStore((state) => state.user);
  const addNotification = useNotificationsStore(
    (state) => state.addNotification,
  );
  const confermBtn = useAppointmentsStore((state) => state.confermBtn);
  const cancelBtn = useAppointmentsStore((state) => state.cancelBtn);
  const clients = useClientsStore((state) => state.clients);
  const fetchClient = useClientsStore((state) => state.fetchClient);
  const filterByStatus = useAppointmentsStore((state) => state.filterByStatus);

  const sortData = [...data2].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const confirmeLength = data.filter((item) => item.status === "confirmed");
  const total = confirmeLength.reduce((sum, item) => {
    return sum + Number(item.price || 0);
  }, 0);
  const pendingLength = data.filter((item) => item.status === "pending");

  useEffect(() => {
    if (user?.uid) {
      const unsubTrigger = trigger(user.uid);
      const unsubfetchClient = fetchClient(user.uid);
      return () => {
        unsubTrigger && unsubTrigger();
        unsubfetchClient && unsubfetchClient();
      };
    }
  }, [user?.uid]);

  const [color, setcolor] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);

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

  return (
    <>
      <div className="info" data-aos="fade-up">
        <div className="info-head" data-aos="fade-up">
          <div className="welcome" data-aos="fade-right">
            <h1>Welcome back, {user.displayName} 👋</h1>
            <p>Here's your activity summary for today</p>
          </div>
          <div className="carts">
            <div className="card shadow-lg " data-aos="zoom-in" data-aos-delay="0">
              <div className="card-info">
                <h4>Total Appointments</h4>
                <h1> {data?.length || 0} </h1>
                <p>+12% from last month</p>
              </div>
              <LuCalendar className="icn-calen" />
            </div>
            <div className="card shadow-lg" data-aos="zoom-in" data-aos-delay="100">
              <div className="card-info">
                <h4>Confirmed</h4>
                <h1>{confirmeLength?.length || 0}</h1>
                <h3 className="text-gray-500 font-medium text-sm ">
                  {pendingLength?.length || 0} Pending
                </h3>
              </div>
              <FaArrowTrendUp className="icn-calen" />
            </div>
            <div className="card shadow-lg " data-aos="zoom-in" data-aos-delay="200">
              <div className="card-info">
                <h4>Clients</h4>
                <h1>{clients?.length || 0}</h1>
                <p>+3 new clients</p>
              </div>
              <GoPeople className="icn-calen" />
            </div>
            <div className="card shadow-lg" data-aos="zoom-in" data-aos-delay="300">
              <div className="card-info">
                <h4>Revenue</h4>
                <h1>${total ? total : 0}</h1>
                <p>+8% growth</p>
              </div>
              <FaDollarSign className="icn-calen" />
            </div>
          </div>
        </div>
        <div className="info-body" data-aos="fade-up">
          <div className="info-body-head">
            <h1>Upcoming Appointments</h1>
            <div className="category-status">
              <button
                onClick={() => {
                  setcolor("all");
                  trigger(user.uid);
                }}
                className={`${color === "all" && "all"}`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setcolor("confirmed");
                  filterByStatus("confirmed");
                }}
                className={`${color === "confirmed" && "confirmed"}`}
              >
                Confirmed
              </button>
              <button
                onClick={() => {
                  setcolor("pending");
                  filterByStatus("pending");
                }}
                className={`${color === "pending" && "pending"}`}
              >
                Pending
              </button>
              <button
                onClick={() => {
                  setcolor("cancelled");
                  filterByStatus("cancelled");
                }}
                className={`${color === "cancelled" && "cancelled"}`}
              >
                Cancelled
              </button>
            </div>
          </div>
          <div className="appointments-dashboard">
            {sortData ? (
              sortData.map((doc) => (
                <div
                  className="appointment-dashboard hover:shadow-lg transition-all duration-300 "
                  key={doc.id}
                >
                  <div className="name-logo">
                    <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                      {doc.name ? doc.name.slice(0, 2).toUpperCase() : "??"}
                    </div>
                    <div className="name">
                      <h2> {doc.name} </h2>
                      <h3>{doc.service}</h3>
                    </div>
                  </div>
                  <div className="time-date min-w-36 info-appionetment">
                    <MdAccessTime />
                    <div className="time">
                      {doc.time} | {doc.date}
                    </div>
                  </div>
                  <div className="phone min-w-20 info-appionetment">
                    <IoCallOutline className=" w-3.5 " />
                    <h3> {doc.number} </h3>
                  </div>
                  <div className="price font-semibold ">
                    <h1>${doc.price}</h1>
                  </div>
                  <div className="status ">
                    <span className={`${doc.status}`}>{doc.status}</span>
                  </div>
                  <div className="edite">
                    <button
                      type="button"
                      className="edite-btn"
                      onClick={() =>
                        setOpenMenuId(openMenuId === doc.id ? null : doc.id)
                      }
                    >
                      <BsThreeDots />
                    </button>
                    {openMenuId === doc.id && (
                      <div className="edite-menu">
                        <button
                          type="button"
                          className={`edite-item cursor-pointer transition-all ${doc.status === "confirmed" ? "hidden" : ""} `}
                          onClick={() => {
                            handleConfirm(doc.id, doc.name, doc.price);
                            setOpenMenuId(null);
                          }}
                        >
                          Confirme
                        </button>
                        <button
                          type="button"
                          className={`edite-item cursor-pointer transition-all ${doc.status === "cancelled" ? "hidden" : ""} `}
                          onClick={() => {
                            handleCancel(doc.id, doc.name, doc.price);
                            setOpenMenuId(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h2>
                  "No confirmed appointments yet. Start by scheduling one!"
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
