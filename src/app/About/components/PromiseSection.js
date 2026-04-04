import "./PromiseSection.css";
import Reveal from "./Reveal";

/* ── PromiseSection
   Closing quote / team message section.
   Edit the quote, body text and sign below.
   ─────────────────────────────────────── */
export default function PromiseSection() {
  return (
    <section className="about__promise">
      <Reveal className="about__promise-inner">

        <span className="about__section-label">Our Promise</span>

        {/* ── Edit quote here ── */}
        <h2 className="about__promise-title">
          "Every cake we make carries a piece of our heart."
        </h2>

        {/* ── Edit body text here ── */}
        <p className="about__promise-text">
          We promise freshness, quality, and a whole lot of magic in every bite.
          When you order from Tipsy Topsy, you are not just getting a cake —
          you are getting an experience crafted just for you.
        </p>

        {/* ── Edit sign-off here ── */}
        <div className="about__promise-sign">— The Tipsy Topsy Team 🎀</div>

      </Reveal>
    </section>
  );
}