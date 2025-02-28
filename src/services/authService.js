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
    return { success: true, data: response.data }; // Registration successful
  } catch (error) {
    console.error("Registration failed", error);

    // Check if error response exists
    let errorMessage = "Registration failed";
    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = error.response.data.message || "Invalid registration details";
      } else if (error.response.status === 409) {
        errorMessage = "Username or email already exists";
      }
    }

    return { success: false, message: errorMessage }; // Return actual error message
  }
};

