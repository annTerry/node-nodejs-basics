import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const read = async () => {
  const baseFile = path.join(__dirname, 'files', 'fileToRead.txt');
  try {
    await fs.access(baseFile);
    const data = await fs.readFile(baseFile, "utf8");
    console.log(Buffer.from(data).toString());
  } catch (err) {
    if (err.syscall && err.syscall === 'access') {
      throw new Error("FS operation failed!");
    }
    else {
      console.log(err);
    }
  }
};

await read();