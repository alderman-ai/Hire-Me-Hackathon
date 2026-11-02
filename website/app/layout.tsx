import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hire Me Hackathon",
  description: "A GTM engineer's skillset, built live in 12 hours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
