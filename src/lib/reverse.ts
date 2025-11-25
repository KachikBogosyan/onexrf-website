import { getApplications } from "./applications";
import { getAllMaterials } from "./materials";
import type { Application, SubApplication } from "./types";
import type { Material } from "./materials";

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

// Repeat for tooling, support if needed later
