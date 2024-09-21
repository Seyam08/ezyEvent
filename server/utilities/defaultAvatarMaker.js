import { copyFile } from 'fs/promises';
import { basename, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

export async function copyDefaultAvatar() {
  const dirName = dirname(fileURLToPath(import.meta.url));

  const src = `${dirName}/../images/avatar-default.jpg`; // The original file
  const destDir = `${dirName}/../public/uploads/avatars/`; // Destination folder

  const fileName = basename(src); // Extract the original file name (e.g., 'avatar.jpg')
  const fileExtension = extname(fileName); // Extract the file extension (e.g., '.jpg')
  const baseName = fileName.replace(fileExtension, ''); // Get the base name (e.g., 'avatar')

  // Create the new file name with the current timestamp
  const newFileName = `${baseName}-${Date.now()}` + fileExtension;

  // Full destination path with the new file name
  const destinationFile = `${destDir}/${newFileName}`;

  try {
    await copyFile(src, destinationFile);
    return newFileName;
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: 'Unable to set avatar!',
        },
      },
    });
  }
}
