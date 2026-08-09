// components/SolutionCard.tsx
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image?: string;
  link: string;
  is_new?: boolean;
};

export function SolutionCard({ title, description, image, link, is_new }: Props) {
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
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-semibold">{title}</h4>
        {is_new && (
          <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
            NEW
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-700 line-clamp-3">{description}</p>
      <p className="text-xs text-blue-600 mt-2">View Details →</p>
    </Link>
  );
}
