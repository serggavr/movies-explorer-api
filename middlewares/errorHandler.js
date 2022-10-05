// eslint-disable-next-line consistent-return
module.exports.errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
  }
  res.status(err.statusCode).json({ message: err.message });
  next();
};
