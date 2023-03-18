import React from "react";

function PopupWithForm({
  children,
  name,
  title,
  textButton,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <h2 className="popup__title popup__title_delete">{title}</h2>
        <form
          className={`popup__form-edit popup__form-${name}`}
          name={`form${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className="popup__save-button popup__save-button_type_delete"
            name="save-button"
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
