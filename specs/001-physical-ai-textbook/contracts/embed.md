# API Contract: /embed

**Endpoint**: `/embed`
**Method**: `POST`
**Purpose**: Generates embeddings for provided content from the Physical AI & Humanoid Robotics Textbook modules and stores them in Qdrant.

## Request Body

```json
{
  "text_content": "string",
  "module": "string",
  "section": "string",
  "subsection": "string" (optional),
  "metadata": {
    "author": "string",
    "created_date": "string",
    "last_updated": "string"
  } (optional)
}
```

**`text_content`** (string, required): The text content for which to generate embeddings.
**`module`** (string, required): The module identifier associated with the text content (e.g., 'module-1', 'module-5', etc.).
**`section`** (string, required): The section within the module associated with the text content.
**`subsection`** (string, optional): The subsection within the section associated with the text content.
**`metadata`** (object, optional): Additional metadata about the content.

## Response Body (200 OK)

```json
{
  "status": "success",
  "id": "string",
  "message": "Embeddings generated and stored successfully."
}
```

**`status`** (string): Indicates the success or failure of the operation.
**`id`** (string): The unique ID assigned to the stored content in Qdrant.
**`message`** (string): A descriptive message about the operation.

## Error Responses

- **400 Bad Request**: Invalid input (e.g., missing `text_content`).
- **500 Internal Server Error**: Issues with Cohere embedding generation or Qdrant storage.
