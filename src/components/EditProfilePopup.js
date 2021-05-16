import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        if(props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [props.isOpen, currentUser]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    
    
    return (
        <PopupWithForm name="edit-form" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
          <input value={name} onChange={handleChangeName} id="name-input" required className="popup__field popup__field_name" minLength="2" maxLength="40" type="text" placeholder="Имя" />
          <span className="popup__input-error name-input-error">Вы пропустили это поле</span>
          <input value={description} onChange={handleChangeDescription} id="proff-input" required className="popup__field popup__field_profession" minLength="2" maxLength="200" type="text" placeholder="Профессия" />
          <span className="popup__input-error proff-input-error">Вы пропустили это поле</span>
          <button className="popup__submit" type="submit">Сохранить</button>
        </PopupWithForm>
    );
}