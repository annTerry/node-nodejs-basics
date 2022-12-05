import { Worker } from 'node:worker_threads';
import os from 'node:os'
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, '/worker.js'), { workerData });
    worker.on('message', resolve);
    worker.on('error', () => {return {status: 'error', data: null}});
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

const performCalculations = async () => {
  const results = [];
  for(let i=0; i<os.cpus().length; i++) {
    results.push(runService(10 + i));
  }
  const result = await Promise.all(results);
  console.log(result);
};

await performCalculations();