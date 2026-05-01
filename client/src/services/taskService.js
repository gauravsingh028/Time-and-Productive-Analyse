// Connects React → Backend
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";
const getToken = () => localStorage.getItem("token");

const handleAuth = (res) => {
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
};

export const fetchTasks = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    handleAuth(res);

    if (!res.ok) {
      console.error("Failed to fetch tasks:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const addTask = async (taskData) => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(taskData),
    });

    handleAuth(res);

    const data = await res.json();
    
    if (!res.ok) {
      return { error: true, message: data.message || "Failed to add task" };
    }

    return { error: false, ...data };
  } catch (error) {
    return { error: true, message: "Network error. Please check if the server is running." };
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    handleAuth(res);

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    return { error: false };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { error: true, message: error.message };
  }
};

export const updateTask = async (id, updatedData) => {
  try {
    const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(updatedData),
    });

    handleAuth(res);

    const data = await res.json();

    if (!res.ok) {
      return { error: true, message: data.message || "Failed to update task" };
    }

    return { error: false, ...data };
  } catch (error) {
    return { error: true, message: "Network error. Please try again." };
  }
};
