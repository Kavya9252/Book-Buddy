// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";              
import Register from "./pages/Register";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />          
        <Route path="/login" element={<Login />} />      
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
