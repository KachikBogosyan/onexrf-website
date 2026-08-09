import type { Metadata } from "next";
import { TestimonialsPage } from "@/components/pages/Evidence";

export const metadata: Metadata = {
  title: "What customers say",
  description: "Attributed customer accounts of working with ONEX RF.",
};

export default function Page() {
  return <TestimonialsPage />;
}
