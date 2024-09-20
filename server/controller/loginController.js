import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from '../models/Clients.js';

// login function
export async function login(req, res) {
  try {
    // checking the username or email is exist
    const user = await Client.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });

    if (user && user._id) {
      // checking the password
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (validPass) {
        // user object fot JWT token
        const userInfo = {
          username: user.username,
          name: user.name,
          email: user.email,
        };
        // generating token
        const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        res.status(200).json({ message: 'login sucessfull' });
      } else {
        // if password is incorrect but username is correct then username will be also sent on response
        res.status(401).json({
          data: {
            username: req.body.username,
          },
          errors: {
            common: {
              msg: 'Incorrect password!',
            },
          },
        });
      }
    } else {
      // if the username or email doesn't exist this will be the response
      res.status(404).json({
        errors: {
          common: {
            msg: "user doesn't exist!",
          },
        },
      });
    }
  } catch (error) {
    // if any kind of error happend due to async operation
    res.status(500).json({
      errors: {
        common: {
          msg: 'Login failed!',
        },
      },
    });
  }
}
//logged In User Info
export async function loggedInUserInfo(req, res) {
  const userInfo = req.userInfo;

  res.status(200).json({
    profile: userInfo,
  });
}

// logout function
export function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.status(200).json({ message: 'logged out' });
}
