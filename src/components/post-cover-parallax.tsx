"use client";

import { useEffect, useRef, useState } from "react";
import { PostArtwork } from "@/components/post-artwork";

const PARALLAX_DISTANCE = 120;
const PARALLAX_SPEED = 0.2;

export function PostCoverParallax({ cover }: { cover?: string }) {
  const frameRef = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    const updateOffset = () => {
      frameRef.current = null;
      setOffset(Math.min(window.scrollY * PARALLAX_SPEED, PARALLAX_DISTANCE));
    };

    const handleScroll = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      className="absolute inset-x-0 top-0 h-[130%] will-change-transform"
      style={{ transform: `translate3d(0, -${offset}px, 0)` }}
    >
      <PostArtwork
        cover={cover}
        className="h-full rounded-t-none rounded-b-none"
        sizes="100vw"
      />
    </div>
  );
}
