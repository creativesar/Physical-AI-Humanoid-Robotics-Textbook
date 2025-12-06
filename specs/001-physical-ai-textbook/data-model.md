# Data Model: Physical AI & Humanoid Robotics Textbook RAG Chatbot

**Feature Branch**: `001-physical-ai-textbook` | **Date**: 2025-12-04 | **Spec**: specs/001-physical-ai-textbook/spec.md

## Summary

This document outlines the data models for the RAG chatbot backend, utilizing both Qdrant (vector database) for textbook content embeddings and Neon Serverless Postgres (relational database) for user-specific data, chat history, and analytics.

## Qdrant Data Model

**Collection Name**: `textbook_chunks`

**Purpose**: Stores vectorized chunks of the textbook content to enable efficient semantic search and retrieval for the RAG chatbot.

### Fields:

-   **`id`** (String/UUID): Unique identifier for each textbook chunk.
-   **`text`** (String): The original text content of the chunk.
-   **`embedding`** (Vector/List of Floats): The vector representation (embedding) of the `text` content.
-   **`chapter`** (String): Metadata indicating the chapter from which the chunk was extracted.
-   **`section`** (String): Metadata indicating the section within the chapter from which the chunk was extracted (e.g., heading).

## Neon Serverless Postgres Data Model

**Purpose**: Stores user-related information, personalization settings, access logs, and chat history for the RAG chatbot.

### Entity: `Users`

**Purpose**: Manages user accounts and authentication (if `Better-Auth` is implemented).

**Fields**:

-   **`user_id`** (UUID/Integer): Primary key, unique identifier for the user.
-   **`username`** (String): Unique username or email for login.
-   **`password_hash`** (String): Hashed password for security.
-   **`created_at`** (Timestamp): Date and time of user creation.
-   **`last_login`** (Timestamp): Date and time of the user's last login.
-   **`profile_data`** (JSONB/Text): Optional field for storing additional user profile information (e.g., preferences, learning progress).

### Entity: `Personalization`

**Purpose**: Stores individual user preferences and settings for the chatbot experience.

**Fields**:

-   **`personalization_id`** (UUID/Integer): Primary key.
-   **`user_id`** (UUID/Integer): Foreign key referencing `Users.user_id`.
-   **`setting_key`** (String): Key for the personalized setting (e.g., `preferred_tone`, `difficulty_level`).
-   **`setting_value`** (String): Value of the personalized setting.

**Relationships**: `Personalization` has a many-to-one relationship with `Users`.

### Entity: `AccessLogs`

**Purpose**: Records user interactions with the chatbot and textbook for analytics and auditing.

**Fields**:

-   **`log_id`** (UUID/Integer): Primary key.
-   **`user_id`** (UUID/Integer): Foreign key referencing `Users.user_id` (nullable if unauthenticated access).
-   **`timestamp`** (Timestamp): Date and time of the access event.
-   **`event_type`** (String): Type of event (e.g., `query`, `chat_message`, `feedback`).
-   **`details`** (JSONB/Text): Additional event details (e.g., query string, chapter accessed, IP address).

**Relationships**: `AccessLogs` has a many-to-one relationship with `Users`.

### Entity: `ChatHistory`

**Purpose**: Stores the conversational turns between the user and the RAG chatbot.

**Fields**:

-   **`chat_id`** (UUID/Integer): Primary key.
-   **`user_id`** (UUID/Integer): Foreign key referencing `Users.user_id`.
-   **`timestamp`** (Timestamp): Date and time of the chat message.
-   **`role`** (String): Role of the message sender (`user` or `assistant`).
-   **`message_content`** (Text): The actual text content of the message.
-   **`referenced_chunks`** (JSONB/Array of Strings/UUIDs): Optional, references to `textbook_chunks.id` that were used in generating the assistant's response.

**Relationships**: `ChatHistory` has a many-to-one relationship with `Users`.
