import createError from 'http-errors';

//not found handler
export function notFoundHandler(req, res, next) {
  next(createError(404, 'Your requested content was not found!'));
}

// default error handler
export function defaultError(err, req, res, next) {
  res.locals.error = process.env.NODE_ENV = 'development'
    ? err
    : { message: err.message };

  res.status(err.status || 500).json(res.locals.error);
}
