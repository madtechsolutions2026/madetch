# MadTech Solutions — Express API Backend

Modular, production-ready Node.js Express backend for MadTech Solutions.

## Architecture

```
backend/
├── src/
│   ├── config/          # Environment configuration
│   ├── controllers/     # Business logic & request handling
│   ├── middleware/      # Security, CORS, rate limits, error handlers
│   ├── routes/          # Express route definitions
│   └── server.js        # Server entrypoint
├── .env.example         # Environment template
├── .env                 # Local environment variables
└── package.json         # Node.js dependencies & scripts
```

## Quick Start

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Run development server with auto-reload:
   ```bash
   npm run dev
   ```

3. Run in production:
   ```bash
   npm start
   ```

## Endpoints

- `GET /api/health` - Health status and uptime
- `GET /api/projects` - List of showcased client projects
- `POST /api/contact` - Submit client project inquiry with validation & rate limiting
