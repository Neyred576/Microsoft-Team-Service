'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ClientSearch.module.css';
import { Company, getCompanies } from '../lib/companyStore';
import FeaturedCompanyCard from './FeaturedCompanyCard';

const mockCompanies: string[] = [
  // Static list. Note: The 4 dynamically featured companies have been removed from this 
  // hardcoded list because they will be injected dynamically from companyStore.
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

  const loadCompanies = () => {
    getCompanies().then(setDynamicCompanies);
  };

  useEffect(() => {
    loadCompanies();
    window.addEventListener('mts_companies_updated', loadCompanies);
    return () => window.removeEventListener('mts_companies_updated', loadCompanies);
  }, []);

  const featuredCompanies = dynamicCompanies.filter(c => c.featured);
  
  // Combine static list with dynamic ones marked as "inTrustedList"
  const allSearchableCompanies = [
    ...dynamicCompanies.filter(c => c.inTrustedList).map(c => c.name),
    ...mockCompanies
  ];

  const filteredCompanies = allSearchableCompanies.filter(company => 
    company.toLowerCase().includes(query.toLowerCase())
  );

  const hasSearched = query.trim().length > 0;

  return (
    <section className={styles.searchSection}>
      <div className="container">
        <div className={styles.searchHeader}>
          <h2 className={styles.searchTitle}>Trusted by enterprises worldwide</h2>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} size={20} />
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search for a company to see if they use our services..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Featured Companies Grid */}
        <AnimatePresence mode="wait">
          {!hasSearched && featuredCompanies.length > 0 && (
            <motion.div 
              className="featured-wrapper"
              key="featured"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.featuredGrid}>
                {featuredCompanies.map(company => (
                  <FeaturedCompanyCard key={company.id} company={company} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results */}
        <AnimatePresence mode="wait">
          {hasSearched && (
            <motion.div 
              className="search-results-wrapper"
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCompanies.length > 0 ? (
                <div className={styles.resultsGrid}>
                  <AnimatePresence>
                    {filteredCompanies.map((company) => (
                      <motion.div 
                        key={company} 
                        className={styles.companyCard}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {company}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div 
                  className={styles.noResults}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No companies found matching "{query}".
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
