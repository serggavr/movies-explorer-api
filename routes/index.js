const express = require('express');

const router = express.Router();
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../constants/errors');

router.use(require('./sign'));

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
