import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Stats.css"; // ✅ Add this line

export default function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/books/stats/");
        setStats(res.data);
      } catch (err) {
        console.error("Stats error:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="stats-container">
      <h3>📊 Reading Stats</h3>
      <p>Total Books: {stats.total_books}</p>
      <p>Completed: {stats.completed}</p>
      <p>Reading: {stats.reading}</p>
      <p>Wishlist: {stats.wishlist}</p>
      <p>Overall Completion: {stats.percent_completed}%</p>
      <h4>Books by Genre:</h4>
      <ul>
        {Object.entries(stats.books_by_genre).map(([genre, count]) => (
          <li key={genre}>{genre}: {count}</li>
        ))}
      </ul>
      <h4>Per-Book Progress:</h4>
      <ul>
        {stats.book_progress.map(book => (
          <li key={book.id}>
            {book.title} — {book.percent_completed}%
          </li>
        ))}
      </ul>
    </div>
  );
}
