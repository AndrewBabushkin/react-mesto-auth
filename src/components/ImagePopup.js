import React from "react";

function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={`popup popup_type_zoom ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__gallery">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img
            src={card.link}
            alt={`Фотография ${card.title}`}
            className="popup__image"
          />
          <figcaption className="popup__figcaption">{card.title}</figcaption>
        </figure>
      </div>
    </div>
  );
}
export default ImagePopup;
