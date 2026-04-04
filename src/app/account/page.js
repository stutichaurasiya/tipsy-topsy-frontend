"use client";
import { useState, useEffect } from "react";
import styles from "./account.module.css";

// ── Mock Data ──────────────────────────────────────────────
const mockUser = {
  name: "Priya Sharma",
  email: "priya.sharma@gmail.com",
  phone: "+91 98765 43210",
  joined: "March 2023",
  avatar: "P",
  totalOrders: 12,
  loyaltyPoints: 340,
};

const mockOrders = [
  {
    id: "SL-2024-089",
    cake: "Red Velvet Wedding Cake",
    date: "18 Dec 2024",
    status: "Delivered",
    weight: "3 kg",
    price: "₹4,200",
    occasion: "Wedding",
    emoji: "💍",
  },
  {
    id: "SL-2024-071",
    cake: "Dark Chocolate Truffle",
    date: "2 Nov 2024",
    status: "Delivered",
    weight: "1.5 kg",
    price: "₹1,800",
    occasion: "Birthday",
    emoji: "🎂",
  },
  {
    id: "SL-2025-003",
    cake: "Mango Delight Custom",
    date: "10 Jan 2025",
    status: "In Progress",
    weight: "2 kg",
    price: "₹2,600",
    occasion: "Anniversary",
    emoji: "🌸",
  },
  {
    id: "SL-2025-011",
    cake: "Pistachio Rose Cake",
    date: "28 Jan 2025",
    status: "Confirmed",
    weight: "1 kg",
    price: "₹1,400",
    occasion: "Baby Shower",
    emoji: "🍼",
  },
];

const mockAddresses = [
  {
    id: 1,
    label: "Home",
    name: "Priya Sharma",
    line1: "Flat 204, Sunflower Apartments",
    line2: "Hazratganj, Lucknow",
    pin: "226001",
    phone: "+91 98765 43210",
    isDefault: true,
    icon: "🏠",
  },
  {
    id: 2,
    label: "Office",
    name: "Priya Sharma",
    line1: "3rd Floor, Tech Park",
    line2: "Gomti Nagar, Lucknow",
    pin: "226010",
    phone: "+91 98765 43210",
    isDefault: false,
    icon: "🏢",
  },
];

const mockWishlist = [
  {
    id: 1,
    name: "Black Forest Dream",
    price: "₹1,600",
    weight: "1 kg",
    tag: "Bestseller",
    emoji: "🍒",
    bg: "#f5e0e0",
  },
  {
    id: 2,
    name: "Butterscotch Bliss",
    price: "₹1,200",
    weight: "0.5 kg",
    tag: "New",
    emoji: "🍯",
    bg: "#fef3d0",
  },
  {
    id: 3,
    name: "Tiramisu Cloud",
    price: "₹2,200",
    weight: "1.5 kg",
    tag: "Premium",
    emoji: "☕",
    bg: "#ede0d4",
  },
  {
    id: 4,
    name: "Strawberry Velvet",
    price: "₹1,800",
    weight: "1 kg",
    tag: "Seasonal",
    emoji: "🍓",
    bg: "#fde8ec",
  },
];

const TABS = ["Profile", "My Orders", "Addresses", "Wishlist"];
const TAB_ICONS = ["👤", "📦", "📍", "❤️"];

