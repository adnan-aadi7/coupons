import toast from 'react-hot-toast';

/**
 * Premium Toast Notifications Utility
 * Uses react-hot-toast with custom gorgeous styling matching the app's aesthetic.
 */

const baseStyles = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 800,
  fontSize: '14px',
  borderRadius: '16px',
  padding: '16px 24px',
  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      ...baseStyles,
      background: '#fff',
      color: '#1A1C1C',
      border: '1px solid #e2e8f0',
    },
    iconTheme: {
      primary: '#10b981',
      secondary: '#fff',
    },
    duration: 4000,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    style: {
      ...baseStyles,
      background: '#fff',
      color: '#1A1C1C',
      border: '1px solid #fee2e2',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
    duration: 5000,
  });
};

export const toastInfo = (message: string) => {
  toast(message, {
    icon: '💡',
    style: {
      ...baseStyles,
      background: '#fff',
      color: '#1A1C1C',
      border: '1px solid #e2e8f0',
    },
    duration: 4000,
  });
};
