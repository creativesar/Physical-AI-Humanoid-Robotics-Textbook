# API Contract: /user-profile

**Endpoint**: `/user-profile`
**Method**: `GET` / `POST` / `PUT`
**Purpose**: Manages user profile data and personalization settings.

## GET Request (Retrieve User Profile)

**Endpoint**: `/user-profile`
**Method**: `GET`
**Purpose**: Retrieves the profile data for the authenticated user.

### Request (Headers)

- `Authorization: Bearer <token>` (Required for authenticated users)

### Response Body (200 OK)

```json
{
  "status": "success",
  "user_id": "string",
  "username": "string",
  "profile_data": {
    "preferred_tone": "string",
    "learning_level": "string"
  },
  "personalization_settings": [
    {
      "setting_key": "string",
      "setting_value": "string"
    }
  ]
}
```

## POST Request (Create User Profile - for new users)

**Endpoint**: `/user-profile`
**Method**: `POST`
**Purpose**: Creates a new user profile.

### Request Body

```json
{
  "username": "string",
  "password": "string",
  "profile_data": { /* optional initial profile data */ }
}
```

### Response Body (201 Created)

```json
{
  "status": "success",
  "user_id": "string",
  "message": "User profile created successfully."
}
```

## PUT Request (Update User Profile)

**Endpoint**: `/user-profile`
**Method**: `PUT`
**Purpose**: Updates existing user profile data or personalization settings.

### Request Body

```json
{
  "user_id": "string",
  "profile_data": { /* updated profile data */ },
  "personalization_settings": [
    {
      "setting_key": "string",
      "setting_value": "string"
    }
  ] (optional)
}
```

### Response Body (200 OK)

```json
{
  "status": "success",
  "message": "User profile updated successfully."
}
```

## Error Responses (All Methods)

- **400 Bad Request**: Invalid input, missing required fields.
- **401 Unauthorized**: Authentication failed (for GET/PUT).
- **404 Not Found**: User profile not found (for GET/PUT).
- **409 Conflict**: Username already exists (for POST).
- **500 Internal Server Error**: Server-side issues.
