import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const stream = fs.ReadStream(path.join(__dirname,'files', 'fileToRead.txt'), {encoding: 'utf-8'});
  stream.on('readable', function(){
    var data = stream.read();
    if(data != null) console.log(data);
  });
};

await read();