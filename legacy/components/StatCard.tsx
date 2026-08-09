type StatCardProps = {
  value: string;
  label: string;
  footnote?: string;
};

export function StatCard({ value, label, footnote }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-sm font-semibold text-zinc-900">{label}</div>
      {footnote ? <div className="mt-2 text-xs text-zinc-500">{footnote}</div> : null}
    </div>
  );
}

