"use client";
import { deleteProduct } from "@/app/Admin/AddProduct/action";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  detailed_desc?: string;
  category: string;
  availability: string;
  price: number;
  discount: number;
  image_urls: string[];
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onImageDelete: (imageUrl: string, product: Product) => Promise<void>;
  onProductUpdate: (productId: string, updatedData: any) => Promise<void>;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onImageDelete,
  onProductUpdate,
}) => {
  const initialFormState = React.useMemo(() => ({
      title: "",
      description: "",
      detailed_desc: "",
      category: "",
      availability: "in-stock",
      price: 0,
      discount: 0,
      image_urls: [] as string[],
      images: [] as File[],
      deletedImages: [] as string[],
    }), []);
    const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        ...initialFormState,
        title: product.title || "",
        description: product.description || "",
        detailed_desc: product.detailed_desc || "",
        category: product.category || "",
        availability: product.availability || "in-stock",
        price: product.price || 0,
        discount: product.discount || 0,
        image_urls: product.image_urls || [],
      });
    }
  }, [product, initialFormState]);

  useEffect(() => {
    // Create preview URLs for newly added images
    const urls = formData.images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Cleanup function to revoke object URLs
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? parseFloat(value)
          : name === "discount"
          ? parseInt(value)
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files!)],
      }));
    }
  };

  const handleImageDelete = async (imageUrl: string) => {
    if (formData.image_urls.includes(imageUrl)) {
      setFormData((prev) => ({
        ...prev,
        deletedImages: [...prev.deletedImages, imageUrl],
        image_urls: prev.image_urls.filter((url) => url !== imageUrl),
      }));
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await onProductUpdate(product.id.toString(), formData);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData((prev) => ({
      ...prev,
      deletedImages: [],
      images: [],
      image_urls: product.image_urls || [],
    }));
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">
          {isEditing ? "Edit Product" : "Product Details"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full"
                  value={formData.title}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full"
                  value={formData.description}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  rows={3}
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="label">Detailed Description</label>
                <textarea
                  name="detailed_desc" // Use the correct name
                  className="textarea textarea-bordered w-full"
                  value={formData.detailed_desc}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  rows={5}
                />
              </div>

              <div>
                <label className="label">Category</label>
                <input
                  type="text"
                  name="category"
                  className="input input-bordered w-full"
                  value={formData.category}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="label">Availability</label>
                <select
                  name="availability"
                  className="select select-bordered w-full"
                  value={formData.availability}
                  onChange={handleChange}
                  disabled={!isEditing}
                >
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="label">Price</label>
                <input
                  type="number"
                  name="price"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  step="0.01"
                />
              </div>

              <div>
                <label className="label">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  className="input input-bordered w-full"
                  value={formData.discount}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="mt-6">
            <label className="label">Product Images</label>

            {/* Existing Images */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {formData.image_urls.map((url, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={url}
                    alt={`Product ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleImageDelete(url)}
                      className="btn btn-error btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* New Image Previews */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={url}
                      width={80}
                    height={80}
                      alt={`New Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(index)}
                        className="btn btn-error btn-xs absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Image Upload */}
            {isEditing && (
              <div className="mt-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered w-full"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            {
              !isEditing ? (
                <button 
                type="button" 
                className="btn btn-error"
                onClick={() => deleteProduct(product.id)}
                >
                  Delete Product
                </button>
              ) :(null)
            }
            {!isEditing ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Product
                </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
