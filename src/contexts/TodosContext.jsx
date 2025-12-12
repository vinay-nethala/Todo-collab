import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [todoLists, setTodoLists] = useState([]);

  function addList(title) {
    const newList = { id: uuidv4(), title, tasks: [] };
    setTodoLists((lists) => [...lists, newList]);
  }

  function deleteList(listId) {
    setTodoLists((lists) => lists.filter((list) => list.id !== listId));
  }

  function addTask(listId, text) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                { id: uuidv4(), text, completed: false, subtasks: [], tags: [] },
              ],
            }
          : list
      )
    );
  }

  function toggleTask(listId, taskId) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      )
    );
  }

  function deleteTask(listId, taskId) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
          : list
      )
    );
  }

  function updateTask(listId, taskId, newText) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, text: newText } : task
              ),
            }
          : list
      )
    );
  }

  // Subtasks

  function addSubtask(listId, taskId, text) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    subtasks: [
                      ...task.subtasks,
                      { id: uuidv4(), text, completed: false },
                    ],
                  };
                }
                return task;
              }),
            }
          : list
      )
    );
  }

  function toggleSubtask(listId, taskId, subtaskId) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    subtasks: task.subtasks.map((subtask) =>
                      subtask.id === subtaskId
                        ? { ...subtask, completed: !subtask.completed }
                        : subtask
                    ),
                  };
                }
                return task;
              }),
            }
          : list
      )
    );
  }

  function deleteSubtask(listId, taskId, subtaskId) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    subtasks: task.subtasks.filter(
                      (subtask) => subtask.id !== subtaskId
                    ),
                  };
                }
                return task;
              }),
            }
          : list
      )
    );
  }

  // Tags

  function addTag(listId, taskId, tag) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) => {
                if (task.id === taskId) {
                  // Avoid duplicate tags
                  if (!task.tags.includes(tag)) {
                    return {
                      ...task,
                      tags: [...task.tags, tag],
                    };
                  }
                }
                return task;
              }),
            }
          : list
      )
    );
  }

  function removeTag(listId, taskId, tagToRemove) {
    setTodoLists((lists) =>
      lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    tags: task.tags.filter((tag) => tag !== tagToRemove),
                  };
                }
                return task;
              }),
            }
          : list
      )
    );
  }

  return (
    <TodosContext.Provider
      value={{
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
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}