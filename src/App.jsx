import React, { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useUI } from "./contexts/UIContext";
import { useCollaboration } from "./contexts/CollaborationContext";
import LoginForm from "./components/LoginForm";
import TodoLists from "./components/TodoLists";

export default function App() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useUI();
  const { joinCollaboration, leaveCollaboration } = useCollaboration();

  useEffect(() => {
    if (user) {
      joinCollaboration(user.name);
      return () => leaveCollaboration(user.name);
    }
  }, [user, joinCollaboration, leaveCollaboration]);

  // 🌞 Light Theme
  const lightTheme = {
    background: "linear-gradient(to bottom right, #ffffff, #f3f3f3)",
    color: "#222",
  };

  // 🌙 Dark Theme
  const darkTheme = {
    background: "linear-gradient(to bottom right, #111, #333)",
    color: "white",
  };

  // 🔘 Button styles (smaller & clean)
  const buttonStyle = {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "0.2s",
  };

  const lightButton = {
    ...buttonStyle,
    background: "#e0e0e0",
    color: "#222",
  };

  const darkButton = {
    ...buttonStyle,
    background: "#444",
    color: "white",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px",
        transition: "0.3s",
        ...(theme === "dark" ? darkTheme : lightTheme),
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "10px 16px",
          borderRadius: "10px",
          marginBottom: "16px",
          display: "flex",
          flexWrap: "wrap",      // ✅ responsive
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            theme === "dark"
              ? "rgba(30,30,30,0.85)"
              : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "18px",    // 🔽 smaller title
            fontWeight: "700",
          }}
        >
          ✨ Collaborative Todo App
        </h1>

        <button
          onClick={toggleTheme}
          style={theme === "dark" ? darkButton : lightButton}
        >
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      {/* MAIN CONTENT */}
      {user ? (
        <TodoLists />
      ) : (
        <div style={{ paddingTop: "30px" }}>
          <LoginForm />
        </div>
      )}
    </div>
  );
}
