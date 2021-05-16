import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar:  inputRef.current.value,
        });
    }
    
    return (
        <PopupWithForm name="change-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
          <input ref={inputRef} id="avatar-input" required className="popup__field popup__field_avatar" type="url" placeholder="Ссылка на аватар" />
          <span className="popup__input-error avatar-input-error">Введите адрес аватара.</span>
          <button className="popup__submit" type="submit">Сохранить</button>
        </PopupWithForm>
    );
}