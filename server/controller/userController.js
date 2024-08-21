import bcrypt from 'bcrypt';
import Client from '../models/Clients.js';

export async function addUser(req, res, next) {
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
    await newUser.save();
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
