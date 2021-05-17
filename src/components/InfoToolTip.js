import successIcon from '../images/reg-success.svg';
import failIcon from '../images/reg-fail.svg';

export default function InfoToolTip({ onClose, isPopupOpen, registerResult }) {
    const popupOpenedClass = isPopupOpen ? 'popup_opened' : null;
    const message = registerResult ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.';
    const messageIcon = registerResult ? successIcon : failIcon;

    return (
        <div className={`popup tool-tip ${popupOpenedClass}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={onClose} />
                <img className="tool-tip__image" src={messageIcon} alt={message} />
                <p className="tool-tip__message">{message}</p>
            </div>
        </div>
    );
}