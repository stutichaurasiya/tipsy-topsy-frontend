"use client";

import { useState, useEffect, useRef } from "react";
import "./privacy.css";

const FAQ_DATA = [
  {
    q: "Kya main custom design order kar sakti hoon?",
    a: "Bilkul! Tipsy-Topsy mein hum aapki dream cake banate hain. Apna design, color, aur flavor batayein — hum usse reality mein laate hain. Custom orders minimum 3 din pehle place karein.",
  },
  {
    q: "Kya allergen-free options available hain?",
    a: "Haan, hum gluten-free, egg-free, aur nut-free options offer karte hain. Order ke waqt clearly mention karein taaki hum proper precautions le sakein.",
  },
  {
    q: "Delivery kahan-kahan available hai?",
    a: "Abhi hum Lucknow ke saare major areas mein deliver karte hain. Orders ₹599 se upar free delivery milti hai. Specific area ke liye humse contact karein.",
  },
  {
    q: "Kya walk-in orders accept hote hain?",
    a: "Haan, in-store availability ke basis par same-day orders bhi le sakte hain. Lekin busy seasons (birthdays, festivals) mein advance booking recommended hai.",
  },
  {
    q: "Cake ka taste guarantee hai?",
    a: "100%! Agar aap satisfy nahi hain toh humse 24 ghante ke andar contact karein. Hum reshoot ya full refund denge — aapki khushi hamari priority hai 🎂",
  },
  {
    q: "Payment modes kaunse accepted hain?",
    a: "UPI, Debit/Credit Card, Net Banking, aur Cash on Delivery (limited areas) — sab accept hote hain. Online orders pe 5% discount bhi milta hai!",
  },
];

