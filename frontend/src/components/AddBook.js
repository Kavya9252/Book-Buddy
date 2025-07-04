import React, { useState } from "react";
import API from "../services/api";
import "./AddBook.css";

export default function AddBook({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    status: "reading",
    notes: "",
    rating: "",
    pages_read: "",
    total_pages: "",
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        rating: form.rating ? parseFloat(form.rating) : null,
        pages_read: form.pages_read ? parseInt(form.pages_read) : null,
        total_pages: form.total_pages ? parseInt(form.total_pages) : null,
      };
      await API.post("/books/", payload);
      onAdd();
      setForm({
        title: "",
        author: "",
        genre: "",
        status: "reading",
        notes: "",
        rating: "",
        pages_read: "",
        total_pages: "",
      });
    } catch {
      alert("Failed to add book. Are you logged in?");
    }
  };

  return (
    <div className="book-form-container">
      <h3>➕ Add New Book</h3>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Book title"
            required
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author name"
            required
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="e.g. Fiction, Sci‑Fi"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>

        <div className="form-group">
          <label>Pages Read</label>
          <input
            name="pages_read"
            type="number"
            min="0"
            value={form.pages_read}
            onChange={handleChange}
            placeholder="e.g. 120"
          />
        </div>

        <div className="form-group">
          <label>Total Pages</label>
          <input
            name="total_pages"
            type="number"
            min="0"
            value={form.total_pages}
            onChange={handleChange}
            placeholder="e.g. 350"
          />
        </div>

        <div className="form-group full-width">
          <label>Notes</label>
          <textarea
            name="notes"
            rows="2"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any thoughts…"
          />
        </div>

        <div className="form-group">
          <label>Rating (0–10)</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="10"
            value={form.rating}
            onChange={handleChange}
            placeholder="e.g. 8"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Book
        </button>
      </form>
    </div>
  );
}
