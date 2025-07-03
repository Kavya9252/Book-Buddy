import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form); 
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Try a different username.");
    }
  };

return (
  <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Create a Book Buddy Account</h2>
      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
  </div>
);

}
