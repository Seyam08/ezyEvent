import bcrypt from 'bcrypt';
import { unlink } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Client from '../models/Clients.js';
import Event from '../models/Events.js';
import { copyDefaultAvatar } from '../utilities/defaultAvatarMaker.js';

export async function addUser(req, res) {
  let newUser;
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
      newUser = new Client({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      });
    } else {
      const defaultAvatar = await copyDefaultAvatar();
      newUser = new Client({
        ...req.body,
        avatar: defaultAvatar,
        password: hashedPassword,
      });
    }

    //   save user

    await newUser.save({ runValidators: true });
    res.status(201).json({
      message: 'User registration successfull!',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'User registration failed!',
        },
      },
    });
  }
}

export async function geAllUser(req, res) {
  try {
    const users = await Client.find({
      role: 'user',
    })
      .select({
        _id: 0,
        password: 0,
        __v: 0,
      })
      .lean();
    const updatedUsers = users.map((user) => ({
      ...user,
      avatar: `avatars/${user.avatar}`,
    }));
    res.status(200).json(updatedUsers);
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Something went wrong!',
        },
      },
    });
  }
}

export async function getUserByUsername(req, res) {
  try {
    const { username } = req.params;
    const user = await Client.findOne({ username })
      .select({
        _id: 0,
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
      ])
      .lean();
    if (user) {
      const updatedUsers = {
        ...user,
        avatar: `avatars/${user.avatar}`,
      };
      res.status(200).json(updatedUsers);
    } else {
      res.status(404).json({
        errors: {
          common: {
            msg: "user doesn't exist!",
          },
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Internal server error!',
        },
      },
    });
  }
}

export async function editUser(req, res) {
  const loggedInUser = req.userInfo.username;
  const paramUser = req.params.username;

  if (loggedInUser === paramUser) {
    try {
      const { name, email, password, ...rest } = req.body;

      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : undefined;

      if ((name || email || password) && Object.keys(rest).length === 0) {
        const result = await Client.updateMany(
          { username: loggedInUser },
          {
            name,
            email,
            password: hashedPassword,
          },
          { runValidators: true },
        );

        if (result?.acknowledged) {
          res.status(201).json({ message: 'Successfully edited!' });
        } else {
          res.status(422).json({
            errors: {
              common: {
                msg: 'Something went wrong while updating data!',
              },
            },
          });
        }
      } else {
        res.status(400).json({
          errors: {
            common: {
              msg: 'ONly name, email and password are editable!',
            },
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        errors: {
          common: {
            msg: 'Internal server error!',
          },
        },
      });
    }
  } else {
    res.status(400).json({
      errors: {
        common: {
          msg: 'you are not eligible',
        },
      },
    });
  }
}

export async function editAvatar(req, res) {
  const loggedInUser = req.userInfo.username;
  const paramUser = req.params.username;

  if (loggedInUser === paramUser) {
    const avatarName =
      req.files?.length > 0 ? req.files[0].filename : undefined;

    try {
      if (avatarName) {
        const result = await Client.updateOne(
          { username: loggedInUser },
          { $set: { avatar: avatarName } },
          { runValidators: true },
        );

        if (result?.acknowledged) {
          // remove the previous file
          const dirName = dirname(fileURLToPath(import.meta.url));

          await unlink(`${dirName}/../public/uploads/${req.userInfo.avatar}`);
        } else {
          throw createError('Something wrong while changing avatar!');
        }
        res.status(201).json({ message: 'Avatar Changed!' });
      } else {
        res.status(400).json({
          errors: {
            common: {
              msg: 'There is no file to upload!',
            },
          },
        });
      }
    } catch (error) {
      // remove uploaded files
      if (req.files?.length > 0) {
        const { filename } = req.files[0];
        const dirName = dirname(fileURLToPath(import.meta.url));
        unlink(`${dirName}/../public/uploads/avatars/${filename}`, (err) => {
          if (err) {
            throw createError('Something wrong while uploading file!');
          }
        });
      }
      res.status(500).json({
        errors: {
          common: {
            msg: 'Internal server error!',
          },
        },
      });
    }
  } else {
    // remove uploaded files
    if (req.files?.length > 0) {
      const { filename } = req.files[0];
      const dirName = dirname(fileURLToPath(import.meta.url));
      unlink(`${dirName}/../public/uploads/avatars/${filename}`, (err) => {
        if (err) {
          throw createError('Something wrong while uploading file!');
        }
      });
    }
    res.status(400).json({
      errors: {
        common: {
          msg: 'you are not eligible',
        },
      },
    });
  }
}

export async function deleteUser(req, res) {
  const loggedInUser = req.userInfo.username;
  const paramUser = req.params.username;
  // checking that param user is logged in
  if (loggedInUser === paramUser) {
    try {
      const user = await Client.findOne({ username: loggedInUser });

      // password checking for verification
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (validPass) {
        const delUser = await Client.findByIdAndDelete({ _id: user.id });

        // removing hostId, attendeesId, speakerId from Event collection
        const { eventsHosted, eventsAttended, eventsSpeaking, id } = delUser;

        if (eventsHosted.length > 0) {
          await Event.updateMany(
            { _id: { $in: eventsHosted } },
            { $pull: { hostId: id } },
          );
        }
        if (eventsAttended.length > 0) {
          await Event.updateMany(
            { _id: { $in: eventsAttended } },
            { $pull: { attendeesId: id } },
          );
        }
        if (eventsSpeaking.length > 0) {
          await Event.updateMany(
            { _id: { $in: eventsSpeaking } },
            { $pull: { speakerId: id } },
          );
        }
        // remove user avatar if any
        if (delUser.avatar) {
          const dirName = dirname(fileURLToPath(import.meta.url));
          await unlink(
            `${dirName}/../public/uploads/avatars/${delUser.avatar}`,
          );
        }
        // clear cookies
        res.clearCookie(process.env.COOKIE_NAME);
        // after all the opration - response
        res.status(200).json({ message: 'Sucessfully deleted user!' });
      } else {
        res.status(400).json({
          errors: {
            common: {
              msg: 'Incorrect password!',
            },
          },
        });
      }
    } catch (error) {
      res.status(400).json({
        errors: {
          common: {
            msg: 'Something went wrong!',
          },
        },
      });
    }
  } else {
    res.status(400).json({
      errors: {
        common: {
          msg: 'you are not eligible',
        },
      },
    });
  }
}
