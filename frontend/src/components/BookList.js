import React, { useState } from "react";
import API from "../services/api";

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
        ...form,
        rating: parseInt(form.rating) || 0,
        pages_read: parseInt(form.pages_read) || 0,
        total_pages: parseInt(form.total_pages) || 0,
        archived: false, // keep it unarchived when updating
      };
      await API.put(`/books/${id}`, updated);
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("❌ Update failed. Check your input and make sure you're logged in.");
    }
  };

  const handleArchive = async (id) => {
    try {
      await API.put(`/books/${id}`, { ...form, archived: true });
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error("Archive error:", err);
      alert("❌ Failed to archive.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      onUpdate();
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete.");
    }
  };

  return (
    <div>
      <h3>Your Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <strong>{book.title}</strong> by {book.author} — {book.status}
            <br />
            Progress: {book.pages_read}/{book.total_pages}
            <br />
            Notes: {book.notes || "—"} | Rating: {book.rating || "—"}
            <br />
            <button onClick={() => startEdit(book)}>✏️ Update</button>
            <button onClick={() => handleArchive(book.id)}>📥 Archive</button>
            <button onClick={() => handleDelete(book.id)}>🗑️ Delete</button>

            {editingId === book.id && (
              <div style={{ marginTop: "10px" }}>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
                <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
                <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
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
          </li>
        ))}
      </ul>
    </div>
  );
}
