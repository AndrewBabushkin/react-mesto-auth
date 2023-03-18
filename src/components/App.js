import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import PopupEditProfile from "./PopupEditProfile.js";
import PopupAddCard from "./PopupAddCard.js";
import PopupEditAvatar from "./PopupEditAvatar.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  // переменные состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isZoomImagePopupOpen, setIsZoomImagePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState({});

  // отрытие попапов
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddCardClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleCardClick = (data) => {
    setSelectedCard(data);
    setIsZoomImagePopupOpen(true);
  };

  // закрытие попапов
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsZoomImagePopupOpen(false);
  };
  // заполнение информации профиля с сервера.

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()]).then(
      ([data, user]) => {
        // console.log(user);
        // console.log(data);
        setCards(data);
        setCurrentUser(user);
      }
    );
  }, []);

  // обработка лайков
  function handleCardLike({ likes, cardId }) {
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(cardId, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === cardId ? newCard : c)));
    });
  }

  // удаление карточек
  function handleCardDelete({ cardId }) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  // редактирование профиля
  function handleUpdateUser(event) {
    api
      .changeUserInfo(event)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  // редактирование аватара
  function handleUpdateAvatar(event) {
    api
      .changeUserAvatar(event)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }
  // добавление новой карточки
  function handleAddPlaceSubmit(event) {
    api
      .getNewCard(event)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddCardClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        />
        <Footer />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupAddCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={isZoomImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
