const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5001") + "/api/auth";

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    
    if (!res.ok) {
      return { error: true, message: data.message || "Registration failed" };
    }

    return { error: false, ...data };
  } catch (error) {
    return { error: true, message: "Network error. Please check if the server is running." };
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    
    if (!res.ok) {
      return { error: true, message: data.message || "Login failed" };
    }

    return { error: false, ...data };
  } catch (error) {
    return { error: true, message: "Network error. Please check if the server is running." };
  }
};

export const loginWithGoogle = async (credential) => {
  try {
    const res = await fetch(`${API_URL}/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: true, message: data.message || "Google login failed" };
    }

    return { error: false, ...data };
  } catch (error) {
    return { error: true, message: "Network error. Please check if the server is running." };
  }
};
