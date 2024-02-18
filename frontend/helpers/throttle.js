export const Throttle = (func, interval) => {
  let isRunning = false;
  return (...args) => {
    if (!isRunning) {
      isRunning = true;
      func.apply(this, args);
      setTimeout(() => {
        isRunning = false;
      }, interval);
    }
  };
};
