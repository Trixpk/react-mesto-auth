import { useEffect } from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ buttonText, isOpen, onClose, onAddPlace }) {
    const { values, isValid, handleChange, resetForm, errors } = useFormWithValidation();
    const errorActiveClass = !isValid ? 'popup__input-error_active' : null;

    useEffect(() => {    
        resetForm();
    }, [isOpen, resetForm]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onAddPlace(values);
    }

    return (
        <PopupWithForm buttonText={buttonText} name="add-form" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
          <input name="name" id="title-input" value={values.name || ""} onChange={handleChange} required minLength="2" maxLength="30" className="popup__field popup__field_name" type="text" placeholder="Название" />
          <span className={`popup__input-error title-input-error ${errorActiveClass}`}>{errors.name || ""}</span>
          <input name="link" id="url-input" value={values.link || "" } onChange={handleChange} required className="popup__field popup__field_link" type="url" placeholder="Ссылка на картинку" />
          <span className={`popup__input-error url-input-error ${errorActiveClass}`}>{errors.link || ""}</span>
        </PopupWithForm>
    );
}