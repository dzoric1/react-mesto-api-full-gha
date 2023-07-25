const limiterSettings = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

const allowedCors = [
  'http://mesto.dzoric1.nomoredomains.xyz/',
  'https://mesto.dzoric1.nomoredomains.xyz/',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

export {
  limiterSettings,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
