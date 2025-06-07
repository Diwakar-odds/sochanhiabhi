// frontend/src/utils/validators.js

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  // Basic email regex, consider a more robust one or a library for production
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true; // For numbers, booleans etc.
};

export const hasMinLength = (value, minLength) => {
  if (!value || typeof value !== 'string') return false;
  return value.length >= minLength;
};

export const hasMaxLength = (value, maxLength) => {
  if (!value || typeof value !== 'string') return false;
  return value.length <= maxLength;
};

export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Example of a more complex validation function that returns error messages
export const validateRegistrationForm = (formData) => {
  const errors = {};
  if (!isNotEmpty(formData.username)) {
    errors.username = 'Username is required.';
  } else if (!hasMinLength(formData.username, 3)) {
    errors.username = 'Username must be at least 3 characters.';
  }

  if (!isNotEmpty(formData.email)) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email format.';
  }

  if (!isNotEmpty(formData.password)) {
    errors.password = 'Password is required.';
  } else if (!hasMinLength(formData.password, 6)) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (!isNotEmpty(formData.confirmPassword)) {
    errors.confirmPassword = 'Confirm password is required.';
  } else if (!doPasswordsMatch(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors; // Returns an object of errors. Empty object means no errors.
};