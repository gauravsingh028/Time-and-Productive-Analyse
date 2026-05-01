import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await loginUser({ email, password });

    if (res.error) {
      setError(res.message || "Login failed");
    } else if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } else {
      setError("Login failed. Please try again.");
    }

    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = () => {
    // Google OAuth is not wired up yet; keep users on email/password
    alert("Google login isn't set up yet. Please sign in with email.");
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">
          Sign in to <strong>FocusFlow</strong> to keep tracking your time and focus.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <button
          type="button"
          className="btn btn-google"
          onClick={handleGoogleLogin}
        >
          <span className="btn-google-icon" />
          Continue with Google
        </button>

        <div className="auth-divider">
          <span className="auth-divider-line" />
          <span>or sign in with email</span>
          <span className="auth-divider-line" />
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <div className="field-label">Email</div>
            <input
              className="field-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="field-label">Password</div>
            <input
              className="field-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <p className="auth-footer-text">
          Don’t have an account?
          <span
            className="auth-link"
            onClick={() => navigate("/register")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
