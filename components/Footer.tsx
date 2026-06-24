import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h4>Business Plans</h4>
            <ul>
              <li><Link href="/contracts">6-Month Contract</Link></li>
              <li><Link href="/contracts">12-Month Contract</Link></li>
              <li><Link href="/contracts">5-Year Contract</Link></li>
              <li><Link href="/contracts">Compare All Plans</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>Support</h4>
            <ul>
              <li><Link href="/faq">FAQ's</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Community Forums</Link></li>
              <li><Link href="#">Report a Bug</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>

          <div>
            &copy; {new Date().getFullYear()} Microsoft Team Services. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
