/**
 * Converts a date to a humanized relative time string
 * @param date - The date to convert
 * @returns A humanized string like "2 days ago", "3 months ago", or "2 years, 5 months ago"
 */
export function humanizeDate(date: Date): string {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffDays === 0) {
    return 'today';
  } else if (diffDays === 1) {
    return 'yesterday';
  } else if (diffDays < 30) {
    return `${diffDays} days ago`;
  } else if (diffMonths < 12) {
    return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
  } else {
    // Calculate remaining months after full years
    const remainingMonths = diffMonths - (diffYears * 12);
    const yearText = diffYears === 1 ? '1 year' : `${diffYears} years`;

    if (remainingMonths === 0) {
      return `${yearText} ago`;
    } else {
      const monthText = remainingMonths === 1 ? '1 month' : `${remainingMonths} months`;
      return `${yearText}, ${monthText} ago`;
    }
  }
}

/**
 * Formats a date for display in a standardized format
 * @param date - The date to format
 * @returns A formatted date string like "January 15, 2024"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
