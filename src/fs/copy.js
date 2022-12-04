import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyFilesFromDirectory = async (oldDirPath, newDirPath) => {
  try {
    await fs.access(newDirPath);
    }
    catch {
      await fs.mkdir( newDirPath );
    }
    const filesInDirectory = await fs.readdir(oldDirPath);
    filesInDirectory.forEach(async (file) => {
          const oldFilePath = path.join(oldDirPath, file);
          const newFilePath = path.join(newDirPath, file);
          const stats = await fs.stat(oldFilePath);          
          if (stats.isDirectory()) {
              await copyFilesFromDirectory(oldFilePath, newFilePath);
          } else {
            try {
              await fs.copyFile(oldFilePath, newFilePath);
              console.log('copied successfully!');
            } catch (error) {
              console.log(error);
            }
          }
      })
}


const copy = async () => {
const oldDirPath = path.join(__dirname, 'files');
const newDirPath = path.join(__dirname, 'files_copy');
try {
await fs.access(oldDirPath)
}
catch (err) {
  console.log(err);
}
try {
  await fs.access(newDirPath);
  }
  catch {
    await fs.mkdir( newDirPath );
    await copyFilesFromDirectory(oldDirPath, newDirPath);
  }
};

copy();