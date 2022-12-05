import fs from 'node:fs';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const gzip = zlib.createGzip(); 
  const fileToZip = fs.createReadStream(path.join(__dirname,'files', 'fileToCompress.txt')); 
  const archive = fs.createWriteStream(path.join(__dirname,'files', 'archive.gz')); 
  fileToZip.pipe(gzip).pipe(archive);
  console.log('File successfully compressed!');
};

await compress();