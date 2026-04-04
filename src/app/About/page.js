"use client";

import "./About.css";
import { useEffect, useRef, useState } from "react";

import KnowUsNav      from "./components/KnowUsNav";
import HeroSection    from "./components/HeroSection";
import StoryIntro     from "./components/StoryIntro";
import StatsSection   from "./components/StatsSection";
import ValuesSection  from "./components/ValuesSection";
import TimelineSection from "./components/TimelineSection";
import MediaSection   from "./components/MediaSection";
import PromiseSection from "./components/PromiseSection";

/* ══════════════════════════════════
   ABOUT PAGE
   — All sections imported from /components
   — Each section has its own .js + .css file
   — To edit any section: open its component file
══════════════════════════════════ */
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("About Us");

  /* One ref per tab section */
  const aboutRef   = useRef(null);
  const storyRef   = useRef(null);
  const mediaRef   = useRef(null);

  const sectionMap = {
    "About Us":  aboutRef,
    "Our Story": storyRef,
    "Media":     mediaRef,
  };

  /* Click on tab → smooth scroll */
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    sectionMap[tab]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Scroll → auto-highlight active tab */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.section;
            if (id) setActiveTab(id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    [
      [aboutRef,  "About Us"],
      [storyRef,  "Our Story"],
      [mediaRef,  "Media"],
    ].forEach(([ref, key]) => {
      if (ref.current) {
        ref.current.dataset.section = key;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about">

      {/* Floating background emojis */}
      <div className="about__bg-deco deco1">🌸</div>
      <div className="about__bg-deco deco2">🍰</div>
      <div className="about__bg-deco deco3">✨</div>
      <div className="about__bg-deco deco4">🎀</div>

      {/* ── Sticky Tab Navigation ── */}
      

      {/* ══════════════════
          ABOUT US TAB
      ══════════════════ */}
      <div ref={aboutRef}>
        <HeroSection />
        <StoryIntro />
        <StatsSection />
        <ValuesSection />
      </div>
<KnowUsNav activeTab={activeTab} onTabClick={handleTabClick} />
      {/* ══════════════════
          OUR STORY TAB
      ══════════════════ */}
      <div ref={storyRef}>
        <TimelineSection />
      </div>

      {/* ══════════════════
          MEDIA TAB
      ══════════════════ */}
      <div ref={mediaRef}>
        <MediaSection />
      </div>

      {/* ── Shared Closing Section ── */}
      <PromiseSection />

    </div>
  );
}

