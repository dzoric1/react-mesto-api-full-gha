import { Joi, celebrate } from 'celebrate';
import { REGEX_URL } from '../../env.config.js';

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REGEX_URL),
  }),
});

export {
  validateCardId,
  validateCard,
};
