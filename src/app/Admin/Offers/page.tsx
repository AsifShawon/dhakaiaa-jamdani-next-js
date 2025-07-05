"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Percent, 
  Tag,
  Calendar,
  Target,
  AlertCircle,
  X
} from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import clsx from "clsx";
import { 
  fetchOffers, 
  createOffer, 
  updateOffer, 
  deleteOffer, 
  toggleOfferStatus 
} from "./action";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  category: string | null;
  min_order_amount: number | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
  display_type: 'modal' | 'banner';
  created_at: string;
}

const OffersPage = () => {
  const { theme } = useTheme();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_type: "percentage" as "percentage" | "fixed",
    discount_value: 0,
    category: "",
    min_order_amount: 0,
    start_date: "",
    end_date: "",
    display_type: "modal" as "modal" | "banner"
  });

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const data = await fetchOffers();
      setOffers(data);
    } catch (error) {
      console.error("Error loading offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title.trim()) {
      alert('Please enter a title for the offer');
      return;
    }
    
    if (!formData.description.trim()) {
      alert('Please enter a description for the offer');
      return;
    }
    
    if (!formData.start_date) {
      alert('Please select a start date');
      return;
    }
    
    if (!formData.end_date) {
      alert('Please select an end date');
      return;
    }
    
    if (formData.discount_value <= 0) {
      alert('Please enter a valid discount value');
      return;
    }
    
    if (formData.discount_type === 'percentage' && formData.discount_value > 100) {
      alert('Percentage discount cannot exceed 100%');
      return;
    }
    
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);
    
    if (startDate >= endDate) {
      alert('End date must be after start date');
      return;
    }
    
    try {
      console.log('Submitting form data:', formData);
      
      if (editingOffer) {
        await updateOffer(editingOffer.id, formData);
      } else {
        await createOffer(formData);
      }
      await loadOffers();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving offer:", error);
      alert(`Error saving offer: ${error instanceof Error ? error.message : 'Please try again.'}`);
    }
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount_type: offer.discount_type,
      discount_value: offer.discount_value,
      category: offer.category || "",
      min_order_amount: offer.min_order_amount || 0,
      start_date: offer.start_date.split('T')[0],
      end_date: offer.end_date.split('T')[0],
      display_type: offer.display_type
    });
    setShowModal(true);
  };

  const handleDelete = async (offerId: string) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      try {
        await deleteOffer(offerId);
        await loadOffers();
      } catch (error) {
        console.error("Error deleting offer:", error);
        alert("Error deleting offer. Please try again.");
      }
    }
  };

  const handleToggleStatus = async (offerId: string, currentStatus: boolean) => {
    try {
      await toggleOfferStatus(offerId, !currentStatus);
      await loadOffers();
    } catch (error) {
      console.error("Error toggling offer status:", error);
      alert("Error updating offer status. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOffer(null);
    setFormData({
      title: "",
      description: "",
      discount_type: "percentage",
      discount_value: 0,
      category: "",
      min_order_amount: 0,
      start_date: "",
      end_date: "",
      display_type: "modal"
    });
  };

  const cardClasses = clsx(
    "rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl",
    {
      "bg-white border-gray-200": theme === "light",
      "bg-gray-800 border-gray-700": theme === "dark",
    }
  );

  const inputClasses = clsx(
    "w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500",
    {
      "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500": theme === "light",
      "bg-gray-700 border-gray-600 text-white placeholder-gray-400": theme === "dark",
    }
  );

  const labelClasses = clsx(
    "block text-sm font-semibold mb-2",
    {
      "text-gray-700": theme === "light",
      "text-gray-300": theme === "dark",
    }
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className={clsx("min-h-screen transition-colors duration-300", {
      "bg-gray-50": theme === "light",
      "bg-gray-900": theme === "dark",
    })}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className={clsx("text-3xl md:text-4xl font-bold", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              Manage Offers
            </h1>
            <p className={clsx("text-lg mt-2", {
              "text-gray-600": theme === "light",
              "text-gray-400": theme === "dark",
            })}>
              Create and manage promotional offers for your store
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Create New Offer
          </motion.button>
        </motion.div>

        {/* Offers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className={cardClasses}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={clsx("p-2 rounded-lg", {
                    "bg-red-100 text-red-600": theme === "light",
                    "bg-red-900/20 text-red-400": theme === "dark"
                  })}>
                    {offer.discount_type === 'percentage' ? (
                      <Percent className="w-5 h-5" />
                    ) : (
                      <Tag className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className={clsx("font-bold text-lg", {
                      "text-gray-900": theme === "light",
                      "text-white": theme === "dark",
                    })}>
                      {offer.title}
                    </h3>
                    <span className={clsx("text-sm px-2 py-1 rounded-full", {
                      "bg-green-100 text-green-800": offer.is_active && theme === "light",
                      "bg-green-900/20 text-green-400": offer.is_active && theme === "dark",
                      "bg-gray-100 text-gray-800": !offer.is_active && theme === "light",
                      "bg-gray-900/20 text-gray-400": !offer.is_active && theme === "dark",
                    })}>
                      {offer.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggleStatus(offer.id, offer.is_active)}
                    className={clsx("p-2 rounded-lg transition-colors", {
                      "hover:bg-gray-100": theme === "light",
                      "hover:bg-gray-700": theme === "dark"
                    })}
                  >
                    {offer.is_active ? (
                      <Eye className="w-4 h-4 text-green-500" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </motion.button>
                </div>
              </div>

              <p className={clsx("text-sm mb-4", {
                "text-gray-600": theme === "light",
                "text-gray-400": theme === "dark",
              })}>
                {offer.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className={clsx("text-sm", {
                    "text-gray-600": theme === "light",
                    "text-gray-400": theme === "dark",
                  })}>
                    Discount:
                  </span>
                  <span className={clsx("font-semibold", {
                    "text-gray-900": theme === "light",
                    "text-white": theme === "dark",
                  })}>
                    {offer.discount_type === 'percentage' 
                      ? `${offer.discount_value}%` 
                      : `৳${offer.discount_value}`
                    }
                  </span>
                </div>
                
                {offer.category && (
                  <div className="flex items-center justify-between">
                    <span className={clsx("text-sm", {
                      "text-gray-600": theme === "light",
                      "text-gray-400": theme === "dark",
                    })}>
                      Category:
                    </span>
                    <span className={clsx("font-semibold", {
                      "text-gray-900": theme === "light",
                      "text-white": theme === "dark",
                    })}>
                      {offer.category}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className={clsx("text-sm", {
                    "text-gray-600": theme === "light",
                    "text-gray-400": theme === "dark",
                  })}>
                    Display:
                  </span>
                  <span className={clsx("text-sm px-2 py-1 rounded-full", {
                    "bg-blue-100 text-blue-800": theme === "light",
                    "bg-blue-900/20 text-blue-400": theme === "dark",
                  })}>
                    {offer.display_type === 'modal' ? 'Modal' : 'Banner'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(offer.start_date).toLocaleDateString()} - {new Date(offer.end_date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(offer)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(offer.id)}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {offers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className={clsx("w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6", {
              "bg-gray-100": theme === "light",
              "bg-gray-800": theme === "dark"
            })}>
              <Tag className={clsx("w-12 h-12", {
                "text-gray-400": theme === "light",
                "text-gray-600": theme === "dark"
              })} />
            </div>
            <h3 className={clsx("text-xl font-semibold mb-2", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              No offers created yet
            </h3>
            <p className={clsx("text-gray-600 dark:text-gray-400 mb-6")}>
              Create your first promotional offer to boost sales
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create Your First Offer
            </motion.button>
          </motion.div>
        )}

        {/* Create/Edit Offer Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={clsx("w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto", {
                  "bg-white": theme === "light",
                  "bg-gray-800": theme === "dark"
                })}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={clsx("text-2xl font-bold", {
                      "text-gray-900": theme === "light",
                      "text-white": theme === "dark",
                    })}>
                      {editingOffer ? "Edit Offer" : "Create New Offer"}
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCloseModal}
                      className={clsx("p-2 rounded-full transition-colors", {
                        "hover:bg-gray-100": theme === "light",
                        "hover:bg-gray-700": theme === "dark"
                      })}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Offer Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className={inputClasses}
                          placeholder="e.g., Summer Sale"
                          required
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>Display Type</label>
                        <select
                          value={formData.display_type}
                          onChange={(e) => setFormData({...formData, display_type: e.target.value as "modal" | "banner"})}
                          className={inputClasses}
                        >
                          <option value="modal">Modal Popup</option>
                          <option value="banner">Top Banner</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelClasses}>Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className={clsx(inputClasses, "resize-none")}
                        rows={3}
                        placeholder="Describe your offer..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Discount Type</label>
                        <select
                          value={formData.discount_type}
                          onChange={(e) => setFormData({...formData, discount_type: e.target.value as "percentage" | "fixed"})}
                          className={inputClasses}
                        >
                          <option value="percentage">Percentage (%)</option>
                          <option value="fixed">Fixed Amount (৳)</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClasses}>Discount Value</label>
                        <input
                          type="number"
                          value={formData.discount_value}
                          onChange={(e) => setFormData({...formData, discount_value: parseFloat(e.target.value) || 0})}
                          className={inputClasses}
                          placeholder={formData.discount_type === 'percentage' ? "10" : "100"}
                          min="0"
                          step={formData.discount_type === 'percentage' ? "1" : "0.01"}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Category (Optional)</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className={inputClasses}
                        >
                          <option value="">All Categories</option>
                          <option value="Sharee">Sharee</option>
                          <option value="Panjabi">Panjabi</option>
                          <option value="Threepcs">Three Piece</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClasses}>Minimum Order Amount (Optional)</label>
                        <input
                          type="number"
                          value={formData.min_order_amount}
                          onChange={(e) => setFormData({...formData, min_order_amount: parseFloat(e.target.value) || 0})}
                          className={inputClasses}
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Start Date</label>
                        <input
                          type="date"
                          value={formData.start_date}
                          onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                          className={inputClasses}
                          required
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>End Date</label>
                        <input
                          type="date"
                          value={formData.end_date}
                          onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                          className={inputClasses}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCloseModal}
                        className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-lg font-medium transition-all duration-300"
                      >
                        {editingOffer ? "Update Offer" : "Create Offer"}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OffersPage;