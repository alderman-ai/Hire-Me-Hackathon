import Link from "next/link";
import build from "@/content/build.json";
import { demoSlug, toolingDocSlug } from "./deliverables";

// "What's being built today": content/build.json. s-d9-legibility sends status updates; the
// feed post that shows this board moves to the top at each new as_of time. Each demo's name links
// to its page (/d1 to /d10); each tooling piece links to its spec (content/deliverables.json).

type Quote = { text: string; source: string };

function PullQuote({ quote }: { quote: Quote }) {
  return (
    <figure className="pull-quote">
      <blockquote>
        <p>&ldquo;{quote.text}&rdquo;</p>
      </blockquote>
      <figcaption>{quote.source}</figcaption>
    </figure>
  );
}

export default function StatusBoard() {
  const statusLabel = `Status at ${build.as_of}`;
  return (
    <div className="build">
      <p className="as-of">{build.as_of_line}</p>
      <p>{build.intro}</p>

      <h4>How it runs</h4>
      <ul className="how-it-runs">
        {build.how_it_runs.map((item) => (
          <li key={item.lead}>
            <strong>{item.lead}</strong> {item.text}
          </li>
        ))}
      </ul>

      <PullQuote quote={build.quotes.after_how_it_runs} />

      <h4>The tooling (first)</h4>
      <table className="build-table">
        <thead>
          <tr>
            <th scope="col">Piece</th>
            <th scope="col">What it does</th>
            <th scope="col">{statusLabel}</th>
          </tr>
        </thead>
        <tbody>
          {build.tooling.map((row) => {
            const doc = toolingDocSlug(row.piece);
            return (
              <tr key={row.piece}>
                <th scope="row" data-label="Piece">
                  {doc ? <Link href={`/docs/${doc}`}>{row.piece}</Link> : row.piece}
                </th>
                <td data-label="What it does">{row.what}</td>
                <td data-label={statusLabel} className="status">{row.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h4>The demos (then)</h4>
      <table className="build-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Demo</th>
            <th scope="col">What you&rsquo;ll see</th>
            <th scope="col">{statusLabel}</th>
          </tr>
        </thead>
        <tbody>
          {build.demos.map((row) => (
            <tr key={row.n}>
              <td data-label="#" className="num">{row.n}</td>
              <th scope="row" data-label="Demo">
                <Link href={`/${demoSlug(row.n)}`}>{row.demo}</Link>
              </th>
              <td data-label="What you'll see">{row.what}</td>
              <td data-label={statusLabel} className="status">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PullQuote quote={build.quotes.after_demos} />
    </div>
  );
}
