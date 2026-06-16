import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "TableBook | Malaysia's Restaurant Reservation Platform",
  description: "Discover and book tables at Malaysia's best restaurants — from nasi lemak warungs to Nyonya fine dining.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MY" className="h-full antialiased">
      <body className="min-h-full bg-[#F9FAFB] font-sans text-slate-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
