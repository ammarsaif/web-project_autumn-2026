import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Check if backend returned an error (e.g. 401 Invalid password, 404 User not found)
      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      setError("");

      // Save JWT token received from backend
      localStorage.setItem("token", data.token);

      // Redirect home on success
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Could not connect to the server");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <br />

        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <br />

        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
