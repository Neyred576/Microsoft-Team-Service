'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Mock API call
      setTimeout(() => {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 500);
    }
  };

  return (
    <>
      <div className={styles.contactHeader}>
        <div className="container">
          <h1 className="section-title">Contact our sales team</h1>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0' }}>
            Whether you need a custom enterprise quote or technical support, our team of experts is ready to help you optimize your business.
          </p>
        </div>
      </div>

      <div className={styles.contactLayout}>
        {/* Contact Form */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send us a message</h2>
          
          {isSubmitted && (
            <div className={styles.successMessage}>
              Thank you for your message. A Microsoft Team Services representative will contact you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Full Name *</label>
              <input 
                type="text" 
                id="name"
                className={styles.formInput} 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              {errors.name && <div className={styles.formError}>{errors.name}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Work Email *</label>
              <input 
                type="email" 
                id="email"
                className={styles.formInput} 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <div className={styles.formError}>{errors.email}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="company" className={styles.formLabel}>Company Name</label>
              <input 
                type="text" 
                id="company"
                className={styles.formInput} 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>How can we help? *</label>
              <textarea 
                id="message"
                className={styles.formTextarea} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
              {errors.message && <div className={styles.formError}>{errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit request</button>
          </form>
        </div>

        {/* Business Info */}
        <div className={styles.infoSection}>
          <div style={{ width: '100%', height: '200px', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
            <img 
              src="/contact_support.png" 
              alt="Customer support representative" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>
              <Mail size={20} color="var(--ms-blue)" /> Email inquiries
            </h3>
            <div className={styles.infoContent}>
              <p>General: <a href="mailto:www.microsoftteam@gmail.com" style={{ color: 'var(--ms-blue)', textDecoration: 'underline' }}>www.microsoftteam@gmail.com</a></p>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>
              <MapPin size={20} color="var(--ms-blue)" /> Corporate Headquarters
            </h3>
            <div className={styles.infoContent}>
              <p>Microsoft Team Services</p>
              <p>Office No. 1809 Al Noor Building</p>
              <p>WF18 Sheik Maktoum Road</p>
              <p>Abu Dhabi</p>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <h3 className={styles.infoTitle}>
              <Clock size={20} color="var(--ms-blue)" /> Hours of Operation
            </h3>
            <div className={styles.infoContent}>
              <p><strong>Mon, Wed, Fri:</strong> 9:30 AM - 3:00 PM</p>
              <p><strong>Tue, Thu, Weekends:</strong> Closed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
