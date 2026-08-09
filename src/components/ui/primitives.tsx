import Link from "next/link";
import type { ComponentProps, ElementType, ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Layout
   ------------------------------------------------------------------------- */

export function Container({
  children,
  size = "default",
  className = "",
}: {
  children: ReactNode;
  size?: "narrow" | "default" | "wide";
  className?: string;
}) {
  const width = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  }[size];
  return (
    <div className={`mx-auto w-full ${width} px-4 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  tone = "default",
  className = "",
  id,
}: {
  children: ReactNode;
  /** `inverse` is the dark band used to separate major movements on a page. */
  tone?: "default" | "sunken" | "accent" | "inverse";
  className?: string;
  id?: string;
}) {
  const tones = {
    default: "bg-surface",
    sunken: "bg-surface-sunken",
    accent: "bg-surface-accent",
    inverse: "bg-surface-inverse text-text-on-inverse",
  }[tone];

  return (
    <section
      id={id}
      className={`py-16 lg:py-24 ${tones} ${id ? "scroll-mt-20" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Type
   ------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  as: As = "h2",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: ElementType;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <As className="mt-2 text-3xl font-bold tracking-tight">{title}</As>
      {lede && (
        <p
          className={`prose-measure mt-4 text-lg text-text-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Actions
   ------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  // --action (brand-10) is used rather than the brand anchor because it is the
  // step dark enough to carry a white label at 4.5:1. See globals.css.
  primary:
    "bg-action text-text-on-accent hover:bg-action-hover border border-transparent",
  secondary:
    "bg-surface-raised text-text-link border border-border-control hover:bg-surface-accent",
  ghost:
    "bg-transparent text-text-link border border-transparent hover:bg-surface-accent",
  inverse:
    "bg-surface-raised text-text-link border border-transparent hover:bg-surface-accent",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "default" | "large";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const sizing =
    size === "large" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${sizing} ${BUTTON_STYLES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------------------
   Cards
   ------------------------------------------------------------------------- */

export function Card({
  children,
  href,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  tone?: "default" | "sunken";
}) {
  const base = `rounded-2xl border border-border p-6 ${
    tone === "sunken" ? "bg-surface-sunken" : "bg-surface-raised"
  } ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`group block transition-colors hover:border-border-control-accent ${base}`}
      >
        {children}
      </Link>
    );
  }
  return <div className={base}>{children}</div>;
}

/* ---------------------------------------------------------------------------
   Model / part numbers — codes, so they are set monospaced.
   ------------------------------------------------------------------------- */

export function PartNumber({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`part-number ${className}`}>{children}</span>;
}
