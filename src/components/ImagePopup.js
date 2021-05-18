export default function ImagePopup(props) {
    const popupOpenedClass = `popup popup_detail-img ${props.isOpen ? 'popup_opened' : ''}`;

    return (
        <div className={popupOpenedClass}>
          <figure className="card-detail">
              <button className="popup__close-button" type="button" onClick={props.onClose} />
              <img className="card-detail__img" src={props.card?.link} alt={props.card?.name} />
              <figcaption className="card-detail__title">{props.card?.name}</figcaption>
          </figure>
        </div>
    );
}