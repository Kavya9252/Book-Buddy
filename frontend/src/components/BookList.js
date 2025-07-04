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
    rating: "",
    pages_read: "",
    total_pages: "",
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
        rating: form.rating ? parseFloat(form.rating) : null,
        pages_read: form.pages_read ? parseInt(form.pages_read) : null,
        total_pages: form.total_pages ? parseInt(form.total_pages) : null,
        archived: false,
      };
      await API.put(`/books/${id}/`, updated);
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Update failed.");
    }
  };

  const handleArchive = async (book) => {
    try {
      const updated = { ...book, archived: true };
      await API.put(`/books/${book.id}/`, updated);
      onUpdate();
    } catch (err) {
      console.error("Archive error:", err);
      alert("Failed to archive book.");
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
    <div className="book-table-container">
      <h3>📚 Your Book List</h3>
      <table className="book-table">
        <thead>
          <tr>
            <th>📖 Title</th>
            <th>✍️ Author</th>
            <th>🏷️ Genre</th>
            <th>📄 Pages</th>
            <th>📝 Notes</th>
            <th>⭐ Rating</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) =>
            editingId === book.id ? (
              <tr key={book.id}>
                <td><input name="title" value={form.title} onChange={handleChange} /></td>
                <td><input name="author" value={form.author} onChange={handleChange} /></td>
                <td><input name="genre" value={form.genre} onChange={handleChange} /></td>
                <td>
                  <input name="pages_read" type="number" value={form.pages_read} onChange={handleChange} style={{ width: "40px" }} /> /
                  <input name="total_pages" type="number" value={form.total_pages} onChange={handleChange} style={{ width: "40px" }} />
                </td>
                <td><textarea name="notes" value={form.notes} onChange={handleChange} /></td>
                <td><input name="rating" type="number" value={form.rating} onChange={handleChange} style={{ width: "50px" }} /></td>
                <td>
                  <button onClick={() => handleUpdate(book.id)}>💾 Save</button>
                </td>
              </tr>
            ) : (
              <tr key={book.id}>
                <td><em>{book.title}</em></td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.pages_read ?? "—"} / {book.total_pages ?? "—"}</td>
                <td>{book.notes || "—"}</td>
                <td>{book.rating || "—"}</td>
                <td>
                  <button onClick={() => startEdit(book)}>✏️</button>
                  <button onClick={() => handleArchive(book)}>📥</button>
                  <button onClick={() => handleDelete(book.id)}>🗑️</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
