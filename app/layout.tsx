import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Who Around — Find Your People. Find Your Plans.",
  description: "Discover things happening around you and find people who want to do them with you.",
  keywords: ["social activities", "events", "meet people", "Nagpur", "plans", "friends", "activities"],
  authors: [{ name: "Who Around" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fbfbfd",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#f2f2f7] text-[#1d1d1f] antialiased selection:bg-orange-500/25 selection:text-orange-900">
        <div className="min-h-dvh flex flex-col justify-start items-center bg-[#f2f2f7]">
          {children}
        </div>
      </body>
    </html>
  );
}
