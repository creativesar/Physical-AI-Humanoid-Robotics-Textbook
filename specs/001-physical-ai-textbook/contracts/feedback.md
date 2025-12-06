# API Contract: /feedback

**Endpoint**: `/feedback`
**Method**: `POST`
**Purpose**: Allows users to submit feedback or corrections on chatbot responses or textbook content.

## Request Body

```json
{
  "user_id": "string" (optional),
  "feedback_type": "bug" | "correction" | "suggestion" | "other",
  "feedback_content": "string",
  "context": "string" (optional, e.g., related query, chat history ID, chapter/section)
}
```

**`user_id`** (string, optional): The ID of the user submitting feedback.
**`feedback_type`** (string, required): The category of feedback (e.g., bug, correction, suggestion).
**`feedback_content`** (string, required): The detailed feedback message.
**`context`** (string, optional): Additional context about the feedback, such as the query it relates to, a chat history ID, or specific chapter/section.

## Response Body (200 OK)

```json
{
  "status": "success",
  "message": "Feedback submitted successfully."
}
```

**`status`** (string): Indicates the success or failure of the operation.
**`message`** (string): A confirmation message.

## Error Responses

- **400 Bad Request**: Invalid input (e.g., missing `feedback_content`).
- **500 Internal Server Error**: Issues with storing feedback.
