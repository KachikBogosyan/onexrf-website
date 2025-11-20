// lib/applications.ts
import applicationsData from "@/data/applications.json";
import type { Application, SubApplication } from "./types";

const applications = applicationsData as Application[];

export function getApplications(): Application[] {
  return applications;
}

export function getApplicationBySlug(slug: string): Application | undefined {
  return applications.find((a) => a.slug === slug);
}

export function getSubApplicationBySlugs(
  appSlug: string,
  subSlug: string
): { application: Application; subApp: SubApplication } | undefined {
  const application = getApplicationBySlug(appSlug);
  if (!application || !application.sub_applications) return;
  const subApp = application.sub_applications.find((s) => s.slug === subSlug);
  if (!subApp) return;
  return { application, subApp };
}
