import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.isAdmin) {
        // Store the admin flag in sessionStorage
        sessionStorage.setItem("isAdmin", "true");

        // Redirect to the admin dashboard or any other page
        navigate("/view-recipe");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles["login-page"]}>
      <button
        className={styles["return-button"]}
        onClick={() => window.history.back()}
      >
        ← Return
      </button>
      <div className={styles["login-container"]}>
        <h2>Admin Login</h2>
        <form className={styles["form-login"]} onSubmit={handleLogin}>
          <div className={styles["input-group"]}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles["error-message"]}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
