import Image from "next/image";

type IconCardProps = {
  title: string;
  description: string;
  iconSrc: string;
};

export function IconCard({ title, description, iconSrc }: IconCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
        <Image src={iconSrc} alt="" fill className="object-contain p-2" />
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-900">{title}</p>
        <p className="mt-1 text-sm text-zinc-700">{description}</p>
      </div>
    </div>
  );
}

