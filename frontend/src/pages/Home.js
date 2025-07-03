import React, { useEffect, useState } from "react";
import API from "../services/api";
import AddBook from "../components/AddBook";
import BookList from "../components/BookList";
import ArchivedBooks from "../components/ArchivedBooks";
import Stats from "../components/Stats"; // ⬅ make sure this file exists

export default function Home() {
  const [books, setBooks] = useState([]);
  const [archivedBooks, setArchivedBooks] = useState([]);
  const [view, setView] = useState("books"); // "books", "archived", or "stats"

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Please log in.");
    }
  };

  const fetchArchived = async () => {
    try {
      const res = await API.get("/books/archived");
      setArchivedBooks(res.data);
    } catch (err) {
      console.error("Archived fetch error:", err);
      alert("❌ Could not fetch archived books.");
    }
  };

  useEffect(() => {
    if (view === "books") fetchBooks();
    if (view === "archived") fetchArchived();
  }, [view]);

  return (
    <div>
      <h2>📚 Welcome to Book Buddy</h2>

      <AddBook onAdd={fetchBooks} />

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setView("books")}>📘 My Books</button>
        <button onClick={() => setView("archived")}>📁 Archived</button>
        <button onClick={() => setView("stats")}>📊 Stats</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {view === "books" && <BookList books={books} onUpdate={fetchBooks} />}
        {view === "archived" && (
          <ArchivedBooks books={archivedBooks} onUnarchive={fetchArchived} />
        )}
        {view === "stats" && <Stats />}
      </div>
    </div>
  );
}
