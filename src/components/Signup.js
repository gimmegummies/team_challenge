import React, { useState } from "react";

export default function Signup({ onFormSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    // e.preventDefault();
    // const data = { email: email, password: password };
    // const url = "https://prod-chat.duckdns.org/api/token/";
    // axios({
    //   url: url,
    //   method: "POST",
    //   data: data,
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {});
    // console.log(data);
  };

  return (
    <div className="auth_form_wrapper">
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
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
        <button type="submit">Sign up</button>
      </form>
      <button className="linkBtn" onClick={() => onFormSwitch("login")}>
        Already have an account? Login here
      </button>
    </div>
  );
}
