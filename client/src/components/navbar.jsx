import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="app-shell">
      <nav className="navbar-shell">
        <div
          className="navbar-brand"
          onClick={() => navigate(isLoggedIn ? "/dashboard" : "/")}
        >
          <div className="navbar-logo-dot" />
          <div>
            <div className="navbar-title">FocusFlow</div>
            <div className="navbar-subtitle">Time & productivity studio</div>
          </div>
        </div>

        <div className="navbar-links">
          {isLoggedIn && (
            <>
              <button
                className={
                  "navbar-link" +
                  (isActive("/dashboard") ? " navbar-link-active" : "")
                }
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
              <button
                className={
                  "navbar-link" +
                  (isActive("/blogs") ? " navbar-link-active" : "")
                }
                onClick={() => navigate("/blogs")}
              >
                Blogs
              </button>
              <button
                className={
                  "navbar-link" +
                  (isActive("/courses") ? " navbar-link-active" : "")
                }
                onClick={() => navigate("/courses")}
              >
                Courses
              </button>
            </>
          )}
        </div>

        <div className="navbar-auth">
          {!isLoggedIn ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Get started
              </button>
            </>
          ) : (
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
