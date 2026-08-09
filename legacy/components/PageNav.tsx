'use client';

import { useEffect, useState } from 'react';

export type Section = {
  id: string;
  label: string;
};

type PageNavProps = {
  sections: Section[];
};

export function PageNav({ sections }: PageNavProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (sections.length === 0) return null;

  return (
    <nav className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
                activeSection === id
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

