import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const calculateHash = async () => {
  const baseFile = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  try {
    await fs.access(baseFile);
    const data = await fs.readFile(baseFile, "utf8");
    const hash = crypto.createHash('sha256').update(Buffer.from(data).toString()).digest('hex');
    console.log(hash);
  } catch (err) {
    console.log(err);
  }

  
};

await calculateHash();