const API_BASE_URL = "http://localhost:8080"; // Make sure this matches your backend port

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // Return an empty array if fetch fails
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array if fetch fails
  }
};
