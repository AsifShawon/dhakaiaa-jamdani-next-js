import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'badge-success';
      case 'processing':
        return 'badge-warning';
      case 'cancelled':
        return 'badge-error';
      case 'completed':
        return 'badge-success';
      case 'shipped':
        return 'badge-info';
      case 'pending':
        return 'badge-ghost';
      default:
        return 'badge-neutral';
    }
  };

  return (
    <span className={`badge ${getStatusClass(status)}`}>
      {status}
    </span>
  );
};

