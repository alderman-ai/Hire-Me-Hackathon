import storyJson from "@/content/story.json";

// "The story so far": content/story.json, sent by s-d9-legibility. Later posts add entries at the bottom.

type Block = {
  type: string; // "p", "quote" or "highlight"
  text?: string;
  source?: string;
  href?: string;
  note?: string;
  title?: string;
  blocks?: Block[];
};

type Entry = { time: string; session?: string; title: string; blocks: Block[] };

const story: { headline: string; intro: string; entries: Entry[] } = storyJson;

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "quote") {
          return (
            <figure key={i} className="tl-quote">
              <blockquote>
                <p>&ldquo;{block.text}&rdquo;</p>
              </blockquote>
              <figcaption>
                {block.source}
                {block.href && (
                  <>
                    {" · "}
                    <a href={block.href} target="_blank" rel="noopener noreferrer">
                      Watch this moment
                    </a>
                  </>
                )}
                {block.note && <>. {block.note}</>}
              </figcaption>
            </figure>
          );
        }
        if (block.type === "highlight") {
          return (
            <div key={i} className="tl-highlight">
              <h4>{block.title}</h4>
              <Blocks blocks={block.blocks ?? []} />
            </div>
          );
        }
        return <p key={i}>{block.text}</p>;
      })}
    </>
  );
}

export default function Story() {
  return (
    <section className="story" aria-labelledby="story-heading">
      <h2 id="story-heading">{story.headline}</h2>
      <p className="story-intro">{story.intro}</p>
      <ol className="timeline">
        {story.entries.map((entry) => (
          <li key={`${entry.time}-${entry.title}`} className={entry.session ? "tl-entry" : "tl-entry tl-milestone"}>
            <p className="tl-meta">
              <time>{entry.time}</time>
              {entry.session && <> · {entry.session}</>}
            </p>
            <h3>{entry.title}</h3>
            <Blocks blocks={entry.blocks} />
          </li>
        ))}
      </ol>
    </section>
  );
}
