import "./StoryIntro.css";
import Reveal from "./Reveal";

/* ── StoryIntro
   Two-column section: blob image left, text right.
   Edit text paragraphs and CTA link below.
   ─────────────────────────────────────── */
export default function StoryIntro() {
  return (
    <section className="about__story">

      {/* ── Left: Blob Image ── */}
      <Reveal dir="left" className="about__story-image">
        <div className="about__story-img-inner">
          <span className="about__story-big-emoji">🎂</span>
          <div className="about__story-img-badge">Est. 2019</div>
        </div>
      </Reveal>

      {/* ── Right: Text ── */}
      <Reveal dir="right" className="about__story-text">
        <span className="about__section-label">Who We Are</span>

        {/* ── Edit title here ── */}
        <h2 className="about__story-title">
          Born from a Kitchen, Built on Passion
        </h2>

        {/* ── Edit paragraphs here ── */}
        <p>
          It all started in a small home kitchen in 2019, with a passion for
          baking and a dream to make every celebration unforgettable. What
          began as weekend experiments turned into a full-fledged love affair
          with flour, butter, and flavor.
        </p>
        <p>
          Today, Tipsy Topsy stands as a testament to that dream — a brand
          loved by thousands, trusted for weddings, birthdays, anniversaries,
          and every sweet moment in between.
        </p>

        {/* ── Edit CTA link/text here ── */}
        <a href="/cakes" className="about__story-cta">
          See Our Cakes →
        </a>
      </Reveal>

    </section>
  );
}