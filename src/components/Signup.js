import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup({ onFormSwitch }) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
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

  const getErrors = () => {
    const errors = [];
    if (!formState.username) errors.push("Name required");
    if (!formState.email) {
      errors.push("Email required");
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.push("Invalid email");
    }
    if (!formState.password) errors.push("Password required");
    return errors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const errors = getErrors();

    for (let error of errors) {
      alert(error);
    }

    if (errors.length) return;

    const url = "https://prod-chat.duckdns.org/api/register/";
    const data = {
      username: formState.username,
      email: formState.email,
      password: formState.password,
    };

    axios({
      url: url,
      method: "POST",
      data: data,
    })
      .then((response) => {
        if (response.status !== 400 && response.status !== 401) {
          console.log(response);
          navigate("/check-your-email");
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
        console.error(err.response.data);
      });
  };

  return (
    <div className="auth_form_wrapper">
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <label htmlFor="user">user name</label>
        <input
          type="text"
          placeholder="user name"
          required
          autoComplete="off"
          id="user"
          value={formState.username}
          onChange={(e) => onChange(e, "username")}
        />
        <label htmlFor="email">email</label>
        <input
          type="email"
          placeholder="user@gmail.com"
          required
          autoComplete="off"
          id="email"
          value={formState.email}
          onChange={(e) => onChange(e, "email")}
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
        <button type="submit">Sign up</button>
      </form>
      <button className="linkBtn" onClick={() => onFormSwitch("login")}>
        Already have an account? Login here
      </button>
    </div>
  );
}
