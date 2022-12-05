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
              return file;
          }
      })
  );
  return files;
};

const list = async () => {
  const filesPath = path.join(__dirname, 'files');
  try {
    await fs.access(filesPath);
    const result = await getFilesFromDirectory(filesPath);
    console.table(result.flat());
    }
    catch (err) {
      throw new Error("FS operation failed!");
    }
};

await list();