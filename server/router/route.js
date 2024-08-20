import { Router } from 'express';
import avatarUpload from '../middleware/users/avatarUpload.js';

const router = Router();

// Users Routes
router
  .route('/users')
  .get((req, res) => {
    res.status(200).json('user get');
  })
  .post(avatarUpload, (req, res) => {
    res.status(201).json('user post');
  });

export default router;
