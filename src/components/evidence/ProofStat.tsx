import type { ReactNode } from "react";

export type ProofStatProps = {
  /** The number itself, e.g. "2 weeks" or "90%". */
  value: string;
  /** What the number measures. */
  label: string;
  /**
   * Where the number comes from. REQUIRED — this is the whole point of the
   * component. The scoping note's fourth finding is that ONEX's proof lives as
   * claims rather than evidence ("90% less die damage", "99.9% OEE"), with
   * nothing a buyer can forward. An unsourced figure must not render.
   */
  source: string;
  /** Set while the figure is awaiting sign-off; renders visibly unverified. */
  unverified?: boolean;
  children?: ReactNode;
};

export function ProofStat({
  value,
  label,
  source,
  unverified = false,
  children,
}: ProofStatProps) {
  // Fail loudly in development rather than shipping a bare claim.
  if (!source?.trim()) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(
        `<ProofStat value="${value}"> is missing a source. Every published ` +
          `number needs one — see the scoping note, finding 4.`
      );
    }
    return null;
  }

  return (
    <div
      data-proof-stat
      data-unverified={unverified ? "true" : "false"}
      className={`rounded-2xl border p-6 ${
        unverified
          ? "border-dashed border-warning-7 bg-warning-3"
          : "border-border bg-surface-raised"
      }`}
    >
      <p className="text-4xl font-bold tabular tracking-tight text-text-heading">
        {value}
      </p>
      <p className="mt-1 text-sm font-semibold text-text">{label}</p>
      {children && (
        <p className="mt-2 text-sm text-text-muted">{children}</p>
      )}
      <p
        className={`mt-4 border-t pt-3 text-xs ${
          unverified
            ? "border-warning-7 font-medium text-warning-11"
            : "border-border-subtle text-text-muted"
        }`}
      >
        {unverified ? "Unverified — " : "Source: "}
        {source}
      </p>
    </div>
  );
}
