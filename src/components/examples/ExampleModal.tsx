"use client";

import Image from "next/image";
import { Example } from "@/lib/examples";
import { X } from "lucide-react";

type Props = {
  example: Example | null;
  onClose: () => void;
};

export function ExampleModal({ example, onClose }: Props) {
  if (!example) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="relative max-w-3xl w-full bg-white rounded-lg p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-600 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          <div className="relative w-full h-80 rounded overflow-hidden">
            <Image
              src={example.images[0]}
              alt={example.title}
              fill
              className="object-contain bg-black/5"
            />
          </div>

          <h2 className="text-xl font-semibold">{example.title}</h2>

          <p className="text-sm text-slate-700">{example.description}</p>

          {example.metadata && (
            <div className="rounded border p-4 bg-slate-50">
              <h3 className="font-semibold text-sm mb-2">Example Details</h3>
              <ul className="text-xs text-slate-700 space-y-1">
                {Object.entries(example.metadata).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium">{key.replace(/_/g, " ")}:</span>{" "}
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {example.blog_post && (
            <a
              href={`/blog/${example.blog_post}`}
              className="inline-block text-blue-600 hover:underline text-sm"
            >
              View Related Case Study →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
