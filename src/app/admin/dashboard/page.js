"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);
  }, []);

  const stats = [
    { label: "Total Products",   value: 24,       icon: "🧁", colorClass: styles.cardPurple },
    { label: "Categories",       value: 6,        icon: "🏷️", colorClass: styles.cardOrange },
    { label: "Orders Today",     value: 13,       icon: "📦", colorClass: styles.cardGreen  },
    { label: "Revenue (Today)",  value: "₹9,840", icon: "💰", colorClass: styles.cardPink   },
  ];

  const navItems = [
    { key: "dashboard",  icon: "🏠", label: "Dashboard",  href: "/admin/dashboard"  },
    { key: "products",   icon: "🧁", label: "Products",   href: "/admin/products"   },
    { key: "categories", icon: "🏷️", label: "Categories", href: "/admin/categories" },
    { key: "orders",     icon: "📦", label: "Orders",     href: "/admin/orders"     },
  ];

  const recentActivity = [
    { time: "2 min ago",  text: "New order: Red Velvet × 2",           color: "#8b5cf6" },
    { time: "15 min ago", text: "Product updated: Chocolate Truffle",   color: "#f97316" },
    { time: "1 hr ago",   text: "New category added: Seasonal",         color: "#10b981" },
    { time: "2 hr ago",   text: "Order delivered: #TT-204",             color: "#ec4899" },
    { time: "3 hr ago",   text: "Low stock alert: Mango Tango (3 left)", color: "#ef4444" },
  ];

  return (
    <div className={`${styles.page} ${visible ? styles.visible : ""}`}>

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.logoBox}>
          <span className={styles.logoEmoji}>🎂</span>
          <div>
            <p className={styles.logoName}>Tipsy Topsy</p>
            <p className={styles.logoSub}>ADMIN PANEL</p>
          </div>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`${styles.navBtn} ${activeNav === item.key ? styles.navActive : ""}`}
              onClick={() => {
                setActiveNav(item.key);
                router.push(item.href);
              }}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className={styles.backBtn} onClick={() => router.push("/")}>
          ← Back to Site
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className={styles.main}>

        {/* ── Top Bar ── */}
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Good morning, Admin 👋</h1>
            <p className={styles.pageSub}>Tipsy Topsy · Lucknow</p>
          </div>
          <div className={styles.adminBadge}>
            <span className={styles.adminAvatar}>🎂</span>
            <span className={styles.adminName}>Admin</span>
          </div>
        </div>

        {/* ── Stats Cards ── */}
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={`${styles.statCard} ${s.colorClass}`}>
              <div className={styles.statGlow} />
              <span className={styles.statIcon}>{s.icon}</span>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick Actions ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>⚡ Quick Actions</h2>
          <div className={styles.quickGrid}>
            {[
              { icon: "🧁", label: "Add Product",   href: "/admin/products",   cls: styles.qPurple },
              { icon: "🏷️", label: "Add Category",  href: "/admin/categories", cls: styles.qOrange },
              { icon: "📦", label: "View Orders",   href: "/admin/orders",     cls: styles.qGreen  },
            ].map((q) => (
              <button
                key={q.label}
                className={`${styles.quickBtn} ${q.cls}`}
                onClick={() => router.push(q.href)}
              >
                <span className={styles.quickIcon}>{q.icon}</span>
                <span className={styles.quickLabel}>{q.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Recent Activity ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>🕐 Recent Activity</h2>
          <div className={styles.activityCard}>
            {recentActivity.map((a, i) => (
              <div key={i} className={styles.activityRow}>
                <span
                  className={styles.activityDot}
                  style={{ background: a.color }}
                />
                <div className={styles.activityInfo}>
                  <p className={styles.activityText}>{a.text}</p>
                  <p className={styles.activityTime}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}