import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { TodosProvider } from "./contexts/TodosContext";
import { CollaborationProvider } from "./contexts/CollaborationContext";
import { UIProvider } from "./contexts/UIContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CollaborationProvider>
      <TodosProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </TodosProvider>
    </CollaborationProvider>
  </AuthProvider>
);
