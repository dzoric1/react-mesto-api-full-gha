import express from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';
import { validateCardId, validateCard } from '../utils/validators/cardValidator.js';

const cardRouter = express.Router();

cardRouter.get('/', getCards);
cardRouter.post('/', validateCard, createCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

export default cardRouter;
