from pydantic import BaseModel, Field
from typing import Optional

class BookBase(BaseModel):
    title: str
    author: str
    genre: str
    status: str 
    notes: Optional[str] = None
    rating: Optional[int] = Field(None, ge=0, le=10, description="Rating must be between 0 and 10")


class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True 

class BookCreate(BaseModel):
    title: str
    author: str
    genre: str
    status: str
    notes: Optional[str] = None
    rating: Optional[int] = None
    pages_read: int
    total_pages: int

class Book(BookCreate):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
