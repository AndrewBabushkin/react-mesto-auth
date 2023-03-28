import React from "react";
import { Link } from "react-router-dom";

function InfoHeader({ email, onClose }) {
  return (
    <div className="header__info">
      <p className="header__email">{email}</p>

      <Link to="/sign-in" className="header__link-esc" onClick={onClose}>
        Выйти
      </Link>
    </div>
  );
}

export default InfoHeader;
