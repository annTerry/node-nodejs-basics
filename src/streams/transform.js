import {Transform, pipeline} from 'node:stream';
import process from 'node:process';

const toRead = process.stdin;
const toWrite = process.stdout;

const transform = async () => {
  
  const transformStream = new Transform({transform(data, enc, cb) {
    const dataAsString = data.toString().trim();
    const transformData = dataAsString.toUpperCase().split('').join(' ');
    this.push(transformData + '\n');
    cb();
  }
});

  pipeline(toRead, transformStream, toWrite, err => {
    console.log(err);
  });
  };

await transform();