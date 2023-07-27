/* eslint-disable no-unused-expressions */
import Card from '../models/card.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import ForbiddenError from '../utils/errors/ForbiddenError.js';

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удалять можно только свои карточки!');
      }

      Card.findByIdAndRemove(cardId)
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        })
        .catch((error) => next(error));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданные данные не валидны'));
      } else {
        next(error);
      }
    });
};

const handleCardLike = (req, res, next, options) => {
  const { cardId } = req.params;
  const action = options.isLike ? '$addToSet' : '$pull';
  Card.findByIdAndUpdate(cardId, { [action]: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданные данные не валидны'));
      } else {
        next(error);
      }
    });
};

const likeCard = (req, res, next) => {
  handleCardLike(req, res, next, { isLike: true });
};

const dislikeCard = (req, res, next) => {
  handleCardLike(req, res, next, { isLike: false });
};

export {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
