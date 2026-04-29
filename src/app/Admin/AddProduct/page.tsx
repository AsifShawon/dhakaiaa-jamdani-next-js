"use client";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { addProduct } from "./action";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const Page = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [category, setCategory] = useState("Sharee");
  const [availability, setAvailability] = useState("in-stock");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isClient, setIsClient] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [lastCreatedProductId, setLastCreatedProductId] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = ["Sharee", "Panjabi", "Threepcs"];

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
    setSelectedPhotos((prevFiles) => [...prevFiles, ...files]);
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setSelectedPhotos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleAIGenerate = async () => {
    if (!title || !price || !category) {
      alert("Please fill Title, Price, and Category first.");
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch("/api/generateDescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price,
          category,
          description,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setDescription(data.short);
      setDetailedDescription(data.long);
      setActiveTab("preview");
    } catch (err: any) {
      console.error('AI generation error:', err);
      alert("AI generation failed: " + (err.message || "Unknown error"));
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setUploadProgress(0);
    try {
      const totalFiles = selectedPhotos.length || 1;
      for (let i = 1; i <= totalFiles; i++) {
        setUploadProgress(Math.min(90, Math.round((i / totalFiles) * 90)));
      }

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

      const createdProduct = await addProduct(formData);
      setLastCreatedProductId(createdProduct?.id ?? null);
      setUploadProgress(100);
      showToast("Product added successfully!", "success");
      setTitle("");
      setDescription("");
      setDetailedDescription("");
      setSelectedPhotos([]);
      setPrice(0);
      setDiscount(0);
      setAvailability("in-stock"); // Reset to default
      setLoading(false);
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
      setUploadProgress(0);
      showToast("Failed to add product. Please try again.", "error");
    }
  };

  const finalPrice = Math.max(0, price - (price * discount) / 100);

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

        {/* Show loading overlay instead of different content structure */}
        {!isClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
            </div>
          </div>
        )}

        {/* Always render the same structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <div className={cardClasses}>
              <h2 className={clsx("text-2xl font-bold mb-6", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                Basic Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className={labelClasses}>Product Title ({title.length}/100)</label>
                  <input
                    type="text"
                    value={title}
                    placeholder="Enter product title"
                    onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                    className={inputClasses}
                    disabled={!isClient}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Category</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={clsx(
                          "px-3 py-2 rounded-lg border text-sm",
                          category === cat ? "bg-blue-500 text-white border-blue-500" : "border-gray-400"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <select className={selectClasses} onChange={(e) => setCategory(e.target.value)} value={category} disabled={!isClient}>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Price (৳)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={price}
                    className={inputClasses}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    disabled={!isClient}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Discount (%)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={discount}
                    className={inputClasses}
                    onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                    disabled={!isClient}
                  />
                </div>

                <div className={clsx("rounded-lg border p-4", {
                  "border-gray-300 bg-gray-50": theme === "light",
                  "border-gray-600 bg-gray-700": theme === "dark",
                })}>
                  <p className={labelClasses}>Price Preview</p>
                  <div className="text-sm space-y-1">
                    <p>Original: ৳{price.toFixed(2)}</p>
                    <p>Discount: {discount}%</p>
                    <p className="font-bold text-green-500">Final: ৳{finalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Availability</label>
                  <select
                    className={selectClasses}
                    onChange={(e) => setAvailability(e.target.value)}
                    value={availability}
                    disabled={!isClient}
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>

                {/* AI Generate Button */}
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={aiLoading || !isClient}
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-all disabled:opacity-50"
                >
                  {aiLoading ? "Generating..." : "✨ Generate Descriptions with AI"}
                </button>

                {/* Description Editor with Tabs */}
                <div>
                  <div className="flex gap-4 mb-2">
                    <button
                      className={clsx(
                        "px-4 py-2 rounded transition-colors",
                        activeTab === "edit" 
                          ? "bg-blue-500 text-white" 
                          : theme === "light" 
                            ? "bg-gray-300 text-gray-700 hover:bg-gray-400" 
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                      )}
                      onClick={() => setActiveTab("edit")}
                      disabled={!isClient}
                    >
                      Edit
                    </button>
                    <button
                      className={clsx(
                        "px-4 py-2 rounded transition-colors",
                        activeTab === "preview" 
                          ? "bg-blue-500 text-white" 
                          : theme === "light" 
                            ? "bg-gray-300 text-gray-700 hover:bg-gray-400" 
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                      )}
                      onClick={() => setActiveTab("preview")}
                      disabled={!isClient}
                    >
                      Preview
                    </button>
                  </div>

                  {activeTab === "edit" ? (
                    <>
                      <label className={labelClasses}>Product Description ({description.length}/500)</label>
                      <textarea
                        rows={4}
                        value={description}
                        placeholder="Short product description..."
                        className={clsx(inputClasses, "resize-none mb-4")}
                        onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                        disabled={!isClient}
                      />

                      <label className={labelClasses}>Detailed Description</label>
                      <textarea
                        rows={6}
                        value={detailedDescription}
                        placeholder="Long, detailed description..."
                        className={clsx(inputClasses, "resize-none")}
                        onChange={(e) => setDetailedDescription(e.target.value)}
                        disabled={!isClient}
                      />
                    </>
                  ) : (
                    <div className={clsx("p-4 border rounded-lg", {
                      "border-gray-300 bg-gray-50": theme === "light",
                      "border-gray-600 bg-gray-700": theme === "dark",
                    })}>
                      <h3 className={clsx("font-bold mb-2", {
                        "text-gray-900": theme === "light",
                        "text-white": theme === "dark",
                      })}>Preview</h3>
                      <div className={clsx({
                        "text-gray-900": theme === "light",
                        "text-white": theme === "dark",
                      })}>
                        {isClient && (
                          <ReactMarkdown>{`## Product Description\n${description}\n\n## Detailed Description\n${detailedDescription}`}</ReactMarkdown>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="lg:col-span-1">
            <div className={cardClasses}>
              <h2 className={clsx("text-2xl font-bold mb-6", {
                "text-gray-900": theme === "light",
                "text-white": theme === "dark",
              })}>
                Images
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {selectedPhotos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative group"
                      draggable
                      onDragStart={() => setDraggedIndex(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (draggedIndex === null) return;
                        reorderImages(draggedIndex, index);
                        setDraggedIndex(null);
                      }}
                    >
                      {isClient && (
                        <Image
                          src={URL.createObjectURL(photo)}
                          alt="product"
                          width={120}
                          height={120}
                          className={clsx(
                            "w-full h-28 object-cover rounded-lg border-2",
                            {
                              "border-gray-200": theme === "light",
                              "border-gray-600": theme === "dark",
                            }
                          )}
                        />
                      )}
                      <button
                        onClick={() =>
                          setSelectedPhotos(
                            selectedPhotos.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                        disabled={!isClient}
                      >
                        ×
                      </button>
                      <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1 rounded">
                        Drag
                      </span>
                    </div>
                  ))}
                </div>
                <label
                  htmlFor="file-upload"
                  className={clsx(
                    "flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg transition-colors",
                    {
                      "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100": theme === "light",
                      "border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600": theme === "dark",
                      "cursor-pointer": isClient,
                      "cursor-not-allowed opacity-50": !isClient,
                    }
                  )}
                >
                  <p>Add Photos</p>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={!isClient}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading || !isClient}
            className="px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
        {loading && (
          <div className="max-w-md mx-auto mt-4">
            <progress className="progress progress-primary w-full" value={uploadProgress} max={100}></progress>
            <p className="text-center text-sm mt-1">Upload progress: {uploadProgress}%</p>
          </div>
        )}
        {lastCreatedProductId && !loading && (
          <div className="flex justify-center gap-3 mt-6">
            <button
              className="btn btn-outline"
              onClick={() => setLastCreatedProductId(null)}
            >
              Add Another
            </button>
            <Link className="btn btn-primary" href={`/product/${lastCreatedProductId}`}>
              View Product
            </Link>
          </div>
        )}
        {toast && (
          <div className={clsx(
            "fixed bottom-6 right-6 px-4 py-3 rounded-lg text-white shadow-lg z-50",
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          )}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;