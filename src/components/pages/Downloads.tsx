import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Lock } from "lucide-react";
import { getAllDownloads, getDownloadBySlug } from "@/lib/evidence";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Placeholder, PlaceholderImage } from "@/components/Placeholder";
import { DownloadCard } from "./DownloadCard";
import { HubSpotForm } from "@/components/HubSpotForm";

/* ---------------------------------------------------------------------------
   Library
   ------------------------------------------------------------------------- */

export function DownloadsIndex({ config }: { config: SiteConfig }) {
  const downloads = getAllDownloads();
  const available = downloads.filter((d) => d.available);

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Downloads"
            title="Take the detail with you."
            lede="Specifications, design guides and brochures. Most decisions here are made by a team, not a person — these exist so the person who found us can hand something to the people who have not."
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((download) => (
              <DownloadCard
                key={download.slug}
                download={download}
                config={config}
              />
            ))}
          </div>

          {available.length <= 1 && (
            <Placeholder
              title="The library is nearly empty, and this is the fastest fix on the site"
              blocking
              className="mt-10"
            >
              One brochure exists in the repo — and on the current site it is
              published as an open link, so it captures nothing. Everything else
              here is a stub. The scoping note&rsquo;s third finding is exactly
              this: the brochures are genuinely strong and are never offered in
              exchange for an email, so visitors arrive, read, and leave without
              a trace. Assembling three or four PDFs from content ONEX already
              owns would turn anonymous traffic into a list.
            </Placeholder>
          )}
        </Container>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Gated landing page — where the email is exchanged for the file
   ------------------------------------------------------------------------- */

export function DownloadDetail({
  slug,
  config,
}: {
  slug: string;
  config: SiteConfig;
}) {
  const download = getDownloadBySlug(slug);
  if (!download) notFound();

  return (
    <Section>
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
          <Link
            href={sitePath(config, "/resources/downloads")}
            className="hover:underline"
          >
            Downloads
          </Link>
        </nav>

        <div className="mt-6 grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>
              {download.kind}
              {download.year ? ` · ${download.year}` : ""}
            </Eyebrow>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {download.title}
            </h1>
            <p className="prose-measure mt-5 text-lg text-text-muted">
              {download.description}
            </p>

            <ul className="mt-8 space-y-2.5">
              {[
                "Sent straight to your inbox as a PDF",
                "Share it with the rest of the evaluation team",
                "No sales call unless you ask for one",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-accent"
                  />
                  <span className="text-text-muted">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 aspect-[4/3] max-w-sm rounded-2xl border border-border bg-surface-sunken p-4">
              {download.cover ? (
                <div className="relative size-full">
                  <Image
                    src={download.cover}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 24rem"
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
          </div>

          <div>
            {download.available ? (
              <div className="rounded-2xl border border-border bg-surface-raised p-6">
                <div className="flex items-center gap-2">
                  <Lock aria-hidden="true" className="size-4 text-accent" />
                  <h2 className="font-semibold">Where should we send it?</h2>
                </div>
                <div className="mt-5">
                  <HubSpotForm
                    context={{
                      type: "material",
                      name: download.title,
                      slug: download.slug,
                    }}
                  />
                </div>
                <p className="mt-4 text-xs text-text-muted">
                  We will email the PDF and keep you on our list only if you ask
                  us to.
                </p>
              </div>
            ) : (
              <Placeholder title={`${download.title} does not exist yet`} blocking>
                {download.needs?.length ? (
                  <ul className="list-disc space-y-1 pl-5">
                    {download.needs.map((need) => (
                      <li key={need}>{need}</li>
                    ))}
                  </ul>
                ) : (
                  "This asset is planned but has not been produced."
                )}
              </Placeholder>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
