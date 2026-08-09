"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { COMPANY, sitePath, type SiteConfig } from "@/lib/site-config";

/**
 * Shell navigation, driven entirely by the site config, so both variants share
 * one implementation.
 *
 * Follows the W3C disclosure-navigation pattern: a top-level item that owns a
 * panel is a button (not a link), the panel's first entry is the overview page,
 * Escape closes and restores focus, and pointer users also get hover-to-open.
 */
export function SiteHeader({ config }: { config: SiteConfig }) {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Any navigation closes everything. Adjusting state during render rather than
  // in an effect avoids the cascading re-render an effect would cause here.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenIndex(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenIndex(null);
      setMobileOpen(false);
    }
    function onPointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenIndex(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  function openPanel(index: number) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIndex(index);
  }

  // A short grace period stops the panel flickering shut as the pointer
  // crosses the gap between the trigger and the panel.
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  }

  const isActive = (href: string) => {
    const full = sitePath(config, href);
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface-raised/90 backdrop-blur supports-[backdrop-filter]:bg-surface-raised/75">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 lg:px-8">
        <Link
          href={config.basePath}
          className="shrink-0 text-lg font-bold tracking-tight text-text-heading"
        >
          {COMPANY.name}
        </Link>

        {/* --- desktop nav --- */}
        <div ref={navRef} className="hidden flex-1 lg:flex lg:items-center">
          <nav aria-label="Main" className="flex items-center gap-1">
            {config.nav.map((item, index) => {
              const active = isActive(item.href);
              const panelId = `nav-panel-${index}`;

              if (!item.groups?.length) {
                return (
                  <Link
                    key={item.label}
                    href={sitePath(config, item.href)}
                    aria-current={active ? "page" : undefined}
                    className={`whitespace-nowrap rounded-md px-2.5 py-2 text-[0.875rem] font-medium transition-colors ${
                      active
                        ? "text-text-link"
                        : "text-text hover:text-text-link"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openPanel(index)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={openIndex === index}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className={`flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[0.875rem] font-medium transition-colors ${
                      active || openIndex === index
                        ? "text-text-link"
                        : "text-text hover:text-text-link"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-3.5 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openIndex === index && (
                    <div
                      id={panelId}
                      className="absolute left-0 top-full z-50 pt-2"
                      onMouseEnter={() => openPanel(index)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="w-max min-w-[19rem] max-w-2xl rounded-xl border border-border-subtle bg-surface-raised p-2 shadow-lg">
                        <Link
                          href={sitePath(config, item.href)}
                          className="mb-1 block rounded-lg px-3 py-2 text-sm font-semibold text-text-link hover:bg-surface-accent"
                        >
                          {item.label} overview
                        </Link>

                        <div
                          className={
                            item.groups.length > 1
                              ? "grid grid-cols-2 gap-x-2"
                              : ""
                          }
                        >
                          {item.groups.map((group, gi) => (
                            <div key={group.heading ?? gi} className="p-1">
                              {group.heading && (
                                <p className="eyebrow px-3 pb-1 pt-2">
                                  {group.heading}
                                </p>
                              )}
                              <ul>
                                {group.items.map((child) => (
                                  <li key={child.href + child.label}>
                                    <Link
                                      href={sitePath(config, child.href)}
                                      className="block rounded-lg px-3 py-2 hover:bg-surface-accent"
                                    >
                                      <span className="block text-sm font-medium text-text">
                                        {child.label}
                                      </span>
                                      {child.description && (
                                        <span className="mt-0.5 block text-xs text-text-muted">
                                          {child.description}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3 pl-3">
            <a
              href={COMPANY.phoneHref}
              className="hidden whitespace-nowrap text-[0.875rem] font-medium text-text-muted hover:text-text-link 2xl:inline"
            >
              {COMPANY.phone}
            </a>
            <Link
              href={sitePath(config, config.cta.href)}
              className="whitespace-nowrap rounded-lg bg-action px-4 py-2 text-[0.875rem] font-semibold text-text-on-accent transition-colors hover:bg-action-hover"
            >
              {config.cta.label}
            </Link>
          </div>
        </div>

        {/* --- mobile trigger --- */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="ml-auto inline-flex size-11 items-center justify-center rounded-lg border border-border text-text lg:hidden"
        >
          <span className="sr-only">
            {mobileOpen ? "Close menu" : "Open menu"}
          </span>
          {mobileOpen ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>

      {/* --- mobile panel --- */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t border-border-subtle bg-surface-raised lg:hidden"
        >
          <nav aria-label="Main" className="mx-auto max-w-7xl px-4 py-4">
            <ul className="divide-y divide-border-subtle">
              {config.nav.map((item) => (
                <li key={item.label} className="py-3">
                  <Link
                    href={sitePath(config, item.href)}
                    className="block py-1 text-base font-semibold text-text-heading"
                  >
                    {item.label}
                  </Link>
                  {item.groups?.map((group, gi) => (
                    <ul key={group.heading ?? gi} className="mt-1 space-y-0.5">
                      {group.items.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={sitePath(config, child.href)}
                            className="block py-2 text-sm text-text-muted"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href={sitePath(config, config.cta.href)}
                className="rounded-lg bg-action px-4 py-3 text-center text-sm font-semibold text-text-on-accent"
              >
                {config.cta.label}
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="text-center text-sm font-medium text-text-link"
              >
                {COMPANY.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
