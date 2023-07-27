import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT = 3000,
  JWT_SECRET_KEY = 'secret-key',
  NODE_ENV = 'development',
  REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
} = process.env;
