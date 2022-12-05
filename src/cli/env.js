import process from 'node:process';

const parseEnv = () => {
  console.log(Object.keys(process.env)
                    .filter(key => key.indexOf('RSS_') >= 0)
                    .map (key => `${key}=${process.env[key]}`)
                    .join("; "));
};

parseEnv();