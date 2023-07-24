import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errors } from 'celebrate';
import auth from './middlewares/auth.js';
import errorMiddleware from './middlewares/error.js';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import NotFoundError from './utils/errors/NotFoundError.js';
import { limiterSettings } from './utils/variables.js';
import { PORT } from './env.config.js';
import {
  login,
  createUser,
} from './controllers/users.js';
import {
  validateLogin,
  validateRegister,
} from './utils/validators/userValidator.js';

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const limiter = rateLimit(limiterSettings);

app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый URL не найден');
});
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`server running on port:${PORT}`); });
