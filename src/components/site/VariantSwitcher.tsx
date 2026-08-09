import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { SITES, type SiteVariant } from "@/lib/site-config";

/**
 * Review-only control for flipping between the two site variants.
 *
 * Anchored bottom-right rather than bottom-centre so it never sits on top of a
 * page's primary call to action. Both trees are noindex while the comparison
 * runs; when one variant is promoted this component and the other tree go away.
 */
export function VariantSwitcher({ current }: { current: SiteVariant }) {
  const other = current === "outcome" ? SITES.capability : SITES.outcome;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-end px-4 lg:px-8">
      <Link
        href={other.basePath}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised/95 py-2 pl-3 pr-4 text-xs shadow-lg backdrop-blur transition-colors hover:border-border-control-accent"
      >
        <ArrowLeftRight
          aria-hidden="true"
          className="size-3.5 shrink-0 text-accent"
        />
        <span className="text-text-muted">
          Viewing{" "}
          <span className="font-semibold text-text">{SITES[current].name}</span>
          <span className="hidden sm:inline"> — switch to {other.name}</span>
        </span>
      </Link>
    </div>
  );
}
