import Image from "next/image";

type ControlBlockProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
};

export function ControlBlock({ title, imageSrc, imageAlt, children }: ControlBlockProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="mt-4">{children}</div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
          <div className="relative aspect-[4/3]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

