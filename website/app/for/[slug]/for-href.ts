/**
 * An internal link with ?for=<slug> added (a hash stays at the end): the same rule as `withFor` in
 * app/your-page.tsx, which is a client module and can't be called while a server component renders.
 */
export function forHref(href: string, slug: string | null): string {
  if (!slug || !href.startsWith("/")) return href;
  const [path, hash] = href.split("#");
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}for=${encodeURIComponent(slug)}${hash ? `#${hash}` : ""}`;
}
