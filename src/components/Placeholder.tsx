import type { ReactNode } from "react";

export type PlaceholderKind = "content" | "image" | "video" | "logo" | "data";

export type PlaceholderProps = {
  /** Short label for what is missing, e.g. "Machine photography". */
  title: string;
  /** What ONEX needs to supply, and any format or sourcing constraints. */
  children?: ReactNode;
  kind?: PlaceholderKind;
  /** Blocks launch. Renders louder and is counted separately in the audit. */
  blocking?: boolean;
  /** Aspect ratio for image/video kinds, e.g. "16/9" or "4/3". */
  ratio?: string;
  /** Use `inverse` when the placeholder sits on a dark section. */
  tone?: "default" | "inverse";
  className?: string;
};

const KIND_LABEL: Record<PlaceholderKind, string> = {
  content: "Content needed",
  image: "Image needed",
  video: "Video needed",
  logo: "Brand asset needed",
  data: "Data needed",
};

/**
 * A deliberately visible stand-in for content ONEX has to provide.
 *
 * The point is that gaps are obvious during review rather than quietly empty.
 * Every instance carries `data-placeholder`, so `scripts/audit-placeholders.mjs`
 * can enumerate them into a content request list.
 */
export function Placeholder({
  title,
  children,
  kind = "content",
  blocking = false,
  ratio,
  tone = "default",
  className = "",
}: PlaceholderProps) {
  const isMedia = kind === "image" || kind === "video" || kind === "logo";
  const inverse = tone === "inverse";

  return (
    <div
      data-placeholder={kind}
      data-placeholder-title={title}
      data-placeholder-blocking={blocking ? "true" : "false"}
      role="note"
      aria-label={`Placeholder: ${title}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={[
        "relative flex flex-col justify-center gap-2 rounded-lg p-5",
        "border-2 border-dashed",
        inverse
          ? "border-white/30 bg-white/5"
          : blocking
            ? "border-warning-7 bg-warning-3"
            : "border-border-strong bg-surface-sunken",
        isMedia ? "items-center text-center" : "items-start",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "text-2xs font-semibold uppercase tracking-[0.09em]",
          inverse
            ? "text-accent"
            : blocking
              ? "text-warning-11"
              : "text-text-muted",
        ].join(" ")}
      >
        {blocking ? "Blocks launch" : KIND_LABEL[kind]}
      </span>

      <p
        className={`text-sm font-semibold ${inverse ? "text-white" : "text-text"}`}
      >
        {title}
      </p>

      {children ? (
        <div
          className={`prose-measure text-sm ${
            inverse
              ? "text-white/75 [&_a]:text-accent"
              : "text-text-muted [&_a]:text-text-link"
          } [&_a]:underline`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Media-shaped placeholder that keeps layout stable while the real asset is
 * missing, so pages do not reflow when photography lands.
 */
export function PlaceholderImage({
  title,
  ratio = "4/3",
  children,
  blocking = false,
  tone = "default",
  className = "",
}: Omit<PlaceholderProps, "kind">) {
  return (
    <Placeholder
      kind="image"
      title={title}
      ratio={ratio}
      blocking={blocking}
      tone={tone}
      className={className}
    >
      {children}
    </Placeholder>
  );
}
