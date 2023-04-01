import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeUserEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <AuthForm
      title="Вход"
      nameForm="LoginForm"
      textButton="Войти"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="email"
        className="auth-form__input auth-form__input_type_email"
        placeholder="Email"
        required
        minLength="2"
        maxLength="50"
        value={email || ""}
        onChange={handleChangeUserEmail}
      ></input>
      <span className="auth-form__input-error"></span>
      <input
        type="password"
        name="password"
        className="auth-form__input auth-form__input_type_password"
        placeholder="Password"
        required
        minLength="3"
        maxLength="50"
        value={password || ""}
        onChange={handleChangePassword}
      ></input>
      <span className="auth-form__input-error"></span>
    </AuthForm>
  );
}

export default Login;
