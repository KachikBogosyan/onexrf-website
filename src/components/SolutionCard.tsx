// components/SolutionCard.tsx
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image?: string;
  link: string;
};

export function SolutionCard({ title, description, image, link }: Props) {
  return (
    <Link
      href={link}
      className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="h-32 w-full object-contain mb-3 border rounded"
        />
      )}
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-xs text-slate-700 line-clamp-3">{description}</p>
      <p className="text-xs text-blue-600 mt-2">View Details →</p>
    </Link>
  );
}
