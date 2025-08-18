import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure this includes updated styles

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.username === login.username && user.password === login.password) {
      localStorage.setItem("isAuthenticated", "true");
      setError("");
      navigate("/home");
    } else {
      setError("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2 className="form-title">🔐 Secure Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="auth-btn btn-login">Login</button>
      </form>
    </div>
  );
}

export default Login;
