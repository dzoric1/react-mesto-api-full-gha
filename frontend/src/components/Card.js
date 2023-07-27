import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import notFound from '../assets/images/not-found.jpg'

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {

  const currentUser = useContext(CurrentUserContext)
  const isOwner = card.owner === currentUser._id
  const isLiked = card.likes.some(i => i === currentUser._id)

  return (
    <article className="gallery__card card">
      <img
        className="card__image"
        src={card.link ? card.link : notFound}
        alt={card.name ? card.name : 'Без названия'}
        onClick={onCardClick}
      />
      <div className="card__heading">
        <h2 className="card__title">{card ? card.name : 'Без названия'}</h2>
        <div className="card__like-field">
          <button
            className={`card__like ${isLiked && "card__like_active"}`}
            type="button"
            aria-label="Лайк"
            onClick={() => onCardLike(card, isLiked)}
          ></button>
          <span className="card__like-count">{card ? card.likes.length : 0}</span>
        </div>
      </div>
      {isOwner && <button className="card__delete" type="button" aria-label="Удалить" onClick={() => onCardDeleteClick(card._id)}></button>}
    </article>
  )
}

export default Card;