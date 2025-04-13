import type { Metadata } from 'next';
import '@/styles/tufte.css';
import '@/styles/globals.css';

import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/footer';
import { ScrollLinked } from '@/components/scroll-progress';

export const metadata: Metadata = {
  title: 'AI 2072',
  description: 'Nextjs Blog Template with Tufte CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-1 flex-col items-center">
            <ScrollLinked headings={[]} />

            <Header />
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
