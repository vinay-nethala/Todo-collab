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

  const lightTheme = {
    background: "linear-gradient(to bottom right, #ffffff, #f3f3f3)",
    color: "#222",
  };

  const darkTheme = {
    background: "linear-gradient(to bottom right, #111, #333)",
    color: "white",
  };

  const buttonStyle = {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
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
        padding: "20px",
        transition: "0.3s",
        ...(theme === "dark" ? darkTheme : lightTheme),
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "15px 25px",
          borderRadius: "15px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: theme === "dark" ? "rgba(40,40,40,0.7)" : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0 }}>✨ Collaborative Todo App</h1>

        <button
          onClick={toggleTheme}
          style={theme === "dark" ? darkButton : lightButton}
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Page Content */}
      {user ? (
        <TodoLists />
      ) : (
        <div style={{ paddingTop: "40px" }}>
          <LoginForm />
        </div>
      )}
    </div>
  );
}