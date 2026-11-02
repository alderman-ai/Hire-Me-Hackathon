import Link from "next/link";
import docsIndex from "@/content/docs/index.json";
import Feed from "./feed";
import Countdown from "./live";

export default function Home() {
  return (
    <main className="page">
      <h1 className="title">The Hire Me Hackathon Begins</h1>
      <Countdown />
      <nav className="start-here" aria-label="Start here">
        <p className="start-here-lead">
          New here? <a href="#post-s02">Watch the 13-minute explainer</a>, then read the plan the agents work from:
        </p>
        <ul className="docs-list">
          {docsIndex.docs.map((doc) => (
            <li key={doc.slug}>
              <Link href={`/docs/${doc.slug}`}>{doc.label}</Link>
              <span>{doc.blurb}</span>
            </li>
          ))}
        </ul>
      </nav>
      <Feed />
    </main>
  );
}
