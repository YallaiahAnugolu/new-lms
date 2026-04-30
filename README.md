# 🎓 BrovAI LMS - Modern Learning Management System

![BrovAI Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

BrovAI LMS is a premium, high-fidelity Learning Management System designed for deep focus and mastery in modern technology sectors. Built with React 19, Vite, and Framer Motion, it offers a stunning user experience with glassmorphism effects, fluid animations, and robust local persistence.

## ✨ Key Features

- **🚀 Performance-First**: Blazing fast performance powered by Vite and React 19.
- **🎨 Premium UI/UX**: State-of-the-art design featuring:
  - Glassmorphism navigation and components.
  - Interactive mesh gradient backgrounds.
  - Smooth micro-animations using Framer Motion.
  - Responsive layout for all device sizes.
- **📚 Rich Course Catalog**:
  - Filter by category (AI, Web, Design, etc.).
  - Real-time search functionality.
  - Dynamic course cards with progress indicators.
- **🎥 Advanced Video Player**:
  - Custom-built video controls.
  - Keyboard shortcuts (Space for play/pause, Arrows for seek).
  - Lesson tracking and persistent progress.
- **📝 Study Tools**:
  - In-app personal study notes saved locally via IndexedDB.
  - Interactive Q&A and technical reference access.
- **🛡️ Admin Portal**:
  - Secure dashboard for managing courses and content.
  - Toggleable via environment variables.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via `idb-keyval`)
- **Backend/AI**: [Google Gemini Pro API](https://ai.google.dev/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YallaiahAnugolu/new-lms.git
   cd new-lms
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API Key and other configurations:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   VITE_ENABLE_ADMIN=true
   ```

### Running the Application

- **Development Mode:**
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:3000`.

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Preview Production Build:**
  ```bash
  npm run preview
  ```

## 📂 Project Structure

```text
├── public/          # Static assets
├── src/
│   ├── App.tsx      # Main application logic & routing
│   ├── main.tsx     # Application entry point
│   ├── types.ts     # TypeScript interfaces & mock data
│   └── index.css    # Global styles & Tailwind directives
├── package.json     # Project dependencies & scripts
└── vite.config.ts   # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary. All rights reserved.

---

<div align="center">
  Developed with ❤️ for the next generation of technologists.
</div>
