"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./home.module.css";

// ── Cake Data ────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "regular",
    label: "Cakes",
    heading: "Regular Cakes",
    emoji: "🎂",
    accent: "#C4894F",
    items: [
      { name: "Classic Vanilla Sponge", price: 649, weight: "0.5 kg", tag: "Bestseller", bg: "#fef6ec" },
      { name: "Dark Chocolate Truffle", price: 799, weight: "0.5 kg", tag: "Popular", bg: "#f5ede4" },
      { name: "Butterscotch Delight", price: 699, weight: "0.5 kg", tag: null, bg: "#fdf3e0" },
      { name: "Red Velvet Classic", price: 849, weight: "0.5 kg", tag: "New", bg: "#fdecea" },
      { name: "Black Forest Gateau", price: 749, weight: "0.5 kg", tag: "Loved", bg: "#f0ede8" },
      { name: "Strawberry Fresh Cream", price: 799, weight: "0.5 kg", tag: null, bg: "#fef0f2" },
    ],
  },
  {
    id: "designer",
    label: "Designer",
    heading: "Designer Cakes",
    emoji: "✨",
    accent: "#8C5A3C",
    items: [
      { name: "Floral Fantasy Cake", price: 1499, weight: "1 kg", tag: "Trending", bg: "#fef0f5" },
      { name: "Galaxy Mirror Glaze", price: 1899, weight: "1 kg", tag: "Exclusive", bg: "#ede8f5" },
      { name: "Ombre Ruffle Cake", price: 1699, weight: "1 kg", tag: null, bg: "#fdeef5" },
      { name: "Geode Crystal Cake", price: 2199, weight: "1 kg", tag: "Premium", bg: "#eef0fd" },
      { name: "Hand Painted Floral", price: 1999, weight: "1 kg", tag: null, bg: "#fef6ec" },
      { name: "Marble Fondant Cake", price: 1599, weight: "1 kg", tag: "New", bg: "#f5f0eb" },
    ],
  },
  {
    id: "photo",
    label: "Photo",
    heading: "Photo Cakes",
    emoji: "📸",
    accent: "#C4894F",
    items: [
      { name: "Custom Photo Print", price: 899, weight: "0.5 kg", tag: "Popular", bg: "#fef6ec" },
      { name: "Edible Image Round", price: 999, weight: "1 kg", tag: null, bg: "#f0f5fe" },
      { name: "Square Photo Cake", price: 1099, weight: "1 kg", tag: "Trending", bg: "#f5feee" },
      { name: "Heart Photo Cake", price: 1199, weight: "1 kg", tag: "Loved", bg: "#fdeef5" },
      { name: "Collage Photo Cake", price: 1299, weight: "1 kg", tag: null, bg: "#fef0ec" },
      { name: "HD Printed Fondant", price: 1499, weight: "1 kg", tag: "New", bg: "#eef5fd" },
    ],
  },
  {
    id: "wedding",
    label: "Wedding",
    heading: "Wedding Cakes",
    emoji: "💍",
    accent: "#8C5A3C",
    items: [
      { name: "3-Tier Ivory Fondant", price: 4999, weight: "3 kg", tag: "Premium", bg: "#fefaea" },
      { name: "Floral Cascade Tier", price: 5999, weight: "4 kg", tag: "Bestseller", bg: "#fef0f5" },
      { name: "Royal Gold Drip Cake", price: 6499, weight: "4 kg", tag: "Exclusive", bg: "#fef6ec" },
      { name: "Rustic Naked Cake", price: 3999, weight: "3 kg", tag: "Trending", bg: "#f5ede4" },
      { name: "Pearl & Lace Fondant", price: 7999, weight: "5 kg", tag: null, bg: "#f0f0f5" },
      { name: "Blush Floral Tower", price: 8999, weight: "6 kg", tag: "Luxury", bg: "#fdeef5" },
    ],
  },
  {
    id: "birthday",
    label: "Birthday",
    heading: "Birthday Cakes",
    emoji: "🎉",
    accent: "#C4894F",
    items: [
      { name: "Rainbow Surprise Cake", price: 849, weight: "0.5 kg", tag: "Kids Fav", bg: "#fff0f5" },
      { name: "Unicorn Dream Cake", price: 1299, weight: "1 kg", tag: "Trending", bg: "#f5f0ff" },
      { name: "Number Pinata Cake", price: 1499, weight: "1.5 kg", tag: "Popular", bg: "#fff5e0" },
      { name: "Chocolate Bomb Cake", price: 999, weight: "0.5 kg", tag: "Viral", bg: "#f5ede4" },
      { name: "Cartoon Theme Cake", price: 1199, weight: "1 kg", tag: null, bg: "#e8f5fe" },
      { name: "Confetti Burst Cake", price: 799, weight: "0.5 kg", tag: "Bestseller", bg: "#fef6ec" },
    ],
  },
  {
    id: "anniversary",
    label: "Anniversary",
    heading: "Anniversary Cakes",
    emoji: "🌸",
    accent: "#8C5A3C",
    items: [
      { name: "Red Rose Heart Cake", price: 1099, weight: "1 kg", tag: "Romantic", bg: "#fdeef5" },
      { name: "Golden Anniversary Tier", price: 2999, weight: "2 kg", tag: "25th Special", bg: "#fef6ec" },
      { name: "Silver Fondant Couple", price: 1899, weight: "1.5 kg", tag: null, bg: "#f0f0f5" },
      { name: "Forever & Always Cake", price: 1299, weight: "1 kg", tag: "Popular", bg: "#fff0f5" },
      { name: "Champagne Drip Cake", price: 1599, weight: "1 kg", tag: "Trending", bg: "#fef6ec" },
      { name: "Love Story Photo Cake", price: 1199, weight: "1 kg", tag: null, bg: "#fdeef5" },
    ],
  },
  {
    id: "occasions",
    label: "Occasions",
    heading: "By Occasions",
    emoji: "🎀",
    accent: "#C4894F",
    items: [
      { name: "Valentine Heart Cake", price: 999, weight: "0.5 kg", tag: "Feb Special", bg: "#fdeef5" },
      { name: "Mother's Day Bouquet", price: 1199, weight: "1 kg", tag: "Seasonal", bg: "#f5feee" },
      { name: "Baby Shower Blue", price: 1099, weight: "1 kg", tag: "Cute", bg: "#e8f5fe" },
      { name: "Diwali Special Mithai", price: 899, weight: "0.5 kg", tag: "Festival", bg: "#fef6ec" },
      { name: "Raksha Bandhan Cake", price: 749, weight: "0.5 kg", tag: "Seasonal", bg: "#fef0f5" },
      { name: "New Year Countdown", price: 1299, weight: "1 kg", tag: "Party", bg: "#f0eefe" },
    ],
  },
];

