import fs from 'node:fs';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const unzip = zlib.createUnzip();
  const archive = fs.createReadStream(path.join(__dirname,'files', 'archive.gz')); 
  const outputFile = fs.createWriteStream(path.join(__dirname,'files', 'fileToCompress.txt')); 
  archive.pipe(unzip).pipe(outputFile);
  console.log('File successfully decompressed!');
};

await decompress();