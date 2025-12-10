# Data Model: Physical AI & Humanoid Robotics Textbook Platform

**Feature Branch**: `001-physical-ai-textbook` | **Date**: 2025-12-09 | **Spec**: specs/001-physical-ai-textbook/spec.md

## Summary

This document outlines the data models for the Physical AI & Humanoid Robotics Textbook Platform, utilizing both Qdrant (vector database) for textbook content embeddings and PostgreSQL (relational database) for user-specific data, module metadata, and analytics.

## Qdrant Data Model

**Collection Name**: `textbook_content`

**Purpose**: Stores vectorized chunks of the Physical AI & Humanoid Robotics textbook content to enable efficient semantic search and retrieval for the Cohere RAG chatbot.

### Fields:

-   **`id`** (String/UUID): Unique identifier for each content chunk.
-   **`text`** (String): The original text content of the chunk.
-   **`embedding`** (Vector/List of Floats): The vector representation (embedding) of the `text` content generated via Cohere.
-   **`module`** (String): Metadata indicating the module from which the chunk was extracted (e.g., 'module-1', 'module-5', etc.).
-   **`section`** (String): Metadata indicating the section within the module from which the chunk was extracted (e.g., heading).
-   **`subsection`** (String): Optional metadata indicating the subsection within the section from which the chunk was extracted.

## PostgreSQL Data Model

**Purpose**: Stores user-related information, module metadata, user progress, personalization settings, access logs, and chat history for the textbook platform.

### Entity: `Users`

**Purpose**: Manages user accounts and authentication via Better Auth.

**Fields**:

-   **`user_id`** (UUID/Integer): Primary key, unique identifier for the user.
-   **`username`** (String): Unique username for login.
-   **`email`** (String): User's email address for authentication and communication.
-   **`password_hash`** (String): Hashed password for security.
-   **`created_at`** (Timestamp): Date and time of user creation.
-   **`last_login`** (Timestamp): Date and time of the user's last login.
-   **`profile_data`** (JSONB): Additional user profile information including academic background and robotics experience.
-   **`learning_level`** (String): User's academic or professional level (e.g., beginner, intermediate, advanced).
-   **`academic_background`** (String): User's educational background related to robotics or AI.
-   **`robotics_experience`** (String): User's experience level with robotics technology.

### Entity: `Modules`

**Purpose**: Stores metadata about the textbook modules.

**Fields**:

-   **`module_id`** (String): Primary key, unique identifier for the module (e.g., 'module-1', 'module-5', etc.).
-   **`title`** (String): Title of the module.
-   **`description`** (Text): Brief description of the module content.
-   **`learning_objectives`** (JSONB): Learning objectives for the module.
-   **`prerequisites`** (JSONB): Prerequisites required for the module.
-   **`estimated_duration`** (Integer): Estimated time to complete the module in minutes.
-   **`difficulty_level`** (String): Difficulty level of the module (e.g., beginner, intermediate, advanced).
-   **`created_at`** (Timestamp): Date and time of module creation.
-   **`updated_at`** (Timestamp): Date and time of the last module update.

### Entity: `ModuleProgress`

**Purpose**: Tracks user progress through textbook modules.

**Fields**:

-   **`progress_id`** (UUID/Integer): Primary key.
-   **`user_id`** (UUID/Integer): Foreign key referencing `Users.user_id`.
-   **`module_id`** (String): Foreign key referencing `Modules.module_id`.
-   **`status`** (String): Progress status (e.g., 'not_started', 'in_progress', 'completed').
-   **`completion_percentage`** (Integer): Percentage of module completed by the user.
-   **`time_spent`** (Integer): Time spent on the module in minutes.
-   **`last_accessed`** (Timestamp): Date and time of the last access to the module.
-   **`started_at`** (Timestamp): Date and time when the user started the module.
-   **`completed_at`** (Timestamp): Date and time when the user completed the module (nullable).

**Relationships**: `ModuleProgress` has a many-to-one relationship with both `Users` and `Modules`.

### Entity: `Personalization`

**Purpose**: Stores individual user preferences and settings for the textbook platform experience.

**Fields**:

-   **`personalization_id`** (UUID/Integer): Primary key.
-   **`user_id`** (UUID/Integer): Foreign key referencing `Users.user_id`.
-   **`setting_key`** (String): Key for the personalized setting (e.g., `preferred_tone`, `difficulty_level`).
-   **`setting_value`** (String): Value of the personalized setting.

**Relationships**: `Personalization` has a many-to-one relationship with `Users`.

### Entity: `Counters`

**Purpose**: Stores platform statistics and metrics for the homepage counter section.

**Fields**:

-   **`counter_id`** (String): Primary key, unique identifier for the counter (e.g., 'total_users', 'modules_completed', etc.).
-   **`title`** (String): Title of the counter displayed on the homepage.
-   **`value`** (Integer): Current value of the counter.
-   **`updated_at`** (Timestamp): Date and time of the last counter update.

### Entity: `Partners`

**Purpose**: Stores information about trusted partners for the homepage display.

**Fields**:

-   **`partner_id`** (String): Primary key, unique identifier for the partner.
-   **`name`** (String): Name of the partner organization.
-   **`logo_url`** (String): URL to the partner's logo image.
-   **`website_url`** (String): URL to the partner's website.
-   **`description`** (Text): Brief description of the partnership.
-   **`display_order`** (Integer): Order in which to display the partner on the homepage.
-   **`is_active`** (Boolean): Whether the partner should be displayed on the homepage.

### Entity: `AccessLogs`

**Purpose**: Records user interactions with the platform, textbook, and chatbot for analytics and auditing.

**Fields**:

-   **`log_id`** (UUID/Integer): Primary key.
-   **`user_id`** (UUID/Integer): Foreign key referencing `Users.user_id` (nullable if unauthenticated access).
-   **`timestamp`** (Timestamp): Date and time of the access event.
-   **`event_type`** (String): Type of event (e.g., `query`, `chat_message`, `feedback`, `module_access`, `page_view`).
-   **`module_id`** (String): Module ID if the event is related to a specific module (nullable).
-   **`details`** (JSONB): Additional event details (e.g., query string, module accessed, IP address, page URL).

**Relationships**: `AccessLogs` has a many-to-one relationship with `Users`.

### Entity: `ChatHistory`

**Purpose**: Stores the conversational turns between the user and the Cohere RAG chatbot.

**Fields**:

-   **`chat_id`** (UUID/Integer): Primary key.
-   **`user_id`** (UUID/Integer): Foreign key referencing `Users.user_id` (nullable for anonymous chats).
-   **`timestamp`** (Timestamp): Date and time of the chat message.
-   **`role`** (String): Role of the message sender (`user` or `assistant`).
-   **`message_content`** (Text): The actual text content of the message.
-   **`referenced_content`** (JSONB/Array of Strings/UUIDs): Optional, references to `textbook_content.id` that were used in generating the assistant's response.

**Relationships**: `ChatHistory` has a many-to-one relationship with `Users`.
