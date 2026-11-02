/** The YouTube watch link for a video id, at a start second. Plain function: usable from server and client components. */
export function watchUrl(id: string, start?: number) {
  return `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;
}
