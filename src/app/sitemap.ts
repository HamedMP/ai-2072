import { getBlogPosts } from '@/app/(blog)/blog/utils';

export const baseUrl = 'https://ai-2072.vercel.app/';

export default async function sitemap() {
  const blogs = (await getBlogPosts()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ['', '/blog', '/about'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
