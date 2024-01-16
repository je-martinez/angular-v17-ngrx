export const timeAgo = (date: Date) => {
  const now = new Date();
  const seconds = Math.floor((+now - +date) / 1000);

  let interval = Math.floor(seconds / 60);

  if (interval < 1) {
    return 'Just now';
  } else if (interval < 60) {
    return `${interval} minute${interval > 1 ? 's' : ''} ago`;
  }

  interval = Math.floor(interval / 60);
  if (interval < 24) {
    return `${interval} hour${interval > 1 ? 's' : ''} ago`;
  }

  interval = Math.floor(interval / 24);
  if (interval < 100) {
    return `${interval} day${interval > 1 ? 's' : ''} ago`;
  }

  // You can add more intervals like weeks, months, and years as needed

  return '99+ days ago';
};
