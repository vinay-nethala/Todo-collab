import React, { createContext, useContext, useState, useCallback } from "react";

const CollaborationContext = createContext();

export function CollaborationProvider({ children }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

  const joinCollaboration = useCallback((username) => {
    setOnlineUsers((users) => {
      if (!users.includes(username)) {
        return [...users, username];
      }
      return users;
    });

    addActivity(`${username} joined`);
  }, []);

  const leaveCollaboration = useCallback((username) => {
    setOnlineUsers((users) => users.filter((user) => user !== username));
    addActivity(`${username} left`);
  }, []);

  const addActivity = useCallback((text) => {
    setActivityLog((log) => [...log, text].slice(-50)); // Keep last 50 activities
  }, []);

  const shareTodoUpdate = useCallback(
    (text) => {
      addActivity(text);
    },
    [addActivity]
  );

  return (
    <CollaborationContext.Provider
      value={{ onlineUsers, activityLog, joinCollaboration, leaveCollaboration, shareTodoUpdate }}
    >
      {children}
    </CollaborationContext.Provider>
  );
}

export function useCollaboration() {
  return useContext(CollaborationContext);
}
