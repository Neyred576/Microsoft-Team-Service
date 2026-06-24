'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import styles from './page.module.css';
import FadeIn from '../../components/animations/FadeIn';
import StaggerGrid from '../../components/animations/StaggerGrid';

const faqs = [
  {
    question: "What is the difference between the 1-2, 2-5, and 6-15 Device User contracts?",
    answer: "Our contracts are scaled based on your team size and data needs. The 1-2 Device Users plan includes 1 TB of cloud storage per user and advanced identity management. The 2-5 and 6-15 Device Users plans offer significantly more storage (3 TB and 10 TB respectively), automatic spam and malware filtering, and access to more app versions and data files."
  },
  {
    question: "Can I upgrade my contract if my team grows?",
    answer: "Yes, you can upgrade your plan at any time. If your team grows beyond your current tier, you can easily transition to the next Device Users plan, and your new billing cycle and features will start immediately with a prorated credit."
  },
  {
    question: "Are the desktop Microsoft Apps included in all plans?",
    answer: "Yes, all plans include web, mobile, and desktop versions of Word, Excel, PowerPoint, and Access. The 6-15 Device Users plan provides access to version 5 of these apps, while the other plans provide version 3."
  },
  {
    question: "How does the uptime guarantee work?",
    answer: "We offer a financially backed 99.9% uptime SLA. If we fail to meet this guarantee in any given month, you are eligible for service credits applied directly to your next billing cycle."
  },
  {
    question: "Do you offer discounts for non-profit organizations or educational institutions?",
    answer: "Yes, we have specialized pricing for qualified academic, non-profit, and government organizations. Please contact our sales team to verify your eligibility and receive a custom quote."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="container">
      <FadeIn>
        <section className={styles.faqHeader}>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-subtitle">
            Find answers to common questions about Microsoft Team Services contracts, billing, and technical support.
          </p>
        </section>
      </FadeIn>

      <div className={styles.faqContainer}>
        <StaggerGrid staggerDelay={0.1}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={styles.accordion} data-open={isOpen}>
                <button 
                  className={styles.accordionSummary} 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  {faq.question}
                  <ChevronDown className={styles.accordionIcon} size={20} />
                </button>
                {isOpen && (
                  <div className={styles.accordionContent}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </StaggerGrid>

        <FadeIn delay={0.4}>
          <div className={styles.faqCTA}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Still have questions?</h2>
            <p style={{ color: 'var(--ms-gray-130)', marginBottom: '2rem' }}>
              If you couldn't find the answer you were looking for, our support team is ready to help.
            </p>
            <Link href="/contact" className="btn btn-primary">Contact Support</Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
