import React from "react";
import { useCollaboration } from "../contexts/CollaborationContext";

export default function CollaborationStatus() {
  const { onlineUsers, activityLog } = useCollaboration();

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-300 dark:border-gray-700">

      <h2 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-300">
        Collaboration Status
      </h2>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Online Users
        </h3>

        {onlineUsers.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">No active users</p>
        ) : (
          <ul className="space-y-2">
            {onlineUsers.map((user, i) => (
              <li 
                key={i}
                className="px-3 py-2 bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 rounded-md shadow-sm"
              >
                🟢 {user}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Activity Log
        </h3>

        {activityLog.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">No activity yet</p>
        ) : (
          <ul className="max-h-40 overflow-y-auto space-y-2">
            {activityLog.map((entry, i) => (
              <li 
                key={i}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow text-sm"
              >
                {entry.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}