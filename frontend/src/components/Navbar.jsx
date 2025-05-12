import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/logout");
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-white">
          TaskTracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-blue-200">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 px-4 py-1 rounded-lg hover:bg-blue-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Hamburger Menu */}
        <button
          className="sm:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="block text-white"
          >
            Profile
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full text-left text-white bg-blue-500 px-3 py-2 rounded hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
