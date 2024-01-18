export const getRandomDate = (startDate: Date, endDate: Date) => {
  // Convert the dates to milliseconds
  const startMillis = startDate.getTime();
  const endMillis = endDate.getTime();

  // Calculate a random number of milliseconds between the two dates
  const randomMillis =
    Math.floor(Math.random() * (endMillis - startMillis + 1)) + startMillis;

  // Create a new date object with the random milliseconds
  const randomDate = new Date(randomMillis);

  return randomDate;
};

export const getRandomAvatar = (key: string) => {
  return `https://i.pravatar.cc/150?u=${key}`;
};
