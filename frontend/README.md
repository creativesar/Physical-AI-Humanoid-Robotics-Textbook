# Physical AI & Humanoid Robotics Textbook Frontend

This frontend provides the user interface for the Physical AI & Humanoid Robotics Textbook platform, featuring a Docusaurus-based textbook reader with an integrated RAG chatbot.

## Features

- **Docusaurus Framework**: Modern static site generation with React
- **RAG Chatbot**: Floating assistant with access to textbook content
- **Responsive Design**: Mobile-friendly interface with accessibility features
- **Textbook Modules**: Organized content for 19 different modules
- **Authentication Integration**: Secure access to personalized features

## Prerequisites

- Node.js 18+
- npm or yarn package manager

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

The frontend is configured through `docusaurus.config.ts`. Key settings include:

- Site title and tagline
- Custom CSS and themes
- Navigation structure
- Document sidebar configuration

## Development

Start the development server:

```bash
npm run dev
```

Or alternatively:
```bash
npm start
```

The site will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
npm run build
```

Serve the production build locally:
```bash
npm run serve
```

## Key Components

- **Chatbot**: Located at `src/components/Chatbot.tsx`, provides a floating assistant that uses the RAG backend
- **Authentication**: Context provider at `src/hooks/useAuth.tsx` manages user sessions
- **Layout Components**: Custom components in `src/components/` implement the design standards
- **Theme Customization**: Custom styling in `src/css/custom.css` and component-specific styles

## API Integration

The frontend communicates with the backend API located at the backend server (by default, expects to be at the same domain or properly configured in environment variables). The chatbot component specifically uses:

- `/api/v1/chat` - For chat conversations with the RAG system
- `/auth/token` - For user authentication
- `/auth/register` - For user registration
- `/metadata/modules` - For textbook module information

## Environment Variables

If needed, environment variables can be configured in a `.env` file:

- `REACT_APP_BACKEND_URL` - The URL of the backend API server

## Design Standards

This frontend follows the project's design standards:
- Pure black (#000000) background
- Grayscale accents only
- Typography: Sora (headings), Inter (body), Syncopate (labels)
- Professional, academic styling without sci-fi elements
- Clean spacing and premium layout

## Deployment

The site can be deployed to various platforms:
- GitHub Pages
- Vercel
- Netlify
- Any static site hosting service

For GitHub Pages deployment, ensure the `baseUrl` in `docusaurus.config.ts` is correctly set.