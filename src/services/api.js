import axios from "axios";

const API_URL = "https://hotel-reservation-api.azurewebsites.net/api"; // Backend URL

export const register = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        passwordHash: password,
      });
      console.log("Registration response:", response);
      return response;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      throw error;
    }
  };
  

  
export const login = async (username, password) => {
  return axios.post(`${API_URL}/auth/login`, {
    username,
    passwordHash: password,
  });
};

// Získanie izieb
export const getRooms = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/rooms`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Dostupnosť izieb
export const checkRoomAvailability = async (startDate, endDate) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/rooms/availability`, {
    params: { startDate, endDate },
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Rezervácia izby
export const createReservation = async (reservation) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/reservations`, reservation, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Pridanie novej izby
export const addRoom = async (room) => {
    const token = localStorage.getItem("token");
    return axios.post(`${API_URL}/rooms`, room, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
  // Aktualizácia izby
  export const updateRoom = async (id, updatedRoom) => {
    const token = localStorage.getItem("token");
    return axios.put(`${API_URL}/rooms/${id}`, updatedRoom, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
  // Odstránenie izby
  export const deleteRoom = async (id) => {
    const token = localStorage.getItem("token");
    return axios.delete(`${API_URL}/rooms/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
// Získanie dostupných izieb
export const getAvailableRooms = async (startDate, endDate) => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/rooms/availability`, {
      params: { startDate, endDate },
      headers: { Authorization: `Bearer ${token}` },
    });
  };
// Príklad funkcie na získanie miestností
export const getRoomsWithCount = async () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/rooms/with-count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  
  // Príklad funkcie na získanie rezervácií
  export const getMyReservations = async () => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/reservations/my-reservations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };