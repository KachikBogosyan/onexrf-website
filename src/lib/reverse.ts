import { getApplications } from "./applications";
import { getAllMaterials } from "./materials";
import type { Application, SubApplication } from "./types";
import type { Material } from "./materials";
import type { Product } from "./products";
import { getProductBySlug } from "./products";
import { getAllTechnologies, type Technology } from "./technologies";

export function getApplicationsUsingProduct(productSlug: string) {
  const apps = getApplications();

  return apps.filter((app) =>
    app.related.products?.includes(productSlug)
  );
}

export function getSubApplicationsUsingProduct(productSlug: string) {
  const apps = getApplications();
  const results: {
    application: Application;
    subApp: SubApplication;
  }[] = [];

  for (const app of apps) {
    if (!app.sub_applications) continue;

    for (const sub of app.sub_applications) {
      if (sub.related?.products?.includes(productSlug)) {
        results.push({ application: app, subApp: sub });
      }
    }
  }

  return results;
}

export function getMaterialsUsingProduct(productSlug: string): Material[] {
  const materials = getAllMaterials();
  return materials.filter((material) =>
    material.related?.products?.includes(productSlug)
  );
}

export function getApplicationsUsingTechnology(technologySlug: string): Application[] {
  const apps = getApplications();
  const technologies = getAllTechnologies();
  const technology = technologies.find((t) => t.slug === technologySlug);
  
  // Check both directions:
  // 1. Applications that reference this technology
  // 2. Technology that references applications
  const appSlugsFromTech = technology?.related?.applications || [];
  
  return apps.filter((app) =>
    app.related.technologies?.includes(technologySlug) ||
    appSlugsFromTech.includes(app.slug)
  );
}

export function getProductsUsingTechnology(technologySlug: string): Product[] {
  const technologies = getAllTechnologies();
  const technology = technologies.find((t) => t.slug === technologySlug);
  
  if (!technology || !technology.related?.products) {
    return [];
  }

  return technology.related.products
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getTechnologiesForApplication(applicationSlug: string): Technology[] {
  const technologies = getAllTechnologies();
  const application = getApplications().find((app) => app.slug === applicationSlug);
  
  // Check both directions:
  // 1. Technologies that reference this application
  // 2. Application that references technologies
  const techSlugsFromApp = application?.related?.technologies || [];
  
  const result = technologies.filter((tech) =>
    techSlugsFromApp.includes(tech.slug) ||
    tech.related?.applications?.includes(applicationSlug)
  );
  
  return result;
}

export function getApplicationsUsingMaterial(materialSlug: string): Application[] {
  const apps = getApplications();
  const materials = getAllMaterials();
  const material = materials.find((m) => m.slug === materialSlug);
  
  // Check both directions:
  // 1. Applications that reference this material
  // 2. Material that references applications
  const appSlugsFromMaterial = material?.related?.applications || [];
  
  return apps.filter((app) =>
    app.related.materials?.includes(materialSlug) ||
    appSlugsFromMaterial.includes(app.slug)
  );
}

export function getProductsUsingMaterial(materialSlug: string): Product[] {
  const materials = getAllMaterials();
  const material = materials.find((m) => m.slug === materialSlug);
  
  if (!material || !material.related?.products) {
    return [];
  }

  return material.related.products
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

// Repeat for tooling, support if needed later
