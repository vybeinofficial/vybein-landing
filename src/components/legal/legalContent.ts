export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  subHeading?: string;
};

export const privacySections: LegalSection[] = [
  {
    heading: "Overview & Consent",
    paragraphs: [
      "VYBEIN ('we', 'VYBEIN', 'Application') is committed to protecting the privacy of all users. This policy is published in accordance with the Information Technology Act, 2000 and related Intermediary Guidelines.",
      "By using the Vybein Application, you acknowledge that you have read and agreed to the collection, storage, and processing of your personal information as described here. Continued use confirms your unconditional consent."
    ],
  },
  {
    heading: "Information We Collect",
    subHeading: "We collect information that is lawful and necessary for platform operation:",
    bullets: [
      "Mandatory: Mobile number (for OTP verification).",
      "Profile Details: First and last name, email ID, age, gender, and profile image.",
      "Social Context: Relationship status, interests, hobbies, and personal description.",
      "Technical Data: Location data, IP address, device type, browser type, cookies, and log files.",
      "Permissions: Microphone access (only with explicit consent for specific feature usage)."
    ],
  },
  {
    heading: "Purpose and Use of Data",
    bullets: [
      "To verify user identity and manage application services.",
      "To provide technical support and customer assistance.",
      "To maintain the security and integrity of the platform.",
      "To analyze usage patterns and improve platform performance.",
      "To comply with applicable laws, regulations, or judicial orders."
    ],
    paragraphs: [
      "Vybein does not sell, rent, trade, or commercially share any user-provided information with third parties."
    ],
  },
  {
    heading: "Data Deletion & Retention",
    paragraphs: [
      "Users may request account deletion via the 'Delete Account' option in the app menu. Your profile and data will be permanently deleted 30 days after the request.",
      "Once deleted, no personal data is retained except where required by mandatory legal obligations under Indian law.",
      "For manual deletion requests, contact support@vybein.com."
    ],
  },
  {
    heading: "Microphone & In-App Communication",
    paragraphs: [
      "We offer audio-based features to enable natural interaction. We do not access the microphone without explicit consent, nor do we perform background recording.",
      "In-app chat rooms and call features allow interaction without exchanging mobile numbers. Vybein does not store voice calls or voice recordings.",
      "Strictly Prohibited: Copying, recording, sharing, or redistributing user chat content or voice interactions."
    ],
  },
  {
    heading: "Safety & Professional Disclaimers",
    paragraphs: [
      "Mental Health: Vybein is not a replacement for therapy or medical treatment. Users experiencing self-harm thoughts should seek professional help immediately.",
      "Accuracy: We do not guarantee the reliability of user-generated content or advice. Interactions are undertaken at the user's own risk.",
      "Children's Privacy: Vybein is strictly for users aged 18 years or older."
    ],
  },
  {
    heading: "Security Measures",
    paragraphs: [
      "We adopt appropriate physical and electronic security measures, including SSL-secured pages for payments and encrypted data transfers.",
      "While we strive for maximum protection, no method of internet transmission is 100% secure; users communicate at their own risk."
    ],
  },
  {
    heading: "Contact & Grievance",
    paragraphs: [
      "Grievance Officer Address: 62-Dayal Forte Colony, Vishnupuri – 3rd Road, Aliganj, Lucknow, Uttar Pradesh, India – 226024",
      "Email: support@vybein.com"
    ],
  },
];
export const termsSections: LegalSection[] = [
  {
    heading: "Acceptance & Updates",
    paragraphs: [
      "By using Vybein, you agree to these Terms and all related policies. Continued use indicates your legal agreement to be bound by the most recent version of these rules.",
      "VYBEIN reserves the right to modify these Terms at any time without prior notice. It is the user's responsibility to review these Terms periodically.",
    ],
  },
  {
    heading: "Eligibility & Scope",
    bullets: [
      "You must be 18 years of age or older and capable of entering into a valid contract under the Indian Contract Act, 1872.",
      "VYBEIN operates exclusively within India. All services, data processing, and legal jurisdictions apply solely within India, even if accessed from abroad.",
      "Accounts are for personal use only; reselling services or using them for commercial/agency purposes is strictly prohibited.",
    ],
  },
  {
    heading: "Account Security & Conduct",
    paragraphs: [
      "You are responsible for securing your login credentials and all activities under your account. You must notify us immediately of any unauthorized use.",
      "Logout Security: Once a logout request is submitted, the account will be automatically logged out after a 30-day security period.",
    ],
    bullets: [
      "Zero Tolerance: Harassment, abuse, fraud, hate content, and illegal activity result in immediate termination.",
      "Restricted Content: Obscene material, child endangerment (CSAM), and promotion of explosives or firearms are strictly banned.",
      "Drugs & Alcohol: Facilitating the sale of narcotics, psychotropic drugs, or tobacco products is prohibited.",
    ],
  },
  {
    heading: "In-App Wallet & Payments",
    subHeading: "Rules for Wallet, Rewards, and Referrals:",
    bullets: [
      "Refunds: Full refunds to the wallet occur if a match request is ignored. No refunds are provided if a user cancels an accepted match.",
      "Cashback: 10% reward credit is granted for successfully completed matches; 5% reward deduction applies when creating a match.",
      "Referrals: Referring users receive ₹10 and new users receive ₹5 in their available balance.",
      "Usage: Wallet balances can only be used for platform fees and digital tools; they cannot be cashed out or transferred externally.",
    ],
  },
  {
    heading: "Limitation of Liability",
    paragraphs: [
      "VYBEIN is a digital intermediary. We do not guarantee results, safety, or user behavior during offline meet-ups or interactions.",
      "Maximum Liability: In any event, VYBEIN’s liability is limited to the platform or feature access fee paid by the user.",
      "Users agree to indemnify and hold VYBEIN harmless from any claims arising from their use of the platform or violation of these terms.",
    ],
  },
  {
    heading: "Arbitration & Jurisdiction",
    paragraphs: [
      "Any disputes will be resolved through a Sole Arbitrator in Lucknow, Uttar Pradesh, in accordance with the Arbitration and Conciliation Act, 1996.",
      "The language of arbitration shall be English. The courts in Lucknow, Uttar Pradesh, shall have exclusive jurisdiction.",
      "If a party acts contrary to the arbitration provision, the other party is entitled to recover attorney fees up to ₹1,50,000.",
    ],
  },
  {
    heading: "Contact Information",
    paragraphs: [
      "For assistance or complaints, contact: support@vybein.com",
      "Official Address: 62, Dayal Fort, Aliganj, Lucknow, Uttar Pradesh, India.",
    ],
  },
];
export const cookiesSections: LegalSection[] = [
  {
    heading: "What are Cookies?",
    paragraphs: [
      "Cookies are small data files placed on your computer or mobile device when you visit a website. They are widely used by website owners to ensure services work correctly, operate more efficiently, and provide essential reporting information.",
      "Vybein uses cookies and similar tracking technologies to keep your sessions active, improve platform performance, and maintain account security.",
    ],
  },
  {
    heading: "Why we use Cookies",
    paragraphs: [
      "We use both first-party (set by us) and third-party cookies for several technical and analytical reasons:",
    ],
    bullets: [
      "Essential Operations: Required for technical reasons to enable our services and maintain session continuity.",
      "Preferences: Remembering your settings and providing a personalized experience.",
      "Analytics & Reporting: Helping us understand traffic patterns and feature usage to improve the platform.",
      "Security: Detecting and preventing unauthorized access or platform abuse.",
    ],
  },
  {
    heading: "Managing Cookies",
    paragraphs: [
      "You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse them at any time.",
      "Please note: If you choose to reject cookies, you may still use our website, but access to some functionality and areas of the Vybein platform may be significantly restricted.",
    ],
  },
];
export const disclaimerSections: LegalSection[] = [
  {
    heading: "Platform Role & Limitations",
    paragraphs: [
      "Vybein is an Indian digital social interaction platform and technical intermediary. We provide a safe digital medium for users to interact without sharing personal contact information.",
      "Vybein does not provide dating, matrimonial, healthcare, medical, counseling, or mental health services. We do not organize, manage, or conduct any physical meet-ups, webinars, or offline events.",
    ],
  },
  {
    heading: "No Professional Liability",
    paragraphs: [
      "Vybein is not a medical or therapy service. Users experiencing emotional instability or self-harm thoughts must discontinue use and seek professional medical assistance immediately.",
      "We act strictly as a digital intermediary and do not guarantee any personal, business, romantic, or legal outcomes between users.",
    ],
  },
  {
    heading: "User Conduct & Off-Platform Interaction",
    bullets: [
      "All interactions, whether on or off the platform, are conducted at the user's own discretion and personal responsibility.",
      "Vybein is not liable for misconduct, harassment, threats, or physical injury occurring during offline meet-ups or off-platform interactions.",
      "We do not store private conversations, voice recordings, or chat logs, and cannot verify off-platform behavior.",
    ],
  },
  {
    heading: "Financial & Third-Party Disclaimer",
    paragraphs: [
      "Payments made on Vybein are exclusively for digital services (wallet top-ups, platform fees, subscriptions). We are not responsible for any offline cash dealings or real-world financial losses.",
      "We are not liable for the authenticity, security, or privacy practices of any third-party links, advertisements, or external services accessed via the platform.",
    ],
  },
  {
    heading: "Content & Security",
    bullets: [
      "All event content and activities are provided by users or third-party organizers; Vybein does not guarantee their accuracy or legality.",
      "Vybein is not liable for losses arising from unauthorized access or hacking caused by users sharing their own login credentials, passwords, or OTPs.",
    ],
  },
  {
    heading: "Zero Tolerance & Jurisdiction",
    paragraphs: [
      "We follow a Zero Tolerance Policy for fraud, obscenity, and harassment. Accounts may be terminated immediately upon receipt of evidence of such activity.",
      "All legal disputes are governed by Indian law and subject to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh.",
    ],
  },
];
export const accountDeletionSections: LegalSection[] = [
  {
    heading: "How to Request Account Deletion",
    paragraphs: [
      "Vybein allows users to request the deletion of their account and all associated personal data. You can request deletion through either of the following methods:",
    ],
    subHeading: "Option 1: In-App Request",
    bullets: [
      "Open the Vybein app on your device.",
      "Navigate to Settings → Account.",
      "Tap 'Delete Account'.",
      "Follow the on-screen instructions to confirm your request.",
    ],
  },
  {
    heading: "Option 2: Email Request",
    paragraphs: [
      "If you cannot access the app, you may submit a manual request via email.",
    ],
    bullets: [
      "Send an email to: support@vybein.com",
      "Subject line: 'Account Deletion Request'",
      "Include your registered mobile number associated with the account for verification.",
    ],
  },
  {
    heading: "What Data is Deleted",
    paragraphs: [
      "Upon successful processing of your deletion request, the following information will be permanently removed from our active systems:",
    ],
    bullets: [
      "User profile information (name, bio, profile photo).",
      "Chat history and interaction data.",
      "Account identifiers and associated credentials.",
    ],
  },
  {
    heading: "Data Retention & Compliance",
    paragraphs: [
      "No personal user data is retained after account deletion, except where legally required for regulatory compliance, fraud prevention, or financial record-keeping as per applicable laws in India.",
      "Once the deletion process is finalized, the data cannot be recovered, and you will need to create a new account if you wish to use Vybein again.",
    ],
  },
];
export const childSafetySections: LegalSection[] = [
  {
    heading: "Zero Tolerance Policy",
    paragraphs: [
      "Vybein is committed to protecting children and preventing child sexual abuse and exploitation (CSAE/CSAM). We maintain a strict zero-tolerance policy toward any content or behavior that harms minors.",
    ],
    bullets: [
      "Child sexual abuse material (CSAM) and sexual exploitation of minors.",
      "Grooming behavior and predatory conduct.",
      "Any inappropriate interaction involving individuals under 18 years of age.",
    ],
  },
  {
    heading: "Reporting Safety Concerns",
    paragraphs: [
      "Users are encouraged to report any child safety concerns immediately. All reports are reviewed promptly, typically within 24 hours.",
    ],
    bullets: [
      "Use the in-app reporting feature directly on the content or profile.",
      "Email our safety team at: support@vybein.com",
    ],
  },
  {
    heading: "Moderation & Law Enforcement",
    paragraphs: [
      "Vybein actively monitors content and user activity to detect violations. Any user found engaging in prohibited activities will be permanently banned.",
    ],
    bullets: [
      "Immediate removal of violating content.",
      "Permanent account suspension and data preservation.",
      "Mandatory reporting to national or regional law enforcement authorities.",
    ],
  },
  {
    heading: "Legal Compliance",
    paragraphs: [
      "Vybein complies with all applicable child protection laws and regulations. We cooperate fully with law enforcement agencies and child protection organizations in any investigations related to minor safety.",
    ],
  },
  {
    heading: "Contact for Safety Standards",
    paragraphs: [
      "For questions or specific concerns regarding our child safety standards, please contact our trust and safety team at trustocare@gmail.com.",
    ],
  },
];
