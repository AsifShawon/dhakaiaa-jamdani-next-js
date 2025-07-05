import React from 'react';

interface OrdersFiltersProps {
  onFilterChange: (filters: { status?: string, dateRange?: string }) => void;
}

export const OrdersFilters: React.FC<OrdersFiltersProps> = ({ onFilterChange }) => {
  const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Cancelled'];
  const dateRangeOptions = ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days'];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
      <div className="form-control w-full sm:w-auto flex-1">
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select 
          className="select select-bordered w-full bg-inherit"
          onChange={(e) => onFilterChange({ status: e.target.value === 'All' ? undefined : e.target.value })}
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      
      <div className="form-control w-full sm:w-auto flex-1">
        <label className="label">
          <span className="label-text">Date Range</span>
        </label>
        <select 
          className="select select-bordered w-full bg-inherit"
          onChange={(e) => onFilterChange({ dateRange: e.target.value === 'All Time' ? undefined : e.target.value })}
        >
          {dateRangeOptions.map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>
    </div>
  );
};