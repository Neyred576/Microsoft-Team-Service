'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './ClientSearch.module.css';

const mockCompanies: string[] = [
  'GLOBAL GROUP OF COMPANY LLC',
  'GLOBAL WAYS COMMERCIAL BROKERS LLC',
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
  'EMIRATES GLOBAL ALUMINIUM',
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
  'FINESSE GLOBAL',
  'CRAYON MIDDLE EAST',
  'CLOUD BOX TECHNOLOGIES',
  'MICROLAND GULF',
  'VIRTUSA MIDDLE EAST',
  'WIPRO MIDDLE EAST',
  'TATA CONSULTANCY SERVICES UAE',
];

export default function ClientSearch() {
  const [query, setQuery] = useState('');

  const filteredCompanies = mockCompanies.filter(company => 
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

        {hasSearched && (
          filteredCompanies.length > 0 ? (
            <div className={styles.resultsGrid}>
              {filteredCompanies.map((company, index) => (
                <div key={index} className={styles.companyCard}>
                  {company}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              No companies found matching "{query}".
            </div>
          )
        )}
      </div>
    </section>
  );
}
