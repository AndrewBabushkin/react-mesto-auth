import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";

function Card({
  cardId,
  link,
  title,
  likeLength,
  ownerId,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  function handleClick() {
    onCardClick({ link, title });
  }

  function handleLikeClick() {
    onCardLike({ likes, cardId });
  }

  function handleDeleteClick() {
    onCardDelete({ cardId });
  }
  const currentUser = useContext(CurrentUserContext);

  const isOwn = ownerId === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__heart-button ${
    isLiked && "card__heart-button_active"
  }`;

  return (
    <li className="gallery__list-item">
      <article className="card">
        {isOwn && (
          <button
            className="card__delete-btn"
            onClick={handleDeleteClick}
          ></button>
        )}
        <img
          src={link}
          alt={`Фотография ${title}`}
          className="card__image"
          onClick={handleClick}
        />
        <div className="card__caption">
          <h2 className="card__title">{title}</h2>
          <div className="card__heart-group">
            <button
              type="button"
              onClick={handleLikeClick}
              className={cardLikeButtonClassName}
              aria-label="Поставить лайк"
            ></button>
            <p className="card__like-number">{likeLength}</p>
          </div>
        </div>
      </article>
    </li>
  );
}
export default Card;
