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
        background: "linear-gradient(to right, #003973, #0074d9)", // Gradient background
        fontWeight: "bold",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
        color: "white",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "24px", // Adjusted font size for the logo
          fontWeight: "800", // Bold font weight for the logo
        }}
      >
        MicroConvert
      </h1>

      {/* Hamburger Menu */}
      <div
        style={{
          display: "none", // Hidden by default
          cursor: "pointer",
          fontSize: "24px",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Navigation Links */}
      <nav
        style={{
          display: menuOpen ? "block" : "flex", // Flex for larger screens, block for mobile
          flexDirection: menuOpen ? "column" : "row", // Column layout for mobile
          gap: "1.5rem", // Space between links
        }}
      >
        <a
          href="#MicroConvert"
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
            margin: menuOpen ? "8px 0" : "0 0 0 16px", // Adjust margin for mobile
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
            margin: menuOpen ? "8px 0" : "0 0 0 16px", // Adjust margin for mobile
          }}
        >
          Contact
        </a>
      </nav>

      {/* Styles for Responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            nav {
              display: ${menuOpen ? "block" : "none"}; // Hide nav by default for small screens
              position: absolute;
              top: 60px; // Position below the header
              right: 16px;
              background: #003973; // Match the header background
              padding: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            div {
              display: block; // Show hamburger menu on small screens
            }
          }
        `}
      </style>
    </header>
  );
}
