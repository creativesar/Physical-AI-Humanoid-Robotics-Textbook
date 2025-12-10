"""
Database initialization script for the Physical AI & Humanoid Robotics Textbook backend.
This script creates all necessary tables in the PostgreSQL database.
"""

import sys
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add the src directory to the path so we can import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.core.config import settings
from src.database.postgres_client import Base


def init_db():
    """Initialize the database by creating all tables."""
    engine = create_engine(settings.DATABASE_URL)
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")


if __name__ == "__main__":
    init_db()