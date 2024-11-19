import React, { useState } from "react";
import { register } from "../services/api";

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, password);
      alert(response.data?.message || "Registration successful! You can now log in.");
      onRegister();
    } catch (error) {
      const errorMessage = error.response?.data || "Unknown error occurred.";
      alert("Registration failed: " + errorMessage);
    }
  };
  
  

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
