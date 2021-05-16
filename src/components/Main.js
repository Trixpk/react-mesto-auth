import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card';

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
          <section className="container profile">
              <div className="profile__avatar-wrap">
                  <img onClick={props.onEditAvatar} className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
              </div>
              <div className="profile__info">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <button type="button" onClick={props.onEditProfile} className="profile__edit-button" />
                  <p className="profile__profession">{currentUser.about}</p>
              </div>
              <button type="button" onClick={props.onAddPlace} className="profile__add-button" />
          </section>
          <section className="cards container">
              {props.cards.map(card => <Card onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} key={card._id} card={card} />)}
          </section>
      </main>
    );
}