import bcrypt from 'bcrypt';
import { unlink } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Client from '../models/Clients.js';

export async function addUser(req, res) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const defaultAvatar = 'avatar-default.jpg';

  if (req.files && req.files.length > 0) {
    newUser = new Client({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new Client({
      ...req.body,
      avatar: defaultAvatar,
      password: hashedPassword,
    });
  }

  //   save user
  try {
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

export async function geAlltUser(req, res) {
  try {
    const users = await Client.find({
      role: 'user',
    }).select({
      _id: 0,
      password: 0,
      avatar: 0,
      role: 0,
      __v: 0,
    });

    res.status(200).json({
      users: users,
    });
  } catch (err) {
    res.status(500).send('Server error!');
  }
}

export async function getUserByUsername(req, res) {
  try {
    const { username } = req.params;
    const user = await Client.findOne({ username }).select({
      _id: 0,
      password: 0,
      avatar: 0,
      __v: 0,
    });
    if (user) {
      res.status(200).json(user);
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

      const avatarName =
        req.files?.length > 0 ? req.files[0].filename : undefined;

      if (Object.keys(rest).length === 0) {
        const result = await Client.updateMany(
          { username: loggedInUser },
          {
            name,
            email,
            password: hashedPassword,
            avatar: avatarName,
          },
          { runValidators: true },
        );

        const prevFileName = req.userInfo.avatar;

        if (result.modifiedCount > 0 && result.acknowledged === true) {
          // remove the previous file

          if (
            typeof avatarName === 'string' &&
            prevFileName !== 'avatar-default.jpg'
          ) {
            const dirName = dirname(fileURLToPath(import.meta.url));
            await unlink(
              `${dirName}/../public/uploads/avatars/${prevFileName}`,
            );
          }
          res.status(200).json({ message: 'Sucessfully edited!' });
        } else {
          res.status(304).json({ message: 'Nothing to change!' });
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
          message: 'ONly name, email, password and avatar are editable!',
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
    res.status(400).json('you are not eligible');
  }
}
