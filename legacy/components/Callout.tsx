type CalloutProps = {
  title: string;
  body: string;
};

export function Callout({ title, body }: CalloutProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      <p className="mt-1 text-sm text-zinc-700">{body}</p>
    </div>
  );
}

