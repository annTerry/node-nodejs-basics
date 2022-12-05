import { fileURLToPath } from 'node:url';
import path from 'node:path';
import childProcess from 'node:child_process';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  childProcess.fork(path.join(__dirname,'files','script.js'), args, { cwd: process.cwd() });
};

spawnChildProcess();