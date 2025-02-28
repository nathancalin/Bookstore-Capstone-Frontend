import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css"; // Ensure styles are applied

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/catalog">BookStore</Link>
      </div>
      <div className="nav-links">
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
