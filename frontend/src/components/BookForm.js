  import React, { useState } from "react";
  import API from "../services/api";
  import "./BookForm.css";

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
      <div className="book-form-container">
        <h3 className="form-title">Add New Book</h3>
        <form onSubmit={handleSubmit} className="compact-form">
          <div className="form-row">
            <input 
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="form-input"
            />
            <input 
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author"
              required
              className="form-input"
            />
          </div>
          <div className="form-row">
            <input 
              name="genre"
              value={form.genre}
              onChange={handleChange}
              placeholder="Genre"
              required
              className="form-input"
            />
            <select 
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-input"
            >
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
            </select>
          </div>
          <div className="form-row triple">
            <input 
              name="rating"
              type="number"
              value={form.rating}
              onChange={handleChange}
              placeholder="Rate"
              min="0"
              max="5"
              className="form-input small-input"
            />
            <input 
              name="pages_read"
              type="number"
              value={form.pages_read}
              onChange={handleChange}
              placeholder="Pages Read"
              required
              className="form-input"
            />
            <input 
              name="total_pages"
              type="number"
              value={form.total_pages}
              onChange={handleChange}
              placeholder="Total Pages"
              required
              className="form-input"
            />
          </div>
          <div className="form-row single">
            <textarea 
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="form-textarea"
            />
          </div>
          <button type="submit" className="submit-button">Add Book</button>
        </form>
      </div>
    );
  }