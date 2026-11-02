import build from "@/content/build.json";

// "What's being built today": content/build.json, sent by s-d9-legibility. Later posts update its statuses.

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

export default function BuildStatus() {
  const statusLabel = `Status at ${build.as_of}`;
  return (
    <section className="build" aria-labelledby="build-heading">
      <h2 id="build-heading">{build.headline}</h2>
      <p className="as-of">{build.as_of_line}</p>
      <p>{build.intro}</p>

      <h3>How it runs</h3>
      <ul className="how-it-runs">
        {build.how_it_runs.map((item) => (
          <li key={item.lead}>
            <strong>{item.lead}</strong> {item.text}
          </li>
        ))}
      </ul>

      <PullQuote quote={build.quotes.after_how_it_runs} />

      <h3>The tooling (first)</h3>
      <table className="build-table">
        <thead>
          <tr>
            <th scope="col">Piece</th>
            <th scope="col">What it does</th>
            <th scope="col">{statusLabel}</th>
          </tr>
        </thead>
        <tbody>
          {build.tooling.map((row) => (
            <tr key={row.piece}>
              <th scope="row" data-label="Piece">{row.piece}</th>
              <td data-label="What it does">{row.what}</td>
              <td data-label={statusLabel} className="status">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>The demos (then)</h3>
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
              <th scope="row" data-label="Demo">{row.demo}</th>
              <td data-label="What you'll see">{row.what}</td>
              <td data-label={statusLabel} className="status">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PullQuote quote={build.quotes.after_demos} />
    </section>
  );
}
