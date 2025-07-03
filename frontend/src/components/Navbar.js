import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/stats">Stats</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