// ── Component ──────────────────────────────────────────────
export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({ ...mockUser });
  const [wishlist, setWishlist] = useState(mockWishlist);
  const [addresses, setAddresses] = useState(mockAddresses);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  const removeWishlist = (id) =>
    setWishlist((prev) => prev.filter((w) => w.id !== id));

  const setDefault = (id) =>
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );

  const statusColor = (s) => {
    if (s === "Delivered") return styles.statusDelivered;
    if (s === "In Progress") return styles.statusProgress;
    return styles.statusConfirmed;
  };

  return (
    <div className={`${styles.page} ${visible ? styles.visible : ""}`}>
      {/* ── Decorative BG ── */}
      <div className={styles.bgDecor}>
        <div className={styles.bgBlob1} />
        <div className={styles.bgBlob2} />
        <span className={styles.bgStar1}>✦</span>
        <span className={styles.bgStar2}>✧</span>
        <span className={styles.bgStar3}>✦</span>
      </div>

      {/* ── Header Banner ── */}
      <section className={styles.banner}>
        <div className={styles.bannerInner}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatarRing} />
            <div className={styles.avatar}>{mockUser.avatar}</div>
            <button className={styles.avatarEdit} title="Change photo">📷</button>
          </div>
          <div className={styles.bannerInfo}>
            <p className={styles.bannerEyebrow}>Welcome back ✨</p>
            <h1 className={styles.bannerName}>{profileData.name}</h1>
            <p className={styles.bannerMeta}>
              Member since {mockUser.joined} &nbsp;·&nbsp; {mockUser.totalOrders} Orders
            </p>
          </div>
          <div className={styles.loyaltyBadge}>
            <span className={styles.loyaltyIcon}>🎖️</span>
            <div>
              <p className={styles.loyaltyPoints}>{mockUser.loyaltyPoints} pts</p>
              <p className={styles.loyaltyLabel}>Loyalty Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Nav ── */}
      <nav className={styles.tabNav}>
        <div className={styles.tabInner}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className={styles.tabIcon}>{TAB_ICONS[i]}</span>
              <span>{tab}</span>
              {activeTab === tab && <div className={styles.tabUnderline} />}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className={styles.content}>

        {/* ──────── PROFILE TAB ──────── */}
        {activeTab === "Profile" && (
          <div className={styles.tabPane}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Profile Information</h2>
              <button
                className={styles.editBtn}
                onClick={() => setEditMode((p) => !p)}
              >
                {editMode ? "✓ Save" : "✏️ Edit"}
              </button>
            </div>

            <div className={styles.profileGrid}>
              {[
                { label: "Full Name", key: "name", type: "text", icon: "👤" },
                { label: "Email Address", key: "email", type: "email", icon: "✉️" },
                { label: "Phone Number", key: "phone", type: "tel", icon: "📞" },
              ].map(({ label, key, type, icon }) => (
                <div key={key} className={styles.profileField}>
                  <span className={styles.pfIcon}>{icon}</span>
                  <div className={styles.pfContent}>
                    <label className={styles.pfLabel}>{label}</label>
                    {editMode ? (
                      <input
                        className={styles.pfInput}
                        type={type}
                        value={profileData[key]}
                        onChange={(e) =>
                          setProfileData((p) => ({ ...p, [key]: e.target.value }))
                        }
                      />
                    ) : (
                      <p className={styles.pfValue}>{profileData[key]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats strip */}
            <div className={styles.statsStrip}>
              {[
                { label: "Total Orders", value: mockUser.totalOrders, emoji: "📦" },
                { label: "Loyalty Points", value: `${mockUser.loyaltyPoints} pts`, emoji: "🎖️" },
                { label: "Member Since", value: mockUser.joined, emoji: "🗓️" },
                { label: "Saved Addresses", value: addresses.length, emoji: "📍" },
              ].map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <span className={styles.statEmoji}>{s.emoji}</span>
                  <p className={styles.statValue}>{s.value}</p>
                  <p className={styles.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>

            <button className={styles.logoutBtn}>🚪 Log Out</button>
          </div>
        )}

        {/* ──────── ORDERS TAB ──────── */}
        {activeTab === "My Orders" && (
          <div className={styles.tabPane}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>My Orders</h2>
              <span className={styles.sectionCount}>{mockOrders.length} orders</span>
            </div>

            <div className={styles.ordersList}>
              {mockOrders.map((order, i) => (
                <div
                  key={order.id}
                  className={`${styles.orderCard} ${expandedOrder === order.id ? styles.orderExpanded : ""}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    className={styles.orderTop}
                    onClick={() =>
                      setExpandedOrder(expandedOrder === order.id ? null : order.id)
                    }
                  >
                    <div className={styles.orderEmoji}>{order.emoji}</div>
                    <div className={styles.orderMain}>
                      <h3 className={styles.orderName}>{order.cake}</h3>
                      <p className={styles.orderMeta}>
                        {order.id} &nbsp;·&nbsp; {order.date}
                      </p>
                    </div>
                    <div className={styles.orderRight}>
                      <span className={`${styles.statusBadge} ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className={styles.orderPrice}>{order.price}</p>
                    </div>
                    <span className={`${styles.orderChevron} ${expandedOrder === order.id ? styles.chevronOpen : ""}`}>
                      ›
                    </span>
                  </div>

                  {expandedOrder === order.id && (
                    <div className={styles.orderDetail}>
                      <div className={styles.orderDetailGrid}>
                        <div><span>Occasion</span><strong>{order.occasion}</strong></div>
                        <div><span>Weight</span><strong>{order.weight}</strong></div>
                        <div><span>Amount</span><strong>{order.price}</strong></div>
                        <div><span>Status</span><strong>{order.status}</strong></div>
                      </div>
                      <div className={styles.orderActions}>
                        {order.status === "Delivered" && (
                          <button className={styles.orderActionBtn}>⭐ Rate & Review</button>
                        )}
                        <button className={styles.orderActionBtn}>🔁 Reorder</button>
                        <button className={`${styles.orderActionBtn} ${styles.orderActionSecondary}`}>
                          📄 Invoice
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ──────── ADDRESSES TAB ──────── */}
        {activeTab === "Addresses" && (
          <div className={styles.tabPane}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Saved Addresses</h2>
              <button className={styles.addBtn}>+ Add New</button>
            </div>

            <div className={styles.addressGrid}>
              {addresses.map((addr, i) => (
                <div
                  key={addr.id}
                  className={`${styles.addressCard} ${addr.isDefault ? styles.addressDefault : ""}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {addr.isDefault && (
                    <span className={styles.defaultTag}>✓ Default</span>
                  )}
                  <div className={styles.addrTop}>
                    <span className={styles.addrIcon}>{addr.icon}</span>
                    <h3 className={styles.addrLabel}>{addr.label}</h3>
                  </div>
                  <p className={styles.addrName}>{addr.name}</p>
                  <p className={styles.addrLine}>{addr.line1}</p>
                  <p className={styles.addrLine}>{addr.line2} – {addr.pin}</p>
                  <p className={styles.addrPhone}>{addr.phone}</p>
                  <div className={styles.addrActions}>
                    {!addr.isDefault && (
                      <button
                        className={styles.addrBtn}
                        onClick={() => setDefault(addr.id)}
                      >
                        Set Default
                      </button>
                    )}
                    <button className={styles.addrBtn}>✏️ Edit</button>
                    <button className={`${styles.addrBtn} ${styles.addrDelete}`}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}

              {/* Add address card */}
              <div className={`${styles.addressCard} ${styles.addAddressCard}`}>
                <span className={styles.addAddressIcon}>+</span>
                <p>Add New Address</p>
              </div>
            </div>
          </div>
        )}

        {/* ──────── WISHLIST TAB ──────── */}
        {activeTab === "Wishlist" && (
          <div className={styles.tabPane}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>My Wishlist</h2>
              <span className={styles.sectionCount}>{wishlist.length} cakes saved</span>
            </div>

            {wishlist.length === 0 ? (
              <div className={styles.emptyState}>
                <span>🎂</span>
                <h3>Your wishlist is empty</h3>
                <p>Save your favourite cakes here and order them anytime!</p>
                <button className={styles.editBtn}>Browse Cakes</button>
              </div>
            ) : (
              <div className={styles.wishGrid}>
                {wishlist.map((cake, i) => (
                  <div
                    key={cake.id}
                    className={styles.wishCard}
                    style={{ animationDelay: `${i * 0.09}s` }}
                  >
                    <button
                      className={styles.wishRemove}
                      onClick={() => removeWishlist(cake.id)}
                      title="Remove"
                    >
                      ×
                    </button>
                    <div className={styles.wishEmoji} style={{ background: cake.bg }}>
                      <span>{cake.emoji}</span>
                    </div>
                    <div className={styles.wishTag}>{cake.tag}</div>
                    <h3 className={styles.wishName}>{cake.name}</h3>
                    <p className={styles.wishWeight}>{cake.weight}</p>
                    <p className={styles.wishPrice}>{cake.price}</p>
                    <button className={styles.wishOrder}>Order Now 🎂</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}