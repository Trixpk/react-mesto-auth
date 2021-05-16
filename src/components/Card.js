import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardDeleteButtonClassName = (
        `cards__trash ${isOwn ? 'cards__trash_visible' : 'cards__trash_hidden'}`
    );
    const cardLikeButtonClassName = (
        `cards__like ${isLiked ? 'cards__like_active' : null}`
    );

    const handleClick = () => {
        props.onCardClick(props.card);
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card);
    }

    const handleCardDelete = () => {
        props.onCardDelete(props.card);
    }

    return (
        <div className="cards__item">
            <button type="button" onClick={handleCardDelete} className={cardDeleteButtonClassName} />
            <img className="cards__img" src={props.card.link} alt={props.name} onClick={handleClick} />
            <div className="cards__info">
                <h2 className="cards__title">{props.card.name}</h2>
                <div className="cards__info-buttons">
                    <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName} />
                    <span className="cards__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    );
}