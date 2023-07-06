import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ onFormSwitch }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = { username: userName, password: password };
    const url = "https://prod-chat.duckdns.org/api/token/";

    axios({
      url: url,
      method: "POST",
      data: data,
    })
      .then((res) => {
        if (res.status !== 400 && res.status !== 401) {
          console.log(res);
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refreshToken", res.data.refresh);
          navigate("/home");
        }
      })

      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  };

  return (
    <div className="auth_form_wrapper">
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <label htmlFor="user">user name</label>
        <input
          type="text"
          placeholder="user name / email"
          required
          autoComplete="off"
          id="user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="********"
          required
          autoComplete="off"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      <button className="linkBtn" onClick={() => onFormSwitch("signup")}>
        Don't have an account? Sign up
      </button>
    </div>
  );
}
