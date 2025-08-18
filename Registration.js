import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Registration() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    age: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[A-Z]).{6,}$/.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, age, password, confirm_password } = user;

    if (!username || !email || !age || !password || !confirm_password) {
      setError("⚠️ Please fill everything.");
      return;
    }

    if (!validateEmail(email)) {
      setError("⚠️ Email must be a valid @gmail.com address.");
      return;
    }

    if (Number(age) < 16 || Number(age) > 30) {
      setError("⚠️ Age must be between 16 and 30.");
      return;
    }

    if (!validatePassword(password)) {
      setError("⚠️ Password must contain uppercase, letters, and numbers.");
      return;
    }

    if (password !== confirm_password) {
      setError("⚠️ Password and Confirm Password do not match.");
      return;
    }

    // Save user
    localStorage.setItem("user", JSON.stringify(user));
    alert("✅ Registration successful! You can now log in.");
    setError("");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="form-title">Create Your Account</h2>
        {error && <p className="error-message">{error}</p>}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your @gmail.com email"
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          placeholder="Enter age (16-30)"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          required
        />

        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          type="password"
          id="confirm_password"
          value={user.confirm_password}
          onChange={(e) => setUser({ ...user, confirm_password: e.target.value })}
          placeholder="Re-enter password"
          required
        />

        <button type="submit" className="auth-btn">Register</button>
      </form>
    </div>
  );
}

export default Registration;
