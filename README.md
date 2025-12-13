---
license: cc-by-nc-4.0
language:
- en
tags:
- textbook
- ai
- robotics
- physical-ai
- humanoid
datasets:
- Physical-AI-Humanoid-Robotics-Textbook
model-index:
- name: Physical AI & Humanoid Robotics Textbook
  results: []
---

# Physical AI & Humanoid Robotics Textbook

This repository contains the Physical AI & Humanoid Robotics Textbook - a comprehensive educational resource for learning about Physical AI and humanoid robotics.

## Overview

This educational platform provides comprehensive resources for learning about Physical AI and humanoid robotics, including:

- Interactive textbook content
- RAG-powered chatbot for Q&A
- Code examples and exercises
- Simulation environments

## Technical Architecture

- **Frontend**: Docusaurus with React
- **Backend**: FastAPI with RAG pipeline
- **AI Services**: Support for Cohere models
- **Vector Store**: Qdrant
- **Database**: PostgreSQL

## AI Integration

This project supports AI providers:

- **Cohere**: Enterprise-grade models with managed service

You can configure which provider to use via the API or environment variables. This allows for flexibility in deployment and cost management.

## Repository Structure

```
Physical-AI-Humanoid-Robotics-Textbook/
├── backend/              # FastAPI backend with RAG pipeline
├── frontend/             # Docusaurus frontend
├── specs/                # Project specifications
├── scripts/              # Utility scripts
└── history/              # Project history
```

## Usage

For detailed setup instructions, please refer to the main project documentation.

## License

This textbook is licensed under CC BY-NC 4.0. You are free to share and adapt the material for non-commercial purposes, giving appropriate credit.