"use client";

import Image from "next/image";
import { Example } from "@/lib/examples";

type Props = {
  example: Example;
  onClick: () => void;
};

export function ExampleCard({ example, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow p-3"
    >
      <div className="relative h-40 w-full overflow-hidden rounded">
        <Image
          src={example.images[0]}
          alt={example.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-semibold group-hover:text-blue-600">
          {example.title}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2">
          {example.description}
        </p>
      </div>
    </button>
  );
}
