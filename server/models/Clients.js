import mongoose, { Schema } from 'mongoose';

const clientSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a Username!'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: String,
  email: {
    type: String,
    required: [true, 'Please provide a unique email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['host', 'speaker', 'user'],
    message: '{VALUE} is not supported',
    default: 'user',
  },
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
