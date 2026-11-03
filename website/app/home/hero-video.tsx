"use client";

/*
 * The home hero's film, "Keep the promise" (BUILD, 3 Nov). The poster still is the whole hero's background
 * on a desktop and a 16:9 frame above the words on a phone (app/home/home.css, "Hero"). One press swaps the
 * play button for the youtube-nocookie player in the same 16:9 box, so nothing moves and the words stay.
 * Nothing loads from YouTube before that press. Without JavaScript the play mark is a plain link to the film.
 */

import { useEffect, useRef, useState } from "react";
import { watchUrl } from "../best/yt";

const IFRAME_ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export type HeroVideoProps = {
  /** YouTube video id. */
  youtube: string;
  /** Site path of the poster still (decorative: the words beside it carry the meaning). */
  poster: string;
  /** The play button's accessible name. */
  playLabel: string;
  /** Added to the no-JavaScript link's name, e.g. "(YouTube, new tab)". */
  newTab: string;
  /** The player's title. */
  title: string;
  /** The small line in the frame's bottom-right corner. */
  tag: string;
};

export function HeroVideo({ youtube, poster, playLabel, newTab, title, tag }: HeroVideoProps) {
  const [enhanced, setEnhanced] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // Server HTML and the first client render match (a plain link); the button comes in after mount.
  useEffect(() => setEnhanced(true), []);
  // The button is gone once the player is in, so keyboard and screen-reader focus moves to the player.
  useEffect(() => {
    if (playing) playerRef.current?.focus({ preventScroll: true });
  }, [playing]);

  const mark = (
    <svg className="bh-promise-play-mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.3-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5z" />
    </svg>
  );

  let stage;
  if (playing) {
    stage = (
      <iframe
        ref={playerRef}
        className="bh-promise-player"
        src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0&playsinline=1`}
        title={title}
        allow={IFRAME_ALLOW}
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  } else if (enhanced) {
    stage = (
      <button type="button" className="bh-promise-play" aria-label={playLabel} onClick={() => setPlaying(true)}>
        {mark}
      </button>
    );
  } else {
    stage = (
      <a className="bh-promise-play" href={watchUrl(youtube)} target="_blank" rel="noopener noreferrer" aria-label={`${playLabel} ${newTab}`}>
        {mark}
      </a>
    );
  }

  return (
    <div className="bh-promise-media" data-playing={playing ? "" : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bh-promise-poster" src={poster} alt="" width={1920} height={1080} fetchPriority="high" decoding="async" />
      <span className="bh-promise-shade" aria-hidden="true" />
      <div className="bh-promise-stage">{stage}</div>
      <p className="bh-promise-tag" aria-hidden="true">
        {tag}
      </p>
    </div>
  );
}
