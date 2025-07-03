import React from "react";
import API from "../services/api";

export default function ArchivedBooks({ books, onUnarchive }) {
  const handleUnarchive = async (book) => {
    try {
      await API.put(`/books/${book.id}`, { ...book, archived: false });
      onUnarchive(); // Refresh list from parent
    } catch (err) {
      console.error("Unarchive error:", err);
      alert("❌ Failed to unarchive book.");
    }
  };

  return (
    <div>
      <h3>📁 Archived Books</h3>
      {books.length === 0 ? (
        <p>No archived books yet.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} style={{ marginBottom: "15px" }}>
              <strong>{book.title}</strong> by {book.author}
              <br />
              Status: {book.status} | Pages: {book.pages_read}/{book.total_pages}
              <br />
              Notes: {book.notes || "—"} | Rating: {book.rating || "—"}
              <br />
              <button onClick={() => handleUnarchive(book)}>Unarchive</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
