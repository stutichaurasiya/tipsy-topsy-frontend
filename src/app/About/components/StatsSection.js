import "./StatsSection.css";
import Reveal from "./Reveal";

/* ── StatsSection
   Dark strip with 4 animated stat numbers.
   Edit STATS array to change numbers and labels.
   ─────────────────────────────────────── */

const STATS = [
  { number: "5K+", label: "Cakes Delivered" },
  { number: "12",  label: "Expert Bakers"   },
  { number: "98%", label: "Happy Customers" },
  { number: "6",   label: "Years of Magic"  },
];

export default function StatsSection() {
  return (
    <section className="about__stats">
      {STATS.map((stat, i) => (
        <Reveal key={i} className="about__stat" style={{ transitionDelay: `${i * 0.12}s` }}>
          <span className="about__stat-number">{stat.number}</span>
          <span className="about__stat-label">{stat.label}</span>
        </Reveal>
      ))}
    </section>
  );
}