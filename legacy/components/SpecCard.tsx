type SpecCardProps = {
  title: string;
  value: string;
  detail: string;
};

export function SpecCard({ title, value, detail }: SpecCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="text-3xl font-semibold tracking-tight">{title}</div>
      <div className="mt-2 text-sm font-semibold text-zinc-900">{value}</div>
      <div className="mt-2 text-sm text-zinc-700">{detail}</div>
    </div>
  );
}

