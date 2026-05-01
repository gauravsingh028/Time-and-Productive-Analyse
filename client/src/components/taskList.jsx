import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../services/taskService";
import AddTask from "./addTask";

function TaskList({ onTaskChange }) {
  const [tasks, setTasks] = useState([]);

  // 🔹 Edit state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    timeSpent: "",
    category: "Study",
  });

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.warn("Unexpected tasks response:", data);
        setTasks([]);
      }
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // 🔹 Delete task
  const handleDelete = async (id) => {
    try {
      const result = await deleteTask(id);
      if (result.error) {
        alert(result.message || "Failed to delete task");
        return;
      }
      // Refresh after delete
      await loadTasks();
      if (onTaskChange) {
        onTaskChange();
      }
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  // 🔹 Start editing
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditData({
      title: task.title,
      timeSpent: task.timeSpent,
      category: task.category,
    });
  };

  // 🔹 Save updated task
  const handleUpdate = async (id) => {
    try {
      const result = await updateTask(id, {
        title: editData.title,
        timeSpent: Number(editData.timeSpent),
        category: editData.category,
      });

      if (result.error) {
        alert(result.message || "Failed to update task");
        return;
      }

      setEditingId(null);
      // Refresh after update
      await loadTasks();
      if (onTaskChange) {
        onTaskChange();
      }
    } catch (error) {
      alert("Failed to update task");
    }
  };

  const handleTaskAdded = async () => {
    try {
      // Refresh tasks
      await loadTasks();
      // Trigger analytics refresh
      if (onTaskChange) {
        onTaskChange();
      }
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  const getCategoryIcon = (cat) => {
    const icons = {
      Study: "📚",
      Work: "💼",
      Personal: "🎯",
      Other: "📝",
    };
    return icons[cat] || "📝";
  };

  const getCategoryColor = (cat) => {
    const colors = {
      Study: "#667eea",
      Work: "#764ba2",
      Personal: "#f093fb",
      Other: "#4facfe",
    };
    return colors[cat] || "#9ca3af";
  };

  return (
    <div className="tasks-container">
      <AddTask onTaskAdded={handleTaskAdded} />

      <h2 className="tasks-title">📋 Your Tasks</h2>

      {(!tasks || tasks.length === 0) && (
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <p className="empty-text">No tasks yet. Add your first task above!</p>
        </div>
      )}

      <div className="tasks-list">
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              {editingId === task._id ? (
                <div className="task-edit-form">
                  <input
                    className="task-edit-input"
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    placeholder="Task title"
                  />
                  <div className="task-edit-row">
                    <input
                      className="task-edit-input-small"
                      type="number"
                      value={editData.timeSpent}
                      onChange={(e) =>
                        setEditData({ ...editData, timeSpent: e.target.value })
                      }
                      placeholder="Minutes"
                    />
                    <select
                      className="task-edit-select"
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                    >
                      <option>Study</option>
                      <option>Work</option>
                      <option>Personal</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="task-edit-actions">
                    <button
                      className="task-btn task-btn-save"
                      onClick={() => handleUpdate(task._id)}
                    >
                      💾 Save
                    </button>
                    <button
                      className="task-btn task-btn-cancel"
                      onClick={() => setEditingId(null)}
                    >
                      ✖️ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-header">
                    <span
                      className="task-category-badge"
                      style={{ backgroundColor: getCategoryColor(task.category) + "20", color: getCategoryColor(task.category) }}
                    >
                      {getCategoryIcon(task.category)} {task.category}
                    </span>
                    <div className="task-time">{task.timeSpent} min</div>
                  </div>
                  <div className="task-body">
                    <h3 className="task-title">{task.title}</h3>
                  </div>
                  <div className="task-actions">
                    <button
                      className="task-btn task-btn-edit"
                      onClick={() => startEdit(task)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="task-btn task-btn-delete"
                      onClick={() => handleDelete(task._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TaskList;
