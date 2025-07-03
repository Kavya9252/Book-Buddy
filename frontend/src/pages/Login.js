import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

const HomeLanding = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("username", form.username);
      params.append("password", form.password);

      const res = await API.post("/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/books");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="header-left">
          <button className="header-btn register-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
        <div className="header-right">
          <h1 className="logo">📚 Book Buddy</h1>
        </div>
      </header>

      <div className="login-banner-row">
        <div className="banner-left">
          <h2>Embark on Your Reading Adventure 📖</h2>
          <p>Organize your books, track your progress, and achieve your reading goals with ease!</p>
          <button className="cta-btn" onClick={() => navigate("/register")}>Start Reading Now</button>
        </div>

        <div className="banner-right">
          <h2>Login to Book Buddy</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit" className="submit-btn">Login</button>
          </form>
        </div>
      </div>

      <section className="about-section">
        <h2>About Book Buddy</h2>
        <p>
          Book Buddy is your ultimate companion for managing your reading journey. Add books, 
          track your progress, write notes, rate your reads, and explore detailed statistics like 
          completion rates and genre insights.
        </p>
      </section>

      <section className="testimonials-section">
        <h2>What Our Readers Love 💬</h2>
        <div className="testimonial-card">“Book Buddy transformed my reading habits!” – Arjun R.</div>
        <div className="testimonial-card">“I hit my reading goals for the first time!” – Sanya M.</div>
        <div className="testimonial-card">“Sleek, intuitive, and a joy to use.” – Kavya D.</div>
      </section>
    </div>
  );
};

export default HomeLanding;
