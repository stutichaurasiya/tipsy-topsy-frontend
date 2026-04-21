"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./category.module.css";
import { categoryService } from "@/services/category.service";

const CATEGORY_META = {
  regular:     { emoji: "🎂", accent: "#C4894F", heading: "Regular Cakes" },
  designer:    { emoji: "✨", accent: "#8C5A3C", heading: "Designer Cakes" },
  photo:       { emoji: "📸", accent: "#C4894F", heading: "Photo Cakes" },
  wedding:     { emoji: "💍", accent: "#8C5A3C", heading: "Wedding Cakes" },
  birthday:    { emoji: "🎉", accent: "#C4894F", heading: "Birthday Cakes" },
  anniversary: { emoji: "🌸", accent: "#8C5A3C", heading: "Anniversary Cakes" },
  occasions:   { emoji: "🎀", accent: "#C4894F", heading: "By Occasions" },
};

const DEFAULT_META = { emoji: "🎂", accent: "#C4894F", heading: "Products" };
const CAKE_EMOJIS  = ["🎂","🍰","🧁","🎂","🍰","🧁"];

// ── Product Card ──
function ProductCard({ product, accent, index }) {
  const imageUrl = product.product_images?.[0]?.image_url || null;
  return (
    <div className={styles.card}>
      <div className={styles.cardImg} style={{ background: "#fef6ec" }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }}
          />
        ) : (
          <span className={styles.cardEmoji}>{CAKE_EMOJIS[index % 6]}</span>
        )}
        <div className={styles.cardOverlay} />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <p className={styles.cardDesc}>
          {product.description
            ? product.description.slice(0, 40) + (product.description.length > 40 ? "…" : "")
            : "Freshly handcrafted"}
        </p>
        <div className={styles.cardFooter}>
          <span className={styles.cardPrice} style={{ color: accent }}>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
          <button className={styles.cardBtn} style={{ background: accent }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton loader ──
function Skeleton() {
  return (
    <div className={styles.grid}>
      {[1,2,3,4,5,6].map((i) => (
        <div key={i} className={styles.skelCard}>
          <div className={styles.skelImg} />
          <div className={styles.skelBody}>
            <div className={styles.skelLine} style={{ width:"70%" }} />
            <div className={styles.skelLine} style={{ width:"50%", height:12 }} />
            <div className={styles.skelLine} style={{ width:"40%", height:14, marginTop:8 }} />
          </div>
        </div>
      ))}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}

// ── Main Component ──
export default function CategoryPage({ slug }) {
  const router  = useRouter();
  const [visible,  setVisible]  = useState(false);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  const meta = CATEGORY_META[slug] || { ...DEFAULT_META, heading: slug?.charAt(0).toUpperCase() + slug?.slice(1) };

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await categoryService.getProductsByName(slug);
        const data = res.data?.data;
        setCategory(data);
        setProducts(data?.products || []);
      } catch (err) {
        console.error("Category fetch error:", err);
        setError("Products load nahi ho sake. Please wapas jao.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className={`${styles.page} ${visible ? styles.visible : ""}`}>

      {/* ── Back Button ── */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          ← Wapas jao
        </button>
      </div>

      {/* ── Header ── */}
      <div className={styles.header} style={{ "--accent": meta.accent }}>
        <span className={styles.headerEmoji}>{meta.emoji}</span>
        <div>
          <h1 className={styles.headerTitle}>{meta.heading}</h1>
          {!loading && (
            <p className={styles.headerSub}>
              {products.length} {products.length === 1 ? "product" : "products"} available
            </p>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>

        {loading && <Skeleton />}

        {!loading && error && (
          <div className={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className={styles.emptyBox}>
            <span className={styles.emptyEmoji}>🍰</span>
            <p>Is category mein abhi koi product nahi hai.</p>
            <button className={styles.backBtn} onClick={() => router.push("/")}>
              Home pe wapas jao
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className={styles.grid}>
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                accent={meta.accent}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}