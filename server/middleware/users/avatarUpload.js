import uploader from '../../utilities/uploader.js';

export default function avatarUpload(req, res, next) {
  const upload = uploader(
    'avatars',
    ['image/jpeg', 'image/jpg', 'image/png'],
    5000000,
    'Only .jpg, jpeg or .png format allowed!',
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            message: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}
