import Link from 'next/link';
import { ModeToggle } from './theme-toggle';
import HeaderNavItem from './header-nav-item';

export function Header() {
  return (
    <nav
      className={`font-system-serif z-1 mb-0 flex w-full max-w-screen-xl flex-wrap items-center justify-between pl-2 text-xl sm:justify-center sm:gap-12 sm:py-2`}
    >
      <Link href="/" className="no-underline sm:mr-auto">
        <h1 className="mb-0 text-3xl font-bold whitespace-nowrap">AI 2072</h1>
      </Link>
      <nav className="flex gap-4 text-xl">
        <HeaderNavItem href="/">Home</HeaderNavItem>
        <HeaderNavItem href="/blog">Blog</HeaderNavItem>
        <HeaderNavItem href="/about">About</HeaderNavItem>
      </nav>
      <ModeToggle />
    </nav>
  );
}
