import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoFastFood, IoLogIn, IoLogOut } from "react-icons/io5";
import { ImBoxAdd } from "react-icons/im";
import { FaUser, FaGear } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";
import { useAuth } from "../context/AuthProvider";
import logo from "../assets/1logo.png"

const Navbar = () => {
  const { user, logout } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme])

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

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
    <div className="navbar py-0 min-h-0 shadow-sm rounded-full glass-card max-w-7xl mx-auto z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">
                <GoHomeFill /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/available-foods">
                <IoFastFood /> Available Foods
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/add-food">
                    <ImBoxAdd /> Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-requests">
                    <LuHeartHandshake /> My Requests
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 text-xl font-bold tracking-wide"
        >
          <img src={logo} className="h-20 w-auto" alt="PlateShare Logo" />
            PlateShare
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          <li>
            <NavLink to="/">
              <GoHomeFill /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/available-foods">
              <IoFastFood /> Available Foods
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/add-food">
                  <ImBoxAdd /> Add Food
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-requests">
                  <LuHeartHandshake /> My Requests
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">
                  {user.displayName || "User"}
                </li>
                <li className="text-xs">{user.email}</li>
              </div>

              <li className="mt-3">
                <Link to="/profile">
                  <FaUser /> Profile
                </Link>
              </li>

              <li>
                <Link to="/my-requests">
                  <LuHeartHandshake /> My Requests
                </Link>
              </li>

              <li>
                <input
                  onChange={(e) => handleTheme(e.target.checked)}
                  type="checkbox"
                  defaultChecked={localStorage.getItem("theme") === "dark"}
                  className="toggle"
                />
              </li>

              <li>
                <a>
                  <FaGear /> Settings
                </a>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-xs text-left bg-gradient-to-r from-pink-500 to-red-500 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
               className="btn rounded-full border-none btn-sm text-white font-semibold 
             bg-[linear-gradient(135deg,_#ff8a0c_0%,_#ffb347_35%,_#07a0e3_100%)]
             hover:bg-[linear-gradient(135deg,_#07a0e3_0%,_#45c4ff_40%,_#ff8a0c_100%)]
             shadow-md hover:shadow-lg transition-all duration-300"
             >
              <IoLogIn /> Login
            </Link>
            <Link
              to="/register"
              className="btn rounded-full border-gray-300  btn-sm bg-linear-to-r from-pink-500 to-red-500 text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
