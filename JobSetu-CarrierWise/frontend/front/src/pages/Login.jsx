import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Function to get the CSRF token from cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const csrftoken = getCookie("csrftoken"); // Retrieve the CSRF token

      const res = await fetch("http://localhost:8000/api/login_user_from_api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken, // Include CSRF token in request headers
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      
      if (data.access) {
        localStorage.setItem("token", data.access); // Save token
        localStorage.setItem("username", username); // Save username
        navigate("/"); // Navigate to home after successful login
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        className="border p-2 mb-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="mt-2 text-sm">
        Don't have an account?{" "}
        <a className="text-blue-600" href="/register">
          Register
        </a>
      </p>
    </div>
  );
}

export default Login;
