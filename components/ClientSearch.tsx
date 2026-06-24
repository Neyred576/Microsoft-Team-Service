'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ClientSearch.module.css';
import { Company, getCompanies } from '../lib/companyStore';
import CompanyModal from './CompanyModal';

const mockCompanies: string[] = [
  'EMIRATES GROUP',
  'ETIHAD AIRWAYS',
  'DUBAI ELECTRICITY AND WATER AUTHORITY (DEWA)',
  'COMMERCIAL BANK OF DUBAI',
  'DU',
  'E& (ETISALAT)',
  'G42',
  'MAJID AL FUTTAIM',
  'EMAAR PROPERTIES',
  'DAMAC PROPERTIES',
  'NAKHEEL',
  'DUBAI HOLDING',
  'MERAAS',
  'ALDAR PROPERTIES',
  'SOBHA REALTY',
  'AZIZI DEVELOPMENTS',
  'DANUBE PROPERTIES',
  'UNION PROPERTIES',
  'ADNOC',
  'ENOC',
  'DP WORLD',
  'JAFZA',
  'DUBAI AIRPORTS',
  'DNATA',
  'ARAMEX',
  'GULF AGENCY COMPANY (GAC)',
  'AGILITY LOGISTICS UAE',
  'TRANSGUARD GROUP',
  'EMIRATES POST GROUP',
  'FIRST ABU DHABI BANK (FAB)',
  'EMIRATES NBD',
  'ABU DHABI COMMERCIAL BANK (ADCB)',
  'MASHREQ BANK',
  'RAKBANK',
  'DUBAI ISLAMIC BANK',
  'ABU DHABI ISLAMIC BANK (ADIB)',
  'HSBC UAE',
  'STANDARD CHARTERED UAE',
  'NATIONAL BANK OF FUJAIRAH',
  'ASTER DM HEALTHCARE',
  'NMC HEALTHCARE',
  'MEDICLINIC MIDDLE EAST',
  'BURJEEL HOLDINGS',
  'SAUDI GERMAN HEALTH UAE',
  'LIFE HEALTHCARE GROUP',
  'AMERICAN HOSPITAL DUBAI',
  'CLEVELAND CLINIC ABU DHABI',
  'DUBAI HEALTH',
  'PUREHEALTH',
  'AL FUTTAIM GROUP',
  'AL GHURAIR GROUP',
  'AL NABOODAH GROUP',
  'JUMA AL MAJID HOLDING GROUP',
  'KHANSAHEB GROUP',
  'ALEC ENGINEERING',
  'DUTCO GROUP',
  'ASGC CONSTRUCTION',
  'ARABTEC HOLDING (LEGACY PROJECTS)',
  'GINCO GROUP',
  'LANDMARK GROUP',
  'LULU GROUP INTERNATIONAL',
  'CHALHOUB GROUP',
  'APPAREL GROUP',
  'GMG',
  'UNION COOP',
  'SPINNEYS UAE',
  'CARREFOUR UAE',
  'CHOITHRAMS',
  'WEST ZONE GROUP',
  'DUBAI WORLD TRADE CENTRE',
  'DUBAI CHAMBER OF COMMERCE',
  'DUBAI SOUTH',
  'TECOM GROUP',
  'DUBAI SILICON OASIS AUTHORITY',
  'SHARJAH ASSET MANAGEMENT',
  'INVESTOPIA',
  'ABU DHABI PORTS',
  'MUBADALA INVESTMENT COMPANY',
  'ADQ',
  'TAWAZUN COUNCIL',
  'EDGE GROUP',
  'YAHSAT',
  'THURAYA TELECOMMUNICATIONS',
  'INJAZAT',
  'CORE42',
  'KHAZNA DATA CENTERS',
  'ALPHA DATA',
  'EMITAC ENTERPRISE SOLUTIONS',
  'INTERTEC SYSTEMS',
  'TECH FALCON',
  'GBM (GULF BUSINESS MACHINES)',
  'RAQMIYAT',
  'CRAYON MIDDLE EAST',
  'CLOUD BOX TECHNOLOGIES',
  'MICROLAND GULF',
  'VIRTUSA MIDDLE EAST',
  'WIPRO MIDDLE EAST',
  'TATA CONSULTANCY SERVICES UAE',
];

export default function ClientSearch() {
  const [query, setQuery] = useState('');
  const [dynamicCompanies, setDynamicCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const loadCompanies = () => {
    getCompanies().then(setDynamicCompanies);
  };

  useEffect(() => {
    loadCompanies();

    // Listen for updates in the SAME tab
    window.addEventListener('mts_companies_updated', loadCompanies);
    // Listen for cross-tab updates
    window.addEventListener('storage', loadCompanies);
    // Auto-refresh when user switches back to this tab
    window.addEventListener('focus', loadCompanies);

    return () => {
      window.removeEventListener('mts_companies_updated', loadCompanies);
      window.removeEventListener('storage', loadCompanies);
      window.removeEventListener('focus', loadCompanies);
    };
  }, []);

  // Build a lookup map: company name (uppercase) -> Company object
  const companyDetailMap = new Map<string, Company>();
  dynamicCompanies.forEach(c => {
    companyDetailMap.set(c.name.toUpperCase(), c);
  });

  // Merge: all dynamic companies + static mock list (deduped)
  const dynamicNames = new Set(dynamicCompanies.map(c => c.name.toUpperCase()));
  const allSearchableNames = [
    ...dynamicCompanies.map(c => c.name),
    ...mockCompanies.filter(m => !dynamicNames.has(m.toUpperCase())),
  ];

  const filteredCompanies = query.trim().length > 0
    ? allSearchableNames.filter(name =>
        name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasSearched = query.trim().length > 0;

  const handleCompanyClick = (name: string) => {
    const detail = companyDetailMap.get(name.toUpperCase());
    if (detail) {
      setSelectedCompany(detail);
    }
    // If no detail exists, do nothing (just a name in the list)
  };

  const hasDetails = (name: string) => companyDetailMap.has(name.toUpperCase());

  return (
    <section className={styles.searchSection}>
      <div className="container">
        <div className={styles.searchHeader}>
          <h2 className={styles.searchTitle}>Trusted by enterprises worldwide</h2>
          <p className={styles.searchSubtitle}>
            Search to see if a company is part of the Microsoft Team Services network.
          </p>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for a company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Search Results */}
        <AnimatePresence mode="wait">
          {hasSearched && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {filteredCompanies.length > 0 ? (
                <div className={styles.resultsGrid}>
                  <AnimatePresence>
                    {filteredCompanies.map((name) => {
                      const clickable = hasDetails(name);
                      return (
                        <motion.button
                          key={name}
                          className={`${styles.companyCard} ${clickable ? styles.companyCardClickable : ''}`}
                          onClick={() => handleCompanyClick(name)}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.18 }}
                        >
                          <span className={styles.companyCardName}>{name}</span>
                          {clickable && (
                            <span className={styles.viewProfileBadge}>View Profile →</span>
                          )}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  className={styles.noResults}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No companies found matching &ldquo;{query}&rdquo;.
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Company Detail Modal */}
      <CompanyModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </section>
  );
}
