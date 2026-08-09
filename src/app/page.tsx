import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { COMPANY, SITES } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Choose a site direction",
  robots: { index: false, follow: false },
};

const COMPARISON = [
  {
    question: "What does the homepage open on?",
    outcome: "The customer's problem — long quotes, slow repairs, launch risk.",
    capability: "RF heating mastery, and the two technologies beneath it.",
  },
  {
    question: "How is the navigation organised?",
    outcome: "By the job the buyer is trying to do.",
    capability: "By what ONEX builds and how it is engineered.",
  },
  {
    question: "How are machines reached?",
    outcome: "Through the outcome they serve.",
    capability: "Directly, as a top-level category.",
  },
  {
    question: "Where does welding sit?",
    outcome: "Inside every outcome, alongside forming.",
    capability: "A top-level family, level with forming.",
  },
  {
    question: "What is the risk?",
    outcome:
      "Softer match for buyers searching a specific machine term on Google.",
    capability:
      "Repeats the current pattern — leads with the machine, not the result.",
  },
];

export default function ChooserPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8 lg:py-24">
      <p className="eyebrow">{COMPANY.name} — website rebuild</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        Two directions for the same company
      </h1>
      <p className="prose-measure mt-5 text-lg text-text-muted">
        Both sites are built from the same data, the same components and the
        same design system. They differ only in how the company is framed. Open
        each, then pick one — the winner is promoted to the root domain and the
        other is deleted.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {(["outcome", "capability"] as const).map((variant) => {
          const site = SITES[variant];
          return (
            <Link
              key={variant}
              href={site.basePath}
              className="group flex flex-col rounded-2xl border border-border bg-surface-raised p-7 transition-colors hover:border-border-control-accent"
            >
              <p className="eyebrow">Direction {variant === "outcome" ? "A" : "B"}</p>
              <h2 className="mt-2 text-2xl font-bold">{site.name}</h2>
              <p className="mt-3 flex-1 text-sm text-text-muted">
                {site.premise}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {site.nav.map((item) => (
                  <li
                    key={item.label}
                    className="rounded-md bg-surface-accent px-2 py-1 text-xs font-medium text-text-link"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-text-link">
                Open this version
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          );
        })}
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-bold">How they differ</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 font-semibold">
                  &nbsp;
                </th>
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Outcome-led
                </th>
                <th scope="col" className="py-3 font-semibold">
                  Capability-led
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr
                  key={row.question}
                  className="border-b border-border-subtle align-top"
                >
                  <th
                    scope="row"
                    className="py-4 pr-4 font-medium text-text-muted"
                  >
                    {row.question}
                  </th>
                  <td className="py-4 pr-4">{row.outcome}</td>
                  <td className="py-4">{row.capability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
