import "./TimelineSection.css";
import Reveal from "./Reveal";

/* ── TimelineSection
   Vertical alternating timeline — Our Story.
   Edit TIMELINE array to add/remove milestones.
   side: "left" | "right" — alternates automatically.
   ─────────────────────────────────────── */

const TIMELINE = [
  {
    year: "2019",
    title: "A Kitchen Dream Begins",
    desc: "Tipsy Topsy was born in a small home kitchen in Lucknow. A passion project fuelled by butter, flour, and a whole lot of love.",
    side: "left",
  },
  {
    year: "2020",
    title: "First 100 Orders",
    desc: "Word spread through friends and family. We crossed 100 orders — entirely through Instagram DMs and WhatsApp!",
    side: "right",
  },
  {
    year: "2021",
    title: "Our First Studio",
    desc: "We moved into our first professional bakery studio, hired our first two bakers, and launched a proper online menu.",
    side: "left",
  },
  {
    year: "2022",
    title: "Wedding Season Special",
    desc: "Became the go-to cake brand for weddings and celebrations across Lucknow. 500+ celebration cakes in a single year.",
    side: "right",
  },
  {
    year: "2023",
    title: "Featured & Recognised",
    desc: "Featured in local press and food blogs. Received the Best Artisan Bakery recognition from Lucknow Food Awards.",
    side: "left",
  },
  {
    year: "2024",
    title: "5000+ Happy Families",
    desc: "Today, Tipsy Topsy has touched 5000+ homes with our cakes — and we are just getting started.",
    side: "right",
  },
];

export default function TimelineSection() {
  return (
    <section className="about__timeline-section">

      {/* ── Header — edit title here ── */}
      <Reveal className="about__timeline-header">
        <span className="about__section-label">Our Journey</span>
        <h2 className="about__timeline-title">
          Six Years of Sweet Milestones
        </h2>
      </Reveal>

      {/* ── Timeline Items ── */}
      <div className="about__timeline">
        {TIMELINE.map((item, i) => (
          <Reveal
            key={i}
            className={`about__tl-item ${item.side}`}
            dir={item.side}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            {/* Left content */}
            {item.side === "left" && (
              <div className="about__tl-content">
                <div className="about__tl-year">{item.year}</div>
                <h3 className="about__tl-title">{item.title}</h3>
                <p className="about__tl-desc">{item.desc}</p>
              </div>
            )}

            {/* Center dot */}
            <div className="about__tl-dot" />

            {/* Right content */}
            {item.side === "right" && (
              <div className="about__tl-content">
                <div className="about__tl-year">{item.year}</div>
                <h3 className="about__tl-title">{item.title}</h3>
                <p className="about__tl-desc">{item.desc}</p>
              </div>
            )}
          </Reveal>
        ))}
      </div>

    </section>
  );
}