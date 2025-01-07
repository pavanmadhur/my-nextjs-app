import React from "react";

export default function Header() {
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
      <nav
        style={{
          display: "flex",
          gap: "1.5rem", // Space between links
        }}
      >
        <a
          href="#MicroConvert"
          style={{
            fontSize: "16px", // Adjusted font size for navigation links
            color: "white",
            textDecoration: "none",
            fontWeight: "500", // Medium font weight for links
            cursor: "pointer",
            transition: "color 0.3s",
          }}
        >
          Features
        </a>
        <a
          href="#pricing"
          style={{
            fontSize: "16px", // Adjusted font size for navigation links
            color: "white",
            textDecoration: "none",
            fontWeight: "500", // Medium font weight for links
            cursor: "pointer",
            transition: "color 0.3s",
            margin: "0 0 0 16px",
          }}
        >
          Pricing
        </a>
        <a
          href="#contact"
          style={{
            fontSize: "16px", // Adjusted font size for navigation links
            color: "white",
            textDecoration: "none",
            fontWeight: "500", // Medium font weight for links
            cursor: "pointer",
            transition: "color 0.3s",
            margin: "0 0 0 16px",
          }}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
