import React, { useState } from "react";
import useAppointmentsStore from "../../store/appointmentsStore";
import useAuthStore from "../../store/useAuthStore";
import useNotificationsStore from "../../store/notificationsStore";

const Modul = () => {
  const toggle = useNotificationsStore((state) => state.togglemodul);
  const addAppointements = useAppointmentsStore(
    (state) => state.addAPpointements,
  );
  const addNotification = useNotificationsStore(
    (state) => state.addNotification,
  );
  const uid = useAuthStore((state) => state.user);
  const [value, setvalue] = useState({
    date: "",
    service: "",
    name: "",
    email: "",
    number: "",
    price: "",
    time: "",
    status: "pending",
  });

  const submit = async (e) => {
    e.preventDefault();
    if (value) {
      const result = await addAppointements({ ...value, uid: uid?.uid }, uid, {
        
        type: "pending",
        title: "New Appointment Added",
        clientName: value.name,
        amount: value.price,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        icon: "👤",
        uid: uid?.uid,
      });

      setvalue({
        date: "",
        service: "",
        name: "",
        email: "",
        number: "",
        price: "",
        time: "",
        status: "pending",
      });
    }
    toggle();
  };

  const SERVICES = [
    "Web Development",
    "Mobile App",
    "UI/UX Design",
    "Consultation",
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-9999 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all max-h-[95vh] overflow-y-auto">
        <div className="bg-blue-600 p-4 text-white text-center">
          <h2 className="text-xl font-bold">Add New Appointment</h2>
          <p className="text-blue-100 text-xs">
            Fill in the details to schedule a new client
          </p>
        </div>

        <form className="p-5 space-y-3" onSubmit={submit}>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
              placeholder="e.g. Hocine Bouhalab"
              required
              maxLength={40}
              onChange={(e) => {
                setvalue({ ...value, name: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="Email"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
              placeholder="e.g. Contact@gmail.com"
              required
              maxLength={40}
              onChange={(e) => setvalue({ ...value, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Service Type
            </label>
            <select
              name="service"
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer text-sm"
              required
              value={value.service}
              onChange={(e) => setvalue({ ...value, service: e.target.value })}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                required
                onChange={(e) => setvalue({ ...value, time: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                required
                onChange={(e) => setvalue({ ...value, date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="number"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                placeholder="+213..."
                required
                maxLength={18}
                onChange={(e) => setvalue({ ...value, number: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                placeholder="500"
                required
                maxLength={5}
                onChange={(e) => setvalue({ ...value, price: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-5 py-2 text-sm text-gray-600 font-medium cursor-pointer hover:bg-gray-100 transition-all duration-300 rounded-xl"
              onClick={toggle}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modul;
