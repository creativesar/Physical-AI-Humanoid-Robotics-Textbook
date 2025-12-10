from sqlalchemy.orm import Session
from db.models import Module, Counter
from typing import List, Dict
import logging

async def get_modules_metadata(db: Session) -> List[Dict]:
    """
    Retrieve metadata for all textbook modules
    """
    try:
        modules = db.query(Module).all()
        return [
            {
                "module_id": module.module_id,
                "title": module.title,
                "description": module.description,
                "estimated_duration": module.estimated_duration,
                "difficulty_level": module.difficulty_level,
                "prerequisites": module.prerequisites
            }
            for module in modules
        ]
    except Exception as e:
        logging.error(f"Error retrieving modules metadata: {str(e)}")
        return []

async def get_counters(db: Session) -> Dict:
    """
    Retrieve platform counters for homepage display
    """
    try:
        counters = db.query(Counter).all()
        return {
            counter.counter_id: {
                "title": counter.title,
                "value": counter.value
            }
            for counter in counters
        }
    except Exception as e:
        logging.error(f"Error retrieving counters: {str(e)}")
        return {}

# Example initialization function to set up default counters
def initialize_counters(db: Session):
    """
    Initialize default counters if they don't exist
    """
    default_counters = [
        {"counter_id": "total_modules", "title": "Total Modules", "value": 19},
        {"counter_id": "total_students", "title": "Active Students", "value": 0},
        {"counter_id": "total_queries", "title": "AI Queries Answered", "value": 0},
        {"counter_id": "support_available", "title": "Support Available", "value": 24}
    ]
    
    for counter_data in default_counters:
        existing = db.query(Counter).filter(Counter.counter_id == counter_data["counter_id"]).first()
        if not existing:
            counter = Counter(**counter_data)
            db.add(counter)
    
    db.commit()