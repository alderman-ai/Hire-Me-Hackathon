import { redirect } from "next/navigation";
import docsIndex from "@/content/docs/index.json";

// The charter and the specs are internal working documents: they are not shown on the site.
export const dynamicParams = false;

export function generateStaticParams() {
  return docsIndex.docs.map((d) => ({ slug: d.slug }));
}

export default function Page() {
  redirect("/");
}
