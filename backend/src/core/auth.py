from fastapi import HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
import httpx
import jwt
import asyncio

from .config import settings

# Initialize JWT token bearer
security = HTTPBearer()

async def verify_better_auth_token(token: str) -> Optional[dict]:
    """
    Verify a Better Auth token by calling Better Auth's verification endpoint.
    This is the recommended approach as Better Auth manages its own session state.
    """
    try:
        # In a real implementation, you would call Better Auth's verification API
        # For now, this is a placeholder - you would replace this with actual 
        # Better Auth verification logic
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{settings.BETTER_AUTH_API_URL}/auth/verify",  # This is hypothetical
                headers={"Authorization": f"Bearer {token}"}
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                return None
    except Exception:
        return None

def get_current_user(credentials: HTTPAuthorizationCredentials = security):
    """
    Dependency to get the current user from Better Auth token.
    """
    token = credentials.credentials
    
    # For now, using basic JWT verification as a placeholder
    # In a real implementation, you would use Better Auth's verification
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def verify_better_auth_session(session_token: str) -> Optional[dict]:
    """
    Verify a Better Auth session token against the Better Auth backend.
    """
    # This is a placeholder implementation
    # Better Auth typically provides its own verification methods
    # You would integrate with their actual verification system
    return await verify_better_auth_token(session_token)