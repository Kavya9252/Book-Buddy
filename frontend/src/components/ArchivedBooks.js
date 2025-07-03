// src/components/ArchivedBooks.js

import React from "react";
import API from "../services/api";
import "./ArchivedBooks.css";

export default function ArchivedBooks({ books, onUnarchive }) {
  const handleUnarchive = async (book) => {
    try {
      // Build the full payload so no fields get reset
      const updated = {
        title:       book.title,
        author:      book.author,
        genre:       book.genre,
        status:      book.status,
        notes:       book.notes || "",
        rating:      book.rating ?? 0,
        pages_read:  book.pages_read ?? 0,
        total_pages: book.total_pages ?? 0,
        archived:    false,
      };
      // Note the trailing slash here to match FastAPI route exactly
      await API.put(`/books/${book.id}`, updated);
      onUnarchive();
    } catch (err) {
      console.error("Unarchive error:", err.response?.data || err.message);
      alert("Failed to unarchive book.");
    }
  };

  return (
    <div className="archived-container">
      <h3>📁 Archived Books</h3>
      {books.length === 0 ? (
        <p>No archived books yet.</p>
      ) : (
        <ul className="archived-list">
          {books.map((book) => (
            <li key={book.id} className="archived-item">
              <strong>{book.title}</strong> by {book.author}
              <p>
                Status: {book.status} | Pages: {book.pages_read}/{book.total_pages}
              </p>
              <p>
                Notes: {book.notes || "—"} | Rating: {book.rating || "—"}/10
              </p>
              <button
                className="unarchive-btn"
                onClick={() => handleUnarchive(book)}
              >
                🔄 Unarchive
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
