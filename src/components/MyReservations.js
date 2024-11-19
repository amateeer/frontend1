import React, { useEffect, useState } from "react";
import { getMyReservations } from "../services/api";
const formatDate = (date) => new Date(date).toLocaleDateString();
const MyReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getMyReservations();
        setReservations(response.data);
      } catch (error) {
        alert("Error fetching reservations: " + (error.response?.data || error.message));
      }
    };
    fetchReservations();
  }, []);

  return (
    <div>
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
  {reservations.map((reservation) => (
    <li key={reservation.id}>
      Room Type: {reservation.room.roomType}, 
      Start Date: {formatDate(reservation.startDate)}, 
      End Date: {formatDate(reservation.endDate)}
    </li>
  ))}
</ul>

      )}
    </div>
  );
};

export default MyReservations;
