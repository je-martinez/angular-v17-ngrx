import { getRandomDate, getRandomAvatar } from './random-data.utils';

describe('Random Data Utils', () => {
  it('should return a date between the start and end dates', () => {
    const startDate = new Date(2020, 0, 1);
    const endDate = new Date(2020, 11, 31);
    const randomDate = getRandomDate(startDate, endDate);
    expect(randomDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    expect(randomDate.getTime()).toBeLessThanOrEqual(endDate.getTime());
  });

  it('should return a valid avatar URL', () => {
    const key = 'test-key';
    const avatarUrl = getRandomAvatar(key);
    expect(avatarUrl).toBe(`https://i.pravatar.cc/150?u=${key}`);
  });
});
