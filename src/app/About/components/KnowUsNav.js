"use client";

import "./KnowUsNav.css";

/* ── KnowUsNav
   Sticky top tab bar — About Us / Our Story / Media
   Props:
     activeTab  → currently active tab string
     onTabClick → (tabName) => void
   ─────────────────────────────────────── */

const TABS = ["About Us", "Our Story", "Media"];

export default function KnowUsNav({ activeTab, onTabClick }) {
  return (
    <nav className="know-us-nav">
      {TABS.map((tab) => (
        <button
          key={tab}
          className={`know-us-nav__tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}