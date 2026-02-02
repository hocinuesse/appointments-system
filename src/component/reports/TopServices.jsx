import React from "react";
import "./topservices.css";


const TopServices = ({ services }) => {
  const data =
  services ||
  [
    { rank: 1, name: "Mobile Apps", revenue: 272000, bookings: 34, percent: 95, bar: "bar-blue" },
    { rank: 2, name: "Web Development", revenue: 234500, bookings: 67, percent: 88, bar: "bar-teal" },
    { rank: 3, name: "Cloud Architecture", revenue: 140000, bookings: 56, percent: 52, bar: "bar-green-orange" },
    { rank: 4, name: "Brand Design", revenue: 106800, bookings: 89, percent: 42, bar: "bar-purple" },
    { rank: 5, name: "Marketing", revenue: 84000, bookings: 112, percent: 30, bar: "bar-pink" },
  ];
  
  const formatCurrency = (n) => `$${n.toLocaleString()}`;
  return (
    <div className="topservices w-full h-full">
      <div className="ts-head">
        <h3>Top Services by Revenue</h3>
        <p>Performance of each service</p>
      </div>
      <div className="ts-list">
        {data.map((item , index) => (
          <div className="ts-row" key={item.rank}>
            <div className="ts-row-head">
              <div className="ts-left">
                <span className="ts-rank">{index + 1}</span>
                <span className="ts-name">{item.name}</span>
              </div>
              <div className="ts-right">
                <div className="ts-amount">{formatCurrency(item.revenue)}</div>
                <div className="ts-book">{item.bookings} bookings</div>
              </div>
            </div>
            <div className="ts-progress">
              <div className="ts-track" />
              <div className={`ts-bar ${item.bar}`} style={{ width: `${item.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopServices;
