import Link from "next/link";
import { MarketingHero } from "@/components/MarketingHero";

export default function ResourcesPage() {
  return (
    <div className="space-y-16">
      <MarketingHero
        heading="Resources"
        body="Explore our technical resources, material guides, and industry insights to support your catheter manufacturing projects."
        media={{
          src: "/images/resources-hero.png",
          alt: "ONEX Resources",
        }}
      />

      {/* THREE-CARD NAVIGATION */}
      <section>
        <div className="grid md:grid-cols-3 gap-8">
          {/* BLOG */}
          <Link
            href="/resources/blog"
            className="group border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="space-y-4 flex flex-col items-center">
              <div className="h-32 w-full bg-slate-100 rounded flex items-center justify-center text-slate-400">
                Blog Image
              </div>
              <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                Blog
              </h3>
              <p className="text-sm text-slate-600 text-center">
                Technical guides, case studies, and industry insights
              </p>
            </div>
          </Link>

          {/* TECHNOLOGIES */}
          <Link
            href="/resources/technologies"
            className="group border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="space-y-4 flex flex-col items-center">
              <div className="h-32 w-full bg-slate-100 rounded flex items-center justify-center text-slate-400">
                Technologies Image
              </div>
              <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                Technologies
              </h3>
              <p className="text-sm text-slate-600 text-center">
                Core technologies powering our manufacturing systems
              </p>
            </div>
          </Link>

          {/* MATERIALS */}
          <Link
            href="/resources/materials"
            className="group border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="space-y-4 flex flex-col items-center">
              <div className="h-32 w-full bg-slate-100 rounded flex items-center justify-center text-slate-400">
                Materials Image
              </div>
              <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                Materials
              </h3>
              <p className="text-sm text-slate-600 text-center">
                Material compatibility and expertise for catheter forming
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

