import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    full_name: "",
    profile_picture: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    
    setFormData((prevData) => ({
      ...prevData,
      full_name: `${prevData.last_name} ${prevData.first_name}`,
    }));
        try {
      const res = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.detail || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Register
        </h1>

        <input
          className="border p-2 mb-3 w-full rounded"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
        />
        {/* <input
          className="border p-2 mb-3 w-full rounded"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
        /> */}
        {/* <input
          className="border p-2 mb-4 w-full rounded"
          name="profile_picture"
          placeholder="Profile Picture URL"
          value={formData.profile_picture}
          onChange={handleChange}
        /> */}

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
