import jwt from 'jsonwebtoken';
import Client from '../../models/Clients.js';

export async function protectedRoute(req, res, next) {
  // checking cookies availability
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      // decoding token and cookies
      const token = cookies[process.env.COOKIE_NAME];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // checking the decoded info is valid
      if (Object.keys(decoded).length > 0) {
        const { username, name, email } = decoded;

        const user = await Client.find({
          $and: [{ username }, { email }, { name }],
        });
        // decoded info is valid then call the next function
        if (Object.keys(user).length > 0) {
          next();
        } else {
          // Authentication failure if decoded data is wrong
          res.status(500).json({
            errors: {
              common: {
                msg: 'Authentication failure!',
              },
            },
          });
        }
      } else {
        // Authentication failure if cookie or token decoding failed
        res.status(500).json({
          errors: {
            common: {
              msg: 'Authentication failure!',
            },
          },
        });
      }
    } catch (err) {
      // Authentication failure if cookie or token decoding failed
      res.status(500).json({
        errors: {
          common: {
            msg: 'Authentication failure!',
          },
        },
      });
    }
  } else {
    // Unauthorized URL if there is no cookie
    res.status(401).send('Unauthorized URL!');
  }
}
