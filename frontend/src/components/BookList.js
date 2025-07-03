import React, { useState } from "react";
import API from "../services/api";
import "./BookList.css";

export default function BookList({ books, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
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

  const startEdit = (book) => {
    setEditingId(book.id);
    setForm({ ...book });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const updated = {
        title:       form.title,
        author:      form.author,
        genre:       form.genre,
        status:      form.status,
        notes:       form.notes || "",
        rating:      parseInt(form.rating, 10) || 0,
        pages_read:  parseInt(form.pages_read, 10) || 0,
        total_pages: parseInt(form.total_pages, 10) || 0,
        archived:    false,
      };
      await API.put(`/books/${id}/`, updated);
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert(" Update failed. Check console for details.");
    }
  };

  const handleArchive = async (book) => {
    try {
      const updated = {
        title:       book.title,
        author:      book.author,
        genre:       book.genre,
        status:      book.status,
        notes:       book.notes || "",
        rating:      book.rating ?? 0,
        pages_read:  book.pages_read ?? 0,
        total_pages: book.total_pages ?? 0,
        archived:    true,
      };
      await API.put(`/books/${book.id}/`, updated);
      onUpdate();
    } catch (err) {
      console.error("Archive error:", err);
      alert(" Failed to archive book.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}/`);
      onUpdate();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete book.");
    }
  };

  return (
    <div className="book-list-container">
      <h3>Your Books</h3>
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <strong>{book.title}</strong> by {book.author} — <em>{book.status}</em>
          <div className="book-meta">
            Progress: {book.pages_read}/{book.total_pages} | Notes: {book.notes || "—"} | Rating: {book.rating || "—"}/10
          </div>
          <div className="book-actions">
            <button onClick={() => startEdit(book)}>✏️ Update</button>
            <button onClick={() => handleArchive(book)}>📥 Archive</button>
            <button onClick={() => handleDelete(book.id)}>🗑️ Delete</button>
          </div>

          {editingId === book.id && (
            <div className="edit-form">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
              />
              <input
                name="genre"
                value={form.genre}
                onChange={handleChange}
                placeholder="Genre"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
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
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Notes"
              />
              <input
                name="rating"
                type="number"
                min="0"
                max="10"
                value={form.rating}
                onChange={handleChange}
                placeholder="Rating (0–10)"
              />
              <button onClick={() => handleUpdate(book.id)}>💾 Save</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
