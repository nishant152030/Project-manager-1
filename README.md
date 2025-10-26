# Project Management System

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Built with .NET 8](https://img.shields.io/badge/.NET-8-blue.svg)](https://dotnet.microsoft.com/)
[![Frontend: React + Vite](https://img.shields.io/badge/React-Vite-yellow.svg)](https://vitejs.dev/)

A full-stack project and task management application with user authentication, built with .NET 8 and React.

Table of Contents
- Quick Start
- Tech Stack
- Prerequisites
- Configuration
- Features
- API Endpoints
- Project Structure
- Development
- Database
- Troubleshooting
- Contributing
- Contact
- License

## Tech Stack

**Backend:**
- .NET 8 Web API
- Entity Framework Core
- SQLite Database
- JWT Authentication
- BCrypt Password Hashing

**Frontend:**
- React 18 with TypeScript
- React Router for navigation
- Axios for API calls
- Vite for build tooling

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Backend setup and run:

```bash
cd backend
dotnet restore
dotnet watch run     # recommended for development (hot reload)
# or
dotnet run
```

By default the development API runs with HTTPS on `https://localhost:5001` (and HTTP on `http://localhost:5000` if configured). Swagger docs are available at `https://localhost:5001/swagger` when running.

3. Frontend setup and run (in a new terminal):

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server (Vite) usually runs at `http://localhost:5173`.

## Configuration

### Backend Configuration

Edit `backend/appsettings.json` if needed:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=projectmanagement.db"
  },
  "Jwt": {
    "Key": "your-secret-key-min-32-characters",
    "Issuer": "ProjectManagementAPI",
    "Audience": "ProjectManagementClient"
  }
}
```

- The SQLite DB file is created at `backend/projectmanagement.db` on first run.
- Ensure your JWT key is strong (minimum recommended length is 32 characters).

### Frontend Configuration

The frontend reads API URL from `.env`:

```
VITE_API_URL=https://localhost:5001
```

Update this value if your backend runs on a different port or scheme (http vs https).

## Features

- User registration and authentication
- JWT-based authorization
- Create and manage projects
- Create, update, and delete tasks
- Mark tasks as complete/incomplete
- Protected routes and API endpoints

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Projects (Requires Authentication)
- `GET /api/projects` - Get all user projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Tasks (Requires Authentication)
- `GET /api/tasks/project/{projectId}` - Get all tasks for a project
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `PATCH /api/tasks/{id}/toggle` - Toggle task completion

See `API_TESTING.md` for detailed API testing examples.

## Project Structure

```
.
├── backend/
│   ├── Controllers/      # API endpoints
│   ├── Models/           # Database entities
│   ├── DTOs/             # Data transfer objects
│   ├── Services/         # Business logic
│   ├── Data/             # Database context
│   └── Program.cs        # Application entry point
│
└── frontend/
    └── src/
        ├── pages/        # Page components
        ├── components/   # Reusable components
        ├── context/      # React context
        ├── services/     # API service
        └── types/        # TypeScript types
```

## Development

### Backend

```bash
cd backend
dotnet watch run    # Run with hot reload (recommended)
```

### Frontend

```bash
cd frontend
npm run dev         # Development server
npm run build       # Production build
npm run lint        # Run ESLint
```

## Database

The SQLite database is created automatically on first run at `backend/projectmanagement.db`.

To reset the database, stop the backend, delete the `.db` file, and restart the backend.

## Troubleshooting

- CORS issues: Ensure the frontend URL is listed in the CORS policy in `backend/Program.cs`.
- SSL warnings: Development uses a self-signed certificate for HTTPS — accept or trust it for local development.
- Port conflicts: If ports 5001 (backend HTTPS), 5000 (backend HTTP), or 5173 (frontend) are in use, update config or run on different ports.


## License

MIT
