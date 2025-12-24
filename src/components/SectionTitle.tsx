type SectionTitleProps = {
  kicker: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ kicker, title, subtitle }: SectionTitleProps) {
  return (
    <div>
      <p className="text-sm font-semibold tracking-wide text-zinc-600">{kicker.toUpperCase()}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-3xl text-zinc-700">{subtitle}</p> : null}
    </div>
  );
}

