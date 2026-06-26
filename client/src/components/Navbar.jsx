import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";

const Navbar = () => {
  const { ready, authenticated, login, logout } = usePrivy();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-16 bg-[#030712]">
        <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-teal-400 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#030712]/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-teal-400 via-emerald-400 to-violet-500 shadow-xl shadow-teal-500/25 group-hover:scale-105 transition-all duration-300">
            <div className="bg-[#0a0f1a] rounded-2xl p-1.5">
              {/* <img
                src="/logo.png"
                alt="AuraWrite Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
              /> */}
            </div>
          </div>
          <span className="text-xl font-bold aurora-text tracking-tight text-white">ErrorLess Write</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          {authenticated && <NavLink to="/write">Write</NavLink>}
        </div>

        {/* Auth Button */}
        <div className="hidden md:block">
          {authenticated ? (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-400 transition-all duration-300 text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              className="px-5 py-2 rounded-xl aurora-bg text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/20 text-sm"
            >
              Get Started
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-xl text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-80 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-5 pb-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          {authenticated && <NavLink to="/write">Write</NavLink>}

          {authenticated ? (
            <button
              onClick={logout}
              className="px-5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={login}
              className="px-5 py-2 rounded-xl aurora-bg text-white text-sm font-medium"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative text-slate-400 hover:text-white font-medium text-sm transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-teal-400 after:transition-all after:duration-300 hover:after:w-full"
  >
    {children}
  </Link>
);

export default Navbar;