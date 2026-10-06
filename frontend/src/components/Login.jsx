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
      const response = await fetch("http://127.0.0.1:3000/api/users");
      const users = await response.json();

      const foundUser = users.find(
        (user) => user.email === email && user.password_hash === password,
      );

      if (!foundUser) {
        setError("Wrong email or password");
        return;
      }

      if (foundUser.is_active === 0) {
        setError("This account is not active");
        return;
      }

      setError("");

      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: foundUser.user_id,
          name: foundUser.name,
          role_id: foundUser.role_id,
        }),
      );

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
