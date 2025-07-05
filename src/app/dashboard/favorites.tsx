import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, syncCart } from "../slices/cartSlice";
import { AppDispatch } from "../store/store";
import Image from "next/image";

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: any) => state.cart);
  const { products, status, error } = useSelector(
    (state: any) => state.products
  );

  const favs = products.filter((product: any) =>
    favorites.includes(product.id)
  );
  // console.log(favs);
  const handleAddToCart = async (product:any) => {
      dispatch(addToCart(product));
      await dispatch(syncCart()).unwrap();
    };

  return (
    <div className="card-body">
      <h2 className="card-title">Your Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favs.map((item: any) => (
          <div key={item.id} className="card bg-base-200">
            <figure className="px-4 pt-4">
              <Image
              width={200}
              height={200}
                src={item.image_urls[0]}
                alt={item.title}
                className="rounded-xl h-32 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <Link href={`product/${encodeURIComponent(item.id)}`}>
                <h3 className="card-title text-lg">{item.title}</h3>
              </Link>
              <p className="text-base-content/60">${item.price}</p>
              <div className="card-actions">
                <button
                  onClick={()=>handleAddToCart(item)}
                  className="btn btn-primary btn-block"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
