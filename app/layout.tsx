import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub README Generator",
  description: "Customize and generate your GitHub profile README",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen w-full">{children}</body>
    </html>
  );
}
