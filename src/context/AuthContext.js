// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { login, register } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const loginUser = async (credentials) => {
    const data = await login(credentials);

    if (data && data.token) { // Ensure a valid token is received
      setUser(data.user);
      setToken(data.token);
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
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
