import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DelPlaceConfirmPopup from './DelPlaceConfirmPopup';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Route } from 'react-router';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDelPlaceConfirmPopupOpen, setIsDelPlaceConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeteleteCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([dataUser, cards]) => {
      setCurrentUser(dataUser);

      const data = cards.map((item) => ({
        _id: item._id,
        likes: item.likes,
        name: item.name,
        link: item.link,
        owner: item.owner
    }));
    setCards(data);
    })
    .catch(err => {
      console.log('Ошибка при получении данных ' + err);
    })
  }, []); 

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const promise = !isLiked ? api.addLike(card._id) : api.deleteLike(card._id);
    promise.then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(`Ошибка при удалении лайка ${err}`);
    });
  }

  const handleCardDelete = (card) => {
      api.deleteCard(card._id).then((res) => {
          const newCards = cards.filter((item) => item !== card);
          setCards(newCards);
          closeAllPopups();
      }).catch(err => {
          console.log(`Ошибка при удалении карточки ${err}`);
      });
  }

  const handleDeletePlaceClick = (card) => {
    setIsDelPlaceConfirmPopupOpen(true);
    setDeteleteCard(card);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDelPlaceConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = (data) => {
    api.setUserInfo(data).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(err => {
      console.log(`Ошибка при обновлении информации о пользователе ${err}`);
    });
  }

  const handleUpdateAvatar = (data) => {
    api.changeAvatar(data).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    }).catch(err => {
      console.log(`Ошибка при изменении аватара ${err}`);
    });
  }

  const handleAddPlaceSubmit = (data) => {
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(err => {
      console.log(`Ошибка при добавлении карточки ${err}`);
    });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Route path="/">
          <Main 
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeletePlaceClick}
          />
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <DelPlaceConfirmPopup delCardId={deleteCard} isOpen={isDelPlaceConfirmPopupOpen} onClose={closeAllPopups} onDeletePlace={handleCardDelete} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </Route>
        <Route path="/sign-up">
          <SignUp/>
        </Route>
        <Route path="/sign-in">
          <SignIn/>
        </Route>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
