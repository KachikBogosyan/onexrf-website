import type { ReactNode } from "react";

type FeatureListProps = {
  features: (string | ReactNode)[];
  className?: string;
  title?: string;
};

export function FeatureList({ features, className = "", title }: FeatureListProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-base font-semibold text-slate-900 mb-3">{title}</h3>
      )}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
            <span className="text-sm text-slate-700 flex-1">
              {typeof feature === "string" ? feature : feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

