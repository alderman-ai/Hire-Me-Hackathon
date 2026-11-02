import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE = "https://hire-me-hackathon.vercel.app";
const DESCRIPTION = "A GTM engineer's skillset, built live in 12 hours by Alex Alderman, steering a team of AI agents.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Hire Me Hackathon",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Hire Me Hackathon",
    title: "The Hire Me Hackathon",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hire Me Hackathon",
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
