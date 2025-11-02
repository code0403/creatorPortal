import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();

  return (
    <>
      {/* Top Navbar */}
      <div className="navbar bg-base-100 shadow-base-300/50 shadow-md px-4 sm:px-6 sticky top-0 z-50">
        <div className="flex-1">
          <Link to="/" className="text-lg sm:text-xl font-bold">
            Creator Portal
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-4">
          <Link
            to="/"
            className={`btn btn-ghost ${pathname === "/" ? "btn-active" : ""}`}
          >
            Home
          </Link>
          {user?.role === "admin" && (
            <Link to="/add" className="btn btn-ghost">
              Add
            </Link>
          )}
          {/* <Link
            to="/add"
            className={`btn btn-ghost ${
              pathname === "/add" ? "btn-active" : ""
            }`}
          >
            Add
          </Link> */}

          <Link to="/favorites" className="btn btn-ghost">
            ❤️ Favourites
          </Link>

          {user ? (
            <button
              onClick={logout}
              className="btn btn-outline btn-error btn-sm p-4 mt-1"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}

          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="btn btn-ghost btn-circle"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Slide Panel (Framer Motion) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background overlay */}
            <Motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sliding panel */}
            <Motion.div
              className="fixed top-0 right-0 h-full w-64 bg-base-100 shadow-lg z-50 flex flex-col p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={() => setMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                <Link
                  to="/"
                  className={`btn btn-ghost justify-start ${
                    pathname === "/" ? "btn-active" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>

                <Link
                  to="/add"
                  className={`btn btn-ghost justify-start ${
                    pathname === "/add" ? "btn-active" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Add Creator
                </Link>

                <Link to="/favorites" className="btn btn-sm btn-ghost">
                  ❤️ Favourites
                </Link>
              </nav>

              <div className="mt-auto border-t border-base-300 pt-4 text-sm text-gray-500">
                <p>© 2025 Creator Portal</p>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
