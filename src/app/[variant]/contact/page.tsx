import type { Metadata } from "next";
import {
  ContactPage,
  resolveEnquiryContext,
} from "@/components/pages/ContactPage";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Talk to an engineer",
  description:
    "Speak to the engineers who design and build ONEX RF systems.",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: VariantParams;
  searchParams: Promise<{
    product?: string;
    application?: string;
    material?: string;
    technology?: string;
  }>;
}) {
  const { variant } = await params;
  const query = await searchParams;
  return (
    <ContactPage
      context={resolveEnquiryContext(query)}
      config={resolveConfig(variant)}
      mode="contact"
    />
  );
}
