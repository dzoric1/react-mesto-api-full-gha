import { useState, useEffect, } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarProfilePopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';

import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import auth from '../utils/Auth';


function App() {

  const [cards, setCards] = useState([])
  const [isProfileEditPopupOpen, setProfileEditPopupOpen] = useState(false)
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false)
  const [isAvatarEditPopupOpen, setIsAvatarEditPopupOpen] = useState(false)
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [deletedCard, setDeletedCard] = useState({ _id: '' })
  const [currentUser, setCurrentUser] = useState({})

  const [isProfileEditPopupLoading, setIsProfileEditPopupLoading] = useState(false)
  const [isAddCardPopupLoading, setIsAddCardPopupLoading] = useState(false)
  const [isAvatarEditPopupLoading, setIsAvatarEditPopupLoading] = useState(false)
  const [isConfirmDeletePopupLoading, setIsConfirmDeletePopupLoading] = useState(false)

  const [isInitialDataLoading, setIsInitialDataLoading] = useState(true)

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false)
  const [infoTooltipText, setInfoTooltipText] = useState('')


  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getCards(),
      ])
        .then(([userData, cardsData]) => {
          setCards(cardsData)
          setCurrentUser(userData)
        })
        .catch(err => console.warn(err))
        .finally(() => setIsInitialDataLoading(false))
    }
  }, [isLoggedIn])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setEmail(data.email)
          setIsLoggedIn(true)
          navigate('/')
        })
        .catch(err => console.warn(err))
    }
  }, [])

  function handleLogOut() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  function handleProfileEditClick() {
    setProfileEditPopupOpen(true)
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true)
  }

  function handleAvatarClick() {
    setIsAvatarEditPopupOpen(true)
  }

  function handleDeleteCardClick(id) {
    setConfirmDeletePopupOpen(true)
    setDeletedCard(id)
  }

  function closeAllPopups() {
    setIsAvatarEditPopupOpen(false)
    setIsAddCardPopupOpen(false)
    setProfileEditPopupOpen(false)
    setConfirmDeletePopupOpen(false)
    setInfoToolTipPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleLikeClick(card, isLiked) {
    if (isLiked) {
      api.toggleLike(card._id, 'DELETE')
        .then(newCard => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.warn(err))
    } else {
      api.toggleLike(card._id, 'PUT')
        .then(newCard => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.warn(err))
    }
  }

  function handleCardDelete(id) {
    setIsConfirmDeletePopupLoading(true)
    api.deleteCard(id)
      .then(() => {
        setCards((cards) => cards.filter(card => card._id !== id))
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setIsConfirmDeletePopupLoading(false))
  }

  function handleUpdateUser(userData) {
    setIsProfileEditPopupLoading(true)
    api.patchUserInfo(userData)
      .then(newUserData => {
        setCurrentUser(newUserData)
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setIsProfileEditPopupLoading(false))
  }

  function handleUpdateAvatar(avatar) {
    setIsAvatarEditPopupLoading(true)
    api.updateAvatar(avatar)
      .then(newUserData => {
        setCurrentUser(newUserData)
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setIsAvatarEditPopupLoading(false))
  }

  function handleAddCardSubmit(card) {
    setIsAddCardPopupLoading(true)
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.warn(err))
      .finally(() => setIsAddCardPopupLoading(false))
  }

  function handleRegisterSubmit(data) {
    auth.register(data)
      .then(() => {
        navigate('/sign-in')
        setIsSuccessInfoTooltipStatus(true)
        setInfoTooltipText('Вы успешно зарегистрировались!')
      })
      .catch(err => {
        setIsSuccessInfoTooltipStatus(false)
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз!')
        console.log(err)
      })
      .finally(() => setInfoToolTipPopupOpen(true))
  }

  function handleLoginSubmit(data) {
    const email = data.email
    auth.login(data)
      .then((data) => {
        localStorage.setItem('token', data.token)
        setIsLoggedIn(true)
        setEmail(email)
        navigate('/')
      })
      .catch(err => {
        setIsSuccessInfoTooltipStatus(false)
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз!')
        setInfoToolTipPopupOpen(true)
        console.log(err)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header email={email} onLogOut={handleLogOut} />
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleProfileEditClick}
                  onAddCard={handleAddCardClick}
                  onAvatarEdit={handleAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleLikeClick}
                  onCardDeleteClick={handleDeleteCardClick}
                  cards={cards}
                  isLoading={isInitialDataLoading}
                />

                <Footer />

                <EditProfilePopup
                  isOpen={isProfileEditPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  isLoading={isProfileEditPopupLoading}
                />

                <AddCardPopup
                  isOpen={isAddCardPopupOpen}
                  onClose={closeAllPopups}
                  onAddCard={handleAddCardSubmit}
                  isLoading={isAddCardPopupLoading}
                />

                <EditAvatarProfilePopup
                  isOpen={isAvatarEditPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  isLoading={isAvatarEditPopupLoading}
                />

                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                />

                <ConfirmDeletePopup
                  isOpen={isConfirmDeletePopupOpen}
                  onClose={closeAllPopups}
                  onConfirm={handleCardDelete}
                  isLoading={isConfirmDeletePopupLoading}
                  deletedCard={deletedCard}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegisterSubmit} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLoginSubmit} />}
          />
        </Routes>

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoToolTipPopupOpen}
          isSuccess={isSuccessInfoTooltipStatus}
          text={infoTooltipText}
        />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App