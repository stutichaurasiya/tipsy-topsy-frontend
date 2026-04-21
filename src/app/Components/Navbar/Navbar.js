"use client";

import "./Navbar.css";
import Link from "next/link";
import { useState, useEffect } from "react";          // ✅ useEffect add kiya
import { categoryService } from "@/services/category.service"; // ✅ category service import

// ── Emoji map — category name ke basis pe emoji milega ──────
// Backend mein jo category name hai usse lowercase mein match karenge
const CATEGORY_EMOJI = {
  regular:     "🎂",
  designer:    "✨",
  photo:       "📸",
  wedding:     "💍",
  birthday:    "🎉",
  anniversary: "🌸",
  occasions:   "🎀",
  cheesecakes: "🍰",
  kids:        "🧁",
};

// Solo links jo categories ke baad aate hain
const SOLO_ITEMS = [
  { label: "Desserts", href: "#" },
  { label: "Flowers",  href: "#" },
  { label: "Hampers",  href: "#" },
];

function CakeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 120 130"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <rect x="8"  y="82" width="104" height="34" rx="6" fill="#8C5A3C" />
      <rect x="22" y="54" width="76"  height="28" rx="6" fill="#C4894F" />
      <path d="M22 62 Q32 52 42 62 Q52 52 62 62 Q72 52 82 62 Q92 52 98 62 L98 54 L22 54Z" fill="#E3CAA5" />
      <rect x="55" y="38" width="10" height="16" rx="3" fill="#E3CAA5" />
      <ellipse cx="60" cy="33" rx="5"   ry="7" fill="#C4894F" />
      <ellipse cx="60" cy="35" rx="2.5" ry="4" fill="#F5ECD7" />
      <circle cx="30" cy="99" r="4" fill="#E3CAA5" />
      <circle cx="50" cy="99" r="4" fill="#E3CAA5" />
      <circle cx="70" cy="99" r="4" fill="#E3CAA5" />
      <circle cx="90" cy="99" r="4" fill="#E3CAA5" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState(null);

  // ✅ NAYA — Backend se categories store karenge yahan
  const [categories, setCategories] = useState([]);

  // ✅ NAYA — Component mount hote hi categories fetch karo
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAll(); // GET /api/categories/all

        // Backend response: res.data.data = [{id, name, description, products}, ...]
        const cats = res.data?.data || [];
        setCategories(cats);
      } catch (err) {
        console.error("Navbar: Categories fetch failed", err);
        // Error aane pe bhi navbar toot nahi — sirf categories nahi dikhenge
      }
    };

    fetchCategories();
  }, []); // [] — sirf ek baar chalega jab navbar load ho

  const toggleMobileDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="top-announcement">
        🎂 Free delivery on orders above ₹599 &nbsp;|&nbsp;
        <span>Use code TIPSY10</span> for 10% off your first order
      </div>

      {/* ── Top Header ── */}
      <div className="top-header">

        {/* Logo */}
        <Link href="/" className="logo">
          <span className="logo-tipsy">Tipsy</span>
          <span className="logo-dot" />
          <span className="logo-topsy">Topsy</span>
        </Link>

        {/* Search */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search for cakes, flavours..." />
        </div>

        {/* Right side */}
        <div className="header-right">
          <Link href="/About" className="about-nav-link">
            <CakeIcon />
            About Us
          </Link>
          <div className="icons">
            <Link href="/account" className="icon-btn" title="Account">👤</Link>
            <Link href="/cart"    className="icon-btn" title="Cart">
              🛍️
              <span className="badge">2</span>
            </Link>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Menu Navbar ── */}
      <nav className={`menu-navbar ${menuOpen ? "active" : ""}`}>
        <ul className="menu">

          {/*
           * ✅ NAYA — Backend se aayi categories ka dropdown
           * Pehle hardcoded NAV_ITEMS tha — ab yeh dynamically backend se banta hai
           * Har category ek dropdown item ban jaati hai
           */}
          {categories.length > 0 && (
            <li
              className={`menu-item ${openDropdown === "allcakes" ? "mobile-open" : ""}`}
            >
              <button
                className="menu-item-label"
                onClick={() => toggleMobileDropdown("allcakes")}
              >
                🎂 All Cakes
                <span className="chevron">▾</span>
              </button>
              <ul className="dropdown">
                {categories.map((cat, i) => {
                  // Emoji dhundho category name se
                  const emoji = CATEGORY_EMOJI[cat.name?.toLowerCase()] || "🎂";
                  return (
                    <li key={cat.id}>
                      {/* href mein category id daala — Home page pe scroll karega */}
                      <Link href={`/#${cat.name?.toLowerCase()}`}>
                        {emoji} {cat.name}
                      </Link>
                      {/* Last item ke baad divider nahi aayega */}
                      {i < categories.length - 1 && (
                        <div className="dropdown-divider" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          )}

          {/*
           * ✅ NAYA — Har category ka apna bhi alag menu item
           * "All Cakes" dropdown ke alawa individual links bhi dikhenge
           * Jaise: Birthday, Wedding, Designer — har ek alag tab
           */}
          {categories.map((cat) => {
            const emoji = CATEGORY_EMOJI[cat.name?.toLowerCase()] || "🎂";
            const catKey = cat.name?.toLowerCase();
            return (
              <li
                key={cat.id}
                className={`menu-item ${openDropdown === catKey ? "mobile-open" : ""}`}
              >
                <Link href={`/#${catKey}`}>
                  {emoji} {cat.name}
                </Link>
              </li>
            );
          })}

          {/* Solo links — yeh hardcoded rehenge */}
          {SOLO_ITEMS.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}

        </ul>
      </nav>
    </>
  );
}