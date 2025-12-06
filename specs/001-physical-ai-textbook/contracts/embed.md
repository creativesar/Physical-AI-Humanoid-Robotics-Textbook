# API Contract: /embed

**Endpoint**: `/embed`
**Method**: `POST`
**Purpose**: Generates embeddings for provided text content and stores them in Qdrant.

## Request Body

```json
{
  "text_content": "string",
  "chapter": "string",
  "section": "string"
}
```

**`text_content`** (string, required): The text content for which to generate embeddings.
**`chapter`** (string, required): The chapter associated with the text content.
**`section`** (string, required): The section within the chapter associated with the text content.

## Response Body (200 OK)

```json
{
  "status": "success",
  "id": "string",
  "message": "Embeddings generated and stored successfully."
}
```

**`status`** (string): Indicates the success or failure of the operation.
**`id`** (string): The unique ID assigned to the stored chunk in Qdrant.
**`message`** (string): A descriptive message about the operation.

## Error Responses

- **400 Bad Request**: Invalid input (e.g., missing `text_content`).
- **500 Internal Server Error**: Issues with embedding generation or Qdrant storage.
