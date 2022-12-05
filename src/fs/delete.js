import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
  const baseFile = path.join(__dirname, 'files', 'fileToRemove.txt');
  try {
    await fs.access(baseFile);
    await fs.unlink(baseFile);
    console.log("Successfully deleted file!");
  } catch (err) {
    if (err.syscall && err.syscall === 'access') {
      throw new Error("FS operation failed!");
      }
      else{
        console.log(err);
      }
  }
};

await remove();