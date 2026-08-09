import Image from "next/image";
import { Download as DownloadIcon, Lock } from "lucide-react";
import type { Download } from "@/lib/evidence";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import { Card, Eyebrow } from "@/components/ui/primitives";
import { Placeholder, PlaceholderImage } from "@/components/Placeholder";

/**
 * An asset in the download library.
 *
 * Gated assets link to their own landing page rather than straight to the PDF —
 * that page is where the email is exchanged for the file. The scoping note's
 * third finding is that ONEX's brochures are genuinely strong and are never
 * offered in return for anything, so nothing captures the visitor.
 */
export function DownloadCard({
  download,
  config,
}: {
  download: Download;
  config: SiteConfig;
}) {
  if (!download.available) {
    return (
      <Placeholder title={download.title}>
        {download.description}
        {download.needs?.length ? (
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {download.needs.map((need) => (
              <li key={need}>{need}</li>
            ))}
          </ul>
        ) : null}
      </Placeholder>
    );
  }

  const href = sitePath(config, `/resources/downloads/${download.slug}`);

  return (
    <Card href={href} className="flex flex-col !p-0 overflow-hidden">
      <div className="aspect-[4/3] border-b border-border bg-surface-sunken p-4">
        {download.cover ? (
          <div className="relative size-full">
            <Image
              src={download.cover}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <PlaceholderImage
            title="Cover artwork"
            ratio="4/3"
            className="!h-full"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Eyebrow>
          {download.kind}
          {download.year ? ` · ${download.year}` : ""}
        </Eyebrow>
        <h3 className="mt-1 text-lg font-semibold text-text-heading">
          {download.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-text-muted">
          {download.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-text-link">
          {download.gated ? (
            <Lock aria-hidden="true" className="size-4" />
          ) : (
            <DownloadIcon aria-hidden="true" className="size-4" />
          )}
          {download.gated ? "Get the PDF" : "Download"}
        </span>
      </div>
    </Card>
  );
}
