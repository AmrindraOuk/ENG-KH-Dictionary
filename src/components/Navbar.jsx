import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  StarIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Welcome (on mobile) */}
          <div className="flex flex-col justify-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                ENG-KH
              </span>
            </Link>

            {/* Mobile: Welcome under logo */}
            {user && (
              <span
                className={`block md:hidden text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Welcome, {user.firstName}
              </span>
            )}
          </div>

          {/* Right side of navbar */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "text-yellow-400 hover:text-yellow-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>

            {/* When user is logged in */}
            {user ? (
              <>
                {/* Welcome message for desktop only */}
                <span
                  className={`hidden md:inline text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Welcome, {user.firstName}
                </span>

                {/* Favorites and Profile icons */}
                <Link
                  to="/favorites"
                  className={`${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <StarIcon className="h-6 w-6" />
                </Link>
                <Link
                  to="/profile"
                  className={`${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <UserCircleIcon className="h-6 w-6" />
                </Link>

                {/* Mobile hamburger menu */}
                <button
                  onClick={toggleMobileMenu}
                  className="md:hidden p-2 rounded-lg focus:outline-none focus:ring"
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon
                      className={`h-6 w-6 ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      }`}
                    />
                  ) : (
                    <Bars3Icon
                      className={`h-6 w-6 ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                      }`}
                    />
                  )}
                </button>

                {/* Logout for desktop */}
                <button
                  onClick={logout}
                  className="hidden md:inline bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              // If not logged in, show login
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-4 px-2 pb-4">
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
