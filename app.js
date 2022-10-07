require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const {
  celebrate,
  Joi,
  Segments,
  errors,
} = require('celebrate');

const { auth } = require('./middlewares/auth');
const { login, createUser, signout } = require('./controllers/users');
const { errorHandler } = require('./middlewares/errorHandler');
const { NotFoundError } = require('./constants/errors');
// const { linkValidationPattern } = require('./constants/validationPattern');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

const {
  PORT = 3000,
} = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:3001',
    // 'https://nomorefrontend.nomoredomains.sbs',
    // 'http://nomorefrontend.nomoredomains.sbs',
  ],
  credentials: true,
  exposedHeaders: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    // about: Joi.string().min(2).max(30),
    // avatar: Joi.string().regex(linkValidationPattern),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), login);

app.use(auth);

app.post('/signout', signout);
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}, ${process.env.NODE_ENV === 'production' ? 'NODE_ENV = production' : 'NODE_ENV = dev'}`);
});
