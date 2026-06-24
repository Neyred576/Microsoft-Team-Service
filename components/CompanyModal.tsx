'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MapPin, Monitor, CreditCard, Building2 } from 'lucide-react';
import { Company } from '../lib/companyStore';
import styles from './CompanyModal.module.css';

interface CompanyModalProps {
  company: Company | null;
  onClose: () => void;
}

export default function CompanyModal({ company, onClose }: CompanyModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (company) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [company]);

  return (
    <AnimatePresence>
      {company && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>

            {/* Header */}
            <div className={styles.header}>
              {company.logoUrl ? (
                <div className={styles.logoWrapper}>
                  <img src={company.logoUrl} alt={`${company.name} logo`} className={styles.logo} />
                </div>
              ) : (
                <div className={styles.logoPlaceholder}>
                  <Building2 size={40} />
                </div>
              )}
              <div className={styles.headerInfo}>
                <p className={styles.profileLabel}>Company Profile</p>
                <h2 className={styles.companyName}>{company.name}</h2>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Details */}
            <div className={styles.details}>
              {company.address && (
                <div className={styles.detailRow}>
                  <MapPin size={16} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Address</span>
                    <span className={styles.detailValue}>{company.address}</span>
                  </div>
                </div>
              )}

              {company.email && (
                <div className={styles.detailRow}>
                  <Mail size={16} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>Email</span>
                    <a href={`mailto:${company.email}`} className={styles.detailValueHighlight}>
                      {company.email}
                    </a>
                  </div>
                </div>
              )}

              {company.mtsAccount && (
                <div className={styles.detailRow}>
                  <CreditCard size={16} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>MTS Account</span>
                    <span className={styles.detailValueAccount}>{company.mtsAccount}</span>
                  </div>
                </div>
              )}

              {company.mtsUsage && (
                <div className={styles.detailRow}>
                  <Monitor size={16} className={styles.detailIcon} />
                  <div>
                    <span className={styles.detailLabel}>MTS Usage</span>
                    <span className={styles.detailValue}>{company.mtsUsage}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Badge */}
            <div className={styles.footer}>
              <span className={styles.verifiedBadge}>✓ Verified MTS Client</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
