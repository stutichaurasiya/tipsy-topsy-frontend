import "./HeroSection.css";

/* ── HeroSection
   Full-screen hero with animated title, subtitle, pills, scroll hint.
   Edit text directly in this file.
   ─────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section className="about__hero">

      {/* ── Badge — edit bakery tagline here ── */}
      <div className="about__hero-badge">
        Est. 2019 · Handcrafted Cakes · Lucknow
      </div>

      {/* ── Main Title — edit headline here ── */}
      <h1 className="about__hero-title">
        We Bake <span className="about__hero-highlight">Moments</span>
        <br />Into Memory
      </h1>

      {/* ── Subtitle ── */}
      <p className="about__hero-subtitle">
        Tipsy Topsy is more than a bakery — it's where celebrations are born,
        milestones are marked, and every slice tells a story.
      </p>

      {/* ── Deco Pills — add/remove pills here ── */}
      <div className="about__hero-deco-row">
        <span className="about__hero-deco-pill">🎂 Fresh Daily</span>
        <span className="about__hero-deco-pill">✨ Custom Orders</span>
        <span className="about__hero-deco-pill">🚚 City-wide Delivery</span>
      </div>

      {/* ── Scroll Hint ── */}
      <div className="about__hero-scroll">↓ Scroll to explore</div>

    </section>
  );
}