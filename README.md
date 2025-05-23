# ezyEvent - Event Management System

**ezyEvent** is a full-stack event platform with a React.js/Vite frontend and Node.js/Express backend. The frontend uses RTK Query for API calls and JWT authentication, organized by features for scalability. The backend offers a RESTful API with MongoDB, handling CRUD operations for events/users with secure JWT/bcrypt auth. Following monorepo architecture, it cleanly separates client and server code while enabling seamless communication via REST standards.

Open DeepWiki for a detailed documentation

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Seyam08/ezyEvent)

## 🚀 How It Works

### Frontend (Client)

- Built with **React.js + Vite**
- Uses **RTK Query** for API communication
- Protected routes with JWT authentication
- Feature-based architecture

### Backend (Server)

- RESTful API with **Node.js/Express**
- MongoDB database
- JWT authentication
- CRUD operations for events/users

## 🔌 API Connection

The frontend communicates with backend via:

- All requests require valid JWT (except login/register)
- Standard REST conventions (GET/POST/PUT/DELETE)

## 📚 Documentation

- [📖 Frontend Details](./client/README.md)
- [🔌 API Endpoints](./server/README.md)

## Key features of this README:

1. Visualizes the monorepo structure
2. Clearly separates frontend/backend concerns
3. Shows how they connect
4. Provides minimal but complete setup instructions
5. Links to detailed docs for each part
6. Maintains clean formatting
