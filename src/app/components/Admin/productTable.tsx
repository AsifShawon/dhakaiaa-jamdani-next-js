"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/slices/productSlices";
import ProductModal from "./showProductModal";
import { updateProduct } from "@/app/Admin/AddProduct/action";

interface EditedProduct {
  availability: string;
  price: number;
  [key: string]: any;
}

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state: any) => state.products);
  const [editedProducts, setEditedProducts] = useState<{ [key: string]: EditedProduct }>({});
  const [isEdited, setIsEdited] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts() as any);
    }
  }, [status, dispatch]);

  const handleEdit = (
    productId: string,
    field: string,
    value: string | number
  ) => {
    setEditedProducts((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: field === 'price' ? parseFloat(value as string) : value,
      },
    }));
    setIsEdited(true);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      // Process each edited product
      for (const [productId, changes] of Object.entries(editedProducts)) {
        const product = products.find((p: any) => p.id === parseInt(productId));
        if (!product) continue;

        const formData = new FormData();
        
        // Add all existing product data
        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("inStock", changes.availability || product.availability);
        formData.append("price", (changes.price || product.price).toString());
        formData.append("discount", product.discount.toString());
        
        // Keep existing images
        if (product.image_urls) {
          formData.append("existingImages", JSON.stringify(product.image_urls));
        }

        await updateProduct(formData, parseInt(productId));
      }

      // Refresh products after all updates
      await dispatch(fetchProducts() as any);
      setEditedProducts({});
      setIsEdited(false);
    } catch (error) {
      console.error("Error saving products:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageDelete = async (imageUrl: string, product: any) => {
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("inStock", product.availability);
      formData.append("price", product.price.toString());
      formData.append("discount", product.discount.toString());
      formData.append("deletedImages", JSON.stringify([imageUrl]));

      await updateProduct(formData, product.id);
      dispatch(fetchProducts() as any);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleProductUpdate = async (productId: string, updatedData: any) => {
    try {
      const formData = new FormData();
      
      // Append basic product data
      Object.keys(updatedData).forEach(key => {
        if (key !== 'images' && key !== 'deletedImages') {
          formData.append(key, updatedData[key].toString());
        }
      });

      // Append new images if any
      if (updatedData.images?.length > 0) {
        updatedData.images.forEach((image: File) => {
          formData.append('images', image);
        });
      }

      // Append deleted images if any
      if (updatedData.deletedImages?.length > 0) {
        formData.append('deletedImages', JSON.stringify(updatedData.deletedImages));
      }

      await updateProduct(formData, parseInt(productId));
      dispatch(fetchProducts() as any);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="w-full h-full bg-base-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        {isEdited && (
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="btn btn-success w-full sm:w-auto"
          >
            {isSaving ? (
              <>
                <span className="loading loading-spinner"></span>
                Saving...
              </>
            ) : (
              'Save All Changes'
            )}
          </button>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full table-fixed">
          <thead className="text-base sm:text-lg bg-base-100">
            <tr>
              <th className="w-16">SL No</th>
              <th className="">Title</th>
              <th className="lg:block hidden">Availability</th>
              <th className="">Price</th>
              <th className="w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {products.map((product: any, index: number) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td className="lg:block hidden">
                  <select
                    className="select select-bordered select-sm sm:select-md w-full max-w-xs"
                    value={
                      editedProducts[product.id]?.availability ?? product.availability ?? ""
                    }
                    onChange={(e) =>
                      handleEdit(product.id, "availability", e.target.value)
                    }
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    className="input input-bordered input-sm sm:input-md w-full max-w-xs"
                    value={editedProducts[product.id]?.price ?? product.price}
                    onChange={(e) =>
                      handleEdit(product.id, "price", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                    className="btn btn-primary btn-sm sm:btn-md"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedProduct && (  
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onImageDelete={handleImageDelete}
          onProductUpdate={handleProductUpdate}
        />
      )}
      </div>
    </div>
  );
};

export default ProductTable;