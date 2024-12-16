// Common validation functions
export const required = (value: any): string | undefined => {
  if (value === undefined || value === null || value === '') {
    return 'This field is required';
  }
  return undefined;
};

export const email = (value: string): string | undefined => {
  if (!value) return undefined;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(value)) {
    return 'Invalid email address';
  }
  return undefined;
};

export const zipCode = (value: string, country: string): string | undefined => {
  if (!value) return undefined;
  
  if (country === 'US') {
    const usZipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (!usZipRegex.test(value)) {
      return 'Invalid ZIP code format (e.g., 12345 or 12345-6789)';
    }
  }
  
  return undefined;
};

export const minLength = (min: number) => (value: string): string | undefined => {
  if (!value) return undefined;
  if (value.length < min) {
    return `Must be at least ${min} characters`;
  }
  return undefined;
};

export const maxLength = (max: number) => (value: string): string | undefined => {
  if (!value) return undefined;
  if (value.length > max) {
    return `Must be no more than ${max} characters`;
  }
  return undefined;
};