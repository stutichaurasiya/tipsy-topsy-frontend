"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./home.module.css";
import { productService } from "@/services/product.service";

// ── Static Data (UI ke liye — products backend se aayenge) ───
const OFFERS = [
  { label: "Free Delivery",     sub: "on orders above ₹599",   icon: "🚚" },
  { label: "Same Day Delivery", sub: "order before 12 PM",      icon: "⚡" },
  { label: "100% Eggless",      sub: "all cakes available",     icon: "🌿" },
  { label: "5-Star Rated",      sub: "10,000+ happy customers", icon: "⭐" },
];

// Har category ka accent color aur emoji map
// backend mein jo category name hai usse match hoga (case-insensitive)
const CATEGORY_META = {
  regular:     { emoji: "🎂", accent: "#C4894F", label: "Cakes",       heading: "Regular Cakes" },
  designer:    { emoji: "✨", accent: "#8C5A3C", label: "Designer",    heading: "Designer Cakes" },
  photo:       { emoji: "📸", accent: "#C4894F", label: "Photo",       heading: "Photo Cakes" },
  wedding:     { emoji: "💍", accent: "#8C5A3C", label: "Wedding",     heading: "Wedding Cakes" },
  birthday:    { emoji: "🎉", accent: "#C4894F", label: "Birthday",    heading: "Birthday Cakes" },
  anniversary: { emoji: "🌸", accent: "#8C5A3C", label: "Anniversary", heading: "Anniversary Cakes" },
  occasions:   { emoji: "🎀", accent: "#C4894F", label: "Occasions",   heading: "By Occasions" },
};

// Fallback — agar category ka koi meta na mile toh yeh use hoga
const DEFAULT_META = { emoji: "🎂", accent: "#C4894F" };

const CAKE_EMOJIS = ["🎂","🍰","🧁","🎂","🍰","🧁"];

// ── Product Card ─────────────────────────────────────────────
// Ek product ka card — real backend data se banta hai
function ProductCard({ product, accent, index }) {
  // Backend se image_url aata hai product_images array mein
  const imageUrl = product.product_images?.[0]?.image_url || null;

  return (
    <div className={styles.cakeCard} style={{ "--card-accent": accent }}>

      {/* Tag — backend mein nahi hai toh null rakhenge, ya baad mein add kar sakte ho */}
      {/* Abhi ke liye koi tag nahi — UI same rahega */}

      <div
        className={styles.cardImg}
        style={{ background: "#fef6ec" }}
      >
        {/* Agar real image hai toh dikhao, warna emoji fallback */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              inset: 0,
            }}
          />
        ) : (
          <span className={styles.cardImgEmoji}>
            {CAKE_EMOJIS[index % 6]}
          </span>
        )}
        <div className={styles.cardImgOverlay} />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        {/* Backend mein weight field nahi hai — description ka short version dikhayenge */}
        <p className={styles.cardWeight}>
          {product.description
            ? product.description.slice(0, 30) + (product.description.length > 30 ? "…" : "")
            : "Freshly handcrafted"}
        </p>
        <div className={styles.cardFooter}>
          <span className={styles.cardPrice}>₹{Number(product.price).toLocaleString("en-IN")}</span>
          <button className={styles.cardBtn} style={{ background: accent }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Category Section ─────────────────────────────────────────
// Ek category ka poora section — uske products ka horizontal scroll
function CategorySection({ cat, products }) {
  const scrollRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
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
            <p className={styles.catSub}>{products.length} varieties available</p>
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

      <div className={styles.cardTrack} ref={scrollRef} onScroll={checkScroll}>
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            accent={cat.accent}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

// ── Loading Skeleton ─────────────────────────────────────────
// Jab tak backend se data aa raha hai tab yeh dikhega
function LoadingSkeleton() {
  return (
    <div style={{ padding: "3rem 4rem" }}>
      {[1, 2].map((s) => (
        <div key={s} style={{ marginBottom: "3rem" }}>
          <div style={{
            width: 200, height: 28, background: "#e8d5b8",
            borderRadius: 8, marginBottom: "1.5rem",
            animation: "pulse 1.5s ease-in-out infinite"
          }} />
          <div style={{ display: "flex", gap: "1.2rem" }}>
            {[1,2,3,4].map((c) => (
              <div key={c} style={{
                flex: "0 0 240px", height: 280, background: "#e8d5b8",
                borderRadius: 20, animation: "pulse 1.5s ease-in-out infinite"
              }} />
            ))}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function HomePage() {
  const [visible,    setVisible]    = useState(false);
  const [categories, setCategories] = useState([]);  // Grouped categories
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  // Page fade-in animation
  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  // ✅ Backend se latest products fetch karo
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productService.getLatest();  // GET /api/products/latest

        // res.data.data — backend ne jo array bheja hai products ka
        const products = res.data?.data || [];

        // Products ko unki category ke basis pe group karo
        // Har product mein categories object hota hai (include kiya tha repo mein)
        const grouped = {};

        products.forEach((product) => {
          // Category name backend se aata hai — lowercase mein match karenge
          const catName = product.categories?.name?.toLowerCase() || "other";

          if (!grouped[catName]) {
            grouped[catName] = [];
          }
          grouped[catName].push(product);
        });

        // Grouped object ko array mein convert karo rendering ke liye
        const categoryArray = Object.entries(grouped).map(([name, items]) => {
          const meta = CATEGORY_META[name] || {
            ...DEFAULT_META,
            label: name.charAt(0).toUpperCase() + name.slice(1),
            heading: name.charAt(0).toUpperCase() + name.slice(1) + " Cakes",
          };
          return {
            id: name,
            ...meta,
            items,
          };
        });

        setCategories(categoryArray);
      } catch (err) {
        console.error("Products fetch error:", err);
        setError("Products load nahi ho sake. Please refresh karein.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
          <div className={styles.heroBadge1}><span>⭐</span> 4.9 Rating</div>
          <div className={styles.heroBadge2}><span>🚚</span> Same Day</div>
          <div className={styles.heroBadge3}><span>🌿</span> Eggless</div>
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

      {/* ── CATEGORY NAV — dynamically backend data se banta hai ── */}
      {!loading && categories.length > 0 && (
        <div className={styles.catNav} id="cakes">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={styles.catNavItem}>
              <span>{c.emoji}</span>
              {c.label}
            </a>
          ))}
        </div>
      )}

      {/* ── CAKE SECTIONS ── */}
      <div className={styles.sections}>

        {/* Loading state */}
        {loading && <LoadingSkeleton />}

        {/* Error state */}
        {!loading && error && (
          <div style={{
            padding: "4rem",
            textAlign: "center",
            color: "#8c5a3c",
            fontSize: "1rem"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* ✅ Real products — backend se grouped by category */}
        {!loading && !error && categories.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <CategorySection cat={cat} products={cat.items} />
          </div>
        ))}

        {/* Agar koi product nahi aaya backend se */}
        {!loading && !error && categories.length === 0 && (
          <div style={{
            padding: "4rem",
            textAlign: "center",
            color: "rgba(46,26,14,0.4)",
            fontSize: "1rem"
          }}>
            Abhi koi product available nahi hai.
          </div>
        )}
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