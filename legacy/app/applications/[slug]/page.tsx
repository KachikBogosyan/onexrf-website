// app/applications/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getApplicationBySlug } from "@/lib/applications";
import { SolutionModule } from "@/components/SolutionModule";
import { getExamplesForApplicationPage } from "@/lib/examples";
import { ExamplesCarousel } from "@/components/examples/ExamplesCarousel";
import { MarketingHero } from "@/components/MarketingHero";
import { PageNav, type Section } from "@/components/PageNav";
import { SubApplicationsAccordion } from "@/components/SubApplicationsAccordion";
import { ContactCTA } from "@/components/ContactCTA";
import { getTechnologiesForApplication } from "@/lib/reverse";
import { SolutionCard } from "@/components/SolutionCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) return notFound();

  const { name, aliases, description, sub_applications, related, image } = application;
  const examples = getExamplesForApplicationPage(slug);
  const technologies = getTechnologiesForApplication(slug);

  // Build body content with description and aliases
  const bodyContent = (
    <>
      {aliases && aliases.length > 0 && (
        <p className="text-xs text-slate-500 mb-2">
          Also known as: {aliases.join(", ")}
        </p>
      )}
      <p>{description}</p>
    </>
  );

  // Define sections for this page
  const sections: Section[] = [
    ...(sub_applications && sub_applications.length > 0
      ? [{ id: 'applications', label: 'Applications' }]
      : []),
    ...(examples.length > 0 ? [{ id: 'examples', label: 'Examples' }] : []),
    { id: 'solutions', label: 'Solutions' },
    ...(technologies.length > 0 ? [{ id: 'technologies', label: 'Technologies' }] : []),
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/applications" className="hover:underline">
          Applications
        </Link>{" "}
        / <span className="text-slate-700">{name}</span>
      </nav>

      <MarketingHero
        heading={name}
        body={bodyContent}
        media={
          image
            ? {
                src: image,
                alt: name,
              }
            : undefined
        }
      />

      <PageNav sections={sections} />

      {sub_applications && sub_applications.length > 0 && (
        <section id="applications">
          <h2 className="text-lg font-semibold mb-6">{name} Applications</h2>
          <SubApplicationsAccordion
            subApplications={sub_applications}
            applicationSlug={application.slug}
          />
        </section>
      )}

      {/* Examples Section */}
      {examples.length > 0 && (
        <section id="examples">
          <ExamplesCarousel examples={examples} title="Examples" />
        </section>
      )}

      <section id="solutions">
        <SolutionModule
          related={related}
          contextLabel={name}
          title={`Solution for ${name}`}
        />
      </section>

      {technologies.length > 0 && (
        <section id="technologies">
          <h2 className="text-lg font-semibold mb-6">Technologies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {technologies.map((tech) => (
              <SolutionCard
                key={tech.slug}
                title={tech.name}
                description={tech.description}
                image={tech.image ?? undefined}
                link={`/resources/technologies/${tech.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      <ContactCTA context={name} contextType="application" />
    </div>
  );
}
