import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Component } from '@/components/my-chart';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 flex flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-bold">Welcome to My Digital Garden 🌱</h1>
        <p className="text-muted-foreground max-w-2xl text-xl">
          Exploring technology, design, and everything in between. Join me on this journey of
          continuous learning and discovery.
        </p>
        <div className="flex gap-4">
          <Button>
            <Link href="/blog">Read Blog</Link>
          </Button>
          <Button variant="outline">Subscribe</Button>
        </div>
      </section>

      <Component />

      <Separator className="my-8" />

      {/* Featured Posts */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Featured Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Understanding Web3 Basics</CardTitle>
                <CardDescription>Posted on April 1, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A deep dive into the fundamentals of Web3 technology and its implications for the
                  future of the internet.
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge>Web3</Badge>
                  <Badge variant="outline">Technology</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  Read More →
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted rounded-lg p-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-semibold">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest posts and updates delivered directly to your inbox.
          </p>
          <div className="mx-auto flex max-w-md gap-4">
            <Input type="email" placeholder="Enter your email" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
