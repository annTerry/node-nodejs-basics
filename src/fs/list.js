import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilesFromDirectory = async (dir) => {
  const filesInDir = await fs.readdir(dir);
  const files = await Promise.all(
    filesInDir.map(async (file) => {
          const filePath = path.join(dir, file);
          const stats = await fs.stat(filePath);         
          if (stats.isDirectory()) {
              return getFilesFromDirectory(filePath);
          } else {
              return filePath;
          }
      })
  );
  return files; // return with empty arrays removed
};

const list = async () => {
  const filesPath = path.join(__dirname, 'files');
  try {
    await fs.access(filesPath);
    console.log(await getFilesFromDirectory(filesPath));
    }
    catch (err) {
      console.log(err);
    }
};

await list();