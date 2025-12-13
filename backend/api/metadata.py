from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from models.database import Module, Counter, User
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config.settings import settings
from auth.authentication import get_current_active_user
from services.ai_service import AIClientService

router = APIRouter()

# Initialize the unified AI service
ai_service = AIClientService()

# Database setup
engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class ModuleMetadata(BaseModel):
    module_id: str
    title: str
    description: str
    learning_objectives: List[str]
    estimated_duration: int
    difficulty_level: str

class CounterData(BaseModel):
    counter_id: str
    title: str
    value: int

class AIProvider(BaseModel):
    provider: str
    available: bool

class ModulesResponse(BaseModel):
    modules: List[ModuleMetadata]

class CountersResponse(BaseModel):
    counters: List[CounterData]

class AIProvidersResponse(BaseModel):
    providers: List[AIProvider]

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/modules", response_model=ModulesResponse)
async def get_modules(current_user: User = Depends(get_current_active_user)):
    try:
        db = next(get_db())
        modules = db.query(Module).all()

        module_list = []
        for module in modules:
            module_list.append(ModuleMetadata(
                module_id=module.module_id,
                title=module.title,
                description=module.description,
                learning_objectives=module.learning_objectives or [],
                estimated_duration=module.estimated_duration,
                difficulty_level=module.difficulty_level
            ))

        return ModulesResponse(modules=module_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching modules: {str(e)}")

@router.get("/counters", response_model=CountersResponse)
async def get_counters(current_user: User = Depends(get_current_active_user)):
    try:
        db = next(get_db())
        counters = db.query(Counter).all()

        counter_list = []
        for counter in counters:
            counter_list.append(CounterData(
                counter_id=counter.counter_id,
                title=counter.title,
                value=counter.value
            ))

        return CountersResponse(counters=counter_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching counters: {str(e)}")

@router.get("/ai-providers", response_model=AIProvidersResponse)
async def get_ai_providers(current_user: User = Depends(get_current_active_user)):
    try:
        available_providers = ai_service.get_available_providers()

        providers_list = []
        all_providers = ["cohere"]  # Only Cohere is supported now

        for provider in all_providers:
            providers_list.append(AIProvider(
                provider=provider,
                available=provider in available_providers
            ))

        return AIProvidersResponse(providers=providers_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching AI providers: {str(e)}")