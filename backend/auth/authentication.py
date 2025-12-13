from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from pydantic import BaseModel
from jose import JWTError, jwt
from config.settings import settings
from models.database import User
from sqlalchemy.orm import Session
from db.session import get_db


# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security scheme for API endpoints
security = HTTPBearer()

# Secret key and algorithm
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: Optional[str] = None  # Changed from username to user_id


class UserCreate(BaseModel):
    email: str
    password: str
    # Removed learning_level, academic_background, robotics_experience as they don't exist in DB


class UserInDB(UserCreate):
    id: str  # Changed from user_id to id
    created_at: datetime


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db: Session, user_id: str):  # Changed parameter from username to user_id
    return db.query(User).filter(User.id == user_id).first()  # Changed User.id from User.username


def authenticate_user(db: Session, email: str, password: str):  # Changed parameter from username to email
    user = db.query(User).filter(User.email == email).first()  # Changed to filter by email
    if not user or not verify_password(password, user.hashed_password):  # Changed from password_hash to hashed_password
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")  # Changed from username to user_id
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id)  # Changed from username to user_id
    except JWTError:
        raise credentials_exception
    user = get_user(db, user_id=token_data.user_id)  # Changed from username to user_id
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    # Additional check can be added here if needed
    return current_user