'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderNavItem({
  href,
  children,
  box = false,
  target = '_self',
}: {
  href: string;
  children: React.ReactNode;
  box?: boolean;
  target?: '_blank' | '_self';
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      target={target}
      className={`whitespace-nowrap hover:underline ${box ? 'rounded-md border border-black px-2 py-1' : ''} ${pathname === href ? 'underline' : 'no-underline'}`}
    >
      {children}
    </Link>
  );
}
