import Link from 'next/link';
import { formatDate, getBlogPosts } from '@/app/(blog)/blog/utils';

export async function BlogPosts() {
  const allBlogs = await getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link key={post.slug} className="flex flex-col space-y-2" href={`/blog/${post.slug}`}>
            <div className="flex w-full flex-col items-center gap-2 space-x-0 md:flex-row md:space-x-2">
              <p className="mr-2 text-sm! text-neutral-600 tabular-nums dark:text-neutral-300">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="tracking-tight text-neutral-900 dark:text-neutral-100">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
