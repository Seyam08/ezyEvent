import { check, validationResult } from 'express-validator';

export const loginValidators = [
  check('username')
    .isLength({
      min: 1,
    })
    .withMessage('Username or email is required'),
  check('password').isLength({ min: 1 }).withMessage('Password is required'),
];

export function loginValidatorsHandler(req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(422).json({
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
}
