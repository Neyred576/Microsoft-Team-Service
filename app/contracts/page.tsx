import { Check } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';
import { AppIcons } from '../../components/AppIcons';
import SlideUp from '../../components/animations/SlideUp';
import StaggerGrid from '../../components/animations/StaggerGrid';
import FadeIn from '../../components/animations/FadeIn';

const plans = [
  {
    title: '1 – 2 Device Users',
    price: '$600',
    vat: '+20 VAT',
    recommended: false,
    features: [
      'Advanced identity and access management for up to 1–2 device users',
      'Web, mobile, and desktop versions 3 of Word, Excel, PowerPoint, and Access',
      'MTS 1 TB of cloud storage per device user',
      '10+ additional data files for your business needs (Bookings, Planner, and Forms)',
      'AI chat experience with web grounding, writing assistance, data analysis, and access to agents',
      'Enhanced cyberthreat protection against viruses and phishing attacks',
      'Discovery, classification, and protection of sensitive data',
      'Anytime email and web customer support',
    ],
  },
  {
    title: '2 – 5 Device Users',
    price: '$1,500',
    vat: '+20 VAT',
    recommended: true,
    features: [
      'Core identity and access management for up to 3–5 device users',
      'Desktop, web, and versions 3 of Word, Excel, PowerPoint, and Access',
      'MTS 3 TB of cloud storage per user',
      '10+ additional data files for your business needs (including Microsoft Loop, Bookings, Planner, and Forms)',
      'AI chat experience with web grounding, writing assistance, data analysis, and access to agents',
      'Automatic spam and malware filtering',
      'Anytime email and web customer support',
    ],
  },
  {
    title: '6 – 15 Device Users',
    price: '$4,500',
    vat: '+20 VAT',
    recommended: false,
    features: [
      'Core identity and access management for up to 6–15 device users',
      'Desktop, web, and versions 5 of Word, Excel, PowerPoint, and Access',
      'MTS 10 TB of cloud storage per user',
      '20+ additional data files for your business needs (including Microsoft Loop, Bookings, Planner, and Forms)',
      'AI chat experience with web grounding, writing assistance, data analysis, and access to agents',
      'Automatic spam and malware filtering',
      'Anytime email and web customer support',
    ],
  },
];

const apps = [
  'Word', 'Excel', 'PowerPoint', 'Outlook',
  'Teams', 'OneDrive', 'SharePoint', 'Forms',
  'Planner', 'Bookings', 'Loop', 'Defender',
];

export default function ContractsPage() {
  return (
    <div>
      {/* Page Header */}
      <SlideUp className={styles.pricingHeader}>
        <h1 className="section-title">Microsoft Team Services Business Contracts</h1>
        <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>
          Choose the plan that fits your team size. All plans include Microsoft apps, cloud storage, AI tools, and dedicated support.
        </p>
      </SlideUp>

      {/* Pricing Cards */}
      <div className="container">
        <StaggerGrid className={styles.pricingGrid}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`${styles.pricingCard} ${plan.recommended ? styles.recommended : ''}`}
            >
              {plan.recommended && (
                <div className={styles.recommendedBadge}>Most Popular</div>
              )}
              <h2 className={styles.planTitle}>{plan.title}</h2>

              <div className={styles.priceBlock}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.priceUnit}> {plan.vat}</span>
              </div>

              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem', display: 'block', textAlign: 'center' }}>
                Get started
              </Link>

              <ul className={styles.featureList}>
                {plan.features.map((f, j) => (
                  <li key={j} className={styles.featureItem}>
                    <Check className={styles.featureCheckIcon} size={16} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="#apps" className="btn btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: 'auto' }}>
                See included apps
              </Link>
            </div>
          ))}
        </StaggerGrid>

        {/* Included Apps Section */}
        <FadeIn>
          <section id="apps" className={styles.appsSection}>
            <h2 className={styles.appsTitle}>Apps included in your plan</h2>
            <p className={styles.appsSubtitle}>
              All contracts include access to the Microsoft productivity suite. Click any app to learn more.
            </p>
            <StaggerGrid className={styles.appsGrid} staggerDelay={0.05}>
              {apps.map((name, i) => {
                const Icon = AppIcons[name];
                return (
                  <a key={i} href="#" className={styles.appButton}>
                    <span className={styles.appIcon}>
                      {Icon ? <Icon /> : null}
                    </span>
                    <span className={styles.appName}>{name}</span>
                  </a>
                );
              })}
            </StaggerGrid>
          </section>
        </FadeIn>

        {/* Comparison Table */}
        <FadeIn delay={0.2}>
          <section id="compare" className={styles.tableSection}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Compare all plans</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th style={{ width: '40%' }}>Feature</th>
                    <th>1–2 Users</th>
                    <th>2–5 Users</th>
                    <th>6–15 Users</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.featureCategory}><td colSpan={4}>Cloud Storage</td></tr>
                  <tr>
                    <td>Storage per user</td>
                    <td>1 TB</td>
                    <td>3 TB</td>
                    <td>10 TB</td>
                  </tr>
                  <tr className={styles.featureCategory}><td colSpan={4}>Microsoft Apps</td></tr>
                  <tr>
                    <td>App versions included</td>
                    <td>3</td>
                    <td>3</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Desktop apps</td>
                    <td><Check size={16} color="var(--ms-blue)" style={{ margin: '0 auto', display: 'block' }} /></td>
                    <td><Check size={16} color="var(--ms-blue)" style={{ margin: '0 auto', display: 'block' }} /></td>
                    <td><Check size={16} color="var(--ms-blue)" style={{ margin: '0 auto', display: 'block' }} /></td>
                  </tr>
                  <tr className={styles.featureCategory}><td colSpan={4}>Security</td></tr>
                  <tr>
                    <td>Cyberthreat protection</td>
                    <td>Advanced</td>
                    <td>Standard</td>
                    <td>Standard</td>
                  </tr>
                  <tr>
                    <td>Sensitive data protection</td>
                    <td><Check size={16} color="var(--ms-blue)" style={{ margin: '0 auto', display: 'block' }} /></td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Spam & malware filtering</td>
                    <td>-</td>
                    <td><Check size={16} color="var(--ms-blue)" style={{ margin: '0 auto', display: 'block' }} /></td>
                    <td><Check size={16} color="var(--ms-blue)" style={{ margin: '0 auto', display: 'block' }} /></td>
                  </tr>
                  <tr className={styles.featureCategory}><td colSpan={4}>Support</td></tr>
                  <tr>
                    <td>Customer support</td>
                    <td>Email & Web</td>
                    <td>Email & Web</td>
                    <td>Email & Web</td>
                  </tr>
                  <tr className={styles.featureCategory}><td colSpan={4}>Add-ons</td></tr>
                  <tr>
                    <td>Additional data files</td>
                    <td>10+</td>
                    <td>10+</td>
                    <td>20+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
