📚 Book Buddy

Book Buddy is a full-stack web application to help users track their reading progress. It allows users to add books, update progress, archive completed reads, and view personalized reading statistics — all from a clean and user-friendly dashboard.

👩‍💻 Developed By
**Kavya Devarajan**  

## Setup Instructions

## Backend Setup (FastAPI + PostgreSQL)

1. Open terminal and navigate to the backend folder:
   ```bash
   cd backend

2.Create a virtual environment:
  python -m venv venv
  venv\Scripts\activate  

3.Install dependencies:
  pip install -r requirements.txt

4.Create a PostgreSQL database (e.g., bookbuddy) and update your .env or config as needed.

5.Run migrations and start backend:
  alembic upgrade head
  uvicorn main:app --reload
  
API runs at: http://127.0.0.1:8000

##  Frontend Setup (React)
1. Open new terminal and navigate to frontend:
   cd frontend
   npm install
   npm start
   Frontend runs at: http://localhost:3000

## Features

## Authentication
  Register and login using JWT
  Secure access to personal book list

## Book Management
  Add books with:
  Title, Author, Genre, Pages Read, Total Pages
  Notes and Ratings
  Edit/update progress
  Archive or delete books

## Statistics Dashboard
  Total books, reading/completed/wishlist
  Genre-wise distribution
  Per-book reading % progress

## Clean UI
  Landing page with login/register
  Dashboard view with tabs for books, archive, and stats
  CSS styled responsive layout

