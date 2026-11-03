import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Feed from "../feed";
import { NEW_SITE } from "../flags";
import { t } from "../copy";
import { Highlights } from "./highlights";
import Timelapse from "./timelapse";

// /log: Day 1's page (3 Nov, Alex: "Have the highlight portion on top ... then the second link on the
// hackathon menu goes to the feed"). In order: the page's intro (its one h1), the highlights
// (app/log/highlights.tsx, #highlights), the deployments time-lapse (app/log/timelapse.tsx, #timelapse;
// it renders nothing until it has frames), then the feed as compact rows (#feed). The hackathon menu bar
// links to each section. Only the new site has this page; any other build answers 404 here.

export const metadata: Metadata = {
  title: "Day 1 · Hire Me Hackathon",
  description: "Day 1 of the Hire Me Hackathon as it happened, newest on top.",
};

export default function LogPage() {
  if (!NEW_SITE) notFound();
  return (
    <main className="home log">
      <section className="feed-head on-dark log-intro" aria-labelledby="log-title">
        <div className="container">
          <h1 id="log-title" className="feed-heading">
            {t("log.intro.title")}
          </h1>
          <p className="feed-intro">{t("log.intro.body")}</p>
        </div>
      </section>
      <Highlights />
      <Timelapse />
      <Feed hideStatus asPage section head={{ title: t("log.feed.title"), body: "" }} />
    </main>
  );
}
