import { redirect } from "next/navigation";
import type { VariantParams } from "@/lib/variant";

// History lives as a section of the About page rather than as its own thin
// page. Kept as a route because the footer and the old site both link to it.
export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  redirect(`/${variant}/company`);
}
