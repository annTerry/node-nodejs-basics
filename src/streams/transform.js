import {Transform, pipeline} from 'node:stream';
import process from 'node:process';

const readable = process.stdin;
const writable = process.stdout;

const transform = async () => {
  
  const transformStream = new Transform({transform(chunk, enc, cb) {
    const chunkStringify = chunk.toString().trim();
    const reverseChunk = chunkStringify.split('').reverse().join('');
    this.push(reverseChunk + '\n');

    cb();
  }
});

  pipeline(readable, transformStream, writable, err => {
    console.log(`Error:${err}`);
  });
  };

await transform();