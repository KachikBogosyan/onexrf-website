import Link from "next/link";
import Image from "next/image";
import { getAllTechnologies } from "@/lib/technologies";
import { MarketingHero } from "@/components/MarketingHero";

export default function TechnologiesPage() {
  const technologies = getAllTechnologies();

  return (
    <div className="space-y-12">
      <MarketingHero
        heading="Technologies"
        body="ONEX leverages advanced technologies to deliver precise, consistent catheter forming solutions. Explore our core technologies that power our manufacturing systems."
        media={{
          src: "/images/technologies-hero.png",
          alt: "ONEX Technologies",
        }}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {technologies.map((tech) => (
          <Link
            key={tech.slug}
            href={`/technologies/${tech.slug}`}
            className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{tech.name}</h2>
            {tech.image && (
              <div className="mt-3 mb-2 w-full h-56 relative rounded-md overflow-hidden bg-slate-100">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">
              {tech.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

