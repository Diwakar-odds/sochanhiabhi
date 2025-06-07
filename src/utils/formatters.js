// frontend/src/utils/formatters.js

// Format date to a readable string e.g., "June 5, 2024"
export const formatDate = (dateStringOrObject) => {
  if (!dateStringOrObject) return '';
  try {
    const date = new Date(dateStringOrObject);
    return date.toLocaleDateString(undefined, { // undefined uses user's locale
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Invalid Date';
  }
};

// Format date and time e.g., "June 5, 2024, 2:30 PM"
export const formatDateTime = (dateStringOrObject) => {
  if (!dateStringOrObject) return '';
  try {
    const date = new Date(dateStringOrObject);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error("Error formatting datetime:", error);
    return 'Invalid DateTime';
  }
};

// Format time e.g., "2:30 PM"
export const formatTime = (dateStringOrObject) => {
  if (!dateStringOrObject) return '';
  try {
    const date = new Date(dateStringOrObject);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return 'Invalid Time';
  }
};


// Capitalize first letter of each word in a string
export const capitalizeWords = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

// Truncate text to a certain length and add ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

// Simple currency formatter (example for USD)
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number') return '';
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return 'N/A';
  }
};