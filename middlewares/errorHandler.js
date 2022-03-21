const AuthError = require('../errors/AuthError');

function errorHandler(err, req, res, next) {
  if (err instanceof AuthError) {
    res.status(err.code).json({ error: {
      message: err.message,
      type:'Auth error',
    }});
    return;
  }
  res.status(500).json({ error: {
    message: 'Something failed!'
  }});
}

module.exports = errorHandler;