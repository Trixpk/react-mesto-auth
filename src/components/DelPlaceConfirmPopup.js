import PopupWithForm from './PopupWithForm';

export default function DelPlaceConfirmPopup (props) {

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onDeletePlace(props.delCardId);
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name="del-confirm" title="Вы уверены?" onClose={props.onClose} isOpen={props.isOpen}>
          <button className="popup__submit" type="submit">Да</button>
        </PopupWithForm>
    );
}