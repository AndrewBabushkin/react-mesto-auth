function InfoTooltip({ isOpen, onClose, imageTooltip, titleTooltip }) {
  return (
    <div
      className={`popup popup_type_info-tooltip  ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <img
          src={imageTooltip}
          alt={titleTooltip}
          className="popup__image-tooltip"
        ></img>
        <h2 className="popup__title popup__title_tooltip">{titleTooltip}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
