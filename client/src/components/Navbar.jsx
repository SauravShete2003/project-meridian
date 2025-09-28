import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Features", to: "/#features" },
    { name: "Agents", to: "/agents" },
    { name: "Upload", to: "/upload" },
  ];

  return (
    <nav className="w-full bg-white/70 backdrop-blur-md shadow-md fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          className="text-2xl font-bold tracking-tight text-[var(--accent)]"
          to="/dashboard"
        >
          Meridian
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-[var(--accent)] font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white shadow hover:shadow-lg transition transform hover:-translate-y-0.5 text-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                open
                  ? "M6 18L18 6M6 6l12 12" // X (close)
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-6 pb-4 bg-white/90 backdrop-blur-md shadow-md">
          <div className="flex flex-col gap-3 mt-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`py-2 text-sm transition rounded ${
                  location.pathname === link.to
                    ? "text-[var(--accent)] font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-center shadow hover:shadow-lg transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}