/* ============================================================
   MAD TECH SOLUTIONS — Site content
   Copy for the narrative sections. Edit text here, not in JSX.
   ============================================================ */

export const COMPANY = {
  name: "Mad Tech Solutions",
  tagline: "Make Anything Digital.",
  email: "madtechsolutions.in@gmail.com",
  phone: "+91 70956 82464",
  phoneHref: "tel:+917095682464",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  site: "https://www.madtechsolutions.tech",
  founded: "2025",

  /* ---- Fill these in before the legal pages go live ----
     Leave a value as an empty string and the policies simply
     omit that line rather than printing a placeholder. */
  legalEntityName: "",   // e.g. "Mad Tech Solutions Pvt Ltd" — falls back to `name`
  registeredAddress: "", // full postal address for the policy pages
  gstin: "",             // GSTIN, if registered
  cin: "",               // CIN, if a private limited company
  grievanceOfficer: "",  // name of the person handling data grievances
};

/* ---------- How we work ---------- */
export const PROCESS = [
  {
    idx: "01",
    title: "Interrogate",
    duration: "Day 0–1",
    line: "We ask the uncomfortable questions first.",
    body: "Before a single pixel, we pull apart what you actually sell, who buys it, and what is currently leaking revenue. Most briefs describe a website. We are looking for the business problem underneath it.",
    points: ["Business & funnel audit", "Competitor teardown", "Success metric agreed in writing"],
  },
  {
    idx: "02",
    title: "Prove",
    duration: "Within 48h",
    line: "You see a real demo before you pay us anything.",
    body: "We build a working slice of your project — your brand, your content, your flow — and send it over. No stock template with your logo pasted on. If it does not excite you, you walk away owing nothing.",
    points: ["Custom demo, not a mockup", "Live link on a real device", "Zero commitment to continue"],
  },
  {
    idx: "03",
    title: "Engineer",
    duration: "1–3 weeks",
    line: "Built from first principles, shipped in sprints.",
    body: "Clean architecture, typed code, sub-second loads, and an environment you can actually deploy to. You get a staging link from day one and watch the thing grow instead of waiting in the dark.",
    points: ["Staging link from day one", "Weekly build reviews", "Performance & accessibility budgets"],
  },
  {
    idx: "04",
    title: "Compound",
    duration: "Ongoing",
    line: "Launch is the start of the measurement, not the end of the job.",
    body: "Search visibility, analytics, conversion tracking and iteration. We hand over every credential, document how it works, and stay on call for the weeks where it matters most.",
    points: ["Full ownership handover", "Analytics & search setup", "Post-launch support window"],
  },
];

/* ---------- Why us ---------- */
export const DIFFERENTIATORS = [
  {
    idx: "01",
    title: "A demo before a deposit",
    body: "We build something real inside 48 hours and show you first. It is the fastest way to prove we understood the brief — and the fastest way for you to find out if we did not.",
  },
  {
    idx: "02",
    title: "Built, never templated",
    body: "No purchased themes, no page builders, no seventeen plugins holding the layout together. Every component is written for your brand and nobody else's.",
  },
  {
    idx: "03",
    title: "You own all of it",
    body: "Source code, domain, hosting, analytics, every account. Handed over on completion with the documentation to run it without us. We earn the next project; we do not hold the last one hostage.",
  },
  {
    idx: "04",
    title: "Speed you can check",
    body: "Ten days for a media portfolio. Two weeks for e-commerce. Three weeks for a booking platform. Those are shipped projects on this page, not sales numbers.",
  },
  {
    idx: "05",
    title: "One team, the whole stack",
    body: "Design, frontend, backend, cloud, AI and search sit in the same room. Nothing gets lost in a handoff between three vendors who have never spoken.",
  },
  {
    idx: "06",
    title: "Engineered to be found",
    body: "Technical SEO, structured data and Core Web Vitals are part of the build, not an upsell six months later when the traffic never arrived.",
  },
];

/* ---------- Security & compliance ---------- */
/* Review these before publishing — they are commitments to clients. */
export const TRUST = [
  {
    title: "Encrypted in transit",
    body: "Every site and API we ship is served over TLS with modern ciphers and automatic certificate renewal. No mixed content, no expired certificates.",
  },
  {
    title: "DPDP Act aligned",
    body: "Personal data we handle on your behalf is collected for a stated purpose, kept only as long as it is needed, and removable on request — in line with India's Digital Personal Data Protection Act, 2023.",
  },
  {
    title: "Least-privilege access",
    body: "Credentials are scoped to the people who need them, stored in a secrets manager rather than a chat thread, and rotated when a project ends.",
  },
  {
    title: "Dependencies patched",
    body: "Packages are pinned, audited and updated. Security advisories on a live client project are treated as incidents, not backlog items.",
  },
  {
    title: "Backups that restore",
    body: "Databases and media are backed up on a schedule appropriate to the project, and we test the restore path instead of assuming it works.",
  },
  {
    title: "Your IP, contractually",
    body: "NDAs signed on request. Intellectual property in the delivered work transfers to you on final payment, in writing.",
  },
];

/* ---------- FAQ ---------- */
export const FAQS = [
  {
    q: "How fast can you actually deliver?",
    a: "A custom demo lands within 48 hours of the brief. Full projects on this site have shipped in 10 days to 3 weeks depending on scope — a media portfolio is faster than a booking platform with a fleet database behind it. The estimator above gives you a realistic range for your own scope.",
  },
  {
    q: "What does a project cost?",
    a: "It depends on what is being built, which is why the estimator exists rather than a price list. Use it for a grounded range, then we quote a fixed price against an agreed scope before any work starts. No hourly surprises.",
  },
  {
    q: "Is the 48-hour demo really free?",
    a: "Yes, and there is no obligation attached to it. We would rather spend two days proving we can do the work than two weeks in proposal meetings. If you do not like what you see, you keep the feedback and we part on good terms.",
  },
  {
    q: "Who owns the code and the accounts?",
    a: "You do. On final payment, intellectual property in the delivered work is yours, and we hand over the repository, hosting, domain, analytics and every other credential, with documentation. Nothing stays locked to us.",
  },
  {
    q: "Do you maintain the site after launch?",
    a: "Every project includes a post-launch support window for fixes and adjustments. Beyond that we offer optional monthly care — updates, monitoring, backups, performance and content changes — but it is a choice, not a lock-in.",
  },
  {
    q: "Can you work with our existing site or app?",
    a: "Often, yes. We audit what exists first and tell you honestly whether it is worth improving or rebuilding. Sometimes the right answer is a rescue, sometimes the codebase is costing you more than a rebuild would.",
  },
  {
    q: "How do you handle our data and our clients' data?",
    a: "Access is scoped to the people doing the work, credentials live in a secrets manager, and personal data is handled in line with India's DPDP Act, 2023. We sign NDAs on request, and the privacy policy on this site sets out exactly what we collect and why.",
  },
  {
    q: "What do you need from us to start?",
    a: "Less than you think: what you sell, who buys it, what you want more of, and any brand material you already have. If you have none of that, the first call produces it. We do the heavy lifting from there.",
  },
];

/* ---------- Marquee ---------- */
export const MARQUEE_ITEMS = [
  "Web Engineering",
  "Mobile Apps",
  "AI Agents",
  "Cloud & DevOps",
  "Technical SEO",
  "E-Commerce",
  "Design Systems",
  "Automation",
];
