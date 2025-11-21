import { getApplications } from "./applications";
import type { Application, SubApplication } from "./types";

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

// Repeat for tooling, materials, support if needed later
