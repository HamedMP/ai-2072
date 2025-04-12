export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='content'>{children}</div>;
}
