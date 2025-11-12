import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";
import "./index.css";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

// Initialize Sentry
Sentry.init({
  dsn:import.meta.env.VITE_SENTRY_DSN
,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Get root container
const container = document.getElementById("root"); // make sure this matches your HTML
const root = createRoot(container);

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
