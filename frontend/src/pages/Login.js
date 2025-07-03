import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css"; // Make sure to create this CSS file

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("username", form.username);
      params.append("password", form.password);

      const res = await axios.post("http://127.0.0.1:8000/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/books");
    } catch (err) {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>🔐 Login to Book Buddy</h2>
        <input
          name="username"
          placeholder="👤 Username"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="🔒 Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
