import Link from 'next/link';
import { ShieldCheck, Cloud, Users, Zap, Lock, Globe } from 'lucide-react';
import styles from './page.module.css';
import ClientSearch from '../components/ClientSearch';
import SlideUp from '../components/animations/SlideUp';
import StaggerGrid from '../components/animations/StaggerGrid';
import FadeIn from '../components/animations/FadeIn';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <img 
          src="/hero_bg.png" 
          alt="Abstract tech background" 
          className={styles.heroBackgroundImage} 
        />
        <div className={styles.heroOverlay}></div>
        <SlideUp className={styles.heroContent} duration={0.8}>
          <h1 className={styles.heroTitle}>Empower your enterprise with Microsoft Team Services</h1>
          <p className={styles.heroSubtitle}>
            Unlock world-class productivity, enterprise-grade security, and seamless collaboration with our tailored business contracts.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contracts" className={`btn ${styles.btnHeroPrimary}`}>
              View Business Contracts
            </Link>
            <Link href="/contact" className={`btn btn-outline ${styles.btnHeroSecondary}`}>
              Contact Sales
            </Link>
          </div>
        </SlideUp>
      </section>

      <section className="section container">
        <SlideUp>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>Comprehensive Business Solutions</h2>
          <p className="section-subtitle text-center" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem' }}>
            Discover the tools and services designed to help your organization achieve more. 
            Our plans are built for businesses of all sizes demanding reliability and performance.
          </p>
        </SlideUp>

        <StaggerGrid className={styles.featuresGrid}>
          <div className="card featureCard">
            <div className={styles.featureIcon}>
              <Cloud size={24} />
            </div>
            <h3 className={styles.featureTitle}>Cloud Infrastructure</h3>
            <p className={styles.featureDesc}>
              Scale your operations with secure, reliable cloud hosting and storage solutions that grow with your business needs.
            </p>
            <Link href="/contracts" className="btn btn-outline">Learn more</Link>
          </div>
          
          <div className="card featureCard">
            <div className={styles.featureIcon}>
              <Users size={24} />
            </div>
            <h3 className={styles.featureTitle}>Team Collaboration</h3>
            <p className={styles.featureDesc}>
              Connect your workforce across the globe with premium communication tools, shared workspaces, and real-time co-authoring.
            </p>
            <Link href="/contracts" className="btn btn-outline">Learn more</Link>
          </div>

          <div className="card featureCard">
            <div className={styles.featureIcon}>
              <ShieldCheck size={24} />
            </div>
            <h3 className={styles.featureTitle}>Enterprise Security</h3>
            <p className={styles.featureDesc}>
              Protect your data with advanced threat protection, identity management, and compliance tools built into every plan.
            </p>
            <Link href="/contracts" className="btn btn-outline">Learn more</Link>
          </div>
        </StaggerGrid>
      </section>

      <FadeIn delay={0.2}>
        <ClientSearch />
      </FadeIn>

      <section className="section container">
        <div className={styles.modernWorkGrid}>
          <SlideUp>
            <h2 className="section-title">Built for modern work</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--ms-gray-130)' }}>
              Whether your team is fully remote, hybrid, or in the office, Microsoft Team Services provides the unified platform needed to maintain productivity and culture.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Zap size={20} color="var(--ms-blue)" />
                <span>Lightning-fast performance globally</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Lock size={20} color="var(--ms-blue)" />
                <span>Zero-trust security architecture</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Globe size={20} color="var(--ms-blue)" />
                <span>99.9% financially-backed uptime guarantee</span>
              </li>
            </ul>
            <Link href="/contracts" className="btn btn-primary">Compare plans</Link>
          </SlideUp>
          <FadeIn delay={0.2}>
             <img 
               src="/modern_work.png" 
               alt="Modern professionals collaborating" 
               style={{ 
                 width: '100%', 
                 height: 'auto', 
                 borderRadius: '8px',
                 boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
                 display: 'block'
               }} 
             />
          </FadeIn>
        </div>
      </section>

      <SlideUp className={`section ${styles.ctaSection}`}>
        <div className="container">
          <h2 className="section-title">Ready to upgrade your business?</h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Choose the contract that best fits your organizational needs and start transforming how your team works today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Link href="/contracts" className="btn btn-primary">View Pricing</Link>
            <Link href="/contact" className="btn btn-outline">Talk to an expert</Link>
          </div>
        </div>
      </SlideUp>
    </>
  );
}
