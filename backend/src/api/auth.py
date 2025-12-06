"""
Authentication API endpoints.

Provides:
- User signup
- User signin with access + refresh tokens
- Token refresh
- Logout (token revocation)
- Current user info
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Optional

from .. import models, schemas
from ..services import auth_service
from ..database import get_db

router = APIRouter()
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> models.User:
    """Dependency to get the current authenticated user."""
    token = credentials.credentials
    payload = auth_service.decode_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    user = auth_service.get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is disabled"
        )
    
    return user


def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False)),
    db: Session = Depends(get_db)
) -> Optional[models.User]:
    """Dependency to optionally get the current user (for public endpoints)."""
    if not credentials:
        return None
    
    try:
        return get_current_user(credentials, db)
    except HTTPException:
        return None


@router.post("/signup", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
    db_user = auth_service.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return auth_service.create_user(db=db, user=user)


@router.post("/signin", response_model=schemas.TokenResponse)
def signin(form_data: schemas.OAuth2PasswordRequestForm, db: Session = Depends(get_db)):
    """Sign in and receive access + refresh tokens."""
    user = auth_service.authenticate_user(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return auth_service.create_tokens(db, user)


@router.post("/refresh", response_model=schemas.TokenResponse)
def refresh_token(request: schemas.TokenRefreshRequest, db: Session = Depends(get_db)):
    """Refresh access token using a valid refresh token."""
    user = auth_service.verify_refresh_token(db, request.refresh_token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )
    
    # Revoke old token and create new ones
    auth_service.revoke_refresh_token(db, request.refresh_token)
    return auth_service.create_tokens(db, user)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    request: schemas.TokenRefreshRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Logout by revoking the refresh token."""
    auth_service.revoke_refresh_token(db, request.refresh_token)


@router.post("/logout-all", status_code=status.HTTP_204_NO_CONTENT)
def logout_all(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Logout from all devices by revoking all refresh tokens."""
    auth_service.revoke_all_user_tokens(db, current_user.id)


@router.get("/me", response_model=schemas.User)
def get_current_user_info(current_user: models.User = Depends(get_current_user)):
    """Get current user information."""
    return current_user
