import process from 'node:process';

const parseArgs = () => {
  let key = '';
  const result = [];
  for (const argument of process.argv) {
    if (key ==='' && argument.indexOf('--') === 0) key = argument.substring(2);
    else {
      if (key !=='') result.push(`${key} is ${argument}`);
      key = '';
    }
  }
  console.log(result.join(', '));
};

parseArgs();