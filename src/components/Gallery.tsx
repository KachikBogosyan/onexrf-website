import Image from "next/image";

type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

type GalleryProps = {
  items: GalleryItem[];
  className?: string;
  columns?: 2 | 3 | 4;
};

export function Gallery({ items, className = "", columns = 3 }: GalleryProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-100 border shadow-sm">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
            />
          </div>
          {item.caption && (
            <p className="text-xs text-slate-600 text-center">{item.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}

