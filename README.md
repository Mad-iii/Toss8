# 🍽️ Toss8 — Restaurant Website

A modern, full-featured restaurant website built with React, TypeScript, and Vite. Includes AI-powered features via the Google Gemini API, a MongoDB backend, and WhatsApp ordering integration.

🔗 **Live Demo:** [toss8.vercel.app](https://toss8.vercel.app)

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4 |
| Build Tool | Vite 6 |
| Routing | React Router DOM v7 |
| AI | Google Gemini (`@google/genai`) |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Notifications | React Toastify |
| Database | MongoDB (via `MONGO_URI`) |
| HTTP Client | Axios |
| Utilities | clsx, tailwind-merge |

---

## 📁 Project Structure

```
Toss8/
├── public/          # Static assets
├── src/             # Application source code
├── index.html       # HTML entry point
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration
├── package.json     # Dependencies and scripts
├── .env.example     # Environment variable template
└── metadata.json    # Project metadata
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- A MongoDB Atlas cluster (or local MongoDB instance)
- A Google Gemini API key (from [Google AI Studio](https://aistudio.google.com))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mad-iii/Toss8.git
   cd Toss8
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and fill in your values (see [Environment Variables](#-environment-variables) below).

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure the following:

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key for AI features |
| `APP_URL` | The URL where the app is hosted (e.g., for callbacks) |
| `MONGO_URI` | MongoDB connection string (Atlas or local) |
| `RESTAURANT_WHATSAPP_NUMBER` | WhatsApp number for order notifications (e.g., `923001234567`) |
| `PORT` | Port to run the server on (default: `3000`) |

**Example `.env`:**
```env
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="http://localhost:3000"
MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/toss8"
RESTAURANT_WHATSAPP_NUMBER="923001234567"
PORT=3000
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Delete the `dist/` build folder |

---

## ✨ Features

- 🤖 **AI-Powered** — Gemini AI integration for smart restaurant features
- 📱 **WhatsApp Ordering** — Customers can send orders directly via WhatsApp
- 🗄️ **MongoDB Backend** — Persistent data storage with MongoDB Atlas
- 🎨 **Modern UI** — Tailwind CSS v4 with smooth animations via Motion
- ⚡ **Fast** — Vite-powered development and builds
- 🔔 **Toast Notifications** — User-friendly feedback with React Toastify

---

## 🌐 Deployment

The project is deployed on **Vercel**. To deploy your own instance:

1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Add your environment variables in the Vercel project settings.
4. Deploy!

---

## 📄 License

This project is private. All rights reserved by [Mad-iii](https://github.com/Mad-iii).
