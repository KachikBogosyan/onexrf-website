import Link from "next/link";
import type { ReactNode } from "react";

type ComparisonRow = {
  capability: string | ReactNode;
  onexrf: string | ReactNode;
  competitors: string | ReactNode;
};

type ComparisonTableProps = {
  rows: ComparisonRow[];
  className?: string;
};

export function ComparisonTable({ rows, className = "" }: ComparisonTableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-slate-300">
            <th className="text-left py-3 px-4 font-semibold text-slate-900 bg-slate-50">
              Capability
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-900 bg-slate-50">
              ONEXRF
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-900 bg-slate-50">
              Competitors
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium text-slate-900">
                {typeof row.capability === "string" ? row.capability : row.capability}
              </td>
              <td className="py-3 px-4 text-slate-700">{row.onexrf}</td>
              <td className="py-3 px-4 text-slate-600">{row.competitors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

