import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <div className="text-xl font-bold">
        <Link to="/catalog" className="hover:underline">BookStore</Link>
      </div>
      <div className="space-x-4">
        <Link to="/cart" className="hover:underline">Cart</Link>
        <Link to="/orders" className="hover:underline">Orders</Link>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
