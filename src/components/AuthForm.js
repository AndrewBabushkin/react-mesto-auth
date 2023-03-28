import { Link } from "react-router-dom";

function AuthForm({ children, nameForm, title, textButton, onSubmit }) {
  return (
    <div className="auth-form__container">
      <h2 className="auth-form__title">{title}</h2>
      <form className="auth-form__form" name={nameForm} onSubmit={onSubmit}>
        {children}
        <button type="submit" className="auth-form__button">
          {textButton}
        </button>
      </form>

      {nameForm === "registrationForm" && (
        <Link to="/sign-in" className="auth-form__link">
          Уже зарегистрированы? Войти
        </Link>
      )}
    </div>
  );
}

export default AuthForm;
