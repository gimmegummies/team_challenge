import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-services";

export default function Login({ onFormSwitch }) {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e, type) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [type]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = "https://test-chat.duckdns.org/api/login/";

    const data = {
      username: formState.username,
      password: formState.password,
    };

    try {
      await authService.login(url, data).then(
        (responseData) => {
          console.log(responseData);
          // setUsername(responseData.user.username);
          localStorage.setItem("user", JSON.stringify(responseData.user));
          navigate("/home");
          // window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      alert(err.response.data.detail);
      console.log(err);
    }
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
          value={formState.username}
          onChange={(e) => onChange(e, "username")}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="********"
          required
          autoComplete="off"
          id="password"
          value={formState.password}
          onChange={(e) => onChange(e, "password")}
        />
        <button type="submit">Log in</button>
      </form>
      <button className="linkBtn" onClick={() => onFormSwitch("signup")}>
        Don't have an account? Sign up
      </button>
    </div>
  );
}
