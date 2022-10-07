require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const {
  errors,
} = require('celebrate');

const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const { limiter } = require('./middlewares/rateLimiter');

const {
  PORT = 3000,
} = process.env;

const app = express();

app.use(limiter);

app.use(cors({
  origin: ['http://localhost:3001',
    // 'https://nomore.nomoredomains.icu',
    // 'http://nomore.nomoredomains.icu',
  ],
  credentials: true,
  exposedHeaders: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGO_DB : 'mongodb://localhost:27017/dev_bitfilmsdb', {
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

app.use(require('./routes'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}, ${process.env.NODE_ENV === 'production' ? 'NODE_ENV = production' : 'NODE_ENV = dev'}`);
});
