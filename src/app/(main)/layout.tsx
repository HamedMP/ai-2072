export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose dark:prose-invert w-full max-w-screen-lg pb-10 2xl:max-w-screen-xl">
      {children}
    </div>
  );
}
