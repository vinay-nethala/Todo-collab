import React from "react";
import { useCollaboration } from "../contexts/CollaborationContext";

export default function ActivityLog() {
  const { activityLog, onlineUsers } = useCollaboration();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-xl 
                    bg-white/70 dark:bg-gray-800/70 backdrop-blur border
                    border-gray-300 dark:border-gray-700">
      
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-300">
        Collaboration Panel
      </h2>

      {/* Online Users Box */}
      <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700">
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">
          👥 Online Users ({onlineUsers.length})
        </h3>

        {onlineUsers.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 italic">No users online</p>
        ) : (
          <ul className="space-y-2">
            {onlineUsers.map((u, i) => (
              <li 
                key={i} 
                className="px-3 py-2 rounded-lg text-sm font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 shadow-sm flex items-center gap-2"
              >
                🟢 {u}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Activity Log Box */}
      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          📜 Activity Log
        </h3>

        {activityLog.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 italic">No activity yet</p>
        ) : (
          <ul className="max-h-40 overflow-y-auto space-y-2">
            {activityLog.map((log, i) => (
              <li 
                key={i}
                className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow text-sm"
              >
                <span className="font-semibold text-blue-500 dark:text-blue-300">
                  {log.time}
                </span>{" "}
                – {log.message}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}