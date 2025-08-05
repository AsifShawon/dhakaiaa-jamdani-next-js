"use client";

import { useState, useEffect } from "react";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  category?: string;
  min_order_amount?: number;
  start_date: string;
  end_date: string;
  display_type: 'modal' | 'banner';
  is_active: boolean;
}

interface OfferDisplayProps {
  offers: Offer[] | null;
}

export default function OfferDisplay({ offers }: OfferDisplayProps) {
  const [dismissedOffers, setDismissedOffers] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [currentModalOffer, setCurrentModalOffer] = useState<Offer | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side mounting to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
    // Load dismissed offers from sessionStorage (so they reappear on refresh)
    const dismissed = sessionStorage.getItem('dismissedOffers');
    if (dismissed) {
      try {
        const dismissedArray = JSON.parse(dismissed);
        setDismissedOffers(new Set(dismissedArray));
      } catch (error) {
        console.error('Error parsing dismissed offers:', error);
      }
    }
  }, []);

  // Save dismissed offers to sessionStorage
  useEffect(() => {
    if (isClient && dismissedOffers.size > 0) {
      sessionStorage.setItem('dismissedOffers', JSON.stringify([...dismissedOffers]));
    }
  }, [dismissedOffers, isClient]);

  // Get offers that haven't been dismissed
  const activeOffers = offers?.filter(offer => !dismissedOffers.has(offer.id)) || [];
  const bannerOffers = activeOffers.filter(offer => offer.display_type === 'banner');
  const modalOffers = activeOffers.filter(offer => offer.display_type === 'modal');

  useEffect(() => {
    // Show modal for the first modal offer when component mounts
    if (modalOffers.length > 0 && !currentModalOffer && isClient) {
      setCurrentModalOffer(modalOffers[0]);
      setShowModal(true);
    }
  }, [modalOffers, currentModalOffer, isClient]);

  const dismissOffer = (offerId: string) => {
    setDismissedOffers(prev => new Set([...prev, offerId]));
  };

  const closeModal = () => {
    setShowModal(false);
    if (currentModalOffer) {
      dismissOffer(currentModalOffer.id);
    }
    
    // Show next modal offer if available
    const remainingModalOffers = modalOffers.filter(offer => 
      offer.id !== currentModalOffer?.id && !dismissedOffers.has(offer.id)
    );
    
    if (remainingModalOffers.length > 0) {
      setTimeout(() => {
        setCurrentModalOffer(remainingModalOffers[0]);
        setShowModal(true);
      }, 1000); // 1 second delay between modals
    } else {
      setCurrentModalOffer(null);
    }
  };

  const formatDiscount = (type: string, value: number) => {
    return type === 'percentage' ? `${value}% OFF` : `$${value} OFF`;
  };

  const formatMinOrder = (amount?: number) => {
    return amount ? ` on orders over $${amount}` : '';
  };

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Banner Offers */}
      {bannerOffers.map((offer) => (
        <div
          key={offer.id}
          className="offer-banner relative bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 text-center shadow-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="font-bold text-lg">🎉 {offer.title}</span>
            <span className="hidden sm:inline">-</span>
            <span className="text-sm sm:text-base">
              {formatDiscount(offer.discount_type, offer.discount_value)}
              {formatMinOrder(offer.min_order_amount)}
            </span>
          </div>
          <p className="text-xs mt-1 opacity-90">{offer.description}</p>
          
          {/* Close button */}
          <button
            onClick={() => dismissOffer(offer.id)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 text-xl font-bold"
            aria-label="Close offer"
          >
            ×
          </button>
        </div>
      ))}

      {/* Modal Offers */}
      {showModal && currentModalOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="offer-modal bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 ease-out">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  🎉 Special Offer!
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                {currentModalOffer.title}
              </h3>
              
              <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-600 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">
                    {formatDiscount(currentModalOffer.discount_type, currentModalOffer.discount_value)}
                  </span>
                  {currentModalOffer.min_order_amount && (
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      on orders over ${currentModalOffer.min_order_amount}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {currentModalOffer.description}
              </p>

              {currentModalOffer.category && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Valid for: {currentModalOffer.category}
                </p>
              )}

              <div className="text-xs text-gray-400 dark:text-gray-500">
                Valid until: {new Date(currentModalOffer.end_date).toLocaleDateString()}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 rounded-b-lg flex justify-between space-x-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  closeModal();
                  // You can add navigation to shop page here
                  window.location.href = '/Shop';
                }}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Shop Now!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
