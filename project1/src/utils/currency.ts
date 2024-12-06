export const formatINR = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Convert lakhs to raw number
export const lakhsToNumber = (lakhs: string): number => {
  const numericValue = parseFloat(lakhs.replace(/[^0-9.]/g, ''));
  return numericValue * 100000;
};

// Format number to lakhs display
export const numberToLakhs = (value: number): string => {
  const lakhs = value / 100000;
  return lakhs.toFixed(2);
};