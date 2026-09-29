import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error CSS side-effect import has no type declarations
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
