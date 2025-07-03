import React, { useState } from "react";
import API from "../services/api";
import "./AddBook.css"; // This should point to the CSS that includes .book-form

export default function AddBook({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "reading",
    notes: "",
    rating: 0,
    pages_read: 0,
    total_pages: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        rating: parseInt(form.rating) || 0,
        pages_read: parseInt(form.pages_read) || 0,
        total_pages: parseInt(form.total_pages) || 0,
      };
      await API.post("/books/", payload);
      alert("✅ Book added!");
      onAdd();
      setForm({
        title: "",
        author: "",
        genre: "",
        status: "reading",
        notes: "",
        rating: 0,
        pages_read: 0,
        total_pages: 0,
      });
    } catch (err) {
      console.error("Create error:", err);
      alert("❌ Failed to add book. Make sure you're logged in.");
    }
  };

  return (
    <div className="book-form-container">
      <h3>Add New Book</h3>
      <form className="book-form" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
          <option value="wishlist">Wishlist</option>
        </select>
        <input
          name="pages_read"
          type="number"
          value={form.pages_read}
          onChange={handleChange}
          placeholder="Pages Read"
        />
        <input
          name="total_pages"
          type="number"
          value={form.total_pages}
          onChange={handleChange}
          placeholder="Total Pages"
        />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
        <input
          name="rating"
          type="number"
          min="0"
          max="10"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (0–10)"
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
