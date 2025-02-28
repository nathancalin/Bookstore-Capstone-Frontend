const API_BASE_URL = "http://localhost:8080";

// ✅ Get token from local storage
const getToken = () => localStorage.getItem("token");

// ✅ Get userId from local storage (instead of decoding JWT)
const getUserId = () => localStorage.getItem("userId");

const cartService = {
    getCart: async () => {
        const userId = getUserId();
        if (!userId) {
            console.error("User ID not found");
            return null;
        }

        const response = await fetch(`${API_BASE_URL}/cart/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch cart");
        }

        return response.json();
    },

    addCartItem: async (bookId) => {
        const userId = getUserId();
        if (!userId) {
            console.error("User ID not found");
            return null;
        }

        const cartItem = { book: { id: bookId }, quantity: 1 }; // Ensure correct book reference

        const response = await fetch(`${API_BASE_URL}/cart-items/add/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(cartItem),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Failed to add book to cart:", errorMessage);
            throw new Error(errorMessage);
        }

        return response.json();
    },

    updateCartItem: async (itemId, quantity) => {
        const response = await fetch(`${API_BASE_URL}/cart-items/update/${itemId}?quantity=${quantity}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to update cart item");
        }
    },

    removeCartItem: async (itemId) => {
        const response = await fetch(`${API_BASE_URL}/cart-items/remove/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to remove cart item");
        }
    },
};

export default cartService;
