import type { Metadata } from "next";
import { fontBody, fontDisplay } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  // EDIT: swap in your real studio name, copy and domain.
  title: "Frederock — Independent Design Studio",
  description:
    "Hand-coded, conversion-focused landing pages and product UI. A teardown-led design studio available for select projects.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Frederock — Independent Design Studio",
    description:
      "Hand-coded, conversion-focused landing pages and product UI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable}`}
    >
      <body className="bg-base text-ink antialiased">{children}</body>
    </html>
  );
}
