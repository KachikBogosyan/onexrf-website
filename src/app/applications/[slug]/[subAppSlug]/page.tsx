// app/applications/[slug]/[subAppSlug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSubApplicationBySlugs } from "@/lib/applications";
import { SolutionModule } from "@/components/SolutionModule";
import { getExamplesForSubApplicationPage } from "@/lib/examples";
import { ExamplesCarousel } from "@/components/examples/ExamplesCarousel";
import { MarketingHero } from "@/components/MarketingHero";
import { PageNav, type Section } from "@/components/PageNav";
import { ContactCTA } from "@/components/ContactCTA";
import { ContentModule } from "@/components/ContentModule";
import { getTechnologyBySlug, type Technology } from "@/lib/technologies";
import { SolutionCard } from "@/components/SolutionCard";

type Props = {
  params: Promise<{ slug: string; subAppSlug: string }>;
};

export default async function SubApplicationPage({ params }: Props) {
  const { slug, subAppSlug } = await params;
  const result = getSubApplicationBySlugs(slug, subAppSlug);
  if (!result) return notFound();

  const { application, subApp } = result;
  const examples = getExamplesForSubApplicationPage(slug, subAppSlug);
  const { long_description } = subApp;

  // merge related (application + subApp) – simple union
  const mergedRelated = {
    products: Array.from(
      new Set([
        ...(application.related.products || []),
        ...(subApp.related?.products || []),
      ])
    ),
    materials: Array.from(
      new Set([
        ...(application.related.materials || []),
        ...(subApp.related?.materials || []),
      ])
    ),
    tooling: Array.from(
      new Set([
        ...(application.related.tooling || []),
        ...(subApp.related?.tooling || []),
      ])
    ),
    technologies: Array.from(
      new Set([
        ...(application.related.technologies || []),
        ...(subApp.related?.technologies || []),
      ])
    ),
    support: Array.from(
      new Set([
        ...(application.related.support || []),
        ...(subApp.related?.support || []),
      ])
    ),
  };

  // Get technologies from merged related technologies
  const technologies: Technology[] = (mergedRelated.technologies || [])
    .map((techSlug) => getTechnologyBySlug(techSlug))
    .filter((tech: Technology | undefined): tech is Technology => tech !== undefined);

  // Define sections for this page
  const sections: Section[] = [
    ...(long_description ? [{ id: 'about', label: 'About' }] : []),
    { id: 'solutions', label: 'Solutions' },
    { id: 'contact', label: 'Contact' },
    ...(examples.length > 0 ? [{ id: 'examples', label: 'Examples' }] : []),
    ...(technologies.length > 0 ? [{ id: 'technologies', label: 'Technologies' }] : []),
  ];

  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/applications" className="hover:underline">
          Applications
        </Link>{" "}
        /{" "}
        <Link
          href={`/applications/${application.slug}`}
          className="hover:underline"
        >
          {application.name}
        </Link>{" "}
        / <span className="text-slate-700">{subApp.name}</span>
      </nav>

      <MarketingHero
        heading={subApp.name}
        body={subApp.description}
        media={
          subApp.image
            ? {
                src: subApp.image,
                alt: subApp.name,
              }
            : undefined
        }
      />

      <PageNav sections={sections} />

      {/* About Section */}
      {long_description && (
        <section id="about">
          <ContentModule
            title="About"
            content={long_description}
            image={subApp.image}
            imageAlt={subApp.name}
          />
        </section>
      )}

      <section id="solutions">
        <SolutionModule
          related={mergedRelated}
          contextLabel={subApp.name}
          title={`Solution for ${subApp.name}`}
        />
      </section>

      

      <ContactCTA context={subApp.name} contextType="subApplication" />

      {examples.length > 0 && (
        <section id="examples">
          <ExamplesCarousel examples={examples} title="Examples" />
        </section>
      )}
      
      {technologies.length > 0 && (
        <section id="technologies">
          <h2 className="text-lg font-semibold mb-6">Technologies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {technologies.map((tech) => (
              <SolutionCard
                key={tech.slug}
                title={tech.name}
                description={tech.description}
                image={tech.image}
                link={`/resources/technologies/${tech.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
