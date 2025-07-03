import React, { useState } from "react";
import API from "../services/api";

export default function BookForm({ fetchBooks }) {
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/books/", form);
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
      fetchBooks();
    } catch (err) {
      alert("Failed to add book. Make sure you're logged in.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
        <option value="wishlist">Wishlist</option>
      </select>
      <input name="rating" type="number" value={form.rating} onChange={handleChange} placeholder="Rating" />
      <input name="pages_read" type="number" value={form.pages_read} onChange={handleChange} placeholder="Pages Read" required />
      <input name="total_pages" type="number" value={form.total_pages} onChange={handleChange} placeholder="Total Pages" required />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit">Add Book</button>
    </form>
  );
}

