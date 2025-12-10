from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session

from ..models.postgres_models import Module, Counter
from ..database.postgres_client import get_db_session

router = APIRouter(prefix="/metadata")

class ModuleResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str] = None

class CounterResponse(BaseModel):
    name: str
    value: int

class GetModulesResponse(BaseModel):
    modules: List[ModuleResponse]

class GetCountersResponse(BaseModel):
    counters: List[CounterResponse]

@router.get("/modules", response_model=GetModulesResponse)
async def get_modules(db: Session = Depends(get_db_session)):
    """
    Get all textbook modules for the homepage grid.
    """
    try:
        modules = db.query(Module).all()
        module_responses = [
            ModuleResponse(
                id=module.id,
                name=module.name,
                slug=module.slug,
                description=module.description
            )
            for module in modules
        ]
        return GetModulesResponse(modules=module_responses)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch modules: {e}")

@router.get("/counters", response_model=GetCountersResponse)
async def get_counters(db: Session = Depends(get_db_session)):
    """
    Get homepage counters (modules count, chapters count, etc.).
    """
    try:
        counters = db.query(Counter).all()
        counter_responses = [
            CounterResponse(
                name=counter.name,
                value=counter.value
            )
            for counter in counters
        ]
        return GetCountersResponse(counters=counter_responses)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch counters: {e}")