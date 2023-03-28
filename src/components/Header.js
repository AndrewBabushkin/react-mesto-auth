import React from "react";
import { useLocation, Link } from "react-router-dom";
import InfoHeader from "./InfoHeader";

function Header({ email, onClose, loggedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo"></div>
      {loggedIn ? (
        <InfoHeader email={email} onClose={onClose} />
      ) : (
        <>
          {location.pathname === "/sign-up" ? (
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          ) : (
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
