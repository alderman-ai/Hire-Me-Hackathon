import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Feed from "../feed";
import { NEW_SITE } from "../flags";
import { t } from "../copy";

// /log (VERDICT.md 2.2): Day 1's feed as it happened, moved off the home page, without the status
// board. The build strip's button opens it (app/hack-strip.tsx). Only the new site has it; any other
// build answers 404 here.

export const metadata: Metadata = {
  title: "Day 1 · Hire Me Hackathon",
  description: "Day 1 of the Hire Me Hackathon as it happened, newest on top.",
};

export default function LogPage() {
  if (!NEW_SITE) notFound();
  return (
    <main className="home log">
      <Feed hideStatus asPage head={{ title: t("log.intro.title"), body: t("log.intro.body") }} />
    </main>
  );
}
