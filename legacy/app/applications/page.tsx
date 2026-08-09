// app/applications/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getApplications } from "@/lib/applications";
import { MarketingHero } from "@/components/MarketingHero";

export default function ApplicationsPage() {
  const applications = getApplications();

  return (
    <div className="space-y-12">
      <MarketingHero
        heading="Applications"
        body="Start with your catheter application. ONEX provides complete solutions including machines, custom tooling, and process development to form consistent parts for R&D or production."
        media={{
          src: "/images/applications-hero.png",
          alt: "Catheter applications",
        }}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {applications.map((app) => (
          <Link
            key={app.slug}
            href={`/applications/${app.slug}`}
            className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{app.name}</h2>
            {app.aliases && app.aliases.length > 0 && (
              <p className="text-xs text-slate-500">
                Also known as: {app.aliases.join(", ")}
              </p>
            )}
            {app.image && (
              <div className="mt-3 mb-2 w-full h-56 relative rounded-md overflow-hidden bg-slate-100">
                <Image
                  src={app.image}
                  alt={app.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">
              {app.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
