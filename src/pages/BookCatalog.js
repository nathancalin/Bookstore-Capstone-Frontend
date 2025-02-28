import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchBooks, fetchCategories } from "../services/bookService";

const BookCatalog = () => {
  const { token } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);



    useEffect(() => {
      fetchBooks().then((data) => {
        console.log("Fetched Books:", data); // Debugging
        setBooks(data);
      });

      fetchCategories().then((data) => {
        console.log("Fetched Categories:", data); // Debugging
        setCategories(data);
      });
    }, []);



  useEffect(() => {
    fetchBooks().then(setBooks);
    fetchCategories().then(setCategories);
  }, []);


  const handleCategoryFilter = async (categoryId) => {
    if (categoryId === null) {
      fetchBooks().then(setBooks); // Fix: update state properly
    } else {
      const response = await fetch(`http://localhost:8080/books/category/${categoryId}`);
      const data = await response.json();
      setBooks(data);
    }
    setSelectedCategory(categoryId);
  };

  const handleAddToCart = async (bookId) => {
    if (!token) {
      alert("You need to be logged in to add books to the cart.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      });

      if (!response.ok) throw new Error("Failed to add book to cart");

      alert("Book added to cart!");
    } catch (error) {
      console.error(error);
      alert("Error adding book to cart. Please try again.");
    }
  };


  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Book Catalog</h2>
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <button onClick={() => handleCategoryFilter(null)}>All Categories</button>
        {categories.map(category => (
          <button key={category.id} onClick={() => handleCategoryFilter(category.id)}>
            {category.name}
          </button>
        ))}
      </div>
      <div>
        {filteredBooks.map((book) => {
          console.log("Rendering book:", book); // Debugging
          return (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Category: {book.category?.name || "Unknown"}</p>
              <button onClick={() => handleAddToCart(book.id)}>Add to Cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookCatalog;
