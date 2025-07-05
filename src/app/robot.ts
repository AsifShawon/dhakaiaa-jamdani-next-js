import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://dhakaiaajamdani.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/Admin/',
          '/dashboard/',
          '/api/',
          '/auth/',
          '/_next/',
          '/checkout/',
          '/login',
          '/Signup',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/Admin/',
          '/dashboard/',
          '/api/',
          '/auth/',
          '/checkout/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}