"use client";
import ProductTable from "@/app/components/Admin/productTable";
import React from "react";

const Page = () => {

  return (
    <div className="container mx-auto p-4 pt-8 md:pt-24">
      <p className="text-3xl font-bold mb-4">Products</p>
      <hr className="border-1 border-red-400 mb-6" />
      
      <ProductTable />
    </div>
  );
};

export default Page;