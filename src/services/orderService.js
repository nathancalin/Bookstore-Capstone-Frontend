// services/orderService.js

const API_BASE_URL = "http://localhost:8080";

const getToken = () => localStorage.getItem("token");
const getUserId = () => localStorage.getItem("userId");

const orderService = {
    getOrders: async () => {
        const userId = getUserId();
        if (!userId) {
            console.error("User ID not found");
            return [];
        }

        const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
            headers: { Authorization: `Bearer ${getToken()}` },
        });

        if (!response.ok) throw new Error("Failed to fetch orders");
        return response.json();
    },

    checkout: async () => {
        const userId = getUserId();
        if (!userId) {
            console.error("User ID not found");
            return null;
        }

        const response = await fetch(`${API_BASE_URL}/orders/checkout/${userId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${getToken()}` },
        });

        if (!response.ok) throw new Error("Checkout failed");
        return response.json();
    }
};

export default orderService;