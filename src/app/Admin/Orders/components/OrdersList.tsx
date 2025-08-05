import React, { useState } from 'react';
import Image from 'next/image';
import { Order } from '../actions';
import { OrderDetailsModal } from './OrderDetailsModal';
import { StatusBadge } from './StatusBadge';
import { StatusDropdown } from './StatusDropdown';

interface OrdersListProps {
  orders: Order[];
  onStatusChange: (orderId: number, newStatus: string) => Promise<void>;
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders, onStatusChange }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateMobile = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {/* Order ID: Always visible */}
            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Order ID
            </th>
            {/* Date: Hidden on mobile, visible on medium screens and up */}
            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
              Date
            </th>
            {/* Customer: Hidden on medium screens and below, visible on large screens and up */}
            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">
              Customer
            </th>
            {/* Items: Hidden on medium screens and below, visible on large screens and up */}
            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">
              Items
            </th>
            {/* Total: Hidden on small screens, visible on medium screens and up */}
            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">
              Total
            </th>
            {/* Status: Always visible */}
            <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            {/* Actions: Always visible */}
            <th scope="col" className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <tr key={order.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              {/* Order ID */}
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  #{order.id}
                </div>
                {/* Show date on mobile below order ID */}
                <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden mt-1">
                  {formatDateMobile(order.created_at)}
                </div>
              </td>
              
              {/* Date - Hidden on mobile */}
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 hidden md:table-cell">
                {formatDate(order.created_at)}
              </td>
              
              {/* Customer - Hidden on medium and below */}
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 hidden lg:table-cell">
                {(order.Order_info as any).firstName || 'Unknown'}
              </td>
              
              {/* Items - Hidden on medium and below */}
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 hidden lg:table-cell">
                {order.products.length} items
              </td>
              
              {/* Total - Hidden on small screens */}
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 hidden sm:table-cell">
                ${order.total.toFixed(2)}
              </td>
              
              {/* Status */}
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col space-y-1">
                  <StatusDropdown 
                    currentStatus={order.status} 
                    onStatusChange={(newStatus) => onStatusChange(order.id, newStatus)} 
                  />
                  {/* Show total on mobile below status */}
                  <div className="text-xs font-medium text-gray-900 dark:text-gray-100 sm:hidden">
                    ${order.total.toFixed(2)}
                  </div>
                </div>
              </td>
              
              {/* Actions */}
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleViewDetails(order)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-400 dark:bg-indigo-900 dark:hover:bg-indigo-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};