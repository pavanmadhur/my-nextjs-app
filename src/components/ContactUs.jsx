"use client";
import React from "react"

export default function ContactUs () {

return (
<section
  id="contact"
  style={{
    padding: "24px",
    backgroundColor: "#f5f7fa", // Added background color for better visuals
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  }}
>
  <div
    style={{
      backgroundColor: "#fff",
      padding: "24px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "1000px",
      textAlign: "center",
    }}
  >
    <h1
      className="text-center font-bold mb-4"
      style={{
        fontSize: "30px",
        lineHeight: "1.2",
        color: "#000",
        marginBottom: "20px", // Added spacing below the title
      }}
    >
      Contact Us
    </h1>
    <form>
      <input
        type="text"
        placeholder="Name"
        style={{
          width: "90%",
          padding: "10px",
          marginBottom: "15px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <input
        type="email"
        placeholder="Email"
        style={{
          width: "90%",
          padding: "10px",
          marginBottom: "15px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <textarea
        placeholder="Message"
        style={{
          width: "90%",
          padding: "10px",
          marginBottom: "15px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          resize: "none",
          height: "100px",
        }}
      />
      <button
        type="submit"
        style={{
          width: "90%",
          padding: "10px",
          fontSize: "16px",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send Message
      </button>
    </form>
  </div>
</section>
);
}
