'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './ClientSearch.module.css';

const mockCompanies: string[] = [
  // Awaiting real client list from the user
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
