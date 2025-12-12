import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCollaboration } from "../contexts/CollaborationContext";
import TodoLists from "./TodoLists";
import ActivityLog from "./ActivityLog";
import ThemeToggle from "./ThemeToggle";

export default function TodoApp() {
  const { user, logout } = useAuth();
  const { join, leave } = useCollaboration();

  useEffect(() => {
    if (user) {
      join(user.name);
      // Clean up on unmount/logout
      return () => leave(user.name);
    }
  }, [user, join, leave]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ThemeToggle />
      <header className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Collaborative Todo App</h1>
        <div>
          <span className="mr-4">Hello, {user.name}!</span>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4">
        <TodoLists />
        <ActivityLog />
      </main>
    </div>
  );
}