const SECTIONS = [
  { id: "faq", label: "FAQ" },
  { id: "cancellation", label: "Cancellation & Refund" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms & Conditions" },
];

const TERMS_DATA = [
  {
    title: "1. Acceptance of Terms",
    text: "Tipsy-Topsy website ya services use karke aap in terms se agree karte hain. Agar aap agree nahi karte, toh please services use na karein.",
  },
  {
    title: "2. Orders & Pricing",
    text: "Saari prices INR mein hain aur GST include hai. Order confirm hone ke baad price change nahi hogi. Hum prices update karne ka right rakhte hain bina prior notice ke.",
  },
  {
    title: "3. Delivery Policy",
    text: "Hum time pe deliver karne ki poori koshish karte hain. Traffic, weather, ya unforeseen circumstances mein delay possible hai. Late delivery ke liye hum sincere apology dete hain.",
  },
  {
    title: "4. Product Accuracy",
    text: "Custom cakes mein minor design variations possible hain. Reference images sirf inspiration ke liye hain — exact replica guarantee nahi hoti. Final product professionally crafted hoga.",
  },
  {
    title: "5. Intellectual Property",
    text: "Tipsy-Topsy ka logo, branding, aur content hamari property hai. Bina permission ke reproduce ya use karna prohibited hai.",
  },
  {
    title: "6. Liability",
    text: "Product purchase price se zyada liability hum nahi lete. Indirect ya consequential damages ke liye Tipsy-Topsy responsible nahi hai.",
  },
  {
    title: "7. Governing Law",
    text: "Yeh terms Lucknow, Uttar Pradesh, India ke laws ke under governed hain. Disputes ke liye Lucknow courts ki exclusive jurisdiction hogi.",
  },
];

export default function PrivacyPolicyPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeSection, setActiveSection] = useState("faq");
  const sectionRefs = useRef({});

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pp-page">

      {/* ── Hero ── */}
      <header className="pp-hero">
        <span className="pp-hero-cake">🎂</span>
        <h1>
          Tipsy<span>-Topsy</span>
        </h1>
        <p>Sweet promises, sweeter policies</p>
      </header>

      {/* ── Sticky Nav ── */}
      <nav className="pp-nav">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={activeSection === s.id ? "active" : ""}
            onClick={() => scrollTo(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* ── Main Content ── */}
      <main className="pp-layout">
        <div className="pp-badge">✨ Last updated: June 2025</div>

        {/* ── FAQ Section ── */}
        <section id="faq" ref={setRef("faq")} className="pp-section">
          <div className="pp-section-header">
            <div className="pp-section-icon">❓</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="pp-divider" />
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className={`pp-faq-item${openFAQ === i ? " open" : ""}`}
            >
              <button
                className="pp-faq-q"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
              >
                {item.q}
                <span className="pp-faq-arrow">⌄</span>
              </button>
              <div className="pp-faq-a">{item.a}</div>
            </div>
          ))}
        </section>

        <div className="pp-sep">· · ·</div>

        {/* ── Cancellation & Refund Section ── */}
        <section
          id="cancellation"
          ref={setRef("cancellation")}
          className="pp-section"
        >
          <div className="pp-section-header">
            <div className="pp-section-icon">↩️</div>
            <h2>Cancellation & Refund</h2>
          </div>
          <div className="pp-divider" />
          <div className="pp-cards">
            <div className="pp-card">
              <div className="pp-card-icon">⏰</div>
              <h3>48+ Ghante Pehle</h3>
              <p>
                Order delivery se 48 ghante pehle cancel karein — 100% full
                refund guaranteed. Koi sawaal nahi!
              </p>
            </div>
            <div className="pp-card">
              <div className="pp-card-icon">🕐</div>
              <h3>24–48 Ghante Pehle</h3>
              <p>
                50% refund milega. Humne baking process shuru kar di hoti hai,
                isliye partial refund apply hota hai.
              </p>
            </div>
            <div className="pp-card">
              <div className="pp-card-icon">🚫</div>
              <h3>24 Ghante Se Kam</h3>
              <p>
                Last-minute cancellations mein refund nahi milta. Custom cakes
                ke liye yeh strictly applicable hai.
              </p>
            </div>
            <div className="pp-card">
              <div className="pp-card-icon">💸</div>
              <h3>Refund Timeline</h3>
              <p>
                Approved refunds 5–7 working days mein original payment method
                par process ho jaate hain.
              </p>
            </div>
          </div>
          <div className="pp-notice">
            Custom orders (photocakes, sculpted cakes, wedding tiers) ke liye
            special cancellation terms apply hote hain. Order confirm hone ke
            baad cancel nahi ho sakta. Details ke liye humse seedha baat karein.
          </div>
        </section>

        <div className="pp-sep">· · ·</div>

        {/* ── Privacy Policy Section ── */}
        <section id="privacy" ref={setRef("privacy")} className="pp-section">
          <div className="pp-section-header">
            <div className="pp-section-icon">🔒</div>
            <h2>Privacy Policy</h2>
          </div>
          <div className="pp-divider" />
          <div className="pp-prose">
            <p>
              Tipsy-Topsy mein aapki privacy hamari sabse badi zimmedari hai.
              Jab aap hamare website ya app use karte hain, toh hum kuch basic
              information collect karte hain — sirf aapko better serve karne ke
              liye.
            </p>

            <h3>Hum kya collect karte hain?</h3>
            <ul>
              <li>Naam, phone number, aur delivery address (order ke liye)</li>
              <li>Email address (order confirmation aur offers ke liye)</li>
              <li>Payment details (encrypted, hum store nahi karte)</li>
              <li>Order history aur preferences</li>
              <li>Website usage data (Google Analytics ke zariye)</li>
            </ul>

            <h3>Aapka data kaise use hota hai?</h3>
            <ul>
              <li>Orders process karne aur delivery coordinate karne ke liye</li>
              <li>Customer support provide karne ke liye</li>
              <li>
                Special offers aur birthday reminders bhejne ke liye (opt-in)
              </li>
              <li>Website improve karne ke liye</li>
            </ul>

            <h3>Aapka data share hota hai?</h3>
            <p>
              Hum kabhi bhi aapka personal data third parties ko bechte nahi
              hain. Sirf delivery partners (jaise Dunzo, Swiggy Genie) ko
              delivery ke liye basic info share ki jaati hai.
            </p>

            <h3>Aapke rights</h3>
            <ul>
              <li>Apna data access ya delete karne ka haq</li>
              <li>Marketing emails se unsubscribe karna</li>
              <li>Data correction request karna</li>
            </ul>

            <p>
              Privacy se related koi sawaal ho toh:{" "}
              <strong>privacy@tipsytopsy.in</strong>
            </p>
          </div>
        </section>

        <div className="pp-sep">· · ·</div>

        {/* ── Terms & Conditions Section ── */}
        <section id="terms" ref={setRef("terms")} className="pp-section">
          <div className="pp-section-header">
            <div className="pp-section-icon">📋</div>
            <h2>Terms & Conditions</h2>
          </div>
          <div className="pp-divider" />
          <div className="pp-timeline">
            {TERMS_DATA.map((item, i) => (
              <div key={i} className="pp-tl-item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="pp-notice">
            In terms ko kabhi bhi update kiya ja sakta hai. Changes website pe
            post honge. Continued use ka matlab hai aap updated terms se agree
            karte hain. Questions? 📧 legal@tipsytopsy.in
          </div>
        </section>
      </main>
    </div>
  );
}