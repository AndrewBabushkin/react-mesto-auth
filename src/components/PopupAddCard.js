import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddCard({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setLink] = useState("");

  function handleChangeCardName(event) {
    setCardName(event.target.value);
  }

  function handleChangeCardLink(event) {
    setLink(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }
  useEffect(() => {
    setCardName("");
    setLink("");
  }, [isOpen]);

  return (
    <>
      <PopupWithForm
        name="add-card"
        title="Новое место"
        textButton="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="popup__input-field popup__input-field_type_title"
          name="name"
          onChange={handleChangeCardName}
          value={cardName || ""}
          placeholder="Название места"
          required
          id="title-input"
          minLength="2"
          maxLength="30"
        />
        <span className="title-input-error popup__input-error"></span>
        <input
          type="url"
          className="popup__input-field popup__input-field_type_image"
          name="link"
          onChange={handleChangeCardLink}
          value={cardLink || ""}
          placeholder="Добавить фотографию"
          required
          id="image-input"
        />
        <span className="image-input-error popup__input-error"></span>
      </PopupWithForm>
    </>
  );
}

export default PopupAddCard;
