import remarkGfm from 'remark-gfm';

import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'placehold.co',
        protocol: 'https',
      },
    ],
  },
};
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});

export default withMDX(nextConfig);
