const pptxgen = require('pptxgenjs');
let pptx = new pptxgen();

// Set presentation layout to 16:9 widescreen
pptx.layout = 'LAYOUT_16x9';

// Color Palette Definition
const BG_COLOR = '0D0D0D';       // Dark Slate / Black
const ACCENT_COLOR = '00F3FF';   // Neon Cyan / Blue
const TITLE_COLOR = 'FFFFFF';    // White
const TEXT_COLOR = 'AAAAAA';     // Light Gray for body
const SUCCESS_COLOR = '00F3FF';  // Success highlight

// Slide 1: Title Slide
let slide1 = pptx.addSlide();
slide1.background = { fill: BG_COLOR };

// Main Title Box
slide1.addText(
  [
    { text: "API CORNER\n", options: { fontFace: 'Outfit', fontSize: 64, bold: true, color: ACCENT_COLOR } },
    { text: "A Scalable, Unified API Marketplace & Gateway Platform\n\n\n\n", options: { fontFace: 'Inter', fontSize: 24, color: TITLE_COLOR } },
    { text: "Presented by Pedavegi Karthikeya\n", options: { fontFace: 'Inter', fontSize: 18, bold: true, color: TITLE_COLOR } },
    { text: "B.Tech CSE (AI) | Parul University | github.com/Karthhikk18", options: { fontFace: 'Inter', fontSize: 14, color: TEXT_COLOR } }
  ],
  {
    x: 1.0,
    y: 2.0,
    w: 11.33,
    h: 4.5,
    valign: 'middle'
  }
);

// Helper function to add headers
function addHeader(slide, text) {
  slide.addText(text, {
    x: 1.0,
    y: 0.6,
    w: 11.33,
    h: 0.8,
    fontFace: 'Outfit',
    fontSize: 36,
    bold: true,
    color: ACCENT_COLOR,
    valign: 'middle'
  });
}

// Slide 2: The Problem
let slide2 = pptx.addSlide();
slide2.background = { fill: BG_COLOR };
addHeader(slide2, "The Problem");

slide2.addText(
  [
    { text: "▪  Fragmentation of Tools: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Developers waste valuable time searching and evaluating APIs scattered across dozens of individual portals.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Integration Bottlenecks: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Simple prototyping is hindered by required logins, API key subscriptions, or complex setup scripts.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  No Sandbox Environment: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Testing response structures typically forces developers to write dummy backend queries rather than running quick sandbox requests.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Complex Gateway Deployments: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Designing systems that safely route requests, implement rate limiters, and track client API keys is a heavy engineering lift.", options: { color: TEXT_COLOR } }
  ],
  {
    x: 1.0,
    y: 1.8,
    w: 11.33,
    h: 5.0,
    fontFace: 'Inter',
    fontSize: 16
  }
);

// Slide 3: The Solution
let slide3 = pptx.addSlide();
slide3.background = { fill: BG_COLOR };
addHeader(slide3, "The Solution: API Corner");

