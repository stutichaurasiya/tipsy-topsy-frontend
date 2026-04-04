import "./MediaSection.css";
import Reveal from "./Reveal";

/* ── MediaSection
   Press mentions, awards, gallery, social links.
   Edit PRESS, AWARDS, GALLERY arrays below.
   ─────────────────────────────────────── */

const PRESS = [
  {
    outlet: "Lucknow Times",
    quote: "Tipsy Topsy is redefining what a celebration cake can be — artistry meets warmth in every slice.",
    tag: "Feature Story · 2023",
  },
  {
    outlet: "Food & Fête",
    quote: "If there is one bakery in the city that consistently delivers magic, it is Tipsy Topsy.",
    tag: "Best Of City · 2023",
  },
  {
    outlet: "Awadh Digest",
    quote: "A homegrown brand that has quietly become the city's most beloved cake destination.",
    tag: "Brand Spotlight · 2024",
  },
];

const AWARDS = [
  { icon: "🏆", title: "Best Artisan Bakery",   sub: "Lucknow Food Awards 2023" },
  { icon: "⭐", title: "Top Rated on Google",   sub: "4.9★ · 600+ Reviews"      },
  { icon: "🎀", title: "Customer Choice Award", sub: "Local Loves 2024"          },
  { icon: "📸", title: "Featured in 10+ Media", sub: "Press & Digital Coverage"  },
];

const GALLERY = [
  { emoji: "🎂", label: "Wedding Tiers" },
  { emoji: "🍰", label: "Birthday Cakes" },
  { emoji: "🌸", label: "Floral Cakes" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "💍", label: "Engagement" },
  { emoji: "✨", label: "Designer" },
  { emoji: "🍫", label: "Chocolate" },
];

export default function MediaSection() {
  return (
    <section className="about__media">
      <div className="about__media-inner">

        {/* ── Header — edit title here ── */}
        <Reveal className="about__media-header">
          <span className="about__section-label">In The Spotlight</span>
          <h2 className="about__media-title">Tipsy Topsy in the Media</h2>
        </Reveal>

        {/* ── Featured Video — edit title/desc/link here ── */}
        <Reveal className="about__media-feature">
          <div className="about__media-video-thumb">
            <span className="about__media-video-emoji">🎂</span>
            <div className="about__media-play-btn">▶</div>
            <span className="about__media-video-label">Watch Our Story</span>
          </div>
          <div className="about__media-feature-text">
            <span className="about__section-label">Featured Film</span>
            <h3 className="about__media-feature-title">
              "The Bakery That Started with a Dream"
            </h3>
            <p className="about__media-feature-desc">
              A short documentary about how Tipsy Topsy went from a home kitchen
              to Lucknow's most loved artisan cake brand — told through flour,
              frosting, and heart.
            </p>
            {/* ── Edit video link here ── */}
            <a href="#" className="about__media-feature-link">
              Watch Full Film →
            </a>
          </div>
        </Reveal>

        {/* ── Press Cards ── */}
        <Reveal>
          <span className="about__media-sub-label">Press & Features</span>
        </Reveal>
        <div className="about__press-grid">
          {PRESS.map((p, i) => (
            <Reveal key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="about__press-card">
                <div className="about__press-outlet">{p.outlet}</div>
                <p className="about__press-quote">"{p.quote}"</p>
                <span className="about__press-tag">{p.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Awards ── */}
        <Reveal style={{ marginTop: "48px" }}>
          <span className="about__media-sub-label">Awards & Recognition</span>
        </Reveal>
        <Reveal className="about__awards-row">
          {AWARDS.map((a, i) => (
            <div key={i} className="about__award-chip">
              <span className="about__award-icon">{a.icon}</span>
              <div>
                <div className="about__award-title">{a.title}</div>
                <div className="about__award-sub">{a.sub}</div>
              </div>
            </div>
          ))}
        </Reveal>

        {/* ── Gallery ── */}
        <Reveal style={{ marginTop: "48px" }}>
          <span className="about__media-sub-label">As Seen On Instagram</span>
        </Reveal>
        <Reveal className="about__gallery-grid">
          {GALLERY.map((g, i) => (
            <div key={i} className="about__gallery-item">
              <span>{g.emoji}</span>
              <div className="about__gallery-overlay">
                <span>{g.label}</span>
              </div>
            </div>
          ))}
        </Reveal>

        {/* ── Social Buttons — edit hrefs here ── */}
        <Reveal className="about__social-row">
          <a href="https://instagram.com" className="about__social-btn">📸 Instagram</a>
          <a href="https://youtube.com"   className="about__social-btn">▶ YouTube</a>
          <a href="https://facebook.com"  className="about__social-btn">📘 Facebook</a>
          <a href="https://pinterest.com" className="about__social-btn">📌 Pinterest</a>
        </Reveal>

      </div>
    </section>
  );
}