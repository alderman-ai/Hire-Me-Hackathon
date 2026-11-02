import Link from "next/link";
import docsIndex from "@/content/docs/index.json";
import Feed from "./feed";
import Countdown from "./live";
import { Reveal, RotateIn } from "./motion";
import { ArrowSwap } from "./site-chrome";
import { RecommendCarousel } from "./recommend-carousel";
import { LIST_SLUGS, RECOMMEND_ON, recommendFor } from "./recommend";

const PAGE_SLUGS = LIST_SLUGS.filter((s) => s !== "default");

// The home page, after addvery.com: their hero (the H1 slides in from the left, and the countdown
// and the "start here" box take the place of their two photo cards, rotating in from opposite
// corners on load), then the live feed.

export default function Home() {
  return (
    <main className="home">
      <section className="hero on-dark" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <Reveal variant="left" onLoad className="hero-text">
            <h1 id="hero-title" className="hero-title">
              The Hire Me Hackathon Begins
            </h1>
            <p className="hero-lead">
              A GTM engineer&rsquo;s skillset, built live in 12 hours by Alex Alderman, steering a team of AI agents.
            </p>
          </Reveal>
          <div className="hero-cards">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-circle" src="/addvery/hero-circle.webp" alt="" width={472} height={460} aria-hidden="true" />
            <RotateIn
              onLoad
              from="bottom-left"
              angle={-10}
              duration={800}
              fade={600}
              delay={500}
              className="hero-card hero-card-clock"
            >
              <Countdown />
            </RotateIn>
            <RotateIn
              onLoad
              from="bottom-right"
              angle={8}
              duration={700}
              fade={600}
              delay={1000}
              className="hero-card hero-card-start"
            >
              <nav className="start-here" aria-label="Start here">
                <p className="eyebrow">Start here</p>
                <p className="start-here-lead">
                  New here? <Link href="/#s02">Watch the 13-minute explainer</Link>, then read the plan the agents work
                  from:
                </p>
                <ul className="docs-list">
                  {docsIndex.docs.map((doc) => (
                    <li key={doc.slug}>
                      <Link href={`/docs/${doc.slug}`} className="doc-link">
                        <span className="doc-link-label">
                          {doc.label}
                          <ArrowSwap />
                        </span>
                        <span className="doc-link-blurb">{doc.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </RotateIn>
          </div>
        </div>
      </section>
      {RECOMMEND_ON && (
        // The interim home (VERDICT.md W7): the default list above the feed. The heading is a working
        // label until alex-voice words it.
        <RecommendCarousel heading="Recommended for you" cards={recommendFor("default")} people={PAGE_SLUGS} />
      )}
      <Feed />
    </main>
  );
}
