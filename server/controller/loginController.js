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
        const profile = {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          avatar: `avatars/${user.avatar}`,
          role: user.role,
          eventsHosted: user.eventsHosted,
          eventsAttended: user.eventsAttended,
          eventsSpeaking: user.eventsSpeaking,
        };
        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
          secure: true, // Important for HTTPS (Render)
          sameSite: 'None', // Required for cross-origin cookie sharing
        });

        res.status(200).json({ message: 'login successful', profile });
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
    // if any kind of error happened due to async operation
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
  const { username, name, email } = userInfo;

  try {
    const user = await Client.findOne({
      $and: [{ username }, { email }, { name }],
    })
      .select({
        password: 0,
        __v: 0,
      })
      .populate([
        {
          path: 'eventsHosted',
          select: 'eventName eventDate attendeesId status',
        },
        {
          path: 'eventsSpeaking',
          select: 'eventName eventDate attendeesId status',
        },
        {
          path: 'eventsAttended',
          select: 'eventName eventDate attendeesId status',
        },
      ])
      .lean();
    // decoded info is valid then call the next function
    if (Object.keys(user).length > 0) {
      const resUser = {
        ...user,
        avatar: `avatars/${user.avatar}`,
      };

      res.status(200).json({
        profile: resUser,
      });
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: 'User not found!',
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Something went wrong while getting profile!',
        },
      },
    });
  }
}

// logout function
export function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME, {
    httpOnly: true,
    secure: true, // Important for HTTPS (Render)
    sameSite: 'None',
  });
  res.status(200).json({ message: 'logged out' });
}

// .populate([
//             {
//               path: 'eventsHosted',
//               select: 'eventName eventDate attendeesId status',
//             },
//             {
//               path: 'eventsSpeaking',
//               select: 'eventName eventDate attendeesId status',
//             },
//             {
//               path: 'eventsAttended',
//               select: 'eventName eventDate attendeesId status',
//             },
//           ])
