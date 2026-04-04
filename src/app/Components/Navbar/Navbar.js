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
          <div className="support">
            <strong>24/7 Support</strong>
            +91 9876543210
          </div>

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