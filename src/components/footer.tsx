import Link from 'next/link';

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-between gap-2 p-4 text-center text-sm!">
      <p className="text-sm!">&copy; {new Date().getFullYear()} AI 2072</p>
      <p className="text-sm!">
        <Link href="https://github.com/hamedmp/ai2072" target="_blank" rel="noopener noreferrer">
          GitHub
        </Link>
      </p>
    </footer>
  );
}
