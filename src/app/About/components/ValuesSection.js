import "./ValuesSection.css";
import Reveal from "./Reveal";

/* ── ValuesSection
   4-card grid — "Why Choose Us"
   Edit VALUES array to change cards.
   ─────────────────────────────────────── */

const VALUES = [
  {
    emoji: "🎂",
    title: "Crafted with Love",
    desc: "Every cake is baked fresh to order, made with premium ingredients and a whole lot of heart.",
  },
  {
    emoji: "✨",
    title: "Artisan Quality",
    desc: "From classic tiers to sculpted masterpieces — our bakers treat every order like a work of art.",
  },
  {
    emoji: "🚚",
    title: "Delivered Fresh",
    desc: "We ensure your cake arrives in perfect condition, right on time for your special moment.",
  },
  {
    emoji: "🎨",
    title: "Custom Designs",
    desc: "Tell us your vision and we'll bring it to life — no design is too dreamy for our team.",
  },
];

export default function ValuesSection() {
  return (
    <section className="about__values">

      {/* ── Header — edit title here ── */}
      <Reveal className="about__values-header">
        <span className="about__section-label">Why Choose Us</span>
        <h2 className="about__values-title">
          Baked with Intention, Served with Joy
        </h2>
      </Reveal>

      {/* ── Cards ── */}
      <div className="about__values-grid">
        {VALUES.map((v, i) => (
          <Reveal
            key={i}
            className="about__value-card"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="about__value-emoji">{v.emoji}</div>
            <h3 className="about__value-title">{v.title}</h3>
            <p className="about__value-desc">{v.desc}</p>
          </Reveal>
        ))}
      </div>

    </section>
  );
}