/* eslint-disable no-unused-expressions */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../env.config.js';
import User from '../models/user.js';
import BadRequestError from '../utils/errors/BadRequestError.js';
import NotFoundError from '../utils/errors/NotFoundError.js';
import ConflictError from '../utils/errors/ConflictError.js';

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(({ name, about, avatar }) => res.status(201).send({ name, about, avatar }))
    .catch((error) => {
      if (error.code === 11000) return next(new ConflictError('Данный email занят'));
      if (error.name === 'ValidationError') return next(new BadRequestError('Переданные данные не валидны'));
      next(error);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => next(error));
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданные данные не валидны'));
      } else {
        next(error);
      }
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedUser) => res.send(updatedUser))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданные данные не валидны'));
      } else {
        next(error);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((error) => {
      next(error);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') return next(new BadRequestError('Переданные данные не валидны'));
      next(error);
    });
};

export {
  createUser,
  getUsers,
  getUser,
  updateUser,
  login,
  getCurrentUser,
};
