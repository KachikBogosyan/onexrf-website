import Link from "next/link";
import { COMPANY, sitePath, type SiteConfig } from "@/lib/site-config";
import { Placeholder } from "@/components/Placeholder";

export function SiteFooter({ config }: { config: SiteConfig }) {
  return (
    <footer className="mt-24 border-t border-border-subtle bg-surface-sunken">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="text-lg font-bold tracking-tight text-text-heading">
              {COMPANY.name}
            </p>
            <p className="prose-measure mt-3 text-sm text-text-muted">
              RF heating for medical device manufacturing. Vertically
              integrated since {COMPANY.founded} — we design and build our own
              generators, controls and mechanics.
            </p>

            <address className="mt-6 space-y-1 text-sm not-italic text-text-muted">
              <p className="font-medium text-text">United States</p>
              <p>{COMPANY.street}</p>
              <p>
                {COMPANY.city}, {COMPANY.region} {COMPANY.postalCode},{" "}
                {COMPANY.country}
              </p>
              <p>
                <a
                  href={COMPANY.phoneHref}
                  className="text-text-link hover:underline"
                >
                  {COMPANY.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-text-link hover:underline"
                >
                  {COMPANY.email}
                </a>
              </p>
            </address>

            <Placeholder
              title="European address"
              className="mt-6 max-w-sm"
              blocking={false}
            >
              The scoping note proposes displaying an EU address now, at
              near-zero cost, ahead of any physical footprint. Confirm the
              Protomed Strasbourg arrangement and supply the legal entity name,
              street address and contact so it can be published here and in the
              Organization schema.
            </Placeholder>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {config.nav.slice(0, 3).map((item) => (
              <div key={item.label}>
                <p className="eyebrow">{item.label}</p>
                <ul className="mt-3 space-y-2">
                  {(item.groups ?? []).flatMap((g) => g.items).map((child) => (
                    <li key={child.href + child.label}>
                      <Link
                        href={sitePath(config, child.href)}
                        className="text-sm text-text-muted hover:text-text-link"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="eyebrow">Company</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href={sitePath(config, "/company")}
                    className="text-text-muted hover:text-text-link"
                  >
                    About ONEX RF
                  </Link>
                </li>
                <li>
                  <Link
                    href={sitePath(config, "/company/history")}
                    className="text-text-muted hover:text-text-link"
                  >
                    History
                  </Link>
                </li>
                <li>
                  <Link
                    href={sitePath(config, "/company/careers")}
                    className="text-text-muted hover:text-text-link"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href={sitePath(config, "/blog")}
                    className="text-text-muted hover:text-text-link"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Get in touch</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href={sitePath(config, "/quote")}
                    className="text-text-muted hover:text-text-link"
                  >
                    Request a quote
                  </Link>
                </li>
                <li>
                  <Link
                    href={sitePath(config, "/contact")}
                    className="text-text-muted hover:text-text-link"
                  >
                    Talk to an engineer
                  </Link>
                </li>
                <li>
                  <Link
                    href={sitePath(config, "/resources/downloads")}
                    className="text-text-muted hover:text-text-link"
                  >
                    Downloads
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow">Follow</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={COMPANY.social.linkedin}
                    className="text-text-muted hover:text-text-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={COMPANY.social.youtube}
                    className="text-text-muted hover:text-text-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-subtle pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link href={sitePath(config, "/legal/privacy")} className="hover:text-text-link">
              Privacy
            </Link>
            <Link href={sitePath(config, "/legal/terms")} className="hover:text-text-link">
              Terms
            </Link>
            <Link href={sitePath(config, "/legal/accessibility")} className="hover:text-text-link">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
