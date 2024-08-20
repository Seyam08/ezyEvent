import createError from 'http-errors';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export default function uploader(
  folder_path,
  file_types,
  max_file_size,
  error_msg,
) {
  // file upload folder path
  const dirName = dirname(fileURLToPath(import.meta.url));
  const upload_folder = `${dirName}/../public/uploads/${folder_path}/`;

  // define Storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, upload_folder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLowerCase()
          .split(' ')
          .join('-') +
        '-' +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  //  multer upload Object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(415, error_msg));
      }
    },
  });

  return upload;
}
