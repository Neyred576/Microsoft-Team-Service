import Link from 'next/link';
import { Activity, Bell, Download, HelpCircle, FileText, Settings } from 'lucide-react';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <>
      <div className={styles.dashboardHeader}>
        <div className="container">
          <h1 className={styles.dashboardTitle}>Public Dashboard & Resources</h1>
          <p style={{ color: 'var(--ms-gray-130)' }}>
            Welcome to the Microsoft Team Services public resource center. Access updates, downloads, and support information.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.overviewCards}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>System Status</div>
            <div className={styles.statValue} style={{ color: '#107C10' }}>Online</div>
            <div className={styles.statDesc}>All services running normally</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Active Contracts</div>
            <div className={styles.statValue}>3 Plans</div>
            <div className={styles.statDesc}>6-Month, 12-Month, 5-Year</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Support Load</div>
            <div className={styles.statValue}>Low</div>
            <div className={styles.statDesc}>Average response time: &lt; 5 mins</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Latest Version</div>
            <div className={styles.statValue}>v24.2</div>
            <div className={styles.statDesc}>Released 2 days ago</div>
          </div>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.mainColumn}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <Bell size={20} color="var(--ms-blue)" /> Service Announcements
              </h2>
              
              <div className={styles.updateItem}>
                <div className={styles.updateDate}>June 15, 2026</div>
                <h3 className={styles.updateTitle}>Enhanced Security Features Deployed</h3>
                <p className={styles.updateDesc}>
                  We have successfully rolled out the new Zero-Trust architecture update to all 12-Month and 5-Year enterprise contracts.
                </p>
              </div>
              
              <div className={styles.updateItem}>
                <div className={styles.updateDate}>June 02, 2026</div>
                <h3 className={styles.updateTitle}>Scheduled Maintenance Notice</h3>
                <p className={styles.updateDesc}>
                  Minor maintenance will occur on the US-East server cluster this weekend. No downtime is expected due to our redundancy systems.
                </p>
              </div>

              <div className={styles.updateItem}>
                <div className={styles.updateDate}>May 28, 2026</div>
                <h3 className={styles.updateTitle}>New Collaboration Tools Available</h3>
                <p className={styles.updateDesc}>
                  Check out the new real-time co-authoring tools now available in your web portal.
                </p>
              </div>
            </div>

            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <Activity size={20} color="var(--ms-blue)" /> Service Health
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--ms-gray-20)' }}>
                  <span style={{ fontWeight: 600 }}>Identity Management</span>
                  <span style={{ color: '#107C10', fontWeight: 600 }}>Operational</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--ms-gray-20)' }}>
                  <span style={{ fontWeight: 600 }}>Cloud Storage</span>
                  <span style={{ color: '#107C10', fontWeight: 600 }}>Operational</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--ms-gray-20)' }}>
                  <span style={{ fontWeight: 600 }}>Email & Calendar</span>
                  <span style={{ color: '#107C10', fontWeight: 600 }}>Operational</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.sideColumn}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <Download size={20} color="var(--ms-blue)" /> Downloads
              </h2>
              <div className={styles.resourceList}>
                <Link href="#" className={styles.resourceItem} style={{ textDecoration: 'none' }}>
                  <FileText size={24} className={styles.resourceIcon} />
                  <div className={styles.resourceText}>
                    <div className={styles.resourceName}>Contract Overview PDF</div>
                    <div className={styles.resourceMeta}>2.4 MB &bull; PDF Document</div>
                  </div>
                </Link>
                <Link href="#" className={styles.resourceItem} style={{ textDecoration: 'none' }}>
                  <Settings size={24} className={styles.resourceIcon} />
                  <div className={styles.resourceText}>
                    <div className={styles.resourceName}>Desktop Client Installer</div>
                    <div className={styles.resourceMeta}>Windows &bull; v24.2</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>
                <HelpCircle size={20} color="var(--ms-blue)" /> Need Help?
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--ms-gray-130)', marginBottom: '1rem' }}>
                Having trouble with your services? Our support team is available 24/7.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/faq" className="btn btn-outline" style={{ width: '100%' }}>View FAQ</Link>
                <Link href="/contact" className="btn btn-primary" style={{ width: '100%' }}>Contact Support</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
