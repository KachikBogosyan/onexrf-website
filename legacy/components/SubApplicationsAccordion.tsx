'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { SubApplication } from '@/lib/types';

type Props = {
  subApplications: SubApplication[];
  applicationSlug: string;
};

export function SubApplicationsAccordion({ subApplications, applicationSlug }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selected = subApplications[selectedIndex];

  if (subApplications.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Left Column: Accordion List */}
      <div className="space-y-1">
        {subApplications.map((subApp, index) => {
          const isSelected = index === selectedIndex;
          return (
            <div
              key={subApp.slug}
              className={`border-b border-slate-200 transition-colors ${
                isSelected ? 'bg-slate-50' : 'bg-white'
              }`}
            >
              <button
                onClick={() => setSelectedIndex(index)}
                className="w-full text-left py-4 px-4 flex items-center justify-between group"
              >
                <h3
                  className={`text-base font-medium ${
                    isSelected ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                  }`}
                >
                  {subApp.name}
                </h3>
                <svg
                  className={`w-5 h-5 transition-transform flex-shrink-0 ${
                    isSelected ? 'rotate-180 text-slate-600' : 'text-slate-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Expanded Content */}
              {isSelected && (
                <div className="px-4 pb-4 space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {subApp.description}
                  </p>
                  <Link
                    href={`/applications/${applicationSlug}/${subApp.slug}`}
                    className="inline-block bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded text-sm font-medium transition-colors"
                  >
                    DISCOVER MORE
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right Column: Image - Sticky with fixed max height */}
      <div className="sticky top-24 md:top-28 w-full">
        <div className="relative w-full max-h-[600px] aspect-[4/5] rounded-lg overflow-hidden bg-slate-50">
          {selected?.image ? (
            <Image
              src={selected.image}
              alt={selected.name}
              fill
              className="object-cover w-full"
              priority={selectedIndex === 0}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              No image available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

