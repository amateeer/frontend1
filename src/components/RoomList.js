import React, { useEffect, useState } from "react";
import { getRoomsWithCount, addRoom, deleteRoom } from "../services/api";

const RoomList = ({ isAdmin }) => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomType: "", isAvailable: true });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRoomsWithCount(); // Načítanie dát z API
        console.log("Fetched rooms:", response.data); // Logovanie pre kontrolu
        setRooms(response.data); // Nastavenie dát do stavu
      } catch (error) {
        console.error("Error fetching rooms:", error.response?.data || error.message);
        alert("Error fetching rooms: " + (error.response?.data || error.message));
      }
    };

    fetchRooms();
  }, []);

  const handleAddRoom = async () => {
    if (!newRoom.roomType.trim()) {
      alert("Room type cannot be empty.");
      return;
    }
    try {
      const response = await addRoom(newRoom);
      console.log("Added room:", response.data);
      setRooms([...rooms, { ...response.data, TotalRooms: 1, AvailableRooms: 1 }]);
      setNewRoom({ roomType: "", isAvailable: true });
    } catch (error) {
      console.error("Error adding room:", error.response?.data || error.message);
      alert("Error adding room: " + (error.response?.data || error.message));
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await deleteRoom(id);
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (error) {
      console.error("Error deleting room:", error.response?.data || error.message);
      alert("Error deleting room: " + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2>Room List</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <ul>
          {rooms.map((room, index) => (
            <li key={index}>
              {room.roomType || "Unknown Type"} - Total: {room.totalRooms || 0}, Available: {room.availableRooms || 0}
              {isAdmin && (
                <button onClick={() => handleDeleteRoom(room.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
      {isAdmin && (
        <div>
          <h3>Add Room</h3>
          <input
            type="text"
            placeholder="Room Type"
            value={newRoom.roomType}
            onChange={(e) =>
              setNewRoom({ ...newRoom, roomType: e.target.value })
            }
          />
          <button onClick={handleAddRoom}>Add Room</button>
        </div>
      )}
    </div>
  );
};

export default RoomList;
