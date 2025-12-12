import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config.settings import settings
from models.database import Base, Module, Counter

# Create database engine
engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    # Create database tables
    Base.metadata.create_all(bind=engine)
    
    # Create initial modules (19 modules as per the spec)
    db = SessionLocal()
    
    # Check if modules already exist
    existing_modules = db.query(Module).first()
    if not existing_modules:
        modules_data = [
            {"module_id": "module-1", "title": "Introduction to Physical AI", "description": "Foundations of Physical AI and its applications", "learning_objectives": ["Understand Physical AI concepts", "Explore applications"], "estimated_duration": 60, "difficulty_level": "beginner"},
            {"module_id": "module-2", "title": "Humanoid Robotics Overview", "description": "Introduction to humanoid robotics", "learning_objectives": ["Define humanoid robotics", "Explore key components"], "estimated_duration": 60, "difficulty_level": "beginner"},
            {"module_id": "module-3", "title": "Biomechanics and Movement", "description": "Study of biological movement for robotic applications", "learning_objectives": ["Analyze biological movement", "Apply principles to robotics"], "estimated_duration": 90, "difficulty_level": "intermediate"},
            {"module_id": "module-4", "title": "Sensorimotor Control", "description": "Control systems for humanoid robots", "learning_objectives": ["Implement control systems", "Understand feedback mechanisms"], "estimated_duration": 90, "difficulty_level": "intermediate"},
            {"module_id": "module-5", "title": "Machine Learning in Physical AI", "description": "ML applications in physical systems", "learning_objectives": ["Apply ML to physical systems", "Implement learning algorithms"], "estimated_duration": 120, "difficulty_level": "intermediate"},
            {"module_id": "module-6", "title": "Deep Reinforcement Learning", "description": "RL for robotic control", "learning_objectives": ["Implement RL algorithms", "Optimize robotic behavior"], "estimated_duration": 120, "difficulty_level": "advanced"},
            {"module_id": "module-7", "title": "Computer Vision for Robotics", "description": "Visual perception for humanoid robots", "learning_objectives": ["Implement computer vision", "Apply to robotic navigation"], "estimated_duration": 120, "difficulty_level": "intermediate"},
            {"module_id": "module-8", "title": "Manipulation and Grasping", "description": "Robotic manipulation techniques", "learning_objectives": ["Design manipulation systems", "Implement grasping algorithms"], "estimated_duration": 90, "difficulty_level": "intermediate"},
            {"module_id": "module-9", "title": "Locomotion and Gait", "description": "Bipedal locomotion for humanoid robots", "learning_objectives": ["Understand gait patterns", "Implement locomotion control"], "estimated_duration": 120, "difficulty_level": "advanced"},
            {"module_id": "module-10", "title": "Social Robotics", "description": "Human-robot interaction", "learning_objectives": ["Design interactive systems", "Implement social behaviors"], "estimated_duration": 90, "difficulty_level": "intermediate"},
            {"module_id": "module-11", "title": "Ethics in Physical AI", "description": "Ethical considerations in AI and robotics", "learning_objectives": ["Analyze ethical issues", "Implement responsible AI"], "estimated_duration": 60, "difficulty_level": "beginner"},
            {"module_id": "module-12", "title": "Hardware Design", "description": "Physical design of humanoid robots", "learning_objectives": ["Design robot hardware", "Consider mechanical constraints"], "estimated_duration": 120, "difficulty_level": "advanced"},
            {"module_id": "module-13", "title": "Simulation Environments", "description": "Simulation for robotics development", "learning_objectives": ["Create simulation environments", "Test robotic systems"], "estimated_duration": 90, "difficulty_level": "intermediate"},
            {"module_id": "module-14", "title": "Embodied Cognition", "description": "Cognition in physical systems", "learning_objectives": ["Understand embodied cognition", "Apply to robotic systems"], "estimated_duration": 90, "difficulty_level": "advanced"},
            {"module_id": "module-15", "title": "Multi-Agent Systems", "description": "Coordination in robot teams", "learning_objectives": ["Implement multi-agent coordination", "Design collaborative systems"], "estimated_duration": 120, "difficulty_level": "advanced"},
            {"module_id": "module-16", "title": "Adaptive Learning", "description": "Adaptation in dynamic environments", "learning_objectives": ["Implement adaptive systems", "Learn from environmental feedback"], "estimated_duration": 120, "difficulty_level": "advanced"},
            {"module_id": "module-17", "title": "Safety and Robustness", "description": "Safe operation of robotic systems", "learning_objectives": ["Design safe systems", "Implement safety protocols"], "estimated_duration": 90, "difficulty_level": "intermediate"},
            {"module_id": "module-18", "title": "Real-World Applications", "description": "Applications of physical AI and humanoid robots", "learning_objectives": ["Explore real-world use cases", "Analyze implementation challenges"], "estimated_duration": 90, "difficulty_level": "intermediate"},
            {"module_id": "module-19", "title": "Future of Physical AI", "description": "Emerging trends and future directions", "learning_objectives": ["Analyze emerging trends", "Predict future developments"], "estimated_duration": 60, "difficulty_level": "beginner"}
        ]
        
        for module_data in modules_data:
            module = Module(
                module_id=module_data["module_id"],
                title=module_data["title"],
                description=module_data["description"],
                learning_objectives=module_data["learning_objectives"],
                estimated_duration=module_data["estimated_duration"],
                difficulty_level=module_data["difficulty_level"]
            )
            db.add(module)
        
        # Add some initial counters
        counter_data = [
            {"counter_id": "total_users", "title": "Total Users", "value": 0},
            {"counter_id": "modules_completed", "title": "Modules Completed", "value": 0},
            {"counter_id": "ai_queries", "title": "AI Queries Answered", "value": 0},
            {"counter_id": "active_courses", "title": "Active Courses", "value": 0}
        ]
        
        for counter_datum in counter_data:
            counter = Counter(
                counter_id=counter_datum["counter_id"],
                title=counter_datum["title"],
                value=counter_datum["value"]
            )
            db.add(counter)
        
        db.commit()
        db.close()
        print("Database initialized with modules and counters")
    else:
        print("Database already initialized")

if __name__ == "__main__":
    init_db()