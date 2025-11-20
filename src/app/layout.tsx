// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "ONEX RF",
  description: "Application-led catheter manufacturing solutions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              ONEX RF
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/applications" className="hover:underline">
                Applications
              </Link>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
              <Link href="/materials" className="hover:underline">
                Materials
              </Link>
              <Link href="/tooling" className="hover:underline">
                Tooling
              </Link>
              <Link href="/support" className="hover:underline">
                Support
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
        </main>

        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 flex justify-between">
            <span>© {new Date().getFullYear()} ONEX RF</span>
            <span>Application-led catheter manufacturing solutions</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
