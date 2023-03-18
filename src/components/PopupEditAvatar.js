import { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm.js";

function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        textButton="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          ref={avatarRef}
          type="url"
          className="popup__input-field popup__input-field_type_avatar"
          name="avatar"
          defaultValue=""
          placeholder="Добавить фотографию"
          required
          id="avatar-input"
        />
        <span className="avatar-input-error popup__input-error"></span>
      </PopupWithForm>
    </>
  );
}

export default PopupEditAvatar;
