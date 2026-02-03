import React, { useState } from "react";
import "./notification.css";
import { IoCloseOutline } from "react-icons/io5";
import useNotificationsStore from "../../store/notificationsStore";
import useAuthStore from "../../store/useAuthStore";

const NotificationPanel = () => {
  const ToggleNotifcation = useNotificationsStore((state) => state.ToggleNotifcation);
  const notification = useNotificationsStore((state) => state.notification);
  const clearNotification = useNotificationsStore((state) => state.clearNotification);
  const user = useAuthStore((state) => state.user);
  const notificationFiltred = notification.filter(
    (not) => not.uid === user.uid,
  );
  const [close, setclose] = useState(false);

  return (
    <div className="p-notif-overlay" data-aos="fade">
      <div className={`p-notif-panel ${close ? "close" : ""}`} data-aos="fade-left" data-aos-delay="60">
        {/* Header */}
        <div className="p-notif-header">
          <div className="p-notif-title-area">
            <div className="p-notif-icon-bg">🔔</div>
            <div>
              <h2>Activity Log</h2>
              <p>System Records</p>
            </div>
          </div>
          <button
            className="p-notif-close-circle cursor-pointer"
            onClick={() => {
              ToggleNotifcation();
            }}
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="p-notif-list">
          {notificationFiltred && notificationFiltred.length > 0 ? (
            notificationFiltred.map((item) => (
              <div key={item.id} className="p-notif-card">
                <div className={`p-notif-status-bar ${item.type}`}></div>

                <div className="p-notif-card-body">
                  <div className="p-notif-card-header">
                    <h4>{item.title}</h4>
                    <span className="p-notif-time-tag">
                      {item.time || item.timestamp}
                    </span>
                  </div>

                  <p className="p-notif-desc">
                    {item.icon} Transaction for client <b>{item.clientName}</b>
                    {item.amount && ` with amount of ${item.amount} $.`}
                  </p>

                  <div className="p-notif-footer">
                    <span className={`p-badge ${item.type}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-empty-state">
              <div className="p-empty-icon">📂</div>
              <h3>Your log is clear</h3>
              <p>
                No new activities to show right now. Everything is up to date!
              </p>
            </div>
          )}
        </div>

        {notification?.length > 0 && (
          <div className="p-notif-footer-panel">
            <button className="p-clear-all" onClick={() => clearNotification()}>
              Clear All History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
