export type Company = {
  id: string;
  name: string;
  logoUrl: string;
  address: string;
  email: string;
  phone: string;
  mtsAccount: string;
  mtsUsage: string;
  featured: boolean;
  inTrustedList: boolean;
  createdAt: string;
};

const STORAGE_KEY = 'mts_companies';

export const getCompanies = async (): Promise<Company[]> => {
  if (typeof window === 'undefined') return [];
  
  // 1. Check local storage first (admin changes)
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse companies from local storage', e);
    }
  }

  // 2. Fallback to public/companies.json (initial/default state)
  try {
    const res = await fetch('/companies.json');
    if (res.ok) {
      const data = await res.json();
      // Cache it in local storage so admin edits work from this base
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (e) {
    console.error('Failed to fetch companies.json', e);
  }

  return [];
};

export const saveCompanies = (companies: Company[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
    // Dispatch a custom event so other components (like ClientSearch) know to re-render
    window.dispatchEvent(new Event('mts_companies_updated'));
  }
};
