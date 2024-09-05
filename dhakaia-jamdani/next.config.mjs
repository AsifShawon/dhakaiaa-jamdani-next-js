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
            }
        ]
    }
};

export default nextConfig;
