const pptxgen = require('pptxgenjs');
let pptx = new pptxgen();

// Set presentation layout to 16:9 widescreen
pptx.layout = 'LAYOUT_16x9';

// Color Palette Definition
const BG_COLOR = '080808';       // Rich dark background
const CARD_BG = '121212';        // Sleek card background
const CARD_BORDER = '222222';    // Card border
const ACCENT_COLOR = '00F3FF';   // Neon Cyan / Blue
const TITLE_COLOR = 'FFFFFF';    // Crisp White
const TEXT_COLOR = 'A0A0A0';     // Muted text gray

// Helper: Add background and header to a slide
function createBaseSlide(titleText) {
  let slide = pptx.addSlide();
  slide.background = { fill: BG_COLOR };
  
  // Header title
  slide.addText(titleText, {
    x: 1.0,
    y: 0.5,
    w: 11.33,
    h: 0.8,
    fontFace: 'Outfit',
    fontSize: 32,
    bold: true,
    color: ACCENT_COLOR,
    valign: 'middle'
  });
  
  // Neon subheader accent line (using a slim rectangle shape)
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 1.0,
    y: 1.25,
    w: 2.0,
    h: 0.04,
    fill: { color: ACCENT_COLOR }
  });
  
  return slide;
}

// Helper: Add a styled card with text
function addCard(slide, x, y, w, h, cardTitle, bulletItems) {
  // 1. Draw rounded card shape
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: CARD_BG },
    line: { color: CARD_BORDER, width: 1 }
  });

  // 2. Draw Title inside card
  slide.addText(cardTitle, {
    x: x + 0.25,
    y: y + 0.2,
    w: w - 0.5,
    h: 0.4,
    fontFace: 'Outfit',
    fontSize: 16,
    bold: true,
    color: ACCENT_COLOR,
    wrap: true
  });

  // 3. Draw bullet items
  let textRuns = [];
  bulletItems.forEach((item, index) => {
    if (index > 0) {
      textRuns.push({ text: "\n\n", options: { fontSize: 12 } });
    }
    textRuns.push({ text: item, options: { fontFace: 'Inter', fontSize: 13, color: TEXT_COLOR } });
  });

  slide.addText(textRuns, {
    x: x + 0.25,
    y: y + 0.7,
    w: w - 0.5,
    h: h - 0.9,
    valign: 'top',
    wrap: true
  });
}

// ==========================================
// Slide 1: Title Slide
// ==========================================
let slide1 = pptx.addSlide();
slide1.background = { fill: BG_COLOR };

// Decorative left accent bar
slide1.addShape(pptx.shapes.RECTANGLE, {
  x: 1.0,
  y: 2.0,
  w: 0.1,
  h: 3.5,
  fill: { color: ACCENT_COLOR }
});

slide1.addText(
  [
    { text: "API CORNER\n", options: { fontFace: 'Outfit', fontSize: 60, bold: true, color: ACCENT_COLOR } },
    { text: "A Unified Open-Source API Marketplace & Gateway\n\n", options: { fontFace: 'Inter', fontSize: 20, color: TITLE_COLOR } },
    { text: "Presented by Pedavegi Karthikeya\n", options: { fontFace: 'Inter', fontSize: 14, color: TITLE_COLOR, bold: true } },
    { text: "B.Tech CSE (AI) | github.com/Karthhikk18", options: { fontFace: 'Inter', fontSize: 12, color: TEXT_COLOR } }
  ],
  {
    x: 1.3,
    y: 2.0,
    w: 11.0,
    h: 3.5,
    valign: 'middle',
    wrap: true
  }
);

// ==========================================
// Slide 2: The Problem
// ==========================================
let slide2 = createBaseSlide("The Problem");
// 2x2 Grid of Cards
addCard(slide2, 1.0, 1.8, 5.4, 2.3, "01 / Fragmentation of Tools", [
  "Developers waste hours searching, subscribing, and evaluating API tools across multiple scattered providers."
]);
addCard(slide2, 6.93, 1.8, 5.4, 2.3, "02 / Integration Hurdles", [
  "Testing endpoints is restricted by paid subscription tiers, forced registrations, or complex client SDK setup scripts."
]);
addCard(slide2, 1.0, 4.5, 5.4, 2.3, "03 / Lack of Real-Time Sandbox", [
  "No immediate feedback loop to inspect response schemas directly in the browser, forcing developers to code custom test environments."
]);
addCard(slide2, 6.93, 4.5, 5.4, 2.3, "04 / Gateway Engineering Complexity", [
  "Designing secure system gateways that safely manage authorization keys, handle rate limits, and record analytics calls is difficult."
]);

