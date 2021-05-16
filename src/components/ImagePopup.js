export default function ImagePopup(props) {

    return (
        props.card &&
        <div className={`popup popup_detail-img popup_opened`}>
          <figure className="card-detail">
              <button className="popup__close-button" type="button" onClick={props.onClose} />
              <img className="card-detail__img" src={props.card.link} alt={props.card.name} />
              <figcaption className="card-detail__title">{props.card.name}</figcaption>
          </figure>
        </div>
    );
}