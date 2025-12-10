# API Contract: /chat

**Endpoint**: `/chat`
**Method**: `POST`
**Purpose**: Interacts with the Cohere AI agent to generate a conversational response based on user input and retrieved context for the Physical AI & Humanoid Robotics Textbook.

## Request Body

```json
{
  "user_message": "string",
  "conversation_history": [
    {
      "role": "user" | "assistant",
      "content": "string"
    }
  ] (optional),
  "retrieved_context": [
    {
      "id": "string",
      "text": "string",
      "module": "string",
      "section": "string"
    }
  ] (optional)
}
```

**`user_message`** (string, required): The current message from the user.
**`conversation_history`** (array of objects, optional): Previous turns in the conversation to maintain context.
**`retrieved_context`** (array of objects, optional): Relevant textbook content retrieved from `/query` to inform the agent's response.

## Response Body (200 OK)

```json
{
  "status": "success",
  "assistant_response": "string",
  "referenced_content": ["string"] (optional, IDs of content used)
}
```

**`status`** (string): Indicates the success or failure of the operation.
**`assistant_response`** (string): The generated conversational response from the Cohere AI agent.
**`referenced_content`** (array of strings, optional): A list of IDs of textbook content that were utilized by the AI in formulating its response.

## Error Responses

- **400 Bad Request**: Invalid input (e.g., missing `user_message`).
- **500 Internal Server Error**: Issues with Cohere API or agent processing.
