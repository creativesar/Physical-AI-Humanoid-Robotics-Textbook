from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from typing import Optional
import secrets

from .. import models, schemas
from ..config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    """Get a user by email (sync)."""
    return db.query(models.User).filter(models.User.email == email).first()


async def get_user_by_email_async(db: AsyncSession, email: str) -> Optional[models.User]:
    """Get a user by email (async)."""
    result = await db.execute(select(models.User).filter(models.User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id_async(db: AsyncSession, user_id: int) -> Optional[models.User]:
    """Get a user by ID (async)."""
    result = await db.execute(select(models.User).filter(models.User.id == user_id))
    return result.scalar_one_or_none()


def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    """Create a new user (sync)."""
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create default preferences
    preferences = models.UserPreference(user_id=db_user.id)
    db.add(preferences)
    db.commit()
    
    return db_user


async def create_user_async(db: AsyncSession, user: schemas.UserCreate) -> models.User:
    """Create a new user (async)."""
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    
    # Create default preferences
    preferences = models.UserPreference(user_id=db_user.id)
    db.add(preferences)
    await db.commit()
    
    return db_user


def authenticate_user(db: Session, email: str, password: str) -> Optional[models.User]:
    """Authenticate a user with email and password."""
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
    
    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


def create_refresh_token(db: Session, user_id: int) -> str:
    """Create a refresh token and store it in the database."""
    token = secrets.token_urlsafe(64)
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days)
    
    db_token = models.RefreshToken(
        token=token,
        user_id=user_id,
        expires_at=expires_at
    )
    db.add(db_token)
    db.commit()
    
    return token


def verify_refresh_token(db: Session, token: str) -> Optional[models.User]:
    """Verify a refresh token and return the associated user."""
    db_token = db.query(models.RefreshToken).filter(
        models.RefreshToken.token == token,
        models.RefreshToken.revoked == False,
        models.RefreshToken.expires_at > datetime.now(timezone.utc)
    ).first()
    
    if not db_token:
        return None
    
    return db_token.user


def revoke_refresh_token(db: Session, token: str) -> bool:
    """Revoke a refresh token."""
    db_token = db.query(models.RefreshToken).filter(
        models.RefreshToken.token == token
    ).first()
    
    if db_token:
        db_token.revoked = True
        db.commit()
        return True
    return False


def revoke_all_user_tokens(db: Session, user_id: int) -> int:
    """Revoke all refresh tokens for a user. Returns count of revoked tokens."""
    count = db.query(models.RefreshToken).filter(
        models.RefreshToken.user_id == user_id,
        models.RefreshToken.revoked == False
    ).update({"revoked": True})
    db.commit()
    return count


def decode_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        return payload
    except JWTError:
        return None


def create_tokens(db: Session, user: models.User) -> schemas.TokenResponse:
    """Create both access and refresh tokens for a user."""
    access_token = create_access_token(data={"sub": user.email, "user_id": user.id})
    refresh_token = create_refresh_token(db, user.id)
    
    return schemas.TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        expires_in=settings.access_token_expire_minutes * 60
    )
