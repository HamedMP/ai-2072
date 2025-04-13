import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { getBlogPosts, formatDate } from '@/app/(blog)/blog/utils';

export default async function Home() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 flex flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-bold">Futurism, AI, and Design</h1>
        <p className="text-muted-foreground max-w-2xl text-xl">
          A modern exploration of AI futures, typography, and design. This digital garden combines
          Tufte-inspired aesthetics with cutting-edge web technologies.
        </p>
        <div className="flex gap-4">
          <Button>
            <Link href="/blog">Read Blog</Link>
          </Button>
          <Button variant="outline">
            <Link href="/about">About Project</Link>
          </Button>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Featured Posts */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Featured Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.metadata.title}</CardTitle>
                <CardDescription>Posted on {formatDate(post.metadata.publishedAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.metadata.summary}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge>Blog</Badge>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`}>Read More →</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      <section className="bg-muted rounded-lg p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-semibold">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest posts and updates delivered directly to your inbox.
          </p>
          <Button>Subscribe</Button>
        </div>
      </section>
    </div>
  );
}
