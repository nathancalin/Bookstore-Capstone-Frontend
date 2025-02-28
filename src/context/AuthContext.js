// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { login, register } from "../services/authService";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null); // Add userId state

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  const loginUser = async (credentials) => {
    const data = await login(credentials);

    if (data && data.token && data.userId) { // Ensure both token and userId exist
      setToken(data.token);
      setUserId(data.userId);

      // ✅ Store token AFTER setting it
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      return true; // Successful login
    }

    return false; // Login failed
  };

  const registerUser = async (userData) => {
    return await register(userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserId(null); // Reset userId
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Remove userId
  };

  return (
    <AuthContext.Provider value={{ user, token, userId, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
