from pydantic import BaseModel, Field
from typing import Optional

# Base Book schema
class BookBase(BaseModel):
    title: str
    author: str
    genre: str
    status: str
    notes: Optional[str] = ""
    rating: Optional[int] = Field(0, ge=0, le=10, description="Rating must be between 0 and 10")
    pages_read: int = 0
    total_pages: int = 0
    archived: Optional[bool] = False

# User registration
class UserCreate(BaseModel):
    username: str
    password: str

# Response for user
class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

# Request body to create a book
class BookCreate(BookBase):
    pass

# Response schema for Book with ID and owner_id
class Book(BookBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
        
class BookUpdate(BaseModel):
    title: Optional[str]
    author: Optional[str]
    genre: Optional[str]
    status: Optional[str]
    notes: Optional[str]
    rating: Optional[int]
    pages_read: Optional[int]
    total_pages: Optional[int]
    archived: Optional[bool]

    class Config:
        from_attributes = True 