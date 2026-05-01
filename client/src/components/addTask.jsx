import { useState } from "react";
import { addTask } from "../services/taskService";

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [category, setCategory] = useState("Study");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !timeSpent) {
      setError("Title and time are required");
      return;
    }

    if (Number(timeSpent) <= 0) {
      setError("Time must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const newTask = {
        title,
        timeSpent: Number(timeSpent),
        category,
      };

      const result = await addTask(newTask);

      if (result.error) {
        setError(result.message || "Failed to add task");
        setLoading(false);
        return;
      }

      // Clear form on success
      setTitle("");
      setTimeSpent("");
      setCategory("Study");
      setLoading(false);

      // Refresh the task list and analytics after a brief delay
      // to ensure backend has fully processed the request
      if (onTaskAdded) {
        setTimeout(() => {
          onTaskAdded();
        }, 500);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2 className="form-title">➕ Add New Task</h2>
      {error && <div className="auth-error" style={{ marginBottom: "12px" }}>{error}</div>}
      <div className="form-grid">
        <input
          className="form-input"
          type="text"
          placeholder="What did you work on?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          disabled={loading}
          required
        />
        <input
          className="form-input"
          type="number"
          placeholder="Minutes"
          value={timeSpent}
          onChange={(e) => {
            setTimeSpent(e.target.value);
            setError("");
          }}
          min="1"
          disabled={loading}
          required
        />
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        >
          <option>Study</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Other</option>
        </select>
        <button 
          className="form-submit-btn" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default AddTask;
