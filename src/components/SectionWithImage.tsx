import Image from "next/image";
import type { ReactNode } from "react";

type SectionWithImageProps = {
  image?: string;
  imageAlt?: string;
  imageRight?: boolean;
  children: ReactNode;
  className?: string;
};

export function SectionWithImage({
  image,
  imageAlt = "Section image",
  imageRight = false,
  children,
  className = "",
}: SectionWithImageProps) {
  const imageElement = (
    <div className="w-full h-64 md:h-96 relative rounded-lg overflow-hidden bg-slate-100 border shadow-sm">
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
          Image placeholder
        </div>
      )}
    </div>
  );

  const contentElement = <div className="space-y-4">{children}</div>;

  // Grid columns: content gets more space (1.618fr) for better readability
  // When imageRight is false: image (1fr) | content (1.618fr)
  // When imageRight is true: content (1.618fr) | image (1fr)
  const gridCols = imageRight 
    ? "md:grid-cols-[1.618fr_1fr]" 
    : "md:grid-cols-[1fr_1.618fr]";

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6 lg:gap-8 items-center ${className}`}>
      {imageRight ? (
        <>
          {contentElement}
          {imageElement}
        </>
      ) : (
        <>
          {imageElement}
          {contentElement}
        </>
      )}
    </div>
  );
}

