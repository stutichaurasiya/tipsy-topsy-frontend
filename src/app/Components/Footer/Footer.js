
import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top Decorative Bar */}
      <div className="footer__top-bar">
        <span className="footer__top-bar-emoji">🎂</span>
        <span className="footer__top-bar-line" />
        <span className="footer__top-bar-text">Handcrafted with Love</span>
        <span className="footer__top-bar-line" />
        <span className="footer__top-bar-emoji">🎀</span>
      </div>

      {/* Newsletter */}
      <div className="footer__newsletter">
        <div className="footer__newsletter-left">
          <span className="footer__newsletter-label">Stay Sweet</span>
          <h3 className="footer__newsletter-title">
            Get exclusive offers &amp; cake drops
          </h3>
        </div>
        <div className="footer__email-box">
          <input
            type="email"
            placeholder="Your email address"
            className="footer__email-input"
          />
          <button className="footer__email-btn">Subscribe →</button>
        </div>
      </div>

      {/* Divider */}
      <div className="footer__divider" />

      {/* Main Grid */}
      <div className="footer__main">
        {/* Brand Column */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-emoji">🎂</span>
            <span className="footer__logo-text">Tipsy Topsy</span>
          </div>
          <p className="footer__tagline">
            Baking memories, one slice at a time.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="footer__social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="footer__social-icon" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="footer__social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
              </svg>
            </a>
          </div>
        </div>

        {/* Know Us */}
        <div className="footer__link-group">
          <h2 className="footer__group-title">Know Us</h2>
          <ul className="footer__links">
            <li><Link href="/About">About Us</Link></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Media</a></li>
          </ul>
        </div>




        {/* Need Help */}
        <div className="footer__link-group">
          <h2 className="footer__group-title">Need Help</h2>
          <ul className="footer__links">
            <li><Link href="/Contact">Contact Us</Link></li>
            <li><Link href="/privacy-policy#faq">FAQ</Link></li>
            <li> <Link href="/privacy-policy#cancellation">Cancellation & Refund</Link></li>
            <li> <Link href="/privacy-policy#privacy">Privacy Policy</Link>           </li>
            <li><Link href="/privacy-policy#terms">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom-bar">
        <p className="footer__copy">© 2026 Tipsy Topsy. All rights reserved.</p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
