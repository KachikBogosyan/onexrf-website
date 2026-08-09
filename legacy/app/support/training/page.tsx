import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSupportBySlug } from "@/lib/support";
import { MarketingHero } from "@/components/MarketingHero";

export default function TrainingPage() {
  const training = getSupportBySlug("training");

  if (!training) return notFound();

  return (
    <div className="space-y-12">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/support" className="hover:underline">
          Support
        </Link>{" "}
        / <span className="text-slate-700">{training.name}</span>
      </nav>

      <MarketingHero
        heading={training.name}
        body={training.description || "Training programs"}
        media={{
          src: "/images/support/placeholder.png",
          alt: "Training Seminars",
        }}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {training.seminars?.map((seminar) => (
          <Link
            key={seminar.slug}
            href={`/support/training/${seminar.slug}`}
            className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{seminar.name}</h2>
            <div className="mt-3 mb-2 w-full h-56 relative rounded-md overflow-hidden bg-slate-100">
              <Image
                src={seminar.image || "/images/support/placeholder.png"}
                alt={seminar.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">
              {seminar.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

