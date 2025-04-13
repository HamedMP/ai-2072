import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { baseUrl } from '@/app/sitemap';
import { getBlogPosts } from '../utils';
import { notFound } from 'next/navigation';
import { ScrollLinked } from '@/components/scroll-progress';
import remarkToc from 'remark-toc';
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((post) => post.slug === slug);

  if (!post) {
    return notFound();
  }

  const headings: { text: string; id: string; level: number }[] = [];
  const processor = remark()
    .use(remarkToc)
    .use(() => (tree) => {
      visit(tree, 'heading', (node: { children: { value: string }[]; depth: number }) => {
        const text = node.children[0].value;
        const id = text.toLowerCase().replace(/\s+/g, '-');
        headings.push({ text, id, level: node.depth });
      });
    });

  await processor.process(post.content);
  const { default: MDXContent } = await evaluate(post.content, runtime);

  return (
    <div className="relative w-full">
      <ScrollLinked headings={headings} />
      <div className="prose dark:prose-invert max-w-none">
        <MDXContent />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return (await posts).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
export const dynamicParams = false;
