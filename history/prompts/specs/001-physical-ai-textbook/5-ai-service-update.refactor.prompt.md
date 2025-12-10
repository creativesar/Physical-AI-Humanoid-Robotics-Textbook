---
id: 5
title: "AI Service Update"
stage: refactor
date_iso: 2025-12-09
surface: agent
model: Qwen Code
feature: 001-physical-ai-textbook
branch: main
user: Coders
command: "Update AI service from Gemini to Cohere"
labels: ["ai-integration", "refactor", "api"]
links: 
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - C:\Users\Coders\Desktop\Physical-AI-Humanoid-Robotics-Textbook\specs\001-physical-ai-textbook\spec.md
  - C:\Users\Coders\Desktop\Physical-AI-Humanoid-Robotics-Textbook\specs\001-physical-ai-textbook\plan.md
  - C:\Users\Coders\Desktop\Physical-AI-Humanoid-Robotics-Textbook\specs\001-physical-ai-textbook\tasks.md
  - C:\Users\Coders\Desktop\Physical-AI-Humanoid-Robotics-Textbook\.specify\memory\constitution.md
tests_yaml: []
prompt_text: "update cohere instead of gemini i am using cohere for api key okay update everywhere where it needs like spec.md plan.md clarify.md tasks.md constitution.md"
response_text: "Updated all relevant files to replace references to Gemini API with Cohere API, including spec.md, plan.md, tasks.md, and constitution.md. Updated API integration references, embeddings, reasoning systems, and RAG backend mentions."
outcome: "Successfully migrated AI service references from Gemini to Cohere across all project documentation."
evaluation: "All documentation files have been updated to correctly reference Cohere API instead of Gemini API. The changes maintain consistency across the project and properly reflect the chosen AI service provider."
---

# AI Service Update

## Summary
Updated all relevant files to replace references to Gemini API with Cohere API, including spec.md, plan.md, tasks.md, and constitution.md. Updated API integration references, embeddings, reasoning systems, and RAG backend mentions.

## Files Updated
- spec.md: Updated external services, backend features, and technology stack
- plan.md: Updated resource requirements and risk management
- tasks.md: Updated backend and AI integration tasks
- constitution.md: Updated technology stack and AI features

## Changes Made
- Replaced "Google Gemini API" with "Cohere API"
- Updated "Gemini embeddings" to "Cohere embeddings"
- Updated "Gemini reasoning" to "Cohere reasoning"
- Updated "Gemini RAG backend" to "Cohere RAG backend"

## Impact
All project documentation now consistently refers to Cohere as the AI service provider instead of Gemini.