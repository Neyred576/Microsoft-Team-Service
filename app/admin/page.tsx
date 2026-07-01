'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Company, getCompanies, saveCompanies } from '../../lib/companyStore';
import { ref, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';

// Helper: get last 7 days as YYYY-MM-DD strings
function getLast7Days(): { date: string; label: string }[] {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { weekday: 'short' });
    days.push({ date: dateStr, label });
  }
  return days;
}

// Real data-driven SVG chart
const TrafficChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
  const max = Math.max(...data, 1); // avoid 0 division
  const min = 0;
  const range = max - min || 1;

  const width = 800;
  const height = 200;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height * 0.8 - 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ width: '100%', overflowX: 'auto', padding: '20px 0' }}>
      <svg viewBox={`0 0 ${width} ${height + 30}`} style={{ width: '100%', minWidth: '600px', overflow: 'visible' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2ea043" />
            <stop offset="100%" stopColor="#58a6ff" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#58a6ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="0" y1={i * (height / 3)} x2={width} y2={i * (height / 3)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}

        {/* Area under curve */}
        <polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill="url(#areaGrad)"
        />

        {/* Line */}
        <polyline
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          style={{ filter: 'drop-shadow(0 4px 6px rgba(88,166,255,0.3))' }}
        />

        {/* Data Points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * width;
          const y = height - ((d - min) / range) * height * 0.8 - 20;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="#0d1117" stroke="#58a6ff" strokeWidth="2" />
              <text x={x} y={y - 14} fill="#c9d1d9" fontSize="12" textAnchor="middle" fontWeight="600">{d}</text>
            </g>
          );
        })}

        {/* X-Axis Labels */}
        {labels.map((label, i) => (
          <text key={i} x={(i / (labels.length - 1)) * width} y={height + 20} fill="#8b949e" fontSize="12" textAnchor="middle">{label}</text>
        ))}
      </svg>
    </div>
  );
};


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  // Live Data State
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [weeklyViews, setWeeklyViews] = useState(0);
  const [dailyChartData, setDailyChartData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [chartLabels, setChartLabels] = useState<string[]>(['', '', '', '', '', '', '']);

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

  useEffect(() => {
    if (!isAuthenticated || !db) return;
    
    // Subscribe to true real-time active visitors
    const activeVisitorsRef = ref(db, 'analytics/active_visitors');
    const unsubVisitors = onValue(activeVisitorsRef, (snapshot) => {
      const visitorsObj = snapshot.val();
      // Count the number of active sessions
      const count = visitorsObj ? Object.keys(visitorsObj).length : 0;
      setLiveVisitors(count);
    });

    // Subscribe to total views
    const viewsRef = ref(db, 'analytics/total_views');
    const unsubViews = onValue(viewsRef, (snapshot) => {
      setWeeklyViews(snapshot.val() || 0);
    });

    // Subscribe to daily_views for the last 7 days (real-time chart)
    const last7Days = getLast7Days();
    setChartLabels(last7Days.map(d => d.label));

    const dailyViewsRef = ref(db, 'analytics/daily_views');
    const unsubDaily = onValue(dailyViewsRef, (snapshot) => {
      const allDailyData = snapshot.val() || {};
      const counts = last7Days.map(({ date }) => allDailyData[date] || 0);
      setDailyChartData(counts);
    });
    
    return () => {
      unsubVisitors();
      unsubViews();
      unsubDaily();
    };
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
    const dataForm = new FormData();
    dataForm.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: dataForm
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
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
          <div className={styles.loginLogo}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1>Secure Access</h1>
          <p className={styles.loginSubtitle}>Enter your credentials to access the dashboard</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Admin password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
              autoFocus
            />
            <button type="submit" className={styles.btn}>Authenticate</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1>Admin Dashboard</h1>
          <div className={styles.actions}>
            <button onClick={() => openModal()} className={styles.btn}>+ Add Company</button>
          </div>
        </div>

        {/* Top Metrics Row */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricTitle}>Live Visitors</div>
            <div className={styles.metricValue}>
              <div className={styles.liveIndicator}></div>
              {liveVisitors}
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricTitle}>Total Companies</div>
            <div className={styles.metricValue}>
              {companies.length}
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={styles.metricTitle}>Weekly Views</div>
            <div className={styles.metricValue}>
              {weeklyViews.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className={styles.chartContainer}>
          <h2 className={styles.chartHeader}>Traffic Overview (Last 7 Days)</h2>
          <TrafficChart data={dailyChartData} labels={chartLabels} />
        </div>

        {/* Company Table */}
        <div className={styles.tableContainer}>
          <div className={styles.tableHeaderRow}>
            <h2>Company Management</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>MTS Usage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(c => (
                <tr key={c.id}>
                  <td className={styles.logoCell}>
                    {c.logoUrl ? <img src={c.logoUrl} alt={c.name} /> : 'No Logo'}
                  </td>
                  <td style={{ fontWeight: 600, color: '#fff' }}>{c.name}</td>
                  <td style={{ color: '#8b949e' }}>{c.mtsUsage || 'N/A'}</td>
                  <td>
                    <button onClick={() => openModal(c)} className={styles.actionBtn}>Edit</button>
                    <button onClick={() => handleDelete(c.id)} className={`${styles.actionBtn} ${styles.actionBtnDelete}`}>Delete</button>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#8b949e' }}>
                    No companies found. Add one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Overlay */}
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
                  {uploading && <p style={{color: '#58a6ff', marginTop: 10, fontSize: '0.9rem'}}>Uploading...</p>}
                  {formData.logoUrl && !uploading && (
                    <img src={formData.logoUrl} alt="Preview" style={{width: 80, marginTop: 12, borderRadius: 8, border: '1px solid #30363d'}} />
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
