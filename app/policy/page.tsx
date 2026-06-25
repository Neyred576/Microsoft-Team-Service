'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import styles from './page.module.css';
import FadeIn from '../../components/animations/FadeIn';
import StaggerGrid from '../../components/animations/StaggerGrid';

const policies = [
  {
    title: "Authorized Device Access",
    content: "To protect the integrity, security, and intellectual property of microsoft team services software , access is restricted to authorized devices registered under each company account holder's profile.\nEach contract includes access only through approved and registered devices base on the company contracts agreement. Any attempt to access, operate, copy, distribute, modify, or utilize the software from an unregistered or unauthorized device may be considered a violation of our Terms of Service and Software Licensing Agreement."
  },
  {
    title: "Unauthorized Device Usage Fee",
    content: "If in any ways the Microsoft Audit & Monitoring Team Systems detect that an account is being accessed from an unauthorized usage device/devices, workstation, virtual machine, server, or third-party system that has not been approved by our Microsoft compliance team, the company account will be required to pay an Device Usage & Compliance Fee of USD $550 for each month of device usage for the unauthorized device connected to the software.\nThe Device Usage & Compliance Fee of USD $550 shall remain active for as long as the unauthorized device maintains access to the software or until proper authorization has been completed."
  },
  {
    title: "Device Usage & Compliance Fee Reduction (Appeal)",
    content: "Companies that have maintained continuous unauthorized device usage for a period exceeding six (6) consecutive months may be eligible to apply for a Device Usage & Compliance Fee reduction (Appeal).\nTo request a reduction, the company must submit a formal appeal through the Compliance Department, providing the reason for the request and any supporting documentation (company licence, Managing director/company representative Emirates ID or Passport copy) deemed relevant to the review process.\n\nUpon receipt of the appeal:\nThe appeal will be reviewed by the Compliance & Audit Team.\nA decision will be made within twenty-four (24) hours of submission.\nAn approval or rejection notice will be sent to the company's registered email address.\nApproved appeals may result in a partial reduction of accumulated or future Device Usage & Compliance Fees, subject to management discretion and compliance history.\nSubmission of an appeal does not guarantee approval and does not suspend any outstanding payment obligations during the review period.\n\nThe Compliance Department reserves the right to approve, reject, or request additional information before making a final determination.\nAll decisions issued by the Compliance Audit Department shall be considered final unless otherwise stated in writing."
  },
  {
    title: "Compliance & Audit Requirements",
    content: "Upon detection of unauthorized access, the device user will receive:\nAn automated compliance and audit email notification.\nA detailed access report identifying the unauthorized device.\nA payment notice email for applicable usage fees.\n\nCompany/Device Users will be granted a compliance period to either:\nTo pay the Device Usage & Compliance Fee of USD $550 for each month of device usage\nRegister the device through our authorization process."
  },
  {
    title: "Security Monitoring",
    content: "The microsoft Team Services has installed an AI roboot that detect all bypass device usages. This is for security, compliance and audit purposes, we continuously monitor:\nLogin locations\nDevice identifiers\nBrowser fingerprints\nIP addresses\nSession activity\nNetwork behavior patterns\n\nAny suspicious activity may trigger an automatic security review."
  },
  {
    title: "Violation of Software License",
    content: "The following activities are strictly prohibited:\nSharing login credentials with unauthorized persons.\nUsing software through unlicensed devices.\nAttempting to bypass security controls.\nReverse engineering software components.\nCopying or distributing proprietary software.\nCircumventing licensing restrictions.\nUsing automated tools to access protected systems."
  },
  {
    title: "Legal Enforcement By Compliance And Audit Team",
    content: "Failure to comply with this policy may result in one or more of the following actions:\nImmediate account suspension.\nPermanent termination of services.\nRevocation of software licenses.\nFinancial penalties and recovery of damages.\nReferral to our Legal, Compliance & Audit Department for further investigation\n\nWhere unauthorized access is determined to constitute hacking, software theft, intellectual property infringement, or unauthorized system intrusion, we reserve the right to pursue all available legal remedies under applicable local and international laws."
  },
  {
    title: "Acknowledgement of Microsoft Team Services",
    content: "By accessing and using this software, you acknowledge that you have read, understood, and agreed to comply with this Device Authorization & Software Usage Policy. Continued use of the platform constitutes acceptance of these terms and any future amendments thereto.\nFor questions regarding device authorization, licensing, or compliance matters, please contact us through the Contact section of this website."
  }
];

export default function PolicyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const togglePolicy = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="container">
      <FadeIn>
        <section className={styles.policyHeader}>
          <h1 className="section-title">Device Authorization & Software Usage Policy</h1>
          <p className="section-subtitle">
            Please read our guidelines regarding authorized device access, compliance fees, and security monitoring.
          </p>
        </section>
      </FadeIn>

      <div className={styles.policyContainer}>
        <StaggerGrid staggerDelay={0.1}>
          {policies.map((policy, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={styles.accordion} data-open={isOpen}>
                <button 
                  className={styles.accordionSummary} 
                  onClick={() => togglePolicy(index)}
                  aria-expanded={isOpen}
                >
                  {policy.title}
                  <ChevronDown className={styles.accordionIcon} size={20} />
                </button>
                {isOpen && (
                  <div className={styles.accordionContent}>
                    {policy.content}
                  </div>
                )}
              </div>
            );
          })}
        </StaggerGrid>

        <FadeIn delay={0.4}>
          <div className={styles.policyCTA}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Questions about compliance?</h2>
            <p style={{ color: 'var(--ms-gray-130)', marginBottom: '2rem' }}>
              If you need further clarification on our device authorization policies, please reach out to our team.
            </p>
            <Link href="/contact" className="btn btn-primary">Contact Compliance Team</Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
