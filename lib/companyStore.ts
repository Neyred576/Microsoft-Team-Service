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

const JSONBIN_ID = '6a3c2574f5f4af5e292a7611';
const JSONBIN_KEY = '$2a$10$HrOYWxgUF5bUqWGH/0q//ukvQjAT63FazHftPy2HW3NuaK/rsiZ5W';

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_KEY,
        // Bypass caching for fresh results
        'Cache-Control': 'no-cache'
      }
    });
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.record || [];
  } catch (e) {
    console.error('Failed to fetch companies from JSONBin, falling back to local JSON.', e);
    try {
      const res = await fetch('/companies.json');
      return await res.json();
    } catch {
      return [];
    }
  }
};

export const saveCompanies = async (companies: Company[]) => {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY
      },
      body: JSON.stringify(companies)
    });
    
    if (!res.ok) throw new Error('Failed to save to JSONBin');
    
    if (typeof window !== 'undefined') {
      // Dispatch a custom event so other components (like ClientSearch) know to re-render
      window.dispatchEvent(new Event('mts_companies_updated'));
    }
  } catch (e) {
    console.error('Save failed', e);
    alert('Failed to save changes to the cloud database. Check your console.');
  }
};
