import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
    const inputNameRef = useRef();
    const inputLinkRef = useRef();
    //const [isValid, setIsValid] = useState(false);

    useEffect(() => {    
        inputNameRef.current.value = '';
        inputLinkRef.current.value = '';
    }, [props.isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onAddPlace({
            name: inputNameRef.current.value,
            link: inputLinkRef.current.value, 
        });
    }

    const handleOnIput = (ev) => {
        console.log(ev.target.validity.valid);
    }

    const submitButtonClassName = (
        `popup__submit` //${isValid ? null : 'popup__submit_inactive'} Добавить класс при реализации Валидации
    );

    return (
        <PopupWithForm buttonText={props.buttonText} name="add-form" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
          <input onInput={handleOnIput} ref={inputNameRef} id="title-input" required minLength="2" maxLength="30" className="popup__field popup__field_name" type="text" placeholder="Название" />
          <span className="popup__input-error title-input-error">Вы пропустили это поле</span>
          <input ref={inputLinkRef} id="url-input" required className="popup__field popup__field_link" type="url" placeholder="Ссылка на картинку" />
          <span className="popup__input-error url-input-error">Введите адрес сайта.</span>
        </PopupWithForm>
    );
}