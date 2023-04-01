import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import PopupEditProfile from "./PopupEditProfile.js";
import PopupAddCard from "./PopupAddCard.js";
import PopupEditAvatar from "./PopupEditAvatar.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js";

import imageSuccess from "../images/isReg.svg";
import imageUnSuccess from "../images/notReg.svg";

function App() {
  // переменные состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isZoomImagePopupOpen, setIsZoomImagePopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState({});

  const [loggedIn, setloggedId] = useState(false);
  const [message, setMessage] = useState({
    imageTooltip: "",
    titleTooltip: "",
  });
  const [isPopupTooltipOpen, setIsPopupTooltipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
    setIsPopupTooltipOpen(false);
  };
  // заполнение информации профиля с сервера.

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([data, user]) => {
        // console.log(user);
        // console.log(data);
        setCards(data);
        setCurrentUser(user);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  // обработка лайков
  function handleCardLike({ likes, cardId }) {
    const isLiked = likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === cardId ? newCard : c)));
      })
      .catch((err) => console.log(`Error: ${err}`));
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
  // Функция регистраци
  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        console.log(res);
        console.log(email);
        setEmail(res.data.email);
        setMessage({
          imageTooltip: imageSuccess,
          titleTooltip: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setMessage({
          imageTooltip: imageUnSuccess,
          titleTooltip: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsPopupTooltipOpen(true);
      });
  }
  // функция авторизации
  function handleAuth(email, password) {
    auth
      .authorize(email, password)
      .then((token) => {
        setloggedId(true);
        setEmail(email);
        console.log(token);
        localStorage.setItem("jwt", token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setMessage({
          imageTooltip: imageUnSuccess,
          titleTooltip: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsPopupTooltipOpen(true);
        console.log(`Error: ${err}`);
      });
  }

  // функция выхода
  function onSingOut() {
    setloggedId(false);
    localStorage.removeItem("jwt");
  }
  // проверка наличия токена
  function tokenCheck() {
    console.log(localStorage);
    const jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            console.log(res);
            setloggedId(true);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onClose={onSingOut} loggedIn={loggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddCardClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              handleCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<Register onRegister={handleRegistration} />}
        />
        <Route path="/sign-in" element={<Login onLogin={handleAuth} />} />
      </Routes>

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
      <InfoTooltip
        isOpen={isPopupTooltipOpen}
        onClose={closeAllPopups}
        imageTooltip={message.imageTooltip}
        titleTooltip={message.titleTooltip}
        loggedIn={loggedIn}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
