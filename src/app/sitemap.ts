import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dhakaiaajamdani.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/Shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/Signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Category pages
  const categories = ['Sharee', 'Panjabi', 'Threepcs']
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/Shop?category=${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // TODO: Add dynamic product pages
  // You would fetch product IDs from your database here
  // const productPages = products.map(product => ({
  //   url: `${baseUrl}/product/${product.id}`,
  //   lastModified: new Date(product.updated_at),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticPages,
    ...categoryPages,
    // ...productPages,
  ]
}