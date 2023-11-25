import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {AxiosError} from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAxiosError(error: any): error is AxiosError {
  return 'isAxiosError' in error;
}

export const formatDateToLocal = (
  dateStr: string | number,
  locale: string = 'en-US',
  formatType: 'full' | 'short' = 'full'
) => {
  const date = new Date(dateStr);
  let options: Intl.DateTimeFormatOptions;

  if (formatType === 'full') {
    options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
  } else {
    options = {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
  }

  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function getRelativeTime(
  dateString: string | number
): string {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Average days in a month
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}
