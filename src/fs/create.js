import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const baseFile = path.join(__dirname, 'files', 'fresh.txt');
    try {
      await fs.access(baseFile);
      throw new Error("FS operation failed!");
    } catch (err) {
        if (err.syscall && err.syscall === 'access') {
          const data = new Uint8Array(Buffer.from('I am fresh and young'));
          await fs.writeFile(baseFile, data, (err) => {
            if (err) throw err;            
          });
          console.log('The file has been saved!');
        }
        else {
          throw new Error("FS operation failed!");
        }
    }    
};

await create();