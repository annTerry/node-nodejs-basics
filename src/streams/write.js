import process from 'node:process';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const writeStream = fs.createWriteStream(path.join(__dirname, 'files', 'fileToWrite.txt'));
  process.stdin.on("data", data => {
    writeStream.write(data);
  });
  process.on("exit", () => {
    writeStream.close();
  });
};

await write();