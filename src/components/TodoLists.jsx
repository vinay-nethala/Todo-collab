import React, { useState } from "react";
import { useTodos } from "../contexts/TodosContext";
import { useCollaboration } from "../contexts/CollaborationContext";
import { useAuth } from "../contexts/AuthContext";
import { useUI } from "../contexts/UIContext";

export default function TodoLists() {
  const {
    todoLists,
    addList,
    deleteList,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    addTag,
    removeTag,
  } = useTodos();

  const { onlineUsers, activityLog, shareTodoUpdate } = useCollaboration();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useUI();

  const [newListTitle, setNewListTitle] = useState("");
  const [newTaskText, setNewTaskText] = useState({});
  const [editingTask, setEditingTask] = useState({ listId: null, taskId: null });
  const [editedText, setEditedText] = useState("");
  
  // For subtasks input per task
  const [newSubtaskText, setNewSubtaskText] = useState({});
  
  // For tags input per task
  const [newTagText, setNewTagText] = useState({});

  // Add new list
  const handleAddList = (e) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      addList(newListTitle.trim());
      shareTodoUpdate(`${user.name} added list: "${newListTitle.trim()}"`);
      setNewListTitle("");
    }
  };

  // Add new task
  const handleAddTask = (e, listId) => {
    e.preventDefault();
    const text = newTaskText[listId];
    if (text && text.trim()) {
      addTask(listId, text.trim());
      shareTodoUpdate(`${user.name} added task: "${text.trim()}"`);
      setNewTaskText((prev) => ({ ...prev, [listId]: "" }));
    }
  };

  // Start editing task
  const startEditing = (listId, taskId, currentText) => {
    setEditingTask({ listId, taskId });
    setEditedText(currentText);
  };

  // Save edited task
  const saveEdit = () => {
    updateTask(editingTask.listId, editingTask.taskId, editedText.trim());
    shareTodoUpdate(`${user.name} updated a task`);
    setEditingTask({ listId: null, taskId: null });
    setEditedText("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingTask({ listId: null, taskId: null });
    setEditedText("");
  };

  // Toggle task complete
  const handleToggleTask = (listId, taskId) => {
    toggleTask(listId, taskId);
    shareTodoUpdate(`${user.name} toggled a task complete state`);
  };

  // Delete task
  const handleDeleteTask = (listId, taskId) => {
    deleteTask(listId, taskId);
    shareTodoUpdate(`${user.name} deleted a task`);
  };

  // Delete list
  const handleDeleteList = (listId) => {
    deleteList(listId);
    shareTodoUpdate(`${user.name} deleted a list`);
  };

  // Add new subtask
  const handleAddSubtask = (e, listId, taskId) => {
    e.preventDefault();
    const text = newSubtaskText[taskId];
    if (text && text.trim()) {
      addSubtask(listId, taskId, text.trim());
      shareTodoUpdate(`${user.name} added subtask: "${text.trim()}"`);
      setNewSubtaskText((prev) => ({ ...prev, [taskId]: "" }));
    }
  };

  // Toggle subtask
  const handleToggleSubtask = (listId, taskId, subtaskId) => {
    toggleSubtask(listId, taskId, subtaskId);
    shareTodoUpdate(`${user.name} toggled a subtask complete state`);
  };

  // Delete subtask
  const handleDeleteSubtask = (listId, taskId, subtaskId) => {
    deleteSubtask(listId, taskId, subtaskId);
    shareTodoUpdate(`${user.name} deleted a subtask`);
  };

  // Add new tag
  const handleAddTag = (e, listId, taskId) => {
    e.preventDefault();
    const tag = newTagText[taskId];
    if (tag && tag.trim()) {
      addTag(listId, taskId, tag.trim());
      shareTodoUpdate(`${user.name} added tag: "${tag.trim()}"`);
      setNewTagText((prev) => ({ ...prev, [taskId]: "" }));
    }
  };

  // Remove tag
  const handleRemoveTag = (listId, taskId, tag) => {
    removeTag(listId, taskId, tag);
    shareTodoUpdate(`${user.name} removed tag: "${tag}"`);
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h2>Hello, {user.name}</h2>
        <div>
          <button onClick={toggleTheme} style={{ marginRight: 10 }}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
          <button
            onClick={logout}
            style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "6px 12px", cursor: "pointer" }}
          >
            Logout
          </button>
        </div>
      </header>

      <form onSubmit={handleAddList} style={{ display: "flex", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="New list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          required
          style={{ flexGrow: 1, padding: 8, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add List
        </button>
      </form>

      {todoLists.length === 0 && <p>No todo lists yet.</p>}

      {todoLists.map((list) => (
        <div
          key={list.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: 15,
            marginBottom: 20,
            backgroundColor: theme === "light" ? "#fff" : "#333",
            color: theme === "light" ? "#000" : "#fff",
          }}
        >
          <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {list.title}
            <button
              onClick={() => handleDeleteList(list.id)}
              style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}
            >
              Delete List
            </button>
          </h3>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {list.tasks.map((task) => (
              <li key={task.id} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {editingTask.listId === list.id && editingTask.taskId === task.id ? (
                    <>
                      <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        style={{ flexGrow: 1, marginRight: 10, padding: 6 }}
                      />
                      <button onClick={saveEdit} disabled={!editedText.trim()} style={{ marginRight: 5 }}>
                        Save
                      </button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <span
                        onClick={() => handleToggleTask(list.id, task.id)}
                        style={{ cursor: "pointer", textDecoration: task.completed ? "line-through" : "none", flexGrow: 1 }}
                        title="Toggle complete"
                      >
                        {task.text}
                      </span>
                      <div>
                        <button onClick={() => startEditing(list.id, task.id, task.text)} style={{ marginRight: 5 }}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteTask(list.id, task.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>

                {/* Tags UI */}
                <div style={{ marginTop: 6 }}>
                  {task.tags && task.tags.length > 0 && (
                    <div style={{ marginBottom: 6 }}>
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            display: "inline-block",
                            backgroundColor: theme === "light" ? "#ddd" : "#555",
                            color: theme === "light" ? "#000" : "#fff",
                            padding: "2px 8px",
                            borderRadius: 12,
                            marginRight: 6,
                            fontSize: 12,
                            cursor: "default",
                            userSelect: "none",
                          }}
                        >
                          {tag}{" "}
                          <button
                            onClick={() => handleRemoveTag(list.id, task.id, tag)}
                            style={{
                              marginLeft: 4,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "red",
                              fontWeight: "bold",
                              fontSize: 14,
                              lineHeight: 1,
                            }}
                            title="Remove tag"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <form
                    onSubmit={(e) => handleAddTag(e, list.id, task.id)}
                    style={{ display: "flex", marginTop: 4, maxWidth: 200 }}
                  >
                    <input
                      type="text"
                      placeholder="Add tag"
                      value={newTagText[task.id] || ""}
                      onChange={(e) =>
                        setNewTagText((prev) => ({
                          ...prev,
                          [task.id]: e.target.value,
                        }))
                      }
                      style={{ flexGrow: 1, padding: 4, fontSize: 14 }}
                    />
                    <button type="submit" style={{ marginLeft: 4 }}>
                      +
                    </button>
                  </form>
                </div>

                {/* Subtasks UI */}
                <ul style={{ listStyle: "none", paddingLeft: 20, marginTop: 6 }}>
                  {task.subtasks &&
                    task.subtasks.map((subtask) => (
                      <li
                        key={subtask.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 4,
                        }}
                      >
                        <label style={{ flexGrow: 1, cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => handleToggleSubtask(list.id, task.id, subtask.id)}
                            style={{ marginRight: 8 }}
                          />
                          <span style={{ textDecoration: subtask.completed ? "line-through" : "none" }}>
                            {subtask.text}
                          </span>
                        </label>
                        <button
                          onClick={() => handleDeleteSubtask(list.id, task.id, subtask.id)}
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                            border: "none",
                            padding: "2px 8px",
                            cursor: "pointer",
                            fontSize: 12,
                            borderRadius: 4,
                          }}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  <li>
                    <form
                      onSubmit={(e) => handleAddSubtask(e, list.id, task.id)}
                      style={{ display: "flex", marginTop: 4 }}
                    >
                      <input
                        type="text"
                        placeholder="Add subtask"
                        value={newSubtaskText[task.id] || ""}
                        onChange={(e) =>
                          setNewSubtaskText((prev) => ({
                            ...prev,
                            [task.id]: e.target.value,
                          }))
                        }
                        style={{ flexGrow: 1, padding: 6, fontSize: 14 }}
                      />
                      <button type="submit" style={{ marginLeft: 4 }}>
                        +
                      </button>
                    </form>
                  </li>
                </ul>
              </li>
            ))}
          </ul>

          <form onSubmit={(e) => handleAddTask(e, list.id)} style={{ display: "flex", marginTop: 10 }}>
            <input
              type="text"
              placeholder="New task"
              value={newTaskText[list.id] || ""}
              onChange={(e) =>
                setNewTaskText((prev) => ({
                  ...prev,
                  [list.id]: e.target.value,
                }))
              }
              required
              style={{ flexGrow: 1, padding: 8, fontSize: 16 }}
            />
            <button type="submit">Add Task</button>
          </form>
        </div>
      ))}

      <section style={{ marginTop: 40 }}>
        <h3>Online Users</h3>
        {onlineUsers.length === 0 ? (
          <p>No users online.</p>
        ) : (
          <ul>
            {onlineUsers.map((username) => (
              <li key={username}>{username}</li>
            ))}
          </ul>
        )}

        <h3>Activity Log</h3>
        {activityLog.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          <ul>
            {activityLog.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}