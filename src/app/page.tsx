import { Metadata } from "next";
import CategorySection from "./components/homepage/CategorySection";
import Hero from "./components/homepage/hero";
import Section_1 from "./components/homepage/section_1";
import SocialMediaSection from "./components/homepage/SocialMediaSelection";
import TrendingProducts from "./components/homepage/trendingProducts";

export const metadata: Metadata = {
  title: "Home - Authentic Traditional Bangladeshi Clothing",
  description: "Welcome to Dhakaia Jamdani - your premier destination for authentic traditional Bangladeshi clothing. Discover handcrafted Jamdani Sharee, elegant Panjabi, and beautiful Three Piece collections that celebrate our rich cultural heritage.",
  openGraph: {
    title: "Dhakaia Jamdani - Home | Traditional Bangladeshi Fashion",
    description: "Explore our premium collection of traditional Bangladeshi clothing. Handwoven Jamdani Sharee, cultural Panjabi, and elegant Three Piece sets.",
    url: "https://dhakaiaajamdani.com",
    images: [
      {
        url: "/images/homepage-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Dhakaia Jamdani Homepage - Traditional Bangladeshi Clothing",
      },
    ],
  },
  alternates: {
    canonical: "https://dhakaiaajamdani.com",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dhakaia Jamdani",
  "description": "Authentic traditional Bangladeshi clothing store specializing in Jamdani Sharee, Panjabi, and Three Piece collections",
  "url": "https://dhakaiaajamdani.com",
  "logo": "https://dhakaiaajamdani.com/images/logo.png",
  "sameAs": [
    "https://facebook.com/dhakaiaajamdani",
    "https://instagram.com/dhakaiaajamdani",
    "https://twitter.com/dhakaiaajamdani",
    "https://youtube.com/@DhakaiaaJamdani"
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dhakaiaajamdani.com/Shop?search={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dhakaia Jamdani",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dhakaiaajamdani.com/images/logo.png"
    }
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dhakaia Jamdani",
  "description": "Premium traditional Bangladeshi clothing store",
  "url": "https://dhakaiaajamdani.com",
  "logo": "https://dhakaiaajamdani.com/images/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+880-1234-567890",
    "contactType": "customer service",
    "availableLanguage": ["English", "Bengali"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BD",
    "addressLocality": "Dhaka",
    "addressRegion": "Dhaka Division"
  },
  "sameAs": [
    "https://facebook.com/dhakaiaajamdani",
    "https://instagram.com/dhakaiaajamdani",
    "https://twitter.com/dhakaiaajamdani"
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <main>
        <Hero/>
        <Section_1/>
        <TrendingProducts />
        <SocialMediaSection/>
      </main>
    </>
  );
}