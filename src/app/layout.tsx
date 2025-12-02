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
            <div className="flex items-center gap-6">
              <nav className="flex gap-6 text-sm">
                <Link href="/applications" className="hover:underline">
                  Applications
                </Link>
                <Link href="/products" className="hover:underline">
                  Products
                </Link>
                <Link href="/tooling" className="hover:underline">
                  Tooling
                </Link>
                <Link href="/resources" className="hover:underline">
                  Resources
                </Link>
                <Link href="/support" className="hover:underline">
                  Support
                </Link>
              </nav>
              <Link
                href="/contact"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="w-full px-4 py-8">{children}</div>
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
