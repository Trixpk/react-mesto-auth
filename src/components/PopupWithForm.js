export default function PopupWithForm(props) {
    const popupOpenedClass = props.isOpen ? ' popup_opened' : '';

    return (
        <div className={`popup popup_${props.name} ${popupOpenedClass}`}>
          <div className="popup__container">
              <button className="popup__close-button" type="button" onClick={props.onClose} />
              <h2 className="popup__title">{props.title}</h2>
              <form name={props.name} className="form" noValidate onSubmit={props.onSubmit}>
                  {props.children}
              </form>
          </div>
        </div>
    );
}