'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

interface Heading {
  text: string;
  id: string;
  level: number;
}

export function ScrollLinked({ headings }: { headings: Heading[] }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Fix for MDX content - we need to add IDs to headings
    headings.forEach(({ text, id }) => {
      const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

      // Find heading elements by text content and add IDs
      headingElements.forEach((el) => {
        if (el.textContent?.trim() === text && !el.id) {
          el.id = id;
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px' },
    );

    // Observe after adding IDs
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <>
      {/* Progress bar - make sure it's visible */}
      <motion.div
        id="scroll-indicator"
        className=""
        style={{
          position: 'fixed',
          scaleY: scaleX,
          top: 0,
          left: 0,
          height: '100vh',
          width: 5,
          originY: 0,
          backgroundColor: 'var(--foreground)',
        }}
      />

      {/* Table of Contents */}
      <nav className="fixed top-0 left-2 hidden h-screen w-64 flex-col justify-center lg:flex">
        <ul className="space-y-1 text-xs">
          {headings.map(({ text, id, level }) => (
            <li
              key={id}
              style={{ paddingLeft: `${(level - 1) * 12}px` }}
              className={`text-sm transition-colors duration-200 ${
                activeId === id
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <a
                href={`#${id}`}
                onClick={(e) => {
                  const element = document.getElementById(id);
                  if (element) {
                    e.preventDefault();
                    element.scrollIntoView({
                      behavior: 'smooth',
                    });
                    setActiveId(id);
                    window.history.pushState(null, '', `#${id}`);
                  }
                  // If element not found, let default link behavior work
                }}
                className="block py-1"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
