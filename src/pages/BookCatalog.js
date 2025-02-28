import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchBooks, fetchCategories } from "../services/bookService";
import cartService from "../services/cartService";


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
      try {
          const token = localStorage.getItem("token");
          if (!token) {
              console.error("No token found. User might not be logged in.");
              alert("Please log in to add items to your cart.");
              return;
          }

          const response = await cartService.addCartItem(bookId);

          console.log("Book added to cart:", response);
          alert("Book added to cart!");
      } catch (error) {
          console.error("Error adding book to cart:", error);
          alert("Failed to add book to cart. Please try again.");
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
