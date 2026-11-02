import Link from "next/link";

/**
 * The new site's crumb (VERDICT.md 2.3): "Articles › <group>". Both are working labels until alex-voice
 * words them. Styled as the old "← back" line (article.css .art-back).
 */
export function Crumb({ group }: { group?: string }) {
  return (
    <nav className="art-back entry-crumb" aria-label="Breadcrumb">
      <Link href="/demos">Articles</Link>
      {group && (
        <>
          <span className="entry-crumb-sep" aria-hidden="true">
            {" › "}
          </span>
          <span>{group}</span>
        </>
      )}
    </nav>
  );
}

/** The group /d1, /d2 and the capability pieces sit in. */
export const REACH_GROUP = "How I'd reach your accounts";
