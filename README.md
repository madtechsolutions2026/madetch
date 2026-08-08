# MadTech Solutions — v2.0 (React & Express)

MadTech Solutions is a premium digital studio from India engineering bespoke websites, scalable mobile applications, autonomous AI agents, and organic growth engines.

---

## 📁 Repository Structure

```
madtech-v2/
├── frontend/             # Modern React.js (Vite + Three.js + Lucide + Tailwind Tokens)
│   ├── public/           # Static brand assets (logo.png, favicon.ico, etc.)
│   ├── src/
│   │   ├── components/   # React components (WebGL, Hero, Work, Estimator, Contact, etc.)
│   │   ├── data/         # Portfolio and services structured data
│   │   ├── styles/       # Design system CSS
│   │   ├── App.jsx       # Root React application
│   │   └── main.jsx      # Vite entrypoint
│   └── package.json
│
├── backend/              # Node.js Express API Server
│   ├── src/
│   │   ├── config/       # Environment config
│   │   ├── controllers/  # Projects and contact controllers
│   │   ├── middleware/   # Rate limiting, helmet security, error handlers
│   │   ├── routes/       # Express router endpoints (/api/health, /api/projects, /api/contact)
│   │   └── server.js     # Server entrypoint
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── package.json          # Root orchestration scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Run React Frontend (Vite)
```bash
# From repository root
npm run dev

# Or directly in frontend folder
cd frontend
npm run dev
```
> The React app will run on `http://localhost:5173/` with hot module replacement, 3D WebGL background shaders, custom magnetic cursor, and interactive project estimator.

### 2. Run Node Express Backend
```bash
# From repository root
npm run dev:backend

# Or directly in backend folder
cd backend
npm run dev
```
> The Express API will run on `http://localhost:5000/` with CORS, helmet security, and rate limiting.

### 3. Production Build
```bash
npm run build
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Three.js, Lucide React, Canvas Confetti, Space Grotesk, Instrument Serif, Tanker.
- **Backend**: Node.js, Express, Helmet, Morgan, Express-Rate-Limit, Dotenv, CORS.
- **SEO & Search**: Google Search Favicon 192x192, Schema.org WebSite & Organization structured data, Open Graph & Twitter Cards.
