// src/components/Navbar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (error) {
      console.error(error);
      alert("Logout failed!");
    }
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold">
          PlateShare
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/available-foods"
            className={({ isActive }) =>
              isActive ? "underline font-semibold" : ""
            }
          >
            Available Foods
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/add-food"
                className={({ isActive }) =>
                  isActive ? "underline font-semibold" : ""
                }
              >
                Add Food
              </NavLink>
              <NavLink
                to="/my-requests"
                className={({ isActive }) =>
                  isActive ? "underline font-semibold" : ""
                }
              >
                My Requests
              </NavLink>
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div>
          {user ? (
            <div className="flex items-center space-x-2">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="bg-white text-green-600 px-3 py-1 rounded font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-green-600 px-3 py-1 rounded font-semibold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
