import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

import loading from '../assets/images/loading.svg'

function Main({ onEditProfile, onAddCard, onAvatarEdit, onCardClick, onCardLike, cards, onCardDeleteClick, isLoading }) {

  const { name, about, avatar } = useContext(CurrentUserContext)

  const cardsElements = cards?.map(card => (
    <li className="gallery__card card" key={card._id}>
      <Card
        card={card}
        onCardClick={() => onCardClick(card)}
        onCardLike={onCardLike}
        onCardDeleteClick={onCardDeleteClick}
      />
    </li>
  ))

  return (
    <main className="content">
      <section className="content__profile profile">
        <div className="profile__avatar-wrapper" onClick={onAvatarEdit}>
          <img className="profile__avatar" src={isLoading ? loading : avatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{isLoading ? 'Загрузка...' : name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактирование профиля"
            onClick={onEditProfile}
          ></button>
          <p className="profile__work">{about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={onAddCard}
        ></button>
      </section>
      <section className="content__gallery gallery">
        <ul className="gallery__cards">
          {cardsElements}
        </ul>
      </section>
    </main>
  )
}

export default Main;