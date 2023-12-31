import jwt from 'jsonwebtoken';
import UnauthorizedError from '../utils/errors/UnauthorizedError.js';
import { JWT_SECRET_KEY, NODE_ENV } from '../env.config.js';

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(
      token,
      NODE_ENV === 'development' ? 'secret-key' : JWT_SECRET_KEY,
    );
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

export default auth;
