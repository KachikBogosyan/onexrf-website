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
  const {
    long_description,
    aliases,
    use_cases,
    process_requirements,
    details,
  } = subApp;

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

  // Build hero body with aliases
  const heroBody = (
    <div className="space-y-2">
      {aliases && aliases.length > 0 && (
        <p className="text-xs text-slate-500 font-medium">
          Also known as: <span className="text-slate-600">{aliases.join(", ")}</span>
        </p>
      )}
      <p>{subApp.description}</p>
    </div>
  );

  // Define sections for this page
  const sections: Section[] = [
    ...(long_description ? [{ id: 'about', label: 'About' }] : []),
    { id: 'solutions', label: 'Solutions' },
    ...(use_cases && use_cases.length > 0
      ? [{ id: 'use-cases', label: 'Use Cases' }]
      : []),
    ...(process_requirements && process_requirements.length > 0
      ? [{ id: 'process-requirements', label: 'Process Requirements' }]
      : []),
    ...(details && details.length > 0
      ? [{ id: 'specifications', label: 'Specifications' }]
      : []),
    ...(examples.length > 0 ? [{ id: 'examples', label: 'Examples' }] : []),
    ...(technologies.length > 0
      ? [{ id: 'technologies', label: 'Technologies' }]
      : []),
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-12">
      {/* Breadcrumb Navigation */}
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
        / <span className="text-slate-700 font-medium">{subApp.name}</span>
      </nav>

      {/* Hero Section */}
      <MarketingHero
        heading={subApp.name}
        body={heroBody}
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
        <section id="about" className="scroll-mt-20">
          <ContentModule
            title="About"
            content={long_description}
            image={subApp.image}
            imageAlt={subApp.name}
          />
        </section>
      )}

      {/* Solutions Section */}
      <section id="solutions" className="scroll-mt-20">
        <SolutionModule
          related={mergedRelated}
          contextLabel={subApp.name}
          title={`Solutions for ${subApp.name}`}
        />
      </section>

      {/* Use Cases Section */}
      {use_cases && use_cases.length > 0 && (
        <section id="use-cases" className="scroll-mt-20">
          <ContentModule
            title="Use Cases"
            image={subApp.image}
            imageAlt={subApp.name}
            imageRight={true}
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-600 mb-4">
                  Common applications and scenarios for this solution
                </p>
                <div className="space-y-3">
                  {use_cases.map((useCase, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-900 leading-relaxed">
                          {useCase}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </section>
      )}

      {/* Process Requirements Section */}
      {process_requirements && process_requirements.length > 0 && (
        <section id="process-requirements" className="scroll-mt-20">
          <ContentModule
            title="Process Requirements"
            image={subApp.image}
            imageAlt={subApp.name}
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-600 mb-4">
                  Key technical requirements and considerations
                </p>
                <div className="space-y-3">
                  {process_requirements.map((requirement, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {requirement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </section>
      )}

      {/* Specifications/Details Section */}
      {details && details.length > 0 && (
        <section id="specifications" className="scroll-mt-20">
          <ContentModule
            title="Specifications"
            image={subApp.image}
            imageAlt={subApp.name}
            imageRight={true}
            content={
              <div className="space-y-4">
                <p className="text-sm text-slate-600 mb-4">
                  Technical details and capabilities
                </p>
                <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                  <div className="divide-y divide-slate-200">
                    {details.map((detail, index) => (
                      <div
                        key={index}
                        className="grid md:grid-cols-3 gap-4 p-4 hover:bg-slate-50 transition-colors"
                      >
                        <div className="md:col-span-1">
                          <dt className="text-sm font-semibold text-slate-900">
                            {detail.label}
                          </dt>
                        </div>
                        <div className="md:col-span-2">
                          <dd className="text-sm text-slate-700 leading-relaxed">
                            {detail.value}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
        </section>
      )}

      {/* Examples Section */}
      {examples.length > 0 && (
        <section id="examples" className="scroll-mt-20">
          <ExamplesCarousel examples={examples} title="Examples" />
        </section>
      )}

      {/* Technologies Section */}
      {technologies.length > 0 && (
        <section id="technologies" className="scroll-mt-20">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Related Technologies
              </h2>
              <p className="text-sm text-slate-600">
                Technologies commonly used with this application
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section id="contact" className="scroll-mt-20">
        <ContactCTA context={subApp.name} contextType="subApplication" />
      </section>
    </div>
  );
}
