import React, { useState, useEffect } from "react";

import AuthForm from "./AuthForm";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    console.log(email, password);
    onRegister(email, password);
  };

  return (
    <AuthForm
      title="Регистрация"
      nameForm="registrationForm"
      textButton="Зарегистрироваться"
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
        minLength="6"
        maxLength="50"
        value={password || ""}
        onChange={handleChangePassword}
      ></input>
    </AuthForm>
  );
}

export default Register;
