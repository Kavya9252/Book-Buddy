from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter(prefix="/books", tags=["Books"])

# Create Book (Protected)
@router.post("/", response_model=schemas.Book)
def create_book(
    book: schemas.BookCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_book = models.Book(**book.dict(), owner_id=current_user.id)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

# Get All Books for Current User (with optional filter)
@router.get("/", response_model=List[schemas.Book])
def get_books(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return db.query(models.Book).filter(
        models.Book.owner_id == current_user.id,
        models.Book.archived == False
    ).all()


# Delete Book (Owned by User)
@router.delete("/{book_id}")
def delete_book(
    book_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    book = db.query(models.Book).filter(
        models.Book.id == book_id, models.Book.owner_id == current_user.id
    ).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(book)
    db.commit()
    return {"message": "Book deleted"}

# Get Reading Stats (User-specific)
@router.get("/stats/")
def get_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    books = db.query(models.Book).filter(models.Book.owner_id == current_user.id).all()
    total = len(books)
    completed = len([b for b in books if b.status == "completed"])
    reading = len([b for b in books if b.status == "reading"])
    wishlist = len([b for b in books if b.status == "wishlist"])

    genre_count = {}
    book_progress = []
    for b in books:
        genre_count[b.genre] = genre_count.get(b.genre, 0) + 1
        percent = round((b.pages_read / b.total_pages) * 100, 2) if b.total_pages else 0
        book_progress.append({
            "id": b.id,
            "title": b.title,
            "percent_completed": percent
        })

    percent_completed = (completed / total * 100) if total else 0

    return {
        "total_books": total,
        "completed": completed,
        "reading": reading,
        "wishlist": wishlist,
        "percent_completed": round(percent_completed, 2),
        "books_by_genre": genre_count,
        "book_progress": book_progress
    }

@router.get("/archived", response_model=List[schemas.Book])
def get_archived_books(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    return db.query(models.Book).filter(
        models.Book.owner_id == current_user.id,
        models.Book.archived == True
    ).all()
    
@router.put("/{book_id}", response_model=schemas.Book)
def update_book(
    book_id: int,
    updated: schemas.BookCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    book = db.query(models.Book).filter(
        models.Book.id == book_id,
        models.Book.owner_id == current_user.id
    ).first()

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    for field, value in updated.dict().items():
        setattr(book, field, value)

    db.commit()
    db.refresh(book)
    return book
