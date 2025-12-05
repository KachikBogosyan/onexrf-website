// components/MarketingHero.tsx
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type CTALink = {
  label: string;
  href: string;
};

type MarketingHeroProps = {
  heading: string;
  body: string | ReactNode;
  media?: {
    src: string;
    alt?: string;
  };
  primaryCTA?: CTALink;
  secondaryCTA?: CTALink;
  className?: string;
};

export function MarketingHero({
  heading,
  body,
  media,
  primaryCTA,
  secondaryCTA,
  className = "",
}: MarketingHeroProps) {
  return (
    <section
      className={`grid lg:grid-cols-2 gap-4 lg:gap-6 items-center py-3 lg:py-4 ${className}`}
    >
      {/* Text Content */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900">
          {heading}
        </h1>
        <div className="text-sm lg:text-base text-slate-700 leading-relaxed">
          {typeof body === "string" ? <p>{body}</p> : body}
        </div>
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {primaryCTA && (
              <Link
                href={primaryCTA.href}
                className="inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors"
              >
                {primaryCTA.label}
              </Link>
            )}
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-block border border-blue-600 text-blue-600 px-4 py-2 text-sm font-medium rounded hover:bg-blue-50 transition-colors"
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Media Content - supports both images and GIFs */}
      {media && (
        <div className="relative w-full aspect-[2/1] lg:aspect-[2/1] rounded-lg overflow-hidden bg-slate-100 border shadow-sm">
          <Image
            src={media.src}
            alt={media.alt || heading}
            fill
            className="object-cover"
            priority
            unoptimized={media.src.endsWith('.gif')}
          />
        </div>
      )}
    </section>
  );
}

