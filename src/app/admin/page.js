"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Ensure this is used
  const router = useRouter();

  const submitHandler = async () => {
    try {
      if (username === "" || password === "") {
        toast.error("Please fill in all fields.");
        return;
      }

      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/v1/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);

      if (data.success === true) {
        localStorage.setItem("auth", data.token);
        router.push("/admin/contacts");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    
  };

  return (
    <div
      className="flex justify-center items-center w-screen h-screen"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#F3F4F6",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "14px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            lineHeight: "1.2",
            color: "#000",
            marginBottom: "20px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Admin Login
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="username"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "90%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "90%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          onClick={submitHandler}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "14px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
