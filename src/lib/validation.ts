export const validateField = (value: any, field: any) => {
  if (field.required && !value) {
    return 'This field is required';
  }

  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  }

  if (field.validation?.pattern && value) {
    const regex = new RegExp(field.validation.pattern);
    if (!regex.test(value)) {
      return field.validation.message || 'Invalid format';
    }
  }

  if (field.type === 'number' && value) {
    const num = Number(value);
    if (field.validation?.min !== undefined && num < field.validation.min) {
      return `Value must be at least ${field.validation.min}`;
    }
    if (field.validation?.max !== undefined && num > field.validation.max) {
      return `Value must be at most ${field.validation.max}`;
    }
  }

  return '';
};