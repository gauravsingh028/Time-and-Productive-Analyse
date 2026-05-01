const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";
const getToken = () => localStorage.getItem("token");

// Centralized helper to handle auth errors and JSON parsing
const request = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (res.status === 401) {
    // Token is missing/invalid/expired — clear and force re-auth
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return res.json();
};

export const fetchTodayTotal = async () => request("/api/analytics/today");

export const fetchCategoryAnalytics = async () =>
  request("/api/analytics/category");

export const fetchDailyAnalytics = async () => request("/api/analytics/daily");

export const fetchWeeklyAnalytics = async () => request("/api/analytics/weekly");

export const fetchProductivityScore = async () =>
  request("/api/analytics/productivity");

export const fetchTodayProductivity = async () =>
  request("/api/analytics/productivity/today");

export const fetchWeeklyProductivity = async () =>
  request("/api/analytics/productivity/week");
