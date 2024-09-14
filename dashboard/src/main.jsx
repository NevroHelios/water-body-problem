import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./DelhiWaterDashboard.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
