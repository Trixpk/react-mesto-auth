import PopupWithForm from './PopupWithForm';

export default function DelPlaceConfirmPopup (props) {

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onDeletePlace(props.delCardId);
    }

    return (
        <PopupWithForm buttonText={props.buttonText} onSubmit={handleSubmit} name="del-confirm" title="Вы уверены?" onClose={props.onClose} isOpen={props.isOpen} />
    );
}