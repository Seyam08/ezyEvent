import bcrypt from 'bcrypt';
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

export async function getUser(req, res) {
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
    console.log(err.errmsg);
    res.status(500).send('Server error!');
  }
}
