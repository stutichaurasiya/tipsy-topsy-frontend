"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    cakeSize: "",
    flavour: "",
    deliveryDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const occasions = [
    "Birthday",
    "Wedding",
    "Anniversary",
    "Baby Shower",
    "Corporate Event",
    "Custom Order",
    "Other",
  ];

  const flavours = [
    "Classic Vanilla",
    "Dark Chocolate",
    "Red Velvet",
    "Butterscotch",
    "Strawberry",
    "Black Forest",
    "Mango Delight",
    "Pistachio Rose",
  ];

  return (
    <div className={styles.page}>
      {/* Floating Decorative Elements */}
      <div className={styles.floatingDecor}>
        <span className={styles.cherry1}>🍒</span>
        <span className={styles.star1}>✦</span>
        <span className={styles.star2}>✦</span>
        <span className={styles.cake1}>🎂</span>
        <span className={styles.star3}>✧</span>
        <span className={styles.cherry2}>🍓</span>
        <span className={styles.star4}>✦</span>
      </div>

      {/* Hero Section */}
      <section className={`${styles.hero} ${visible ? styles.heroVisible : ""}`}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>
            <span className={styles.dividerLine}></span>
            Sweet Conversations
            <span className={styles.dividerLine}></span>
          </p>
          <h1 className={styles.heroTitle}>
            Let's Bake Your
            <br />
            <em>Dream Cake</em>
          </h1>
          <p className={styles.heroSubtitle}>
            Every great cake starts with a conversation. Tell us your vision —
            we'll craft something unforgettable.
          </p>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll to Order</span>
          <div className={styles.scrollDot}></div>
        </div>
      </section>

      {/* Info Cards */}
      <section className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={`${styles.infoCard} ${styles.infoCard1}`}>
            <div className={styles.infoIcon}>📍</div>
            <h3>Visit Our Bakery</h3>
            <p>12, Hazratganj Market</p>
            <p>Lucknow, UP 226001</p>
            <span className={styles.infoTag}>Open Daily 9am – 9pm</span>
          </div>
          <div className={`${styles.infoCard} ${styles.infoCard2}`}>
            <div className={styles.infoIcon}>📞</div>
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
            <p>+91 91234 56789</p>
            <span className={styles.infoTag}>WhatsApp Available</span>
          </div>
          <div className={`${styles.infoCard} ${styles.infoCard3}`}>
            <div className={styles.infoIcon}>✉️</div>
            <h3>Email Us</h3>
            <p>hello@sweetlayers.in</p>
            <p>orders@sweetlayers.in</p>
            <span className={styles.infoTag}>Reply within 2 Hours</span>
          </div>
          <div className={`${styles.infoCard} ${styles.infoCard4}`}>
            <div className={styles.infoIcon}>🚚</div>
            <h3>Delivery</h3>
            <p>Free delivery above ₹1500</p>
            <p>Same-day if ordered by 12pm</p>
            <span className={styles.infoTag}>Lucknow & Nearby</span>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.formLeft}>
            <h2 className={styles.formTitle}>
              Order Your <br />
              <em>Perfect Cake</em>
            </h2>
            <p className={styles.formDesc}>
              Fill in your details and we'll get back to you within 2 hours
              with a quote and timeline.
            </p>

            <div className={styles.promiseBadges}>
              <div className={styles.badge}>
                <span>🎨</span> Custom Designs
              </div>
              <div className={styles.badge}>
                <span>🌿</span> Fresh Ingredients
              </div>
              <div className={styles.badge}>
                <span>⏰</span> On-Time Delivery
              </div>
              <div className={styles.badge}>
                <span>💯</span> Satisfaction Guaranteed
              </div>
            </div>

            <div className={styles.testimonialBox}>
              <p className={styles.testimonialText}>
                "Sweet Layers made our wedding cake beyond magical. Every guest
                was asking about it!"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>P</div>
                <div>
                  <strong>Priya Sharma</strong>
                  <span>Wedding Order — 2024</span>
                </div>
              </div>
              <div className={styles.stars}>★★★★★</div>
            </div>
          </div>

          <div className={styles.formRight}>
            {submitted ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>🎂</div>
                <h3>Order Request Received!</h3>
                <p>
                  Thank you, <strong>{formData.name}</strong>! Our cake artist
                  will contact you at <strong>{formData.email}</strong> within 2
                  hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      occasion: "",
                      cakeSize: "",
                      flavour: "",
                      deliveryDate: "",
                      message: "",
                    });
                  }}
                >
                  Place Another Order
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div
                    className={`${styles.fieldGroup} ${
                      focusedField === "name" ? styles.focused : ""
                    } ${formData.name ? styles.filled : ""}`}
                  >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label htmlFor="name">Your Name *</label>
                    <div className={styles.fieldLine}></div>
                  </div>
                  <div
                    className={`${styles.fieldGroup} ${
                      focusedField === "phone" ? styles.focused : ""
                    } ${formData.phone ? styles.filled : ""}`}
                  >
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label htmlFor="phone">Phone Number *</label>
                    <div className={styles.fieldLine}></div>
                  </div>
                </div>

                <div
                  className={`${styles.fieldGroup} ${
                    focusedField === "email" ? styles.focused : ""
                  } ${formData.email ? styles.filled : ""}`}
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="email">Email Address *</label>
                  <div className={styles.fieldLine}></div>
                </div>

                <div className={styles.formRow}>
                  <div
                    className={`${styles.fieldGroup} ${styles.selectGroup} ${
                      formData.occasion ? styles.filled : ""
                    }`}
                  >
                    <select
                      name="occasion"
                      id="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled></option>
                      {occasions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="occasion">Occasion *</label>
                    <div className={styles.fieldLine}></div>
                  </div>

                  <div
                    className={`${styles.fieldGroup} ${styles.selectGroup} ${
                      formData.flavour ? styles.filled : ""
                    }`}
                  >
                    <select
                      name="flavour"
                      id="flavour"
                      value={formData.flavour}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled></option>
                      {flavours.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="flavour">Cake Flavour *</label>
                    <div className={styles.fieldLine}></div>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <p className={styles.sizeLabel}>Cake Size</p>
                    <div className={styles.sizeOptions}>
                      {["0.5 kg", "1 kg", "1.5 kg", "2 kg", "Custom"].map(
                        (size) => (
                          <label key={size} className={styles.sizeOption}>
                            <input
                              type="radio"
                              name="cakeSize"
                              value={size}
                              checked={formData.cakeSize === size}
                              onChange={handleChange}
                            />
                            <span>{size}</span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div
                    className={`${styles.fieldGroup} ${
                      focusedField === "deliveryDate" ? styles.focused : ""
                    } ${formData.deliveryDate ? styles.filled : ""}`}
                  >
                    <input
                      type="date"
                      name="deliveryDate"
                      id="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("deliveryDate")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                    <label htmlFor="deliveryDate">Delivery Date *</label>
                    <div className={styles.fieldLine}></div>
                  </div>
                </div>

                <div
                  className={`${styles.fieldGroup} ${styles.textareaGroup} ${
                    focusedField === "message" ? styles.focused : ""
                  } ${formData.message ? styles.filled : ""}`}
                >
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  ></textarea>
                  <label htmlFor="message">
                    Custom Design Notes / Message on Cake
                  </label>
                  <div className={styles.fieldLine}></div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <span className={styles.submitText}>
                    Send My Order Request
                  </span>
                  <span className={styles.submitIcon}>🎂</span>
                  <div className={styles.submitRipple}></div>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map / Location Banner */}
      <section className={styles.locationBanner}>
        <div className={styles.locationContent}>
          <h2>Come Visit Us</h2>
          <p>
            Walk into our bakery and smell the magic. Free tasting samples for
            wedding orders!
          </p>
          <div className={styles.locationDetails}>
            <span>📍 12, Hazratganj Market, Lucknow</span>
            <span>🕘 Mon–Sun: 9:00 AM – 9:00 PM</span>
          </div>
        </div>
        <div className={styles.mapPlaceholder}>
          <div className={styles.mapPulse}></div>
          <span className={styles.mapPin}>📍</span>
          <p>Sweet Layers Bakery</p>
        </div>
      </section>

      {/* FAQ Strip */}
      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqGrid}>
          {[
            {
              q: "How far in advance should I order?",
              a: "We recommend 3–5 days for custom cakes and 7–10 days for wedding cakes.",
            },
            {
              q: "Do you offer eggless options?",
              a: "Absolutely! All our cakes are available in eggless variants at no extra cost.",
            },
            {
              q: "Can I request a specific design?",
              a: "Yes! Share a reference image and our artists will recreate or exceed your vision.",
            },
            {
              q: "What are your delivery charges?",
              a: "Free delivery in Lucknow for orders above ₹1500. Nominal charges apply otherwise.",
            },
          ].map((faq, i) => (
            <div key={i} className={styles.faqCard}>
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}