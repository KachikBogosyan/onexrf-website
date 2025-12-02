import Link from "next/link";
import Image from "next/image";
import { getAllMaterials } from "@/lib/materials";
import { MarketingHero } from "@/components/MarketingHero";

export default function MaterialsPage() {
  const materials = getAllMaterials();

  return (
    <div className="space-y-12">
      <MarketingHero
        heading="Materials"
        body="ONEX RF forming systems work with a wide variety of catheter materials, from common polymers to specialized high-performance materials. Explore our material compatibility and expertise."
        media={{
          src: "/images/materials-hero.png",
          alt: "ONEX Materials",
        }}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {materials.map((material) => (
          <Link
            key={material.slug}
            href={`/resources/materials/${material.slug}`}
            className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{material.name}</h2>
            <div className="mt-3 mb-2 w-full h-56 relative rounded-md overflow-hidden bg-slate-100">
              <Image
                src={material.image || "/images/materials/placeholder.png"}
                alt={material.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">
              {material.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

