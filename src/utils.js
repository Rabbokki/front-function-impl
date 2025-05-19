import { differenceInCalendarDays } from 'date-fns';

export const parseDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date) ? null : date;
};

export const generateDayKeys = (startDate, endDate) => {
  const parsedStart = parseDate(startDate);
  const parsedEnd = parseDate(endDate);
  if (!parsedStart || !parsedEnd) return ['day1'];
  const days = differenceInCalendarDays(parsedEnd, parsedStart) + 1;
  return Array.from({ length: days }, (_, i) => `day${i + 1}`);
};

export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage: ${key}`, error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error retrieving from localStorage: ${key}`, error);
    return null;
  }
};