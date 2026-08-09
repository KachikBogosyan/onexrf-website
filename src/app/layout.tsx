import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { organizationSchema } from "@/lib/seo";

/* Inter carries the whole UI — weight and size give the hierarchy, so a second
   display face would only cost load time. Plex Mono is reserved for model and
   part numbers (CTF-807-LX1), which are codes and read better monospaced. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onexrf.com"),
  title: {
    default: "ONEX RF — RF heating for medical device manufacturing",
    template: "%s | ONEX RF",
  },
  description:
    "Vertically integrated RF welding, catheter forming and automation systems, built and supported by the engineers who design them.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-surface text-text antialiased">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-action focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-text-on-accent"
        >
          Skip to content
        </a>
        {children}
        {/* Organization schema sits once at the root; page-level Product and
            Article schema is added by the templates that need it. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
      </body>
    </html>
  );
}
