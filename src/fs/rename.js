import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const baseFile = path.join(__dirname, 'files', 'wrongFilename.txt');
  const newFile = path.join(__dirname, 'files', 'properFilename.md');
  try {
    await fs.access(newFile);
    throw new Error("FS operation failed!");
  }
  catch (err) {
    if (err.syscall && err.syscall === 'access') {
      try {
        await fs.access(baseFile);
        await fs.rename(baseFile, newFile);
        console.log("Successfully renamed!");
      }
      catch {
        throw new Error("FS operation failed!");
      }
    }
    else {
      throw new Error("FS operation failed!");
    }
  }
};

await rename();