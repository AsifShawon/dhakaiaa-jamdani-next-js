import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootClientLayout from "./RootClientLayout";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dhakaiaajamdani.com'),
  title: {
    default: "Dhakaia Jamdani - Authentic Traditional Bangladeshi Clothing | Premium Sharee, Panjabi & Three Piece | ঢাকাইয়া জামদানি - বাংলাদেশের ঐতিহ্যবাহী পোশাক",
    template: "%s | Dhakaia Jamdani - Traditional Bangladeshi Fashion | ঢাকাইয়া জামদানি"
  },
  description: "Discover authentic Bangladeshi traditional wear at Dhakaia Jamdani. Premium quality Jamdani Sharee, elegant Panjabi, and beautiful Three Piece collections. Handcrafted with heritage, delivered worldwide. Shop now for authentic cultural fashion. বাংলাদেশের ঐতিহ্যবাহী জামদানি শাড়ি, পাঞ্জাবি ও থ্রি-পিস সংগ্রহ।",
  keywords: [
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
  authors: [{ name: "Dhakaia Jamdani Team" }],
  creator: "Dhakaia Jamdani",
  publisher: "Dhakaia Jamdani",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon/dhakaiaa_jamdani_fav_4.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/favicon/dhakaiaa_jamdani_fav_6.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/dhakaiaa_jamdani_fav_4.png', sizes: '32x32', type: 'image/png' },
    ],
    // apple: [
    //   { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    // ],
    other: [
      { url: '/favicon/dhakaiaa_jamdani_fav_1.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/dhakaiaa_jamdani_fav_2.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dhakaiaajamdani.com',
    siteName: 'Dhakaia Jamdani',
    title: 'Dhakaia Jamdani - Authentic Traditional Bangladeshi Clothing',
    description: 'Discover premium quality traditional Bangladeshi clothing. Handcrafted Jamdani Sharee, elegant Panjabi, and beautiful Three Piece collections with authentic cultural heritage.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhakaia Jamdani - Traditional Bangladeshi Clothing Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dhakaiaajamdani',
    creator: '@dhakaiaajamdani',
    title: 'Dhakaia Jamdani - Authentic Traditional Bangladeshi Clothing',
    description: 'Premium quality traditional Bangladeshi clothing. Handcrafted with heritage, delivered worldwide.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://dhakaiaajamdani.com',
    languages: {
      'en-US': 'https://dhakaiaajamdani.com',
      'bn-BD': 'https://dhakaiaajamdani.com/bn',
    },
  },
  category: 'fashion',
  classification: 'Traditional Clothing E-commerce',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Dhakaia Jamdani',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#ef4444',
    'theme-color': '#ef4444',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Primary favicon - Next.js will automatically serve this */}
        <link rel="icon" href="/favicon/dhakaiaa_jamdani_fav_4.ico" sizes="16x16 32x32" />
        
        {/* PNG favicons for better quality */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/dhakaiaa_jamdani_fav_6.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/dhakaiaa_jamdani_fav_4.png" />

        {/* Apple Touch Icon
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" /> */}
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/dhakaiaa_jamdani_fav_1.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon/dhakaiaa_jamdani_fav_2.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Additional Meta Tags */}
        <meta name="msapplication-TileColor" content="#ef4444" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ef4444" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <RootClientLayout>{children}</RootClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}