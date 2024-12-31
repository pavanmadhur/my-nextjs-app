"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState({
    username: "",
    password: "",
  });
  const customToastStyle = {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "10px",
    padding: "10px",
    fontFamily: "'Times New Roman', Times, serif",
    fontSize: "16px",
    textAlign: "center",
    lineHeight: "1.5",
    border: "1px solid #555",
  };
  const submitHandler = async () => {
    try {
      let newErrors = {};
      if (username === "") newErrors.username = "Enter Your username";
      if (password === "") newErrors.password = "Enter your password";
  
      setError(newErrors);
      if (Object.keys(newErrors).length === 0) {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/v1/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setLoading(false);
        console.log("Login response:", data);
  
        if (data.token) {
          localStorage.setItem("auth", data.token);
          console.log("Token stored in localStorage:", data.token);
          router.push("/admin/contacts");
        } else {
          toast.error(data.message || "Invalid credentials");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      toast.error("Failed to connect to the server. Please try again.");
    }
  };


  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#F3F4F6]">
      {/* Outer Container */}
      <div className="flex flex-col items-center w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-300">
        {/* Box Title */}
        <div className="w-full text-center border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Login Details</h1>
        </div>
  
        {/* Login Form */}
        <div className="w-full space-y-4">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError({ ...error, username: "" });
              }}
              className={`w-full p-3 rounded-md text-sm border ${
                error.username ? "border-red-500" : "border-gray-300"
              } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {error.username && (
              <p className="text-red-500 text-xs mt-1">{error.username}</p>
            )}
          </div>
  
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, password: "" });
              }}
              className={`w-full p-3 rounded-md text-sm border ${
                error.password ? "border-red-500" : "border-gray-300"
              } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
            onClick={submitHandler}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
