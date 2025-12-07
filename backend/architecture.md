# Backend Architecture for Physical AI & Humanoid Robotics Textbook

## Project Structure
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── chatController.js
│   │   └── bookController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── BookContent.js
│   │   ├── UserProgress.js
│   │   ├── UserHighlights.js
│   │   ├── UserNotes.js
│   │   └── ChatHistory.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── chat.js
│   │   └── book.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── rateLimiter.js
│   ├── services/
│   │   ├── ragService.js
│   │   ├── geminiService.js
│   │   └── authService.js
│   ├── utils/
│   │   └── database.js
│   └── app.js
├── config/
│   └── database.js
├── .env
└── server.js
```

## Database Schema

### Users Table
- id (Primary Key, UUID)
- email (Unique, String, 255)
- password (String, 255)
- name (String, 100)
- created_at (Timestamp)
- updated_at (Timestamp)
- email_verified (Boolean, Default: false)
- email_verification_token (String, 255, Nullable)
- password_reset_token (String, 255, Nullable)
- password_reset_expires (Timestamp, Nullable)

### BookContent Table
- id (Primary Key, UUID)
- title (String, 255)
- content (Text)
- section (String, 100)
- chapter_number (Integer)
- section_number (Integer)
- embeddings (JSON, for RAG)
- created_at (Timestamp)
- updated_at (Timestamp)

### UserProgress Table
- id (Primary Key, UUID)
- user_id (Foreign Key to Users)
- book_section_id (Foreign Key to BookContent)
- progress_percentage (Decimal, 0-100)
- completed_at (Timestamp, Nullable)
- created_at (Timestamp)
- updated_at (Timestamp)

### UserHighlights Table
- id (Primary Key, UUID)
- user_id (Foreign Key to Users)
- book_section_id (Foreign Key to BookContent)
- highlighted_text (Text)
- position_start (Integer)
- position_end (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)

### UserNotes Table
- id (Primary Key, UUID)
- user_id (Foreign Key to Users)
- book_section_id (Foreign Key to BookContent)
- note_content (Text)
- position (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)

### ChatHistory Table
- id (Primary Key, UUID)
- user_id (Foreign Key to Users, Nullable for anonymous)
- message (Text)
- response (Text)
- context_used (JSON)
- created_at (Timestamp)

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- GET /api/auth/verify-email/:token
- GET /api/auth/me (Protected)

### User Management
- GET /api/user/progress (Protected)
- PUT /api/user/progress/:sectionId (Protected)
- GET /api/user/highlights (Protected)
- POST /api/user/highlights (Protected)
- DELETE /api/user/highlights/:id (Protected)
- GET /api/user/notes (Protected)
- POST /api/user/notes (Protected)
- PUT /api/user/notes/:id (Protected)
- DELETE /api/user/notes/:id (Protected)

### Book Content
- GET /api/book/content/:sectionId
- GET /api/book/chapters
- GET /api/book/search?q=query

### AI Chat
- POST /api/chat/message (Protected)
- GET /api/chat/history (Protected)
- DELETE /api/chat/history/:id (Protected)

## Technology Stack
- Node.js with Express.js
- PostgreSQL for relational data
- Redis for session storage and caching
- Google Gemini API for AI responses
- Better Auth for authentication
- JWT for token management
- bcrypt for password hashing
- Multer for file uploads
- Rate limiting with express-rate-limit

## Security Measures
- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- XSS prevention with helmet.js
- CORS configuration
- Secure session management

## Performance Optimizations
- Redis caching for frequently accessed data
- Database indexing on critical fields
- Pagination for large datasets
- Connection pooling
- Image optimization
- CDN for static assets

## Deployment Architecture
- Load balancer
- Multiple Node.js instances
- PostgreSQL master-slave setup
- Redis cluster
- CDN for static files
- SSL termination
- Monitoring and logging

## RAG Pipeline
1. Document Ingestion: Parse textbook content
2. Chunking: Split into semantic chunks
3. Embedding: Generate vector representations
4. Storage: Store in vector database
5. Retrieval: Find relevant chunks based on query
6. Generation: Use Gemini API with context
7. Response: Return to frontend

## Error Handling
- Centralized error handling middleware
- Proper HTTP status codes
- Detailed error logging
- Graceful degradation
- Client-friendly error messages

## Monitoring & Logging
- Winston for application logging
- Error tracking with structured logging
- Performance monitoring
- Health check endpoints
- Database connection monitoring
```

## Environment Variables
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=physics_ai_book
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
REDIS_URL=redis://localhost:6379
PORT=3001
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=15 * 60 * 1000
RATE_LIMIT_MAX=100
```

## API Rate Limits
- Auth endpoints: 5 requests per minute per IP
- Chat endpoints: 60 requests per hour per user
- General endpoints: 100 requests per 15 minutes per IP

## File Structure for Docusaurus Integration
The backend will be deployed separately but will communicate with the Docusaurus frontend via API calls.
```