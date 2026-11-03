"use client";

import { useEffect, useRef, useState } from "react";
import data from "@/content/timelapse.json";
import "./timelapse.css";

// Day 1's production deployments as an image sequence (public/timelapse/, built by
// scripts/build_timelapse.py). Words come from content/timelapse.json `words`; the page that
// places this component fills them in. No video file: it's plain images, swapped in order.

type Frame = { file: string; time: string; id: string };
const frames: Frame[] = data.frames;
const words: Record<string, string> = data.words;
const FPS = 3;

export default function Timelapse() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [near, setNear] = useState(false);
  const root = useRef<HTMLElement>(null);

  // Preload only once the section is close to the viewport.
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) return setNear(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!near) return;
    frames.forEach((f) => {
      const img = new Image();
      img.src = f.file;
    });
  }, [near]);

  // Never autoplays; the button starts it. At the end it stops.
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setI((n) => {
        if (n >= frames.length - 1) {
          setPlaying(false);
          return n;
        }
        return n + 1;
      });
    }, 1000 / FPS);
    return () => clearInterval(t);
  }, [playing]);

  if (frames.length === 0) return null;
  const f = frames[i];
  const toggle = () => {
    if (!playing && i >= frames.length - 1) setI(0);
    setPlaying((p) => !p);
  };

  return (
    <section ref={root} id="timelapse" className="tl on-dark" aria-labelledby="timelapse-heading">
      <div className="container">
        <h2 id="timelapse-heading" className="tl-heading">{words["timelapse.title"]}</h2>
        <p className="tl-intro">{words["timelapse.intro"]}</p>
        <figure className="tl-stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={f.file} alt={`The home page as deployed at ${f.time}`} width={960} height={600} />
        </figure>
        <div className="tl-controls">
          <button type="button" className="tl-btn" onClick={toggle} aria-pressed={playing}>
            {playing ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            className="tl-scrub"
            min={0}
            max={frames.length - 1}
            value={i}
            aria-label="Deployment"
            aria-valuetext={`${f.time}, deployment ${i + 1} of ${frames.length}`}
            onChange={(e) => {
              setPlaying(false);
              setI(Number(e.target.value));
            }}
          />
          <output className="tl-time" aria-live="off">
            <time>{f.time}</time>
            <span className="tl-id">{f.id}</span>
          </output>
        </div>
      </div>
    </section>
  );
}
