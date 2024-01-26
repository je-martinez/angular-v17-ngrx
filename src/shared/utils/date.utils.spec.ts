import { timeAgo } from './date.utils';

describe('timeAgo', () => {
  it('should return "Just now" for dates less than a minute ago', () => {
    const date = new Date();
    date.setSeconds(date.getSeconds() - 30);
    expect(timeAgo(date)).toBe('Just now');
  });

  it('should return "1 minute ago" for dates a minute ago', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);
    expect(timeAgo(date)).toBe('1 minute ago');
  });

  it('should return "2 minutes ago" for dates two minutes ago', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 2);
    expect(timeAgo(date)).toBe('2 minutes ago');
  });

  it('should return "1 hour ago" for dates an hour ago', () => {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    expect(timeAgo(date)).toBe('1 hour ago');
  });

  it('should return "2 hours ago" for dates two hours ago', () => {
    const date = new Date();
    date.setHours(date.getHours() - 2);
    expect(timeAgo(date)).toBe('2 hours ago');
  });

  it('should return "1 day ago" for dates a day ago', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    expect(timeAgo(date)).toBe('1 day ago');
  });

  it('should return "2 days ago" for dates two days ago', () => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    expect(timeAgo(date)).toBe('2 days ago');
  });

  it('should return "99+ days ago" for dates more than 99 days ago', () => {
    const date = new Date();
    date.setDate(date.getDate() - 100);
    expect(timeAgo(date)).toBe('99+ days ago');
  });
});
