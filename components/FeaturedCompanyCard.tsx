import styles from './FeaturedCompanyCard.module.css';
import { Company } from '../lib/companyStore';
import { Mail, Phone, MapPin, Monitor, Key } from 'lucide-react';

export default function FeaturedCompanyCard({ company }: { company: Company }) {
  // Gmail compose link
  const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${company.email}`;
  
  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        {company.logoUrl ? (
          <img src={company.logoUrl} alt={company.name} className={styles.logo} />
        ) : (
          <div className={styles.logoPlaceholder}>{company.name.charAt(0)}</div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{company.name}</h3>
          <span className={styles.badge}>Featured Partner</span>
        </div>
        
        <div className={styles.details}>
          {company.address && (
            <p className={styles.detailRow}>
              <MapPin className={styles.icon} size={14} />
              {company.address}
            </p>
          )}
          
          {company.email && (
            <p className={styles.detailRow}>
              <Mail className={styles.icon} size={14} />
              <a href={emailLink} target="_blank" rel="noopener noreferrer" className={styles.emailHighlight}>
                {company.email}
              </a>
            </p>
          )}
          
          {company.phone && (
            <p className={styles.detailRow}>
              <Phone className={styles.icon} size={14} />
              <a href={`tel:${company.phone}`}>
                {company.phone}
              </a>
            </p>
          )}

          {company.mtsAccount && (
            <p className={styles.detailRow}>
              <Key className={styles.icon} size={14} />
              <span className={styles.accountHighlight}>Account: {company.mtsAccount}</span>
            </p>
          )}
          
          {company.mtsUsage && (
            <p className={styles.detailRow}>
              <Monitor className={styles.icon} size={14} />
              <span>Usage: {company.mtsUsage}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
