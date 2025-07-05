"use client";
import { useEffect } from 'react';

interface StructuredDataProps {
  data: object;
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

// Common structured data schemas
export const organizationSchema = {
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

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dhakaia Jamdani",
  "description": "Authentic traditional Bangladeshi clothing store",
  "url": "https://dhakaiaajamdani.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dhakaiaajamdani.com/Shop?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Dhakaia Jamdani",
  "description": "Traditional Bangladeshi clothing store",
  "url": "https://dhakaiaajamdani.com",
  "telephone": "+880-1234-567890",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BD",
    "addressLocality": "Dhaka",
    "addressRegion": "Dhaka Division"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.8103",
    "longitude": "90.4125"
  },
  "openingHours": "Mo-Su 09:00-21:00",
  "priceRange": "$$"
};