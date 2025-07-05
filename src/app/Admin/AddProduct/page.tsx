"use client";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import React, { useState } from "react";
import clsx from "clsx";
import { addProduct } from "./action";

const Page = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [category, setCategory] = useState("Sharee");
  const [availability, setAvailability] = useState("in-stock");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const categories = ["Sharee", "Panjabi", "Threepcs"];

  // Enhanced styling classes
  const cardClasses = clsx(
    "rounded-xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl",
    {
      "bg-white border-gray-200": theme === "light",
      "bg-gray-800 border-gray-700": theme === "dark",
    }
  );

  const inputClasses = clsx(
    "w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
    {
      "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500": theme === "light",
      "bg-gray-700 border-gray-600 text-white placeholder-gray-400": theme === "dark",
    }
  );

  const selectClasses = clsx(
    "w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
    {
      "bg-gray-50 border-gray-300 text-gray-900": theme === "light",
      "bg-gray-700 border-gray-600 text-white": theme === "dark",
    }
  );

  const labelClasses = clsx(
    "block text-sm font-semibold mb-2",
    {
      "text-gray-700": theme === "light",
      "text-gray-300": theme === "dark",
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedPhotos((prevFiles: File[]) => [...prevFiles, ...files]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("detailed_desc", detailedDescription);
      formData.append("category", category);
      formData.append("inStock", availability);
      formData.append("price", price.toString());
      formData.append("discount", discount.toString());

      selectedPhotos.forEach((photo) => {
        formData.append("images", photo);
      });

      await addProduct(formData);

      alert("Product added successfully!");
      setTitle("");
      setDescription("");
      setDetailedDescription("");
      setSelectedPhotos([]);
      setPrice(0);
      setDiscount(0);
      setLoading(false);
      console.log("done");
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className={clsx("min-h-screen transition-colors duration-300", {
      "bg-gray-50": theme === "light",
      "bg-gray-900": theme === "dark",
    })}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={clsx("text-4xl font-bold mb-4", {
            "text-gray-900": theme === "light",
            "text-white": theme === "dark",
          })}>
            Add New Product
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Information - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className={cardClasses}>
              <h2 className={clsx("text-2xl font-bold mb-6 flex items-center", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">1</span>
                </span>
                Basic Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className={labelClasses}>Product Title</label>
                  <input
                    type="text"
                    value={title}
                    placeholder="Enter product title"
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Product Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    placeholder="Describe your product in detail"
                    className={clsx(inputClasses, "resize-none")}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* New Detailed Description field */}
                <div>
                  <label className={labelClasses}>Detailed Description</label>
                  <textarea
                    rows={6}
                    value={detailedDescription}
                    placeholder="Provide a more detailed description for the product page (e.g., *material*, *craftsmanship*, *care instructions*)"
                    className={clsx(inputClasses, "resize-none")}
                    onChange={(e) => setDetailedDescription(e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Category</label>
                  <select
                    className={selectClasses}
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <div className={cardClasses}>
              <h2 className={clsx("text-2xl font-bold mb-6 flex items-center", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">2</span>
                </span>
                Images
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {selectedPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={URL.createObjectURL(photo)}
                        alt="product"
                        width={120}
                        height={120}
                        className="w-full h-28 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        onClick={() =>
                          setSelectedPhotos(
                            selectedPhotos.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <label
                  htmlFor="file-upload"
                  className={clsx(
                    "flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:border-blue-500",
                    {
                      "border-gray-300 bg-gray-50 hover:bg-gray-100": theme === "light",
                      "border-gray-600 bg-gray-700 hover:bg-gray-600": theme === "dark",
                    }
                  )}
                >
                  <div className="text-center">
                    <div className={clsx("text-3xl mb-2", {
                      "text-gray-400": theme === "light",
                      "text-gray-500": theme === "dark",
                    })}>+</div>
                    <p className={clsx("text-sm", {
                      "text-gray-600": theme === "light",
                      "text-gray-400": theme === "dark",
                    })}>
                      Add Photos
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className={cardClasses}>
            <h3 className={clsx("text-xl font-bold mb-4 flex items-center", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">3</span>
              </span>
              Price
            </h3>
            <div>
              <label className={labelClasses}>Price (৳)</label>
              <input
                type="number"
                placeholder="0"
                value={price}
                className={inputClasses}
                onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className={cardClasses}>
            <h3 className={clsx("text-xl font-bold mb-4 flex items-center", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">4</span>
              </span>
              Discount
            </h3>
            <div>
              <label className={labelClasses}>Discount (%)</label>
              <input
                type="number"
                placeholder="0"
                value={discount}
                className={inputClasses}
                onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className={cardClasses}>
            <h3 className={clsx("text-xl font-bold mb-4 flex items-center", {
              "text-gray-900": theme === "light",
              "text-white": theme === "dark",
            })}>
              <span className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">5</span>
              </span>
              Availability
            </h3>
            <div>
              <label className={labelClasses}>Stock Status</label>
              <select
                className={selectClasses}
                onChange={(e) => setAvailability(e.target.value)}
                value={availability}
              >
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={clsx(
              "px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
              {
                "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg": !loading,
                "bg-gray-400": loading,
              }
            )}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Adding Product...
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={clsx("p-8 rounded-lg text-center", {
              "bg-white": theme === "light",
              "bg-gray-800": theme === "dark",
            })}>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className={clsx("text-lg font-semibold", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                Adding your product...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;