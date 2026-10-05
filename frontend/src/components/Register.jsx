import { useState } from "react";
import { Link } from "react-router";
import "../App.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login">
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={50}
          required
        />
        <br />

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

        <label>Confirm password</label>
        <br />
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        <br />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Sign up</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
