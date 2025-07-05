import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "img.daisyui.com",
            },
            {
                hostname: "storage.googleapis.com",
            },
            {
                hostname: "firebasestorage.googleapis.com",
            },
            {
                hostname: "uhnwbbygjqehbyunalva.supabase.co",
            }
        ]
    },
    // Enable compression
    compress: true,
    
    // Enable experimental features for better performance
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
    
    // Headers for SEO and security
    async headers() {
        return [
            // Cache static assets for 1 year
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/images/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
    
    // Redirects for SEO
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/products',
                destination: '/Shop',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;