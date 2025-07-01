import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("name");

    setIsLoggedIn(!!token);
    setRole(storedRole || null);
    setUsername(storedName || null);
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null);
    setUsername(null);
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkStyle =
    "text-black hover:text-blue-500 transition duration-150 block md:inline";

  const renderLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Link to="/" className={linkStyle}>
            Home
          </Link>
          <Link to="/login" className={linkStyle}>
            Login
          </Link>
          <Link to="/register" className={linkStyle}>
            Sign Up
          </Link>
        </>
      );
    }

    if (role === "trainee") {
      return (
        <>
          <Link to="/home" className={linkStyle}>
            Home
          </Link>
          <Link to="/trainee-dashboard" className={linkStyle}>
            Dashboard
          </Link>
          <Link to="/progress" className={linkStyle}>
            Progress
          </Link>
          <Link to="/profile" className={linkStyle}>
            Profile
          </Link>
        </>
      );
    }

    if (role === "instructor") {
      return (
        <>
          <Link to="/home" className={linkStyle}>
            Home
          </Link>
          <Link to="/instructor-dashboard" className={linkStyle}>
            Instructo Dashboard
          </Link>
          <Link to="/assign-modules" className={linkStyle}>
            Assign Modules
          </Link>
          <Link to="/manage-modules" className={linkStyle}>
            Manage Modules
          </Link>
          <Link to="/profile" className={linkStyle}>
            Profile
          </Link>
        </>
      );
    }
    return null;
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-lg md:text-xl font-bold text-gray-800">
            Training Portal
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {renderLinks()}
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaUserCircle className="text-xl" />
                <span className="font-medium">{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          {renderLinks()}
          {isLoggedIn && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <FaUserCircle className="text-lg" />
                <span>{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
