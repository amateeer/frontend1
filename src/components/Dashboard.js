import React from "react";
import RoomList from "./RoomList";
import ReservationForm from "./ReservationForm";
import MyReservations from "./MyReservations";

const Dashboard = ({ user, onLogout }) => {
  const isAdmin = user.role === "admin"; // Overenie, či je používateľ admin

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={onLogout}>Logout</button>
      <RoomList isAdmin={isAdmin} /> {/* Všetci vidia zoznam izieb */}
      <MyReservations /> {/* Zobrazenie rezervácií používateľa */}
      <ReservationForm />
    </div>
  );
};

export default Dashboard;
