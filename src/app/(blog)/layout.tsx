export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="prose dark:prose-invert w-full max-w-screen-md pb-10">{children}</div>;
}
