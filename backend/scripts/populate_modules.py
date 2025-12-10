"""
Script to populate the PostgreSQL database with module information.
This script creates entries for all 19 textbook modules in the database.
"""
import sys
import os
from sqlalchemy.orm import Session

# Add the src directory to the path so we can import our models
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.database.postgres_client import get_db_session
from src.models.postgres_models import Module, Counter
from src.core.config import settings


def populate_modules(db: Session):
    """Populate the modules table with the 19 textbook modules."""
    modules_data = [
        {
            "name": "Introduction to Physical AI & Embodied Intelligence",
            "slug": "module-01-introduction",
            "description": "Understanding Physical AI, embodied vs. disembodied intelligence"
        },
        {
            "name": "Robotics & Mechatronics Fundamentals",
            "slug": "module-02-robotics-fundamentals",
            "description": "Robotics taxonomy, mechanical structure, motors, actuators, power systems"
        },
        {
            "name": "ROS 2 Foundations",
            "slug": "module-03-ros2-foundations",
            "description": "ROS 2 architecture, nodes, topics, services, communication patterns"
        },
        {
            "name": "URDF & Robot Description Models",
            "slug": "module-04-urdf-models",
            "description": "URDF basics, links, joints, XACRO macros, visualization"
        },
        {
            "name": "Kinematics (FK, IK, DH)",
            "slug": "module-05-kinematics",
            "description": "Forward and inverse kinematics, DH parameters, Jacobian concepts"
        },
        {
            "name": "Robot Dynamics & Humanoid Control",
            "slug": "module-06-robot-dynamics",
            "description": "Physics engines, stability, ZMP, gait cycles, control strategies"
        },
        {
            "name": "Sensors & Perception",
            "slug": "module-07-sensors-perception",
            "description": "IMUs, LiDAR, cameras, Intel RealSense, sensor fusion"
        },
        {
            "name": "Gazebo Simulation",
            "slug": "module-08-gazebo-simulation",
            "description": "Simulation environment, robot spawning, sensor simulation"
        },
        {
            "name": "Isaac Sim & Isaac ROS",
            "slug": "module-09-isaac-sim",
            "description": "NVIDIA robotics simulation platform, ROS bridge"
        },
        {
            "name": "Unity Robotics, Digital Humans",
            "slug": "module-10-unity-robotics",
            "description": "Unity-ROS integration, character rigging, motion retargeting"
        },
        {
            "name": "Visual SLAM (VSLAM)",
            "slug": "module-11-vslam",
            "description": "SLAM principles, feature extraction, pose estimation, mapping"
        },
        {
            "name": "Navigation (Nav2)",
            "slug": "module-12-navigation",
            "description": "Nav2 architecture, localization, mapping, path planning"
        },
        {
            "name": "Humanoid Locomotion & Motion Generation",
            "slug": "module-13-locomotion",
            "description": "Biped motion, gait planning, balancing control, safety"
        },
        {
            "name": "Vision-Language-Action Robotics",
            "slug": "module-14-vla-robotics",
            "description": "Multimodal models, CLIP, VLA, policy learning"
        },
        {
            "name": "Digital Twin Workstation",
            "slug": "module-15-digital-twin",
            "description": "Hardware requirements, GPU setup, Isaac Sim workstation"
        },
        {
            "name": "Jetson Robotics Hardware",
            "slug": "module-16-jetson-hardware",
            "description": "Jetson models, flashing, ROS installation, sensor wiring"
        },
        {
            "name": "Full Humanoid System Architecture",
            "slug": "module-17-system-architecture",
            "description": "System overview, perception, control, motion, safety layers"
        },
        {
            "name": "Capstone Project",
            "slug": "module-18-capstone",
            "description": "Build simulation, perception, control, navigation pipelines"
        },
        {
            "name": "Glossary & References",
            "slug": "module-19-glossary",
            "description": "Key terms, definitions, academic references"
        }
    ]

    # Check if modules already exist
    existing_modules = db.query(Module).all()
    if existing_modules:
        print(f"Found {len(existing_modules)} existing modules. Skipping population.")
        return

    # Add modules to the database
    for module_data in modules_data:
        module = Module(
            name=module_data["name"],
            slug=module_data["slug"],
            description=module_data["description"]
        )
        db.add(module)

    db.commit()
    print(f"Successfully added {len(modules_data)} modules to the database")


def populate_counters(db: Session):
    """Populate the counters table with initial values."""
    # Check if counters already exist
    existing_counters = db.query(Counter).all()
    if existing_counters:
        print(f"Found {len(existing_counters)} existing counters. Skipping population.")
        return

    # Initial counter values
    counters_data = [
        {"name": "total_modules", "value": 19},
        {"name": "total_pages", "value": 156},  # Estimated
        {"name": "total_students", "value": 0},  # Will be updated as users register
        {"name": "chapters_completed", "value": 0}  # Will be updated as users progress
    ]

    for counter_data in counters_data:
        counter = Counter(
            name=counter_data["name"],
            value=counter_data["value"]
        )
        db.add(counter)

    db.commit()
    print(f"Successfully added {len(counters_data)} counters to the database")


def main():
    """Main function to populate the database with modules and counters."""
    print("Populating the database with module information...")
    
    db = next(get_db_session())
    try:
        populate_modules(db)
        populate_counters(db)
        print("Database population completed successfully!")
    finally:
        db.close()


if __name__ == "__main__":
    main()