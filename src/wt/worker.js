import { workerData, parentPort } from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const getResult = (data) => {
  return {status: 'resolved', data: nthFibonacci(data)};
}

const sendResult = () => {
  let result;
  try {
    result = getResult(workerData)
  }
  catch {
    result =  {status: 'error', data: null};
  }
  parentPort.postMessage(result);
};

sendResult();