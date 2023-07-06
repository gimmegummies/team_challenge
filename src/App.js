import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Link } from "react-router-dom";

export default function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      <h1>Welcome to the chat!</h1>
      {currentForm == "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Signup onFormSwitch={toggleForm} />
      )}
    </div>
  );
}
