/* my Fibonacci function */
const fib = (n) => {
  if (n <= 1) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
};

const memo = (x) => {
  const cache = {};
  return (arg) => cache[arg] || (cache[arg] = x(arg));
};
const fibN = memo(fib);
