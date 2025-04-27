# ezyEvent - Event Management System

![Project Architecture](https://i.imgur.com/JKv0lYn.png)  
_Unified repository with separate client and server components_

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
