import { React, useEffect } from "react";
import "./appointments.css";
import useAppointmentsStore from "../../store/appointmentsStore";
import AppointmentsList from "./AppointmentsList";

import useAuthStore from "../../store/useAuthStore";

const Appointments = () => {
  const Appointments = useAppointmentsStore((state) => state.Appointments);
  const trigger = useAppointmentsStore((state) => state.fetchAppoint);
  const user = useAuthStore((state) => state.user);
  const confirmed = Appointments.filter((app) => app.status === "confirmed");
  const pending = Appointments.filter((app) => app.status === "pending");
  const cancelled = Appointments.filter((app) => app.status === "cancelled");
  
  useEffect(() => {
    if (user?.uid) {
      const unsub = trigger(user.uid);
      return () => unsub && unsub();
    }
  }, [user?.uid]);

  return (
    <>
      <div className="appointments section">
        <div className="appointments-head head">
          <h1>Appointments</h1>
          <p>Manage and track all your appointments</p>
        </div>
        <div className="carts-appointments ">
          <div className="cart-appointments shadow-lg rounded-xl  ">
            <p>Total</p>
            <h1 className=" text-blue-600 ">{Appointments?.length}</h1>
          </div>
          <div className="cart-appointments shadow-lg rounded-xl ">
            <p>Confirmed</p>
            <h1 className=" text-green-600 ">{confirmed?.length}</h1>
          </div>
          <div className="cart-appointments shadow-lg rounded-xl">
            <p>Pending</p>
            <h1 className=" text-orange-400 ">{pending?.length}</h1>
          </div>
          <div className="cart-appointments shadow-lg rounded-xl  ">
            <p>Cancelled</p>
            <h1 className=" text-red-500 ">{cancelled?.length}</h1>
          </div>
        </div>
        <AppointmentsList />
      </div>
    </>
  );
};

export default Appointments;
