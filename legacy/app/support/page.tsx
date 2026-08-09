import Link from "next/link";
import Image from "next/image";
import { getAllSupport } from "@/lib/support";
import { MarketingHero } from "@/components/MarketingHero";

export default function SupportPage() {
  const support = getAllSupport();

  return (
    <div className="space-y-12">
      <MarketingHero
        heading="Support"
        body="Comprehensive support services to help you succeed with ONEX RF forming systems. From process development to training and servicing, we're here to ensure your success."
        media={{
          src: "/images/support-hero.png",
          alt: "ONEX Support",
        }}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {support.map((item) => (
          <Link
            key={item.slug}
            href={`/support/${item.slug}`}
            className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="mt-3 mb-2 w-full h-56 relative rounded-md overflow-hidden bg-slate-100">
              <Image
                src={item.image || "/images/support/placeholder.png"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}



