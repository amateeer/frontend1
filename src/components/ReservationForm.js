import React, { useState, useEffect } from "react";
import { createReservation, getAvailableRooms } from "../services/api";

const ReservationForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      if (startDate && endDate) {
        try {
          const response = await getAvailableRooms(startDate, endDate);
          setAvailableRooms(response.data);
          if (response.data.length > 0) {
            setSelectedRoom(response.data[0].id); // Predvyber prvej dostupnej izby
          } else {
            setSelectedRoom(""); // Ak nie sú dostupné izby
          }
        } catch (error) {
          alert("Error fetching available rooms: " + error.response?.data || error.message);
        }
      }
    };

    fetchAvailableRooms();
  }, [startDate, endDate]);

  const handleReservation = async (e) => {
    e.preventDefault();
    if (!selectedRoom) {
      alert("Please select a room.");
      return;
    }
    try {
      await createReservation({ roomId: selectedRoom, startDate, endDate });
      alert("Reservation created successfully!");
    } catch (error) {
      alert("Error creating reservation: " + error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleReservation}>
      <h2>Make a Reservation</h2>
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <select
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
        disabled={availableRooms.length === 0}
      >
        {availableRooms.length === 0 ? (
          <option value="">No rooms available</option>
        ) : (
          availableRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.roomType} ({room.isAvailable ? "Available" : "Unavailable"})
            </option>
          ))
        )}
      </select>
      <button type="submit" disabled={!selectedRoom || availableRooms.length === 0}>
        Reserve
      </button>
    </form>
  );
};

export default ReservationForm;
