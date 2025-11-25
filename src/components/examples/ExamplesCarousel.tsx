"use client";

import { useState } from "react";
import { Example } from "@/lib/examples";
import { ExampleCard } from "./ExampleCard";
import { ExampleModal } from "./ExampleModal";

type Props = {
  examples: Example[];
  title?: string;
};

export function ExamplesCarousel({ examples, title = "Examples" }: Props) {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);

  if (examples.length === 0) return null;

  return (
    <>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {examples.map((example) => (
            <ExampleCard
              key={example.slug}
              example={example}
              onClick={() => {
                // If example has a blog_post, navigate to it
                if (example.blog_post) {
                  window.location.href = `/blog/${example.blog_post}`;
                } else {
                  // Otherwise, open modal
                  setSelectedExample(example);
                }
              }}
            />
          ))}
        </div>
      </section>

      <ExampleModal
        example={selectedExample}
        onClose={() => setSelectedExample(null)}
      />
    </>
  );
}
