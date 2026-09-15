// Currency Formatter in Egyptian Pounds (EGP / ج.م)
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '0 ج.م';
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0
  }).format(price).replace('EGP', 'ج.م');
};

// Simple number format with Arabic locale
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  return new Intl.NumberFormat('ar-EG').format(num);
};

// Date Formatter in Arabic
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Calculate Discount Percentage
export const calculateDiscount = (oldPrice, currentPrice) => {
  if (!oldPrice || !currentPrice || oldPrice <= currentPrice) return 0;
  return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
};

