import Link from "next/link";
import Image from "next/image";
import { getAllTooling } from "@/lib/tooling";
import { MarketingHero } from "@/components/MarketingHero";

export default function ToolingPage() {
  const allTooling = getAllTooling();
  const tooling = allTooling.filter((item) => (item as any).type === "component");

  return (
    <div className="space-y-12">
      <MarketingHero
        heading="Tooling"
        body="Custom dies and mandrels engineered for your specific catheter geometry. ONEX provides precision tooling designed to integrate seamlessly with our RF forming systems."
        media={{
          src: "/images/tooling-hero.png",
          alt: "ONEX Tooling",
        }}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {tooling.map((item) => (
          <Link
            key={item.slug}
            href={`/tooling/${item.slug}`}
            className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="mt-3 mb-2 w-full h-56 relative rounded-md overflow-hidden bg-slate-100">
              <Image
                src={item.image || "/images/tooling/placeholder.png"}
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

