"use client";
import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

export default function MetaTags({
  title = "Dhakaia Jamdani - Authentic Traditional Bangladeshi Clothing | ঢাকাইয়া জামদানি - বাংলাদেশের ঐতিহ্যবাহী পোশাক",
  description = "Discover premium quality traditional Bangladeshi clothing. Handcrafted Jamdani Sharee, elegant Panjabi, and beautiful Three Piece collections with authentic cultural heritage. বাংলাদেশের ঐতিহ্যবাহী জামদানি শাড়ি, পাঞ্জাবি ও থ্রি-পিস সংগ্রহ।",
  keywords = [
    "Dhakaia Jamdani",
    "Bangladeshi traditional clothing",
    "Jamdani Sharee",
    "Traditional Panjabi",
    "Three Piece collection",
    "Bangladeshi fashion",
    "Handwoven Jamdani",
    "Cultural clothing",
    "Traditional wear",
    "Authentic Bangladeshi dress",
    "Dhaka fashion",
    "Heritage clothing",
    "Ethnic wear Bangladesh",
    "Traditional textile",
    "Handcrafted clothing",
    // Bengali keywords
    "ঢাকাইয়া জামদানি",
    "বাংলাদেশি ঐতিহ্যবাহী পোশাক",
    "জামদানি শাড়ি",
    "পাঞ্জাবি",
    "থ্রি-পিস",
    "বাংলাদেশি ফ্যাশন",
    "হ্যান্ডলুম জামদানি",
    "ঐতিহ্যবাহী পোশাক",
    "বাংলাদেশি ড্রেস",
    "ঢাকা ফ্যাশন",
    "ঐতিহ্যবাহী জামদানি"
  ],
  image = "/images/og-image.jpg",
  url = "https://dhakaiaajamdani.com",
  type = "website",
  noindex = false
}: MetaTagsProps) {
  const fullImageUrl = image.startsWith('http') ? image : `https://dhakaiaajamdani.com${image}`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="language" content="en, bn" />
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Dhakaia Jamdani" />
      {/* Open Graph Bengali (for social sharing in Bangladesh) */}
      <meta property="og:title" content="ঢাকাইয়া জামদানি - বাংলাদেশের ঐতিহ্যবাহী পোশাক" />
      <meta property="og:description" content="বাংলাদেশের ঐতিহ্যবাহী জামদানি শাড়ি, পাঞ্জাবি ও থ্রি-পিস সংগ্রহ।" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dhakaiaajamdani" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      {/* Twitter Bengali */}
      <meta name="twitter:title" content="ঢাকাইয়া জামদানি - বাংলাদেশের ঐতিহ্যবাহী পোশাক" />
      <meta name="twitter:description" content="বাংলাদেশের ঐতিহ্যবাহী জামদানি শাড়ি, পাঞ্জাবি ও থ্রি-পিস সংগ্রহ।" />
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      {/* Additional Meta Tags */}
      <meta name="author" content="Dhakaia Jamdani" />
      <meta name="publisher" content="Dhakaia Jamdani" />
      <meta name="copyright" content="© 2024 Dhakaia Jamdani. All rights reserved." />
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="format-detection" content="telephone=no" />
      {/* Theme Colors */}
      <meta name="theme-color" content="#ef4444" />
      <meta name="msapplication-TileColor" content="#ef4444" />
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}