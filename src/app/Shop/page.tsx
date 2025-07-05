import { Metadata } from "next";
import { Suspense } from 'react';
import ShopSection from '../components/ShopPage/ShopSection';

export const metadata: Metadata = {
  title: "Shop - Traditional Bangladeshi Clothing Collection",
  description: "Browse our complete collection of authentic traditional Bangladeshi clothing. Find premium Jamdani Sharee, elegant Panjabi, and beautiful Three Piece sets. Filter by category, price, and availability.",
  keywords: [
    "shop Bangladeshi clothing",
    "buy Jamdani Sharee",
    "traditional Panjabi online",
    "Three Piece collection",
    "Bangladeshi fashion store",
    "authentic cultural wear"
  ],
  openGraph: {
    title: "Shop Traditional Bangladeshi Clothing | Dhakaia Jamdani",
    description: "Discover our complete collection of authentic traditional Bangladeshi clothing. Premium quality, handcrafted with heritage.",
    url: "https://dhakaiaajamdani.com/Shop",
    images: [
      {
        url: "/images/shop-collection.jpg",
        width: 1200,
        height: 630,
        alt: "Dhakaia Jamdani Shop - Traditional Bangladeshi Clothing Collection",
      },
    ],
  },
  alternates: {
    canonical: "https://dhakaiaajamdani.com/Shop",
  },
};

// JSON-LD for Shop Page
const shopJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Traditional Bangladeshi Clothing Collection",
  "description": "Complete collection of authentic Bangladeshi traditional wear including Jamdani Sharee, Panjabi, and Three Piece sets",
  "url": "https://dhakaiaajamdani.com/Shop",
  "mainEntity": {
    "@type": "ItemList",
    "name": "Traditional Clothing Products",
    "description": "Curated collection of traditional Bangladeshi clothing"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dhakaiaajamdani.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": "https://dhakaiaajamdani.com/Shop"
      }
    ]
  }
};

const Shop = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      <Suspense fallback={<div>Loading products...</div>}>
        <ShopSection />
      </Suspense>
    </>
  );
};

export default Shop;