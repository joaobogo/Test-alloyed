// Every FAQ on the site in one place: rendered on the pages that own them and
// aggregated on /faq/ with FAQPage schema.
export type Faq = { q: string; a: string };

export const homeFaq: Faq[] = [
  { q: 'What does Alloyed do?', a: 'Alloyed runs business operations for enterprise teams: ad operations, media billing and finance, AML/KYC compliance, data engineering and analytics, customer engagement and quality assurance. Dedicated teams work inside your platforms with onshore management and delivery from El Salvador, the Philippines and Bangladesh.' },
  { q: 'Is Alloyed the same company as SEBPO?', a: 'Yes. SEBPO rebranded as Alloyed in 2026 following a management buyout of the US operations. Same leadership, same clients, same 20-year delivery record, with an expanded AI and automation practice.' },
  { q: 'How much does it cost compared with hiring?', a: 'In a published engagement, a nine-person Alloyed ad operations team costs roughly $250,000 a year against $850,000 to $900,000 for a fully loaded US team of the same size, a cost advantage of about 70%. Your number depends on roles, volumes and coverage; we size it in the first conversation.' },
  { q: 'How quickly can a team start?', a: 'Discovery and implementation planning typically run two to four weeks. A named implementation lead documents your workflows, builds the team with delivery center leadership, and runs a pilot against an agreed accuracy target before full ramp.' },
  { q: 'Who manages the team day to day?', a: 'A US-based account manager and a client success manager who joins every governance call, plus a team leader in the delivery center who owns workloads, schedules and KPIs. You get one escalation path and weekly reporting.' },
  { q: 'Where are Alloyed teams located?', a: 'Headquarters in the Philadelphia metro area with delivery centers in San Salvador, El Salvador; Manila, Philippines; and Dhaka, Bangladesh, giving follow-the-sun coverage across US, European and APAC time zones.' },
];

export const pricingFaq: Faq[] = [
  { q: 'How is an Alloyed engagement priced?', a: 'Dedicated teams are priced per full-time team member per month, with management, QA, training and tooling included. Managed services are priced against outcome SLAs (volumes, accuracy, turnaround). Project work is fixed-scope with milestone billing. You see the fully loaded number before you sign.' },
  { q: 'What does a dedicated team actually cost?', a: 'In a published engagement, nine ad operations FTEs cost roughly $250,000 a year, against $850,000 to $900,000 for a fully loaded US team of the same size. Rates vary by role, seniority, delivery center and coverage hours; nearshore bilingual roles and 24/7 coverage are priced differently from offshore business-hours roles.' },
  { q: 'Is there a minimum team size or term?', a: 'Engagements typically start with a small pilot team, then scale. Longer terms earn better rates; 43% of our clients have been with us for more than five years.' },
  { q: 'What is included that typical BPOs charge extra for?', a: 'A US-based implementation lead and account manager, a client success manager in every governance call, a team leader in the delivery center, documented SOPs, weekly KPI reporting, quarterly business reviews, QA frameworks and recruiting and backfill. Automation assessments through the Center of Excellence are included for active clients.' },
  { q: 'How do you handle peak season?', a: 'Dedicated teams flex with pre-agreed surge capacity across our delivery centers. You pay for the surge months, not for idle headcount the rest of the year.' },
  { q: 'Can we start small to test the model?', a: 'Yes. The first conversation is a 30-minute working session where we map one workflow and size it. A pilot follows, measured against an agreed accuracy target, before any ramp.' },
];

export const deliveryFaq: Faq[] = [
  { q: 'What is the difference between a dedicated team and managed services?', a: 'A dedicated team is a named group of Alloyed specialists who work only on your workflows, inside your platforms, managed by your priorities and our team leader. Managed services hands Alloyed the outcome: we own the process, the staffing and the SLA and report against it. Many clients start dedicated and move specific workflows to managed once the process is documented.' },
  { q: 'Who do we talk to day to day?', a: 'One US-based account manager, a client success manager who joins governance calls, and a team leader in the delivery center who owns schedules and KPIs. One escalation path, one reporting cadence.' },
  { q: 'What does onboarding look like?', a: 'Discovery and documentation led by a named implementation lead, typically two to four weeks: workflow mapping, SOPs, access and controls, training, then a pilot measured against an agreed accuracy target before ramp.' },
  { q: 'How do you keep quality at 99.99%?', a: 'Documented SOPs, two-step QA review on error-sensitive work, continuous sampling, and KPI reporting on a fixed cadence. Accuracy is measured per engagement and reviewed with you; 99.99% is the published company standard it is held against.' },
  { q: 'Can the team flex for peak season?', a: 'Yes. Surge capacity is pre-agreed and staffed across delivery centers so the team scales for the busy months and returns to baseline afterwards.' },
  { q: 'What happens if a team member leaves?', a: 'Recruiting, training and backfill are included. Documented SOPs and cross-training mean a replacement ramps on the written process, not on tribal knowledge.' },
];

export const securityFaq: Faq[] = [
  { q: 'How is access to our systems handled?', a: 'Teams work inside your platforms under least-privilege access that you grant and can revoke, with documented controls and named users. Access reviews are part of governance.' },
  { q: 'Where is our data processed?', a: 'In your systems. Alloyed teams work in your platforms rather than exporting data to their own tooling, unless you ask for a different arrangement in the statement of work.' },
  { q: 'Do you support our compliance requirements?', a: 'Client-specific requirements such as background checks, data-handling policies, audit support and security questionnaires are scoped in discovery and written into the agreement. Alloyed has run AML/KYC and financial-market workflows for regulated clients for two decades.' },
  { q: 'Are your delivery centers secure facilities?', a: 'Delivery centers in San Salvador, Manila and Dhaka are Alloyed-managed sites with physical access control, managed devices and site leadership on shift. Specific controls are documented on request.' },
];

export const companyFaq: Faq[] = [
  { q: 'Is Alloyed the same company as SEBPO?', a: 'Yes. SEBPO rebranded as Alloyed in 2026 following a management buyout of the US operations. Same leadership, same clients, same 20-year delivery record, with an expanded AI and automation practice.' },
  { q: 'Where is Alloyed headquartered?', a: 'In the Philadelphia metro area (Marlton, New Jersey), with delivery centers in El Salvador, the Philippines and Bangladesh.' },
  { q: 'Is Alloyed a certified woman-owned business?', a: 'Alloyed is a woman-owned company led by CEO Lauren Kochan. Ask us for current certification documentation for your supplier-diversity program.' },
  { q: 'Which industries do you specialize in?', a: 'Media and publishers, advertising and ad tech, retail media and e-commerce, financial services and fintech, travel and hospitality, and sports and entertainment: industries where volume, accuracy and deadlines collide.' },
  { q: 'How do I apply for a job at Alloyed?', a: 'Open roles across the United States, El Salvador, the Philippines and Bangladesh are listed on the careers page, with an El Salvador page in Spanish.' },
];
