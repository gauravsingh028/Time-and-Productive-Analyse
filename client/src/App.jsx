import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import TaskList from "./components/taskList";
import AnalyticsDashboard from "./components/analyticsDashboard";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedRoute";

function Blogs() {
  const posts = [
    {
      id: 1,
      title: "Designing your ideal focus day",
      meta: "7 min read · Routines",
      body: "Learn how to structure deep work blocks, recovery time, and admin tasks so your energy and calendar finally agree.",
      tags: ["Deep work", "Planning", "Energy"],
    },
    {
      id: 2,
      title: "From tracking time to changing habits",
      meta: "5 min read · Behavior",
      body: "Why seeing your time data is step one—and how to actually act on it without feeling overwhelmed.",
      tags: ["Habits", "Analytics", "Behavior change"],
    },
    {
      id: 3,
      title: "The psychology of unfinished tasks",
      meta: "4 min read · Mindset",
      body: "Discover how the Zeigarnik effect can be used to your advantage instead of draining your attention.",
      tags: ["Mindset", "Attention"],
    },
  ];

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="app-shell">
      <h1 className="page-heading">FocusFlow Studio</h1>
      <p className="page-subtitle">
        Short, practical reads on building a calmer, more intentional workday.
      </p>

      <div className="blog-layout">
        <article className="blog-featured">
          <div className="pill-row">
            {featured.tags.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>
          <h2 className="blog-featured-title">{featured.title}</h2>
          <div className="blog-featured-meta">{featured.meta}</div>
          <p className="blog-featured-body">{featured.body}</p>
        </article>

        <aside className="blog-side">
          <div className="blog-side-heading">More from FocusFlow</div>
          {rest.map((post, idx) => (
            <article key={post.id} className="info-card">
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                <span style={{ fontSize: "24px", marginTop: "2px" }}>
                  {idx === 0 ? "📝" : "💡"}
                </span>
                <div style={{ flex: 1 }}>
                  <div className="pill-row">
                    {post.tags.map((t) => (
                      <span key={t} className="pill">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="info-card-title">{post.title}</h2>
                  <p className="info-card-meta">{post.meta}</p>
                  <p className="info-card-body">{post.body}</p>
                </div>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </div>
  );
}

function Courses() {
  const courses = [
    {
      id: 1,
      title: "Foundations of Time Mapping",
      meta: "3 modules · Beginner",
      body: "Learn how to map your real week, spot energy leaks, and design a schedule that matches your goals.",
      icon: "🗺️",
      price: "₹1,499",
    },
    {
      id: 2,
      title: "Deep Work in a Distracted World",
      meta: "5 modules · Intermediate",
      body: "Build a repeatable deep work system with blocks, rituals, and realistic guardrails for notifications.",
      icon: "🎯",
      price: "₹1,999",
    },
    {
      id: 3,
      title: "Personal Analytics for Creators",
      meta: "4 modules · Advanced",
      body: "Use your FocusFlow data to experiment with routines, compare weeks, and run your own productivity experiments.",
      icon: "📊",
      price: "₹2,499",
    },
  ];

  return (
    <div className="app-shell">
      <h1 className="page-heading">Learning tracks</h1>
      <p className="page-subtitle">
        Guided mini‑courses that turn your time logs into real behavior change.
      </p>

      <div className="course-layout">
        <section className="course-main">
          {courses.map((course) => (
            <article key={course.id} className="info-card">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "32px" }}>{course.icon}</span>
                <h2 className="info-card-title">{course.title}</h2>
              </div>
              <p className="info-card-meta">{course.meta}</p>
              <p className="info-card-body">{course.body}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "12px",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    color: "#111827",
                    background: "#eef2ff",
                    padding: "6px 10px",
                    borderRadius: "10px",
                  }}
                >
                  {course.price}
                </span>
                <button className="btn btn-primary" type="button">
                  Buy this course
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="course-sidebar">
          <div className="metric-card">
            <div className="metric-label">Recommended path</div>
            <div className="metric-value">6 weeks</div>
            <div className="metric-sub">
              2–3 focused sessions per week is enough to see change.
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Built around</div>
            <div className="metric-value">Your real data</div>
            <div className="metric-sub">
              Each track plugs directly into the time you’re already logging.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app-shell">
      <div className="dashboard-grid">
        <section className="info-card dashboard-analytics">
          <AnalyticsDashboard refreshTrigger={refreshTrigger} />
        </section>

        <section className="info-card dashboard-tasks">
          <TaskList onTaskChange={handleTaskChange} />
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Content pages (require auth) */}
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route
          path="/"
          element={
            <Navigate
              to={localStorage.getItem("token") ? "/dashboard" : "/login"}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
