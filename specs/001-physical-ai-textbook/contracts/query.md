# API Contract: /query

**Endpoint**: `/query`
**Method**: `POST`
**Purpose**: Retrieves relevant textbook chunks from Qdrant based on a user query.

## Request Body

```json
{
  "user_query": "string",
  "top_k": "integer" (optional, default: 5)
}
```

**`user_query`** (string, required): The natural language query from the user.
**`top_k`** (integer, optional): The number of top relevant chunks to retrieve.

## Response Body (200 OK)

```json
{
  "status": "success",
  "results": [
    {
      "id": "string",
      "text": "string",
      "chapter": "string",
      "section": "string",
      "score": "float"
    }
  ]
}
```

**`status`** (string): Indicates the success or failure of the operation.
**`results`** (array of objects): A list of retrieved textbook chunks, ordered by relevance.
    - **`id`** (string): Unique identifier of the chunk.
    - **`text`** (string): Original text content of the chunk.
    - **`chapter`** (string): Chapter metadata.
    - **`section`** (string): Section metadata.
    - **`score`** (float): Relevance score of the chunk.

## Error Responses

- **400 Bad Request**: Invalid input (e.g., missing `user_query`).
- **500 Internal Server Error**: Issues with Qdrant retrieval or embedding generation for the query.
