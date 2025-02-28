// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    return null;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed", error);
    return null;
  }
};