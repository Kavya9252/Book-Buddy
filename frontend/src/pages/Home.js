import React, { useEffect, useState } from "react";
import API from "../services/api";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import ArchivedBooks from "../components/ArchivedBooks";
import Stats from "../components/Stats";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [archivedBooks, setArchivedBooks] = useState([]);
  const [view, setView] = useState("books");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchUsername = async () => {
    try {
      const res = await API.get("/users/me");
      setUsername(res.data.username);
    } catch (err) {
      console.error("Username fetch error:", err);
    }
  };

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
      alert("Could not fetch archived books.");
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (view === "books") fetchBooks();
    if (view === "archived") fetchArchived();
  }, [view]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h2>📚 Welcome to Book Buddy{username ? `, ${username}` : ""}!</h2>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </header>

      <section className="add-book-section">
        <BookForm onAdd={fetchBooks} />
      </section>

      <nav className="view-buttons">
        <button onClick={() => setView("books")}>📘 My Books</button>
        <button onClick={() => setView("archived")}>📁 Archived</button>
        <button onClick={() => setView("stats")}>📊 Stats</button>
      </nav>

      <section className="view-content">
        {view === "books" && <BookList books={books} onUpdate={fetchBooks} />}
        {view === "archived" && (
          <ArchivedBooks books={archivedBooks} onUnarchive={fetchArchived} />
        )}
        {view === "stats" && <Stats />}
      </section>
    </div>
  );
}
