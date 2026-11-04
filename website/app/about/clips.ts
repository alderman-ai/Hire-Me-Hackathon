// The clips on /about (NEW_SITE). Ids and times are the mockup's (orchestration\local\mockups\best\about.html);
// the words under each are Alex's own, from the session video. Where a time differs from
// legibility\cards\cards.json, the mockup wins.

export type AboutClip = {
  still: string;
  youtube: string;
  start?: number;
  end?: number;
  length: string;
  /** What he said, verbatim, quotation marks included. */
  quote: string;
  meta: string;
};

export const CLIP_S12_M: AboutClip = {
  still: "/videos/S12-m.webp",
  youtube: "lo486cSVBcM",
  start: 1657,
  end: 1692,
  length: "0:34",
  quote: '"gtm is kind of the role that lets companies keep their promise that um they\'re not just going to replace half their staff of robots"',
  meta: "Day 1, 18:01",
};

export const WORK_CLIPS: AboutClip[] = [
  { still: "/videos/S03-e.webp", youtube: "6Ynpp621fmY", length: "0:50", quote: '"the expensive movie actor they fly him out to the scene they shoot all of his scenes first"', meta: "Day 1, 11:36" },
  { still: "/videos/day1-3.webp", youtube: "S2NTaJHUmTM", length: "0:33", quote: '"I ended all sessions, including all the ones that handle the recording."', meta: "Day 1, 13:20" },
  { still: "/videos/S07-n.webp", youtube: "NULD_WteCRM", start: 2129, end: 2183, length: "0:53", quote: '"So I\'m gonna definitely turn off recording while I push pull all the secret keys over just in case"', meta: "Day 1, 14:11" },
  { still: "/videos/day1-5.webp", youtube: "0_OKP-0C6Xk", length: "0:53", quote: '"the bottleneck is always always always human"', meta: "Day 1, 16:58" },
  { still: "/videos/S03-i.webp", youtube: "M38hI3M3Heo", start: 1131, end: 1232, length: "1:40", quote: '"the third tribe is really it\'s entrepreneurs but a lot of entrepreneurs are marketers"', meta: "Day 1, 11:44" },
  { still: "/videos/S12-e.webp", youtube: "lo486cSVBcM", start: 538, end: 558, length: "0:19", quote: '"i\'m a bit of a rambly talker so like it\'s okay if there\'s a little bit of that in there"', meta: "Day 1, 17:43" },
];

/** The two photos under "How I work": alt text here, captions by site-copy key. */
export const ABOUT_PHOTOS: { src: string; width: number; height: number; alt: string; caption: "about.work.3" | "about.work.4" }[] = [
  {
    src: "/setup-2026-11-02.jpg",
    width: 2400,
    height: 1800,
    alt: "Alex's desk on build day: three monitors with terminal windows and a session video, a microphone and a red-backlit keyboard, two bright ring lights, and a grey office chair in front.",
    caption: "about.work.3",
  },
  {
    src: "/dog-walk-2026-11-02.jpg",
    width: 1200,
    height: 1600,
    alt: "A small brown and white wire-haired dog lying on the hallway floor by the door, with shoes, a school backpack, a scooter and a helmet behind him.",
    caption: "about.work.4",
  },
];