// ==========================================
// Slide 3: The Solution
// ==========================================
let slide3 = createBaseSlide("The Solution");
addCard(slide3, 1.0, 1.8, 5.4, 2.3, "01 / Centralized API Directory", [
  "A structured, premium catalog exposing diverse APIs from machine learning performance analyzers to blockchain wallets."
]);
addCard(slide3, 6.93, 1.8, 5.4, 2.3, "02 / Terminal-Style Sandbox", [
  "Inspect active API payloads in real-time. Features copy-to-clipboard blocks and instantly formatted JSON schemas."
]);
addCard(slide3, 1.0, 4.5, 5.4, 2.3, "03 / Integrated API Gateway", [
  "Under-the-hood controller handling unified request headers, route mapping, and network optimization."
]);
addCard(slide3, 6.93, 4.5, 5.4, 2.3, "04 / Consumer Analytics Dashboard", [
  "A private workspace showing generated keys, data usage limits, latencies, and transaction logs."
]);

// ==========================================
// Slide 4: Why API Corner?
// ==========================================
let slide4 = createBaseSlide("Why API Corner?");
addCard(slide4, 1.0, 1.8, 5.4, 2.3, "Modern Aesthetics", [
  "Engineered using clean glassmorphism patterns, micro-animations, and a highly polished grayscale & neon blue styling."
]);
addCard(slide4, 6.93, 1.8, 5.4, 2.3, "Portfolio Integration", [
  "Directly aggregates Karthikeya's 'AI ROI Performance Analyzer' to run predictive insight queries in real time."
]);
addCard(slide4, 1.0, 4.5, 5.4, 2.3, "Production Guardrails", [
  "Includes secure client token generation, cryptographic authorization headers, and simulated delay limits to defend services."
]);
addCard(slide4, 6.93, 4.5, 5.4, 2.3, "Developer Velocity", [
  "Instant registration with zero friction, offering social git profiles to start query testing under one minute."
]);

// ==========================================
// Slide 5: Tech Stack & Architecture
// ==========================================
let slide5 = createBaseSlide("Technical Architecture & Stack");

// Left Column: Frontend
addCard(slide5, 1.0, 1.8, 5.4, 5.0, "Frontend Presentation Layer", [
  "▪ React.js (Vite): Modular UI structure ensuring fast single-page app loading.",
  "▪ Vanilla CSS System: Flexible styling representing glows, card borders, and dark mode layouts.",
  "▪ State Router: Seamless navigation across Dashboard, Auth dashboard, and API detailed logs.",
  "▪ Lucide Icons: Glowing cyan vector representations."
]);

// Right Column: Backend
addCard(slide5, 6.93, 1.8, 5.4, 5.0, "Backend Microservices Layer", [
  "▪ Python & Node.js: High efficiency controllers and modular API servers.",
  "▪ Docker Containment: Standardized local/cloud staging environments.",
  "▪ Gateway Routing: Intermediary proxy handling CORS limits, headers, and request tracking.",
  "▪ Git & GitHub: Maintained clean branch integrations for codebase safety."
]);

// ==========================================
// Slide 6: Future Roadmap
// ==========================================
let slide6 = createBaseSlide("Future Roadmap");
// 3 Columns representing 3 Phases
addCard(slide6, 1.0, 1.8, 3.5, 5.0, "Phase 1: Performance Core", [
  "▪ FastAPI Migration: Port Mock backend controllers into async Python threads for high throughput.",
  "▪ Redis Cache: Introduce Redis cache mechanisms to manage rate limits and cache persistent payloads."
]);
addCard(slide6, 4.91, 1.8, 3.5, 5.0, "Phase 2: Secure Platform", [
  "▪ Production Auth: Build OAuth 2.0 (GitHub/Google) authentication flows.",
  "▪ Database Sync: Deploy a secure PostgreSQL database to store and manage actual consumer metric rows."
]);
addCard(slide6, 8.82, 1.8, 3.5, 5.0, "Phase 3: Developer Utility", [
  "▪ Analytics Charts: Integrate UI charting (Recharts) inside the dashboard for requests/latency.",
  "▪ SDK Generation: Export client library SDK packages (Python/JS/Go) for sandbox integrations."
]);

// Save the Presentation
pptx.writeFile({ fileName: 'API_Marketplace_Presentation.pptx' })
  .then(fileName => {
    console.log(`Successfully generated: ${fileName}`);
  })
  .catch(err => {
    console.error('Error generating presentation:', err);
  });
