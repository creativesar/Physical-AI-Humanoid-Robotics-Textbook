# Introduction to Physical AI & Humanoid Robotics

This is the main repository for the "Physical AI & Humanoid Robotics Textbook" project - a comprehensive educational resource for individuals interested in the convergence of physical AI, embodied intelligence, and humanoid robotics.

## Project Overview

The primary purpose of this project is to create an authoritative and practical educational resource that bridges the gap between theoretical knowledge and practical application in physical AI and humanoid robotics. It provides a structured learning path from foundational concepts to advanced topics and real-world implementation.

## Key Areas Covered

- **Physical AI**: Understanding the principles and applications of AI in physical systems
- **Embodied Intelligence**: Exploring how intelligence manifests in physical robots and interacts with their environment
- **Robotics Fundamentals**: Core concepts of robot mechanics, control, and design
- **ROS 2**: Comprehensive guide to the Robot Operating System 2 for building robust robotic applications
- **Simulation Workflows**: Practical usage of leading simulation environments such as Gazebo, Isaac Sim, and Unity
- **Humanoid Locomotion, Perception, and Control**: Detailed study of bipedal motion, sensor integration, and advanced control strategies
- **VSLAM & Navigation**: Principles and implementation of Visual Simultaneous Localization and Mapping and advanced navigation algorithms
- **Vision-Language-Action Robotics**: Integration of multimodal AI models for robots to understand natural language commands
- **Digital Twin Workstations**: Setup and optimization of hardware and software for creating high-fidelity digital twins
- **Jetson Hardware Robotics**: Hands-on guidance for developing robotics applications on NVIDIA Jetson platforms
- **RAG-powered AI Learning Assistant**: Intelligent chatbot using Retrieval-Augmented Generation for interactive learning support

## Target Audience

This textbook is designed for:
- Robotics students & researchers
- AI/ML engineers
- Software developers
- Mechatronics engineers
- Hobbyists learning simulation & humanoid robotics
- Practitioners building real robots or digital twins

## Project Structure

The project is organized as follows:

```
Physical-AI-Humanoid-Robotics-Textbook/
├── backend/          # FastAPI backend with RAG system
├── frontend/         # Docusaurus-based web learning platform
├── specs/            # Project specifications and documentation
│   └── 001-physical-ai-textbook/  # Detailed specification documents
├── history/          # Prompt History Records and ADRs
└── .specify/         # SpecKit Plus templates and scripts
```

## Complete Textbook Structure

The textbook is organized into 19 modules with 6-12 subpages each:

1. **Introduction to Physical AI & Embodied Intelligence**
2. **Robotics & Mechatronics Fundamentals**
3. **ROS 2 Foundations**
4. **URDF & Robot Description Models**
5. **Kinematics (FK, IK, DH)**
6. **Robot Dynamics & Humanoid Control**
7. **Sensors & Perception**
8. **Gazebo Simulation**
9. **Isaac Sim & Isaac ROS**
10. **Unity Robotics & Digital Humans**
11. **Visual SLAM (VSLAM)**
12. **Navigation & Path Planning (Nav2)**
13. **Humanoid Locomotion & Motion Generation**
14. **Vision–Language–Action Robotics**
15. **Digital Twin Workstation**
16. **Jetson Robotics Hardware Setup**
17. **Full Humanoid System Architecture**
18. **Capstone Project**
19. **Glossary / Appendix / References**

## Technologies Used

- **Frontend**: Docusaurus (MDX/Markdown)
- **Backend**: FastAPI (Python 3.10+)
- **Database**: Neon Serverless Postgres, Qdrant Vector Database
- **Robotics**: ROS 2, Gazebo, Isaac Sim, Unity
- **AI/ML**: OpenAI SDK, RAG (Retrieval-Augmented Generation)

## Functional Requirements

The project includes:
- A Docusaurus-based web learning platform with interactive components
- A RAG-powered AI learning assistant with chat capabilities
- Dark/light mode toggle
- Complete module navigation
- FastAPI backend with `/chat`, `/embed`, `/query`, and `/health` endpoints

## Getting Started

To get started with this project, explore the specification documents in the `specs/` directory, particularly the `spec.md` file which contains the complete project specification.

## System Constraints

- High accuracy in all technical content
- All code samples must be valid and runnable
- RAG system must answer only from textbook content
- No hallucinated robotics content
- Academic clarity and rigor

## Repository Status

This repository is actively being developed to create a comprehensive textbook and learning platform for physical AI and humanoid robotics.