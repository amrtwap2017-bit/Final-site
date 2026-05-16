/* ══════════════════════════════════════════════════════════════════
   TRIANGLE BLACK — Application Entry Point
   src/main.tsx
   
   Responsibilities:
   ├── Font imports (self-hosted via @fontsource)
   ├── Global CSS
   └── React DOM mount
══════════════════════════════════════════════════════════════════ */

// ── Self-Hosted Fonts (@fontsource) ──────────────────────────────
// Cormorant Garamond — Display / Hero / Headings
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/300-italic.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource/cormorant-garamond/700-italic.css';

// Inter — UI / Body / Navigation
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

// JetBrains Mono — Technical / Data / Labels
import '@fontsource/jetbrains-mono/300.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';

// ── Global Stylesheet ─────────────────────────────────────────────
import './index.css';

// ── React Core ────────────────────────────────────────────────────
import React from 'react';
import ReactDOM from 'react-dom/client';

// ── Root Component ────────────────────────────────────────────────
import App from './App';

// ── Mount ─────────────────────────────────────────────────────────
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    '[Triangle Black] Root element #root not found in index.html. ' +
    'Ensure <div id="root"></div> exists in your HTML.'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);