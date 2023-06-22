import React, { useState } from "react";
import axios from "axios";

export default function Login({ onFormSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const data = { email: email, password: password };
    const url = "https://prod-chat.duckdns.org/api/token/";

    axios({
      url: url,
      method: "POST",
      data: data,
    })
      .then((res) => {
        console.log(res);
      })

      .catch((err) => {});

    console.log(data);
  };

  return (
    <div className="auth_form_wrapper">
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <label htmlFor="email">email</label>
        <input
          type="email"
          placeholder="user@gmail.com"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="********"
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
