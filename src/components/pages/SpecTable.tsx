import { resolveSpecValue, type Product } from "@/lib/products";
import { Placeholder } from "@/components/Placeholder";

/** Turn `rf_seal_area` into `RF seal area`, keeping RF capitalised. */
function humanise(key: string): string {
  const words = key.split("_");
  return words
    .map((word, i) => {
      const upper = word.toUpperCase();
      if (["RF", "IQ", "OQ", "DOE", "FAI", "CE", "UL"].includes(upper)) {
        return upper;
      }
      return i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join(" ");
}

export function SpecTable({ product }: { product: Product }) {
  const specs = product.specs_short ?? {};
  const rows = Object.entries(specs).filter(([, v]) => v);

  if (product.specs_status === "needs_data" || rows.length <= 3) {
    return (
      <div className="space-y-4">
        {rows.length > 0 && <SpecRows rows={rows} product={product} />}
        <Placeholder title={`Specification data for ${product.name}`} blocking>
          This model was migrated from onexrf.com with only its identifying
          detail — model number, configuration and seal area. Publishing
          invented performance figures on a medical device site is not an option,
          so the table stays partial until ONEX supplies the real values:
          {product.needs?.length ? (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {product.needs.map((need) => (
                <li key={need}>{need}</li>
              ))}
            </ul>
          ) : null}
        </Placeholder>
      </div>
    );
  }

  return <SpecRows rows={rows} product={product} />;
}

function SpecRows({
  rows,
  product,
}: {
  rows: [string, string][];
  product: Product;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Specifications for {product.name}
        </caption>
        <tbody>
          {rows.map(([key, value], i) => (
            <tr
              key={key}
              className={i % 2 ? "bg-surface-sunken" : "bg-surface-raised"}
            >
              <th
                scope="row"
                className="w-2/5 px-4 py-3 align-top font-medium text-text-muted"
              >
                {humanise(key)}
              </th>
              <td className="px-4 py-3 align-top tabular">
                {resolveSpecValue(value, product.specs_long)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
