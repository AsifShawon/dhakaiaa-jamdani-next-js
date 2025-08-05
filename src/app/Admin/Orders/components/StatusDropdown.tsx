// app/admin/orders/components/StatusDropdown.tsx
import React, { useState } from 'react';

interface StatusDropdownProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => Promise<void>;
}

export const StatusDropdown: React.FC<StatusDropdownProps> = ({ 
  currentStatus, 
  onStatusChange 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;
    
    setIsUpdating(true);
    try {
      await onStatusChange(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

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
    <div className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-sm m-1">
        <span className={`badge ${getStatusClass(currentStatus)} mr-2`}>
          {currentStatus}
        </span>
        {isUpdating ? 'Updating...' : 'Change'}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-42">
        {statusOptions.map((status) => (
          <li key={status}>
            <a onClick={() => handleStatusChange(status)}>
              <span className={`badge ${getStatusClass(status)} mr-2`}>
                {status}
              </span>
              {/* {status} */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};