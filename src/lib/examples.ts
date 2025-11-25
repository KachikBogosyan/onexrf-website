import examplesData from "@/data/examples.json";

export type ExampleTooling = {
  die?: string | null;
  mandrel?: string | null;
};

export type ExampleMetadata = {
  [key: string]: string | number | null;
};

export type Example = {
  slug: string;
  title: string;
  description: string;
  images: string[];

  application: string;
  sub_application: string;

  material: string;
  product: string;

  tooling?: ExampleTooling;

  blog_post?: string | null;

  metadata?: ExampleMetadata;
};

const allExamples = examplesData as Example[];

// ------------------------------------------------------------
// Core Getters
// ------------------------------------------------------------

export function getAllExamples(): Example[] {
  return allExamples;
}

export function getExampleBySlug(slug: string): Example | undefined {
  return allExamples.find((e) => e.slug === slug);
}

// ------------------------------------------------------------
// Filtering Helpers (atomic)
// ------------------------------------------------------------

export function getExamplesByApplication(applicationSlug: string): Example[] {
  return allExamples.filter((e) => e.application === applicationSlug);
}

export function getExamplesBySubApplication(subSlug: string): Example[] {
  return allExamples.filter((e) => e.sub_application === subSlug);
}

export function getExamplesByProduct(productSlug: string): Example[] {
  return allExamples.filter((e) => e.product === productSlug);
}

export function getExamplesByMaterial(materialSlug: string): Example[] {
  return allExamples.filter((e) => e.material === materialSlug);
}

export function getExamplesByDie(dieSlug: string): Example[] {
  return allExamples.filter((e) => e.tooling?.die === dieSlug);
}

export function getExamplesByMandrel(mandrelSlug: string): Example[] {
  return allExamples.filter((e) => e.tooling?.mandrel === mandrelSlug);
}

// ------------------------------------------------------------
// Composite / Context-Aware Helpers
// ------------------------------------------------------------

export function getExamplesForApplicationPage(applicationSlug: string): Example[] {
  // examples tied to the top-level application
  return getExamplesByApplication(applicationSlug);
}

export function getExamplesForSubApplicationPage(
  appSlug: string,
  subAppSlug: string
): Example[] {
  // sub-app must match, application must match
  return allExamples.filter(
    (e) =>
      e.application === appSlug &&
      e.sub_application === subAppSlug
  );
}

export function getExamplesForMaterialPage(materialSlug: string): Example[] {
  return getExamplesByMaterial(materialSlug);
}

export function getExamplesForProductPage(productSlug: string): Example[] {
  return getExamplesByProduct(productSlug);
}

export function getExamplesForToolingPage(toolSlug: string): Example[] {
  return allExamples.filter(
    (e) =>
      e.tooling?.die === toolSlug ||
      e.tooling?.mandrel === toolSlug
  );
}
