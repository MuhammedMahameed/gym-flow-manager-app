
// Check if a date is within X days of another date
export const isWithinDays = (
  date: Date, 
  comparisonDate: Date, 
  days: number,
  expired: boolean = false
): boolean => {
  // Clone the dates to avoid modifying the original
  const d1 = new Date(date);
  const d2 = new Date(comparisonDate);
  
  // Reset hours, minutes, seconds and milliseconds
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  
  // Calculate the time difference in days
  const timeDiff = d1.getTime() - d2.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (expired) {
    return daysDiff < 0;
  }
  
  return daysDiff >= 0 && daysDiff <= days;
};

// Format dates to display in UI
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

// Calculate days remaining until a date
export const daysRemaining = (dateString: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  
  const timeDiff = targetDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