const OFFERS = [
  { label: "Free Delivery", sub: "on orders above ₹599", icon: "🚚" },
  { label: "Same Day Delivery", sub: "order before 12 PM", icon: "⚡" },
  { label: "100% Eggless", sub: "all cakes available", icon: "🌿" },
  { label: "5-Star Rated", sub: "10,000+ happy customers", icon: "⭐" },
];

// ── Emoji placeholders for cakes ──
const CAKE_EMOJIS = ["🎂","🍰","🧁","🎂","🍰","🧁"];

// ── Category Section ─────────────────────────────────────────
function CategorySection({ cat }) {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className={styles.catSection}>
      <div className={styles.catHeader}>
        <div className={styles.catTitleGroup}>
          <span className={styles.catEmoji}>{cat.emoji}</span>
          <div>
            <h2 className={styles.catTitle}>{cat.heading}</h2>
            <p className={styles.catSub}>{cat.items.length} varieties available</p>
          </div>
        </div>
        <div className={styles.catHeaderRight}>
          <a href="#" className={styles.viewAll} style={{ color: cat.accent }}>
            View All →
          </a>
          <div className={styles.scrollBtns}>
            <button
              className={`${styles.scrollBtn} ${!canLeft ? styles.scrollBtnDisabled : ""}`}
              onClick={() => scroll(-1)}
              disabled={!canLeft}
            >‹</button>
            <button
              className={`${styles.scrollBtn} ${!canRight ? styles.scrollBtnDisabled : ""}`}
              onClick={() => scroll(1)}
              disabled={!canRight}
            >›</button>
          </div>
        </div>
      </div>

      <div
        className={styles.cardTrack}
        ref={scrollRef}
        onScroll={checkScroll}
      >
        {cat.items.map((item, i) => (
          <div key={i} className={styles.cakeCard} style={{ "--card-accent": cat.accent }}>
            {item.tag && (
              <span className={styles.cardTag} style={{ background: cat.accent }}>
                {item.tag}
              </span>
            )}
            <div className={styles.cardImg} style={{ background: item.bg }}>
              <span className={styles.cardImgEmoji}>{CAKE_EMOJIS[i % 6]}</span>
              <div className={styles.cardImgOverlay} />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardName}>{item.name}</h3>
              <p className={styles.cardWeight}>Starting {item.weight}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardPrice}>₹{item.price}</span>
                <button className={styles.cardBtn} style={{ background: cat.accent }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function HomePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  return (
    <div className={`${styles.page} ${visible ? styles.visible : ""}`}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>
            <span className={styles.eyeLine} />
            Lucknow's Favourite Cake Studio
            <span className={styles.eyeLine} />
          </p>
          <h1 className={styles.heroTitle}>
            Every slice tells<br />
            <em>your story</em>
          </h1>
          <p className={styles.heroSub}>
            Handcrafted custom cakes for birthdays, weddings & every sweet moment in between.
          </p>
          <div className={styles.heroBtns}>
            <a href="#cakes" className={styles.heroBtnPrimary}>Order Now 🎂</a>
            <a href="/contact" className={styles.heroBtnSecondary}>Custom Order</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPlate}>
            <div className={styles.heroCakeEmoji}>🎂</div>
            <div className={styles.heroCakeGlow} />
          </div>
          <div className={styles.heroBadge1}>
            <span>⭐</span> 4.9 Rating
          </div>
          <div className={styles.heroBadge2}>
            <span>🚚</span> Same Day
          </div>
          <div className={styles.heroBadge3}>
            <span>🌿</span> Eggless
          </div>
        </div>
        <div className={styles.heroScrollHint}>
          <span>Explore our cakes</span>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* ── OFFER STRIP ── */}
      <div className={styles.offerStrip}>
        {OFFERS.map((o) => (
          <div key={o.label} className={styles.offerItem}>
            <span className={styles.offerIcon}>{o.icon}</span>
            <div>
              <strong>{o.label}</strong>
              <span>{o.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── CATEGORY NAV ── */}
      <div className={styles.catNav} id="cakes">
        {CATEGORIES.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={styles.catNavItem}>
            <span>{c.emoji}</span>
            {c.label}
          </a>
        ))}
      </div>

      {/* ── CAKE SECTIONS ── */}
      <div className={styles.sections}>
        {CATEGORIES.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <CategorySection cat={cat} />
          </div>
        ))}
      </div>

      {/* ── BANNER ── */}
      <section className={styles.midBanner}>
        <div className={styles.midBannerInner}>
          <h2>🎂 Can't find what you're looking for?</h2>
          <p>Tell us your dream cake — we'll bring it to life in 24 hours.</p>
          <a href="/contact" className={styles.midBannerBtn}>Request Custom Cake</a>
        </div>
      </section>

    </div>
  );
}