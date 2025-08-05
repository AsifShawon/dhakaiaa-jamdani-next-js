"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Order } from '../actions';
import {StatusBadge} from './StatusBadge';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/app/slices/productSlices';

interface OrderDetailsModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ 
  order, 
  isOpen, 
  onClose 
}) => {
  const dispatch = useDispatch();
  const { products, status, filters } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  if (!isOpen) return null;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order #{order.id}</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Information</h3>
            <div className="bg-base-200 p-4 rounded-box">
              <p><span className="font-medium">Date:</span> {formatDate(order.created_at)}</p>
              <p><span className="font-medium">Status:</span> <StatusBadge status={order.status} /></p>
              <p><span className="font-medium">Total:</span> ${order.total.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
            <div className="bg-base-200 p-4 rounded-box">
              <p><span className="font-medium">Name:</span> {(order.Order_info as any)?.firstName || 'N/A'}</p>
              <p><span className="font-medium">Email:</span> {(order.Order_info as any)?.email || 'N/A'}</p>
              <p><span className="font-medium">Phone:</span> {(order.Order_info as any)?.phone || 'N/A'}</p>
              <p><span className="font-medium">Address:</span> {(order.Order_info as any)?.address || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <div className="bg-base-200 rounded-box p-4">
            {order.products.map((p:any, index) => {

              const product = products.find(
                (_product:any) => _product.id === p.id
              );

              return <div key={index} className="flex items-center gap-4 py-2 border-b border-base-300 last:border-0">
                {product.image_urls && product.image_urls[0] && (
                  <div className="flex-shrink-0">
                    <Image
                      width={60}
                      height={60}
                      src={product.image_urls[0]}
                      alt={product.title}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm opacity-70">${product.price.toFixed(2)}</p>
                </div>
              </div>
})}
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};