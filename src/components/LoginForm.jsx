import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      login(username.trim());
      setError("");
    } else {
      setError("Both username and password are required.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 5, marginBottom: 15 }}
          autoFocus
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 5, marginBottom: 15 }}
        />
      </label>

      {error && <div style={{ color: "red", marginBottom: 15 }}>{error}</div>}

      <button
        type="submit"
        style={{ width: "100%", padding: 10, backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 4 }}
      >
        Login
      </button>
    </form>
  );
}
