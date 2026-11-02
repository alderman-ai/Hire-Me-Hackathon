import quotes from "@/content/quotes.json";
import { VideoFrame, watchUrl } from "../../best/parts";
import "./lens.css";

// P4: one person's collection of Alex's own lines, in clock order (BUILD.md 6). The data is
// content/quotes.json (`lists[slug]`); the words are Alex's, exactly as transcribed or posted.
//
// An item is a camera moment { card, time, session, text, also?, youtube?, start?, end?, still?, len? }
// or a LinkedIn post { post_id, date, text, also?, url }. A moment with a `still` and a `len` also shows
// its clip (VideoFrame, no autoplay); one with only `youtube` is a time link; one with neither is plain
// text (S10 has no session upload). Colours come from the Band the list sits in.

export type MomentItem = {
  card: string;
  time: string;
  session: string;
  text: string;
  also?: string;
  youtube?: string;
  start?: number;
  end?: number;
  still?: string;
  len?: string;
};
export type PostItem = { post_id: string; date: string; text: string; also?: string; url: string };
export type QuoteItem = MomentItem | PostItem;

export type QuotesFile = {
  lists: Record<string, QuoteItem[]>;
  lens: Record<string, QuoteItem[]>;
  clips: Record<string, MomentItem>;
};

const file = quotes as unknown as QuotesFile;

/** The P4 list for a page. */
export function quotesFor(slug: string): QuoteItem[] {
  return file.lists[slug] ?? [];
}

/** The quote cards a page's P3 block uses (ceo's three). */
export function lensQuotes(slug: string): QuoteItem[] {
  return file.lens[slug] ?? [];
}

/** A single clip a lens block or /for plays: "S02-j", "S10-c", "S10-b", "S02-h", "S09-i". */
export function clipFor(card: string): MomentItem | undefined {
  return file.clips[card];
}

function isPost(i: QuoteItem): i is PostItem {
  return "post_id" in i;
}

/** The clip frame for a moment, or null when it has no still. */
export function ClipFrame({ item, size, caption, meta }: { item: MomentItem; size?: "sm" | "hero"; caption?: boolean; meta?: string }) {
  if (!item.youtube) return null;
  return (
    <VideoFrame
      youtube={item.youtube}
      start={item.start}
      end={item.end}
      still={item.still}
      length={item.len}
      size={size}
      label={`${item.session}, ${item.time}`}
      caption={caption ? item.text : undefined}
      meta={meta ?? (caption ? `${item.session}, ${item.time}` : undefined)}
    />
  );
}

export function QuoteCard({ item }: { item: QuoteItem }) {
  if (isPost(item)) {
    return (
      <li className="pq-card">
        <a className="pq-time" href={item.url} target="_blank" rel="noopener noreferrer">
          {item.date}
          <span className="pq-tag">LinkedIn</span>
          <span className="sr-only"> (LinkedIn, new tab)</span>
        </a>
        <blockquote>
          <p>{item.text}</p>
        </blockquote>
        {item.also && <p className="pq-src">{item.also}</p>}
      </li>
    );
  }
  const label = `${item.time} · ${item.session}`;
  return (
    <li className="pq-card">
      {item.youtube ? (
        <a className="pq-time" href={watchUrl(item.youtube, item.start)} target="_blank" rel="noopener noreferrer">
          {label}
          <span className="sr-only"> (YouTube, new tab)</span>
        </a>
      ) : (
        <span className="pq-time">{label}</span>
      )}
      <blockquote>
        <p>{item.text}</p>
      </blockquote>
      {item.also && <p className="pq-src">{item.also}</p>}
      {item.youtube && item.still && item.len && (
        <div className="pq-clip">
          <ClipFrame item={item} size="sm" />
        </div>
      )}
    </li>
  );
}

/** The list of cards. Put it inside a Band. */
export function QuoteCollection({ items }: { items: QuoteItem[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="pq-list">
      {items.map((item) => (
        <QuoteCard key={isPost(item) ? item.post_id + item.text : item.card + item.text} item={item} />
      ))}
    </ul>
  );
}

export { watchUrl };
