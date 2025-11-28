import Image from "next/image";

type ContentModuleProps = {
  image?: string;
  imageAlt?: string;
  title?: string;
  content: string;
};

export function ContentModule({
  image,
  imageAlt = "Content image",
  title,
  content,
}: ContentModuleProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      {/* Image on left */}
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

      {/* Content on right */}
      <div className="space-y-3">
        {title && (
          <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
        )}
        <div className="text-sm text-slate-700 whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
}

