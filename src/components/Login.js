import React, { useState } from "react";
import { login } from "../services/api";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await login(username, password); // Volá API na prihlásenie
        const { token, username: user, role } = response.data; // Extrahuje token
        localStorage.setItem("token", token); // Uloží token do localStorage
        onLogin({ username: user, role }); // Aktualizuje stav prihlásenia
    } catch (error) {
        alert("Login failed: " + (error.response?.data || error.message));
    }
};


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
