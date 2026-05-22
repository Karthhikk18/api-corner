# ⚡ API Corner

A unified, premium API Marketplace & Gateway designed for developers and engineering students. Exposes high-demand APIs alongside a live, terminal-style sandbox playground.

API Corner is styled with a custom **grayscale glassmorphic theme** featuring striking **neon blue accents** and responsive micro-animations.

---

## 🎨 Key Features

* **Terminal-Style Playground:** Test endpoints directly from the browser with zero friction. Inspect instant formatted JSON responses and copy output payloads with a single click.
* **Aggregated Flagship Systems:**
  * **📚 AI Study Buddy:** An intelligent academic sidekick. Exposes 7 student-centric APIs for roadmaps, concepts explanation, quiz generation, resume reviews, code parsing, streaking, and mock interviews.
  * **📈 AI ROI Performance Analyzer:** Calculates cost-savings and automation efficiency using predictive analytics logic.
* **Modern Grayscale UI:** Sleek, high-contrast dark theme powered by frosted glass elements, structured parameter forms, and glowing animations.
* **Unified Developer Dashboard:** Access generated mock API credentials, production/development keys, and view request analytics.
* **Advanced Category Filters:** Instantly navigate through endpoints (Academic AI, Artificial Intelligence, Development, Finance, Weather) using dynamic filter pills.

---

## 📚 Exposing the AI Study Buddy Ecosystem

API Corner features the **AI Study Buddy** integration, exposing these endpoints:

| Endpoint | Method | Purpose | Key Parameters |
| :--- | :---: | :--- | :--- |
| `/api/public/study-buddy/generate-roadmap` | `GET` | Creates weekly study plans and strategies | `branch`, `year`, `goals`, `level` |
| `/api/public/study-buddy/explain-topic` | `GET` | Explains CS concepts using analogies & code | `topic`, `level` |
| `/api/public/study-buddy/analyze-resume` | `GET` | Reviews skill keywords for ATS compatibility | `skills`, `experience` |
| `/api/public/study-buddy/generate-quiz` | `GET` | Generates revision multiple-choice questions | `topic`, `count` |
| `/api/public/study-buddy/code-review` | `GET` | Analyzes code for complexity & vulnerabilities | `language`, `code` |
| `/api/public/study-buddy/track-progress` | `GET` | Tracks streaks & increments RPG experience points | `hours`, `topic`, `streak` |
| `/api/public/study-buddy/mock-interview` | `GET` | Simulates HR & tech interview questions | `role`, `difficulty` |

---

## 🛠️ Technology Stack

* **Frontend:** React.js (Vite), Lucide Vectors, Framer Motion transitions.
* **Backend:** Node.js, Express.js Router, Mock AI intelligence layers.
* **Styling:** Custom Grayscale & Neon Cyan CSS system with advanced layouts.
* **Presentations:** `pptxgenjs` Node deck engine.
* **Persistence Ready:** Formatted for MongoDB/PostgreSQL schemas.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Karthhikk18/api-corner.git
   cd api-corner
   ```

2. Install all dependencies for both the frontend and backend:
   ```bash
   npm install
   ```

### Running Locally

1. **Build client assets:**
   ```bash
   npm run build
   ```

2. **Start the Express server:**
   ```bash
   npm run start
   ```

3. Open your browser and navigate to:
   **[http://localhost:5000](http://localhost:5000)**

---

## 📊 PowerPoint Deck Generation

API Corner contains a built-in Node.js presentation generator using `pptxgenjs` to render the business and architecture slides.

To generate/update the `API_Marketplace_Presentation.pptx` file, run:
```bash
node generate_presentation.js
```

---

## 🔮 Future Roadmap

* **Phase 1 (Performance Core):** Migrate mock endpoints into high-performance Python FastAPI threads and integrate a Redis cache.
* **Phase 2 (Secure Platform):** Setup PostgreSQL/MongoDB persistence and build live Socket.io study and collaboration rooms.
* **Phase 3 (Advanced AI features):** Introduce WebRTC for real-time AI Voice tutoring and auto-generate concept mindmaps.
