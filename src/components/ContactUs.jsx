"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required.");
      return;
    }
  
    const token = localStorage.getItem("auth");  // Get the token from localStorage
  
    try {
      const response = await fetch('https://contact-us-api-1.onrender.com/api/v1/contacts/addcontact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add the token here if required
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast.success("Message saved! We will contact you soon.");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        toast.error(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    }
  };
  
  

  return (
    <section
      id="contact"
      style={{
        padding: "24px",
        backgroundColor: "#f5f7fa",
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
            marginBottom: "20px",
          }}
        >
          Contact Us
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
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
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
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
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
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
      <ToastContainer />
    </section>
  );
}
