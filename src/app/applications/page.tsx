// app/applications/page.tsx
import Link from "next/link";
import { getApplications } from "@/lib/applications";

export default function ApplicationsPage() {
  const applications = getApplications();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Applications
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Start with your catheter application. ONEX provides complete solutions
          including machines, custom tooling, and process development to form
          consistent parts for R&amp;D or production.
        </p>
      </header>

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
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">
              {app.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
