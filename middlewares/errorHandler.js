const AuthError = require('../errors/AuthError');
const HttpHandlerError = require('../errors/HttpHandlerError');

function errorHandler(err, req, res, next) {
  if (err instanceof AuthError) {
    res.status(err.code).json({ error: {
      message: err.message,
      type:'Auth error',
    }});
    return;
  }

  if (err instanceof HttpHandlerError) {
    res.status(err.code).json({ error: {
      message: err.message,
      type:'HTTP error',
    }});
    return;
  }

  res.status(500).json({ error: {
    message: 'Something failed!'
  }});
}

module.exports = errorHandler;