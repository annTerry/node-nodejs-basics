import process from 'node:process';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transform = async () => {
  
  process.stdin.on("data", data => { 
    
    }); 
    process.on("exit", () => { 
    writeStream.close();  
    }); 
  };

await transform();