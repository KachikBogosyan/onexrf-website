import type { Metadata } from "next";
import { BookOpen, Download, FlaskConical, Newspaper } from "lucide-react";
import { resolveConfig, type VariantParams } from "@/lib/variant";
import { sitePath } from "@/lib/site-config";
import { getAllTechnologies } from "@/lib/technologies";
import { getAllMaterials } from "@/lib/materials";
import { getAllDownloads } from "@/lib/evidence";
import { getAllBlogPosts } from "@/lib/blog";
import {
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "How RF forming and welding work, which materials run on which process, downloadable guides, and the ONEX RF blog.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  const config = resolveConfig(variant);

  const sections = [
    {
      icon: FlaskConical,
      href: "/resources/technologies",
      title: "Technologies",
      body: "RF induction and dielectric heating — what each one does to the material, and which applies to your process.",
      count: `${getAllTechnologies().length} topics`,
    },
    {
      icon: BookOpen,
      href: "/resources/materials",
      title: "Materials",
      body: "Which polymers can be RF welded, which must be induction formed, and how each behaves under heat.",
      count: `${getAllMaterials().length} polymers`,
    },
    {
      icon: Download,
      href: "/resources/downloads",
      title: "Downloads",
      body: "Brochures, specification sheets and design guides to take to the rest of your team.",
      count: `${getAllDownloads().filter((d) => d.available).length} available`,
    },
    {
      icon: Newspaper,
      href: "/blog",
      title: "Blog",
      body: "Process notes and application write-ups from the engineers doing the work.",
      count: `${getAllBlogPosts().length} posts`,
    },
  ];

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Resources"
            title="The technical reference behind the machines."
            lede="Most of what determines whether a process works is decided before a machine is chosen — by the material, the geometry and the physics. This is that material, written down."
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {sections.map(({ icon: Icon, ...section }) => (
              <Card
                key={section.href}
                href={sitePath(config, section.href)}
                className="flex flex-col"
              >
                <Icon aria-hidden="true" className="size-6 text-accent" />
                <h2 className="mt-4 text-xl font-semibold text-text-heading">
                  {section.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-text-muted">
                  {section.body}
                </p>
                <p className="mt-4 text-sm font-semibold text-text-link">
                  {section.count}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
