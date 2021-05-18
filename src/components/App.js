import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { apiAuth } from '../utils/apiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DelPlaceConfirmPopup from './DelPlaceConfirmPopup';
import Login from './Login';
import Register from './Register';
import {
  Redirect,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDelPlaceConfirmPopupOpen, setIsDelPlaceConfirmPopupOpen] = useState(false);
  const [isRegisterMessagePopupOpen, setIsRegisterMessagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeteleteCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    if(localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      apiAuth.checkToken(jwt)
      .then((res) => {
        setUserData({email: res.data.email});
        setLoggedIn(true);
        history.push('/');
      })
      
    }
  }

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
    setIsRegisterMessagePopupOpen(false);
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

  const handleRegister = (data) => {
    apiAuth.authorize(data)
    .then((res) => {
      setRegisterSuccess(true);
      setIsRegisterMessagePopupOpen(true);
      setTimeout(() => {
        history.push('/sign-in');
      }, 2000);
    }).catch(err => {
      setRegisterSuccess(false);
      setIsRegisterMessagePopupOpen(true);
      console.log('Ошибка при регистрации ' + err);
    })
  }

  const handleLogin = (data) => {
    apiAuth.login(data)
    .then((res) => {
      setLoggedIn(true);
      localStorage.setItem('jwt', res.token);
      checkToken();
      history.push('/');
    }).catch(err => {
      console.log(`Ошибка при авторизации ${err}`);
    })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
          <Header userData={userData} loggedIn={loggedIn} onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeletePlaceClick}
            />
            <Route path="/sign-up">
              <Register registerResult={registerSuccess} isPopupOpen={isRegisterMessagePopupOpen} onClose={closeAllPopups} onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
              {
                loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />
              }
            </Route>
          </Switch>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <DelPlaceConfirmPopup delCardId={deleteCard} isOpen={isDelPlaceConfirmPopupOpen} onClose={closeAllPopups} onDeletePlace={handleCardDelete} />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
