'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoArea}>
          {/* We assume the user copies the logo to public/logo.png */}
          <Link href="/">
            <img src="/logo.png" alt="Microsoft Team Services Logo" className={styles.logoImage} />
          </Link>
          <div className={styles.separator}></div>
          <Link href="/" className={styles.brandName}>
            Microsoft Team - Company Services
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link 
            href="/contracts" 
            className={`${styles.navLink} ${pathname === '/contracts' ? styles.navLinkActive : ''}`}
          >
            Business Contract
          </Link>

          <Link 
            href="/policy" 
            className={`${styles.navLink} ${pathname === '/policy' ? styles.navLinkActive : ''}`}
          >
            Device Authorization Policy
          </Link>

          <Link 
            href="/faq" 
            className={`${styles.navLink} ${pathname === '/faq' ? styles.navLinkActive : ''}`}
          >
            FAQ&apos;s
          </Link>

          <Link 
            href="/contact" 
            className={`${styles.navLink} ${pathname === '/contact' ? styles.navLinkActive : ''}`}
          >
            Contact
          </Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/contracts" className="btn btn-primary" style={{ padding: '0.375rem 1rem', fontSize: '0.875rem' }}>
            View Contracts
          </Link>
        </div>
      </div>
    </header>
  );
}
