module.exports.errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500).json({ message: 'Непредвиденная ошибка' });
  } else {
    res.status(err.statusCode).json({ message: err.message });
    next();
  }
};
