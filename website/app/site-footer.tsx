import Link from "next/link";
import { allDemos } from "./deliverables";
import { NAV_LINKS, NEW_FOOTER_LINKS, newNavLinks } from "./site-links";
import { NEW_SITE, SKILLS_PAGE, VIDEO_WALL } from "./flags";
import "./best/footer-line.css";

// Addvery's footer (#151515, logo first, then columns of links that turn into gradient text on
// hover), with our links only.

export function SiteFooter() {
  // The new site drops the twelve demo links (VERDICT.md 2.7) and adds the log, the plan and the repo.
  const demos = NEW_SITE ? [] : allDemos();
  const half = Math.ceil(demos.length / 2);
  const columns = NEW_SITE ? [] : [demos.slice(0, half), demos.slice(half)];
  const links = NEW_SITE ? [...newNavLinks({ videos: VIDEO_WALL, skills: SKILLS_PAGE }), ...NEW_FOOTER_LINKS] : NAV_LINKS;
  return (
    <footer className="site-footer on-dark">
      <div className="footer-inner">
        <Link href="/" className="footer-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/addvery/addvery-logo-white-1080.png" alt="Addvery" width={139} height={53} />
          <span className="nav-divider" aria-hidden="true" />
          <span className="nav-site">Hire Me Hackathon</span>
        </Link>
        {NEW_SITE && <p className="footer-line">GTM engineers who focus AI on the pipeline are the ones helping companies keep their promise.</p>}
        <div className="footer-columns">
          <nav className="footer-col" aria-label="Site">
            <p className="footer-head">The project</p>
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="footer-link">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="footer-link">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <Link href="/privacy" className="footer-link footer-link-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/addvery/icon-check-circle.svg" alt="" width={17} height={17} />
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
          {columns.map((col, i) => (
            <nav key={i} className="footer-col" aria-label={i === 0 ? "Demos 1 to 5" : "Demos 6 to 10"}>
              <p className="footer-head">{i === 0 ? "The demos" : " "}</p>
              <ol start={col[0]?.n}>
                {col.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/${d.slug}`} className="footer-link">
                      <span className="footer-num">{d.n}</span>
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ))}
        </div>
        <p className="footer-credit">Built live by Alex Alderman, steering a team of AI agents.</p>
      </div>
    </footer>
  );
}
