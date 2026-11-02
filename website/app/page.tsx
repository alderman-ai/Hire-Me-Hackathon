import BuildStatus from "./build-status";
import Live from "./live";
import summary from "@/content/summary.json";
import videos from "@/content/videos.json";

// The session the page features, with its summary. content/summary.json names it.
const youtubeIds: Record<string, string | undefined> = videos;

export default function Home() {
  return (
    <main className="page">
      <h1 className="title">The Hire Me Hackathon Begins</h1>
      <Live
        featured={{
          session: summary.session,
          youtubeId: youtubeIds[summary.session] ?? null,
          startSeconds: summary.start_seconds,
        }}
      />
      {summary.headline && (
        <section className="summary">
          <h1 className="summary-headline">{summary.headline}</h1>
          {summary.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </section>
      )}
      <BuildStatus />
    </main>
  );
}
