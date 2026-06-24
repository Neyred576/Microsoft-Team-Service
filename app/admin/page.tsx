'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Company, getCompanies, saveCompanies } from '../../lib/companyStore';

const IMGBB_API_KEY = 'https://api.imgbb.com/1/upload'; // Actually we need the real key if provided, user gave: https://api.imgbb.com/1/upload but that's just the endpoint. Wait, the user said "here is the IMGBB API Key https://api.imgbb.com/1/upload", but didn't provide the actual 32-char key. I will use a placeholder and prompt them.

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    address: '',
    email: '',
    phone: '',
    mtsAccount: '',
    mtsUsage: '',
    featured: false,
    inTrustedList: true
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getCompanies().then(setCompanies);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Microsoft@090021') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const openModal = (company?: Company) => {
    if (company) {
      setEditingCompany(company);
      setFormData({
        name: company.name,
        logoUrl: company.logoUrl,
        address: company.address,
        email: company.email,
        phone: company.phone,
        mtsAccount: company.mtsAccount,
        mtsUsage: company.mtsUsage,
        featured: company.featured,
        inTrustedList: company.inTrustedList
      });
    } else {
      setEditingCompany(null);
      setFormData({
        name: '', logoUrl: '', address: '', email: '', phone: '',
        mtsAccount: '', mtsUsage: '', featured: false, inTrustedList: true
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use the provided ImgBB API key
    const apiKey = '40fad5b164f7be1f49b470b9563cc0c7';

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, logoUrl: data.data.url }));
      } else {
        alert('Image upload failed: ' + data.error?.message);
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Company[];

    if (editingCompany) {
      updated = companies.map(c => 
        c.id === editingCompany.id ? { ...c, ...formData } : c
      );
    } else {
      updated = [...companies, {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...formData
      }];
    }

    setCompanies(updated);
    saveCompanies(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this company?')) {
      const updated = companies.filter(c => c.id !== id);
      setCompanies(updated);
      saveCompanies(updated);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loginCard}>
          <h1>Admin Access</h1>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
              autoFocus
            />
            <button type="submit" className={styles.btn}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1>Company Management</h1>
          <div className={styles.actions}>
            <button onClick={() => openModal()} className={styles.btn}>+ Add Company</button>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}>
                <td className={styles.logoCell}>
                  {c.logoUrl ? <img src={c.logoUrl} alt={c.name} /> : 'No Logo'}
                </td>
                <td>{c.name}</td>
                <td>
                  <button onClick={() => openModal(c)} className={styles.actionBtn}>Edit</button>
                  <button onClick={() => handleDelete(c.id)} className={`${styles.actionBtn} ${styles.actionBtnDelete}`}>Delete</button>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center' }}>No companies found. Add one or check public/companies.json.</td>
              </tr>
            )}
          </tbody>
        </table>

        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>{editingCompany ? 'Edit Company' : 'Add New Company'}</h2>
              <form onSubmit={handleSave}>
                <div className={styles.formGroup}>
                  <label>Company Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Logo Upload (ImgBB)</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {uploading && <p style={{color: '#58a6ff', marginTop: 5}}>Uploading...</p>}
                  {formData.logoUrl && !uploading && (
                    <img src={formData.logoUrl} alt="Preview" style={{width: 60, marginTop: 10, borderRadius: 4}} />
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>Address</label>
                  <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>

                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>

                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>

                <div className={styles.formGroup}>
                  <label>MTS Account Number</label>
                  <input type="text" value={formData.mtsAccount} onChange={e => setFormData({...formData, mtsAccount: e.target.value})} />
                </div>

                <div className={styles.formGroup}>
                  <label>MTS Usage</label>
                  <input type="text" value={formData.mtsUsage} placeholder="e.g., 1-2 Device Users" onChange={e => setFormData({...formData, mtsUsage: e.target.value})} />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" checked={formData.inTrustedList} onChange={e => setFormData({...formData, inTrustedList: e.target.checked})} />
                    Include in Trusted search list?
                  </label>
                </div>

                <div className={styles.modalActions}>
                  <button type="button" onClick={() => setIsModalOpen(false)} className={styles.btnSecondary}>Cancel</button>
                  <button type="submit" className={styles.btn} disabled={uploading}>Save Company</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
