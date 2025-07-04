  import React, { useEffect, useState } from "react";
  import API from "../services/api";
  import "./Stats.css";

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
      <div className="stats-dashboard">
        <h3>📊 Your Reading Dashboard</h3>
        <div className="stats-grid">
          <div className="card">
            <h4>Total Books</h4>
            <p className="stat-number">{stats.total_books}</p>
          </div>
          <div className="card">
            <h4>Completed</h4>
            <p className="stat-number">{stats.completed}</p>
          </div>
          <div className="card">
            <h4>Reading</h4>
            <p className="stat-number">{stats.reading}</p>
          </div>
          <div className="card">
            <h4>Wishlist</h4>
            <p className="stat-number">{stats.wishlist}</p>
          </div>
          <div className="card wide">
            <h4>Overall Completion</h4>
            <div className="progress-bar">
              <div
                className="fill"
                style={{ width: `${stats.percent_completed}%` }}
              />
            </div>
            <p>{stats.percent_completed}%</p>
          </div>
        </div>

        <div className="genre-section">
          <h4>Books by Genre</h4>
          <div className="genre-grid">
            {Object.entries(stats.books_by_genre).map(([genre, count]) => (
              <div key={genre} className="card small">
                <p className="genre-name">{genre}</p>
                <p className="stat-number">{count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="progress-section">
          <h4>Per‑Book Progress</h4>
          <ul className="progress-list">
            {stats.book_progress.map((book) => (
              <li key={book.id}>
                <span className="book-title">{book.title}</span>
                <div className="progress-bar small">
                  <div
                    className="fill"
                    style={{ width: `${book.percent_completed}%` }}
                  />
                </div>
                <span>{book.percent_completed}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
