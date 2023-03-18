import { useContext, useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeAbout(event) {
    setDescription(event.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input-field popup__input-field_type_name"
        name="editName"
        // defaultValue="Имя"
        placeholder="Ваше имя"
        required
        id="name-input"
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        type="text"
        className="popup__input-field popup__input-field_type_profession"
        name="editProfession"
        // defaultValue="Профессия"
        placeholder="Ваша профессия"
        required
        id="profession-input"
        minLength="2"
        maxLength="200"
        onChange={handleChangeAbout}
        value={description || ""}
      />
      <span className="profession-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}
export default PopupEditProfile;
