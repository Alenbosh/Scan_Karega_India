from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr
from datetime import datetime

# ── DB Document ──────────────────────────────────────────────


class User(Document):
    email: Indexed(EmailStr, unique=True)
    full_name: str
    hashed_password: str
    role: str = "user"
    created_at: datetime = datetime.utcnow()

    class Settings:
        name = "users"

# ── Request/Response Schemas ─────────────────────────────────


class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    email: str
    full_name: str
    role: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
