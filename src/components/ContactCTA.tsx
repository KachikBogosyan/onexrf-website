import Link from "next/link";

type ContactCTAProps = {
  context?: string;
  contextType?: "product" | "application" | "subApplication" | "technology";
  label?: string;
};

export function ContactCTA({
  context,
  contextType = "product",
  label,
}: ContactCTAProps) {
  const getLabel = () => {
    if (label) return label;
    switch (contextType) {
      case "product":
        return "Contact ONEX About This Machine";
      case "application":
        return "Contact ONEX About This Application";
      case "subApplication":
        return "Contact ONEX About This Application";
      case "technology":
        return "Contact ONEX About This Technology";
      default:
        return "Contact ONEX";
    }
  };

  const queryParam =
    contextType === "product"
      ? `product=${encodeURIComponent(context || "")}`
      : contextType === "application"
        ? `application=${encodeURIComponent(context || "")}`
        : contextType === "subApplication"
          ? `subApplication=${encodeURIComponent(context || "")}`
          : `technology=${encodeURIComponent(context || "")}`;

  return (
    <section id="contact" className="border-t pt-6">
      <h3 className="font-semibold text-slate-800 text-sm mb-1">
        Discuss your catheter needs
      </h3>
      <p className="text-xs text-slate-600 mb-2">
        Provide your catheter dimensions and material; we'll confirm if this
        equipment is suitable.
      </p>
      <Link
        href={`/contact?${queryParam}`}
        className="inline-block border border-blue-600 px-3 py-1.5 text-xs text-blue-600 rounded hover:bg-blue-50"
      >
        {getLabel()}
      </Link>
    </section>
  );
}

