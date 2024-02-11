export const GetTimeDifference = (startDate) => {
  // Calculate the difference in milliseconds
  const currentTime = Date.now();
  const timeDifference = currentTime - new Date(startDate);

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    seconds: seconds % 60,
    minutes: minutes % 60,
    hours: hours % 24,
    days: days,
  };
};

export const FormattedTimeDifference = (obj) => {
  if (obj.days > 0) {
    return `${obj.days}d`;
  } else if (obj.hours > 0) {
    return `${obj.hours}h`;
  } else if (obj.minutes > 0) {
    return `${obj.minutes}m`;
  } else if (obj.seconds > 0) {
    return `${obj.seconds}s`;
  } else {
    return '1s';
  }
};
