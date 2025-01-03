import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
//import { MyProvider } from "./Hellfire.tsx";

//Not Using Backend Engine until game is released
//Which is <MyProvider></MyProvider>

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <App />
  </StrictMode>
);
