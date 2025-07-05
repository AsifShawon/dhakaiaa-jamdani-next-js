import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="lg:border-r-2 bg-inherit border-r-gray-400 lg:m-12 lg:pr-10">
      <aside className="h-screen sticky top-0">
        <div className="flex gap-2 items-center p-4 border-gray-600 lg:mt-24">
          <div className="lg:hidden">
            <label htmlFor="my-drawer">
            <span className="material-icons">keyboard_backspace</span>
            </label>
          </div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="p-4 border-gray-600">
              <Link href="/Admin/AllProducts" className=" text-lg font-semibold">
                All Products
              </Link>
            </li>
            <li className="p-4 border-gray-600">
              <Link href="/Admin/AddProduct" className=" text-lg font-semibold">
                Add Products
              </Link>
            </li>
            <li className="p-4 border-gray-600">
              <Link href="/Admin/Orders" className=" text-lg font-semibold">
                Orders
              </Link>
            </li>
            <li className="p-4 border-gray-600">
              <Link href="#" className=" text-lg font-semibold">
                Users
              </Link>
            </li>
            <li className="p-4 border-gray-600">
              <Link href="#" className=" text-lg font-semibold">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
