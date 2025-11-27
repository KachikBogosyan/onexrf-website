// components/MarketingHero.tsx
import Image from "next/image";
import type { ReactNode } from "react";

type MarketingHeroProps = {
  heading: string;
  body: string | ReactNode;
  media?: {
    src: string;
    alt?: string;
  };
  className?: string;
};

export function MarketingHero({
  heading,
  body,
  media,
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

