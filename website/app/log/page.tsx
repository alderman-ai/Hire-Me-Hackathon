import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Feed from "../feed";
import { NEW_SITE } from "../flags";

// /log (VERDICT.md 2.2): the day's feed as it happened, moved off the home page, without the status
// board. Only the new site has it; any other build answers 404 here.

export const metadata: Metadata = {
  title: "Live feed · Hire Me Hackathon",
  description: "The Hire Me Hackathon as it happened, newest on top.",
};

export default function LogPage() {
  if (!NEW_SITE) notFound();
  return (
    <main className="home log">
      <Feed hideStatus asPage />
    </main>
  );
}
