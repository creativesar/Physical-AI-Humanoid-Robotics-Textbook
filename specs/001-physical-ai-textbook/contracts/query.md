# API Contract: /query

**Endpoint**: `/query`
**Method**: `POST`
**Purpose**: Retrieves relevant content from the Physical AI & Humanoid Robotics Textbook modules using Qdrant based on a user query.

## Request Body

```json
{
  "user_query": "string",
  "top_k": "integer" (optional, default: 5),
  "module_filter": "string" (optional, e.g., 'module-1', 'module-5', etc.)
}
```

**`user_query`** (string, required): The natural language query from the user.
**`top_k`** (integer, optional): The number of top relevant content pieces to retrieve.
**`module_filter`** (string, optional): Specific module to search within (e.g., 'module-1', 'module-5', etc.).

## Response Body (200 OK)

```json
{
  "status": "success",
  "results": [
    {
      "id": "string",
      "text": "string",
      "module": "string",
      "section": "string",
      "score": "float"
    }
  ]
}
```

**`status`** (string): Indicates the success or failure of the operation.
**`results`** (array of objects): A list of retrieved textbook content, ordered by relevance.
    - **`id`** (string): Unique identifier of the content piece.
    - **`text`** (string): Original text content.
    - **`module`** (string): Module identifier (e.g., 'module-1', 'module-5', etc.).
    - **`section`** (string): Section within the module.
    - **`score`** (float): Relevance score of the content.

## Error Responses

- **400 Bad Request**: Invalid input (e.g., missing `user_query`).
- **500 Internal Server Error**: Issues with Qdrant retrieval or embedding generation for the query.
