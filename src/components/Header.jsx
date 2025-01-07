"use client";

import React, { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        background: "linear-gradient(to right, #003973, #0074d9)",
        color: "white",
        position: "relative", // Necessary for dropdown positioning
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h1
        style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: "800",
        }}
      >
        MicroConvert
      </h1>

      {/* Hamburger Menu */}
      <div
        style={{
          display: "none", // Default hidden for larger screens
          cursor: "pointer",
          fontSize: "24px",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger-menu"
      >
        ☰
      </div>

      {/* Navigation Links */}
      <nav
        style={{
          display: menuOpen ? "block" : "flex",
          flexDirection: menuOpen ? "column" : "row",
          gap: "1.5rem",
          position: menuOpen ? "absolute" : "static",
          top: menuOpen ? "60px" : "auto",
          right: menuOpen ? "16px" : "auto",
          background: menuOpen ? "#003973" : "transparent",
          padding: menuOpen ? "16px" : "0",
          boxShadow: menuOpen ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
          borderRadius: menuOpen ? "8px" : "none",
        }}
        className="nav-links"
      >
        <a
          href="#features"
          style={{
            fontSize: "16px",
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
            cursor: "pointer",
            transition: "color 0.3s",
          }}
        >
          Features
        </a>
        <a
          href="#pricing"
          style={{
            fontSize: "16px",
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
            cursor: "pointer",
            transition: "color 0.3s",
          }}
        >
          Pricing
        </a>
        <a
          href="#contact"
          style={{
            fontSize: "16px",
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
            cursor: "pointer",
            transition: "color 0.3s",
          }}
        >
          Contact
        </a>
      </nav>

      {/* Media Query */}
      <style>
        {`
          @media (max-width: 768px) {
            .hamburger-menu {
              display: block;
            }
            .nav-links {
              display: ${menuOpen ? "block" : "none"};
            }
          }
        `}
      </style>
    </header>
  );
}
