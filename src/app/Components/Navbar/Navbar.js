"use client";

import "./Navbar.css";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Cakes",
    links: [
      { name: "Regular Cakes", href: "#" },
      { name: "Designer Cakes", href: "#" },
      { name: "Photo Cakes", href: "#" },
      { name: "Cheesecakes", href: "#" },
    ],
  },
  {
    label: "Wedding Season",
    links: [
      { name: "Wedding Cakes", href: "#" },
      { name: "Engagement Cakes", href: "#" },
    ],
  },
  {
    label: "Designer Cakes",
    links: [
      { name: "Kids Cakes", href: "#" },
      { name: "Luxury Cakes", href: "#" },
    ],
  },
  {
    label: "Birthday Cakes",
    links: [
      { name: "Kids Birthday", href: "#" },
      { name: "Number Cakes", href: "#" },
    ],
  },
  {
    label: "Anniversary Cakes",
    links: [
      { name: "1st Anniversary", href: "#" },
      { name: "25th Anniversary", href: "#" },
    ],
  },
  {
    label: "By Occasions",
    links: [
      { name: "Valentine Cakes", href: "#" },
      { name: "Mother's Day Cakes", href: "#" },
    ],
  },
];

const SOLO_ITEMS = [
  { label: "Desserts", href: "#" },
  { label: "Flowers", href: "#" },
  { label: "Hampers", href: "#" },
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
      {/* Base tier */}
      <rect x="8" y="82" width="104" height="34" rx="6" fill="#8C5A3C" />
      {/* Top tier */}
      <rect x="22" y="54" width="76" height="28" rx="6" fill="#C4894F" />
      {/* Frosting drip */}
      <path
        d="M22 62 Q32 52 42 62 Q52 52 62 62 Q72 52 82 62 Q92 52 98 62 L98 54 L22 54Z"
        fill="#E3CAA5"
      />
      {/* Candle */}
      <rect x="55" y="38" width="10" height="16" rx="3" fill="#E3CAA5" />
      {/* Flame outer */}
      <ellipse cx="60" cy="33" rx="5" ry="7" fill="#C4894F" />
      {/* Flame inner */}
      <ellipse cx="60" cy="35" rx="2.5" ry="4" fill="#F5ECD7" />
      {/* Dots on base tier */}
      <circle cx="30" cy="99" r="4" fill="#E3CAA5" />
      <circle cx="50" cy="99" r="4" fill="#E3CAA5" />
      <circle cx="70" cy="99" r="4" fill="#E3CAA5" />
      <circle cx="90" cy="99" r="4" fill="#E3CAA5" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

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
            <Link href="/account" className="icon-btn" title="Account">
              👤
            </Link>
            <Link href="/cart" className="icon-btn" title="Cart">
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
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Menu Navbar ── */}
      <nav className={`menu-navbar ${menuOpen ? "active" : ""}`}>
        <ul className="menu">

          {/* Dropdown items */}
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className={`menu-item ${openDropdown === item.label ? "mobile-open" : ""}`}
            >
              <button
                className="menu-item-label"
                onClick={() => toggleMobileDropdown(item.label)}
              >
                {item.label}
                <span className="chevron">▾</span>
              </button>
              <ul className="dropdown">
                {item.links.map((link, i) => (
                  <li key={link.name}>
                    <Link href={link.href}>{link.name}</Link>
                    {i < item.links.length - 1 && (
                      <div className="dropdown-divider" />
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Solo links */}
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