slide3.addText(
  [
    { text: "▪  Unified API Directory: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "A single, highly organized interface for exploring utility, AI, and development APIs.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Zero-Config Playground: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Test and inspect JSON payloads live in the browser using an interactive, terminal-style playground environment.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Robust API Gateway Model: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Behind-the-scenes microservices setup that handles secure request routing, network optimization, and uniform headers.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Live Developer Dashboard: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Gives consumers instant access to their client keys, usage metrics, data traffic records, and latency logs.", options: { color: TEXT_COLOR } }
  ],
  {
    x: 1.0,
    y: 1.8,
    w: 11.33,
    h: 5.0,
    fontFace: 'Inter',
    fontSize: 16
  }
);

// Slide 4: Why API Corner?
let slide4 = pptx.addSlide();
slide4.background = { fill: BG_COLOR };
addHeader(slide4, "Why API Corner?");

slide4.addText(
  [
    { text: "▪  Cutting-Edge Visual Aesthetics: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Built with a state-of-the-art glassmorphism design system, smooth fade-in animations, and a monochrome/neon-cyan color scheme.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Direct Resume Link: AI ROI Performance Analyzer: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Seamless integration with Karthikeya's core AI analytics project, exposing machine learning prediction endpoints directly to consumers.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Built for Production Scale: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Leverages standard API protection techniques (Rate-Limiting, API key authentication) to prevent DDoS attacks and server overloads.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Streamlined Onboarding: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Offers fast social login workflows (GitHub & Email) enabling developers to deploy applications in under 60 seconds.", options: { color: TEXT_COLOR } }
  ],
  {
    x: 1.0,
    y: 1.8,
    w: 11.33,
    h: 5.0,
    fontFace: 'Inter',
    fontSize: 16
  }
);

// Slide 5: Tech Stack & Architecture (Two columns)
let slide5 = pptx.addSlide();
slide5.background = { fill: BG_COLOR };
addHeader(slide5, "Technical Architecture & Tech Stack");

// Left Column: Frontend
slide5.addText(
  [
    { text: "FRONTEND PRESENTATION LAYER\n\n", options: { fontFace: 'Outfit', fontSize: 20, bold: true, color: ACCENT_COLOR } },
    { text: "▪  React.js (Vite): ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Fast rendering speed and component modularity.\n\n", options: { color: TEXT_COLOR } },
    { text: "▪  Vanilla CSS System: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Handles keyframe glows, dark mode variables, and backdrop filters.\n\n", options: { color: TEXT_COLOR } },
    { text: "▪  React Router & State: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Controls auth flags and routes between Dashboard, Auth, and Marketplace.\n\n", options: { color: TEXT_COLOR } },
    { text: "▪  Lucide Vector Styling: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Responsive icon integration with dynamic color mappings.", options: { color: TEXT_COLOR } }
  ],
  {
    x: 1.0,
    y: 1.8,
    w: 5.0,
    h: 5.0,
    fontFace: 'Inter',
    fontSize: 14
  }
);

// Right Column: Backend
slide5.addText(
  [
    { text: "BACKEND MICROSERVICES LAYER\n\n", options: { fontFace: 'Outfit', fontSize: 20, bold: true, color: ACCENT_COLOR } },
    { text: "▪  Python & REST APIs: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Backend routes built for analytics models and service orchestration.\n\n", options: { color: TEXT_COLOR } },
    { text: "▪  Docker Containers: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Encapsulates services to guarantee consistency across environments.\n\n", options: { color: TEXT_COLOR } },
    { text: "▪  Unified API Gateway: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Manages central traffic routing, load-balancing, and response formats.\n\n", options: { color: TEXT_COLOR } },
    { text: "▪  Git & Version Control: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Enables robust collaborative version workflows and branch protection.", options: { color: TEXT_COLOR } }
  ],
  {
    x: 7.0,
    y: 1.8,
    w: 5.33,
    h: 5.0,
    fontFace: 'Inter',
    fontSize: 14
  }
);

// Slide 6: Future Roadmap
let slide6 = pptx.addSlide();
slide6.background = { fill: BG_COLOR };
addHeader(slide6, "Future Scope: Next-Gen Integrations");

slide6.addText(
  [
    { text: "▪  Migration to Asynchronous FastAPI: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Refactoring simulated API gateways into high-performance Python FastAPI worker threads to support high concurrency.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Redis Distributed Cache & Limiter: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Moving mock rate limiters into a distributed Redis token-bucket system for reliable server protection.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Active OAuth & PostgreSQL DB: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Replacing mock auth actions with production OAuth2 (GitHub/Google) and syncing stats with a secure PostgreSQL database.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Interactive Data Charts: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Integrating charting tools (like Recharts) on the user Dashboard to display live API requests, latencies, and server load.\n\n", options: { color: TEXT_COLOR } },
    
    { text: "▪  Auto-Generated Client SDKs: ", options: { bold: true, color: TITLE_COLOR } },
    { text: "Providing one-click, custom-compiled client SDK download options in multiple languages (Python, Go, Node.js).", options: { color: TEXT_COLOR } }
  ],
  {
    x: 1.0,
    y: 1.8,
    w: 11.33,
    h: 5.0,
    fontFace: 'Inter',
    fontSize: 16
  }
);

// Save the Presentation
pptx.writeFile({ fileName: 'API_Marketplace_Presentation.pptx' })
  .then(fileName => {
    console.log(`Successfully generated: ${fileName}`);
  })
  .catch(err => {
    console.error('Error generating presentation:', err);
  });
