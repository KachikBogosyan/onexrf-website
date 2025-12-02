import Image from "next/image";
import type { ReactNode } from "react";

type ContentModuleProps = {
  image?: string;
  imageAlt?: string;
  title?: string;
  content: string | ReactNode;
  imageRight?: boolean;
};

export function ContentModule({
  image,
  imageAlt = "Content image",
  title,
  content,
  imageRight = false,
}: ContentModuleProps) {
  const imageElement = (
    <div className="w-full h-64 md:h-80 relative rounded-md overflow-hidden bg-slate-100 border">
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

  const contentElement = (
    <div className="space-y-3">
      {title && (
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      )}
      <div className="text-sm text-slate-700 whitespace-pre-line">
        {typeof content === "string" ? content : content}
      </div>
    </div>
  );

  // Grid columns: content always gets the larger ratio (1.618fr)
  // When imageRight is false: image (1fr) | content (1.618fr)
  // When imageRight is true: content (1.618fr) | image (1fr)
  const gridCols = imageRight 
    ? "md:grid-cols-[1.618fr_1fr]" 
    : "md:grid-cols-[1fr_1.618fr]";

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6 items-center`}>
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

