/* ============================================================
   MAD TECH SOLUTIONS — Legal & compliance content

   IMPORTANT — read before this goes live:
   1. Fill in the blank fields in COMPANY (siteContent.js): legal
      entity name, registered address, GSTIN/CIN, grievance officer.
   2. The commercial clauses below (advance percentage, refund
      window, support window) are conventional defaults. Change
      them to match how you actually invoice, or they become
      promises you did not intend to make.
   3. This is a well-structured starting point, not legal advice.
      Have a lawyer read it once before you rely on it.
   ============================================================ */

import { COMPANY } from "./siteContent";

export const LEGAL_UPDATED = "20 September 2026";

const entity = COMPANY.legalEntityName || COMPANY.name;
const place = `${COMPANY.city}, ${COMPANY.state}, ${COMPANY.country}`;
const address = COMPANY.registeredAddress || place;

/* ---------------------------------------------------------- */

const PRIVACY = {
  slug: "privacy-policy",
  path: "/privacy-policy",
  title: "Privacy Policy",
  kicker: "How we handle your data",
  summary:
    "What we collect, why we collect it, how long we keep it, and the rights you have over it under India's Digital Personal Data Protection Act, 2023.",
  sections: [
    {
      h: "1. Who this policy covers",
      p: [
        `${entity} ("we", "us", "our") operates ${COMPANY.site} and provides web, mobile, AI and digital growth services from ${place}.`,
        "This policy explains how we handle personal data belonging to visitors of this website, people who contact us about work, and clients whose projects we build and maintain. It applies to this website and to the services we deliver, except where a signed client agreement says otherwise.",
      ],
    },
    {
      h: "2. What we collect",
      p: ["We collect only what a real business conversation requires."],
      ul: [
        "Information you give us: your name, email address, phone number, company, and anything you type into an enquiry form, estimator or email.",
        "Project information: the material a client shares so we can build the work — brand assets, content, access credentials to systems we are asked to deploy to, and business requirements.",
        "Technical information collected automatically: IP address, browser and device type, approximate location, referring page, pages viewed and time on them. This arrives through server logs and analytics rather than through anything you fill in.",
        "Cookies and similar technologies, as described in our cookie policy.",
      ],
      after: [
        "We do not ask for and do not want payment card numbers, government identity numbers, health information or any other sensitive category of data through this website. Please do not send them to us over email or a form.",
      ],
    },
    {
      h: "3. Why we use it",
      ul: [
        "To answer your enquiry and prepare a quote or demo.",
        "To deliver, support and maintain work a client has engaged us for.",
        "To invoice, keep accounts and meet our tax and statutory obligations.",
        "To understand how this website is used, so we can improve it.",
        "To send occasional updates about our work, where you have asked for them. Every such message carries a way to stop receiving them.",
        "To protect the site and our clients' systems against abuse, fraud and security incidents.",
      ],
      after: [
        "We do not sell personal data. We do not trade it, rent it, or hand it to data brokers. There is no version of our business that requires us to.",
      ],
    },
    {
      h: "4. Cookies and analytics",
      p: [
        "This website uses a small number of cookies to function and to measure traffic, and may use advertising tags where we are running campaigns. You can refuse or delete cookies in your browser at any time; the site will still work, though we will lose the ability to see what is and is not useful on it.",
        "Our cookie policy sets out the categories in detail.",
      ],
    },
    {
      h: "5. Who we share it with",
      p: [
        "We share personal data only with service providers who make the work possible, and only with the part of it they need:",
      ],
      ul: [
        "Hosting, cloud and content delivery providers that run this site and client projects.",
        "Analytics and advertising platforms, where enabled, for traffic measurement and campaign performance.",
        "Email and communication providers used to reply to you.",
        "Accounting, invoicing and payment providers for billing.",
        "Professional advisers, and government or regulatory authorities where the law requires disclosure.",
      ],
      after: [
        "Where a provider processes data on our behalf, they are bound to use it only for the service they supply to us.",
      ],
    },
    {
      h: "6. How long we keep it",
      ul: [
        "Enquiries that do not become projects: up to 24 months, so we remember the conversation if you return.",
        "Client project data and correspondence: for the duration of the engagement and up to 7 years afterwards, where needed for contractual, accounting and statutory purposes.",
        "Website analytics: for the retention period configured in the analytics platform we use.",
        "Anything else: only as long as the purpose we collected it for still exists.",
      ],
      after: [
        "When a retention period ends, data is deleted or anonymised. You can ask us to erase your data sooner — see your rights below.",
      ],
    },
    {
      h: "7. How we protect it",
      ul: [
        "Traffic to this site and to the systems we build is encrypted in transit using TLS.",
        "Access to client systems and data is limited to the people working on that project.",
        "Credentials are held in a secrets manager, not in chat threads or spreadsheets, and are rotated or revoked when an engagement ends.",
        "Dependencies in the software we ship are kept patched, and security advisories affecting a live project are treated as incidents.",
      ],
      after: [
        "No system is perfectly secure, and we will not claim otherwise. If a breach affects your personal data, we will notify you and the Data Protection Board of India as required under the Digital Personal Data Protection Act, 2023.",
      ],
    },
    {
      h: "8. Your rights",
      p: [
        "Under the Digital Personal Data Protection Act, 2023, and the Information Technology Act, 2000 together with the rules made under it, you may:",
      ],
      ul: [
        "Ask what personal data of yours we hold and why.",
        "Ask us to correct data that is wrong, incomplete or out of date.",
        "Ask us to erase data where we no longer have a lawful reason to keep it.",
        "Withdraw consent you previously gave, at any time, for processing that relies on it.",
        "Nominate another person to exercise these rights on your behalf in the event of your death or incapacity.",
        "Raise a grievance with us, and escalate to the Data Protection Board of India if we do not resolve it.",
      ],
      after: [
        `Write to ${COMPANY.email} and we will respond within a reasonable period, and in any case within the timelines the law requires. We may need to verify who you are before acting on a request.`,
      ],
    },
    {
      h: "9. Children",
      p: [
        "This website and our services are meant for businesses and adults. We do not knowingly collect personal data from children. If you believe a child has provided us data, write to us and we will delete it.",
      ],
    },
    {
      h: "10. Data outside India",
      p: [
        "Some providers we rely on — cloud hosting, analytics, email — store or process data on servers outside India. Where that happens, we use providers that offer appropriate safeguards and we transfer only what the service requires, in accordance with applicable Indian law.",
      ],
    },
    {
      h: "11. Other sites we link to",
      p: [
        "This site links to client projects and third-party platforms. Once you follow such a link you are on someone else's property, under their policy, not ours. We are not responsible for how they handle your data.",
      ],
    },
    {
      h: "12. Changes to this policy",
      p: [
        "When we change this policy we update the date at the top of the page. Material changes will be made obvious on the site rather than buried here.",
      ],
    },
    {
      h: "13. Grievances and contact",
      p: [
        COMPANY.grievanceOfficer
          ? `Grievance Officer: ${COMPANY.grievanceOfficer}.`
          : "Grievance Officer: the contact below handles data grievances.",
        `Email: ${COMPANY.email}`,
        `Phone: ${COMPANY.phone}`,
        `Address: ${address}`,
        "We acknowledge grievances within 48 hours and aim to resolve them within 30 days.",
      ],
    },
  ],
};

/* ---------------------------------------------------------- */

const TERMS = {
  slug: "terms-of-service",
  path: "/terms-of-service",
  title: "Terms of Service",
  kicker: "The rules of engagement",
  summary:
    "What you can expect from us, what we need from you, how work is quoted and paid for, and who owns what at the end.",
  sections: [
    {
      h: "1. These terms",
      p: [
        `These terms govern your use of ${COMPANY.site} and any services you engage ${entity} to provide. Using this site means you accept them. Where you and we sign a separate proposal, quotation or agreement, that document governs the specific project and these terms fill the gaps.`,
      ],
    },
    {
      h: "2. What we do",
      p: [
        "We design and build websites, web applications, mobile applications, AI integrations and related cloud infrastructure, and we provide digital growth and search services. What is included in any given project is defined by the written scope for that project — not by anything implied on this website.",
      ],
    },
    {
      h: "3. Estimates, demos and quotes",
      ul: [
        "The estimator on this site produces an indicative range for planning. It is not a quotation and not an offer.",
        "The free demo is a working sample built within approximately 48 hours of an agreed brief. It carries no obligation on either side, and intellectual property in it stays with us unless and until you engage us and pay for the project.",
        "A binding price exists only in a written quotation issued by us against a defined scope, and is valid for the period stated in it.",
      ],
    },
    {
      h: "4. Payment",
      ul: [
        "Unless the quotation says otherwise, projects are invoiced 50% in advance to begin work and 50% on delivery, before final handover.",
        "Longer engagements may be split into milestones, each invoiced on completion.",
        "Recurring services — maintenance, hosting, retainers — are invoiced in advance for the period.",
        "Invoices are payable within 7 days of issue. Taxes, where applicable, are charged in addition.",
        "Work may be paused on overdue invoices, and final handover of code, credentials and intellectual property happens after the final payment clears.",
      ],
    },
    {
      h: "5. What we need from you",
      ul: [
        "Content, brand material, access credentials and decisions, supplied in reasonable time.",
        "A single named person who can approve work on your behalf.",
        "Feedback consolidated into one round per review stage, rather than in fragments.",
        "Confirmation that any material you give us is yours to use.",
      ],
      after: [
        "Timelines assume these arrive on schedule. When they do not, delivery dates move by a corresponding amount — we will tell you when that happens rather than letting a deadline pass quietly.",
      ],
    },
    {
      h: "6. Revisions and scope",
      p: [
        "Each project includes the revision rounds stated in its scope. Refinement within the agreed direction is part of the work. A change of direction, an added feature or a new page is a change of scope, and we will quote it separately before doing it rather than absorbing it and surprising you later.",
      ],
    },
    {
      h: "7. Ownership and intellectual property",
      ul: [
        "On final payment, intellectual property in the deliverables created specifically for you transfers to you.",
        "We retain ownership of our pre-existing tools, libraries, internal frameworks and general know-how, and grant you a perpetual licence to use them as embedded in your deliverables.",
        "Third-party components — open-source libraries, fonts, stock media, paid plugins — remain under their own licences, which pass to you with the project.",
        "Unless you ask us not to, we may show the finished work in our portfolio and describe our role in it.",
      ],
    },
    {
      h: "8. Third-party services",
      p: [
        "Projects commonly depend on services we do not control — hosting, domains, payment gateways, analytics, model providers, app stores. Their fees, terms, uptime and policy changes are theirs, not ours. We will advise you on choices and set them up, but we cannot be responsible for their outages or decisions.",
      ],
    },
    {
      h: "9. Confidentiality",
      p: [
        "Each side keeps the other's non-public business information confidential and uses it only for the project. We will sign your NDA on request. This obligation survives the end of the engagement.",
      ],
    },
    {
      h: "10. Warranties and what we do not promise",
      ul: [
        "We warrant that the work will be performed with reasonable skill and care, and that deliverables will substantially match the agreed scope.",
        "Defects reported during the post-launch support window stated in your scope are fixed at no charge.",
        "We do not warrant that software will be uninterrupted or error-free, that third-party services will stay available, or that any particular search ranking, traffic level, conversion rate or revenue figure will be achieved. Anyone who promises you those is selling something else.",
      ],
    },
    {
      h: "11. Limitation of liability",
      p: [
        "To the extent permitted by law, our total liability arising out of a project is limited to the fees you paid us for that project. We are not liable for indirect or consequential losses, including lost profit, lost data or business interruption. Nothing here limits liability that cannot be limited under Indian law.",
      ],
    },
    {
      h: "12. Ending an engagement",
      p: [
        "Either side may end an engagement in writing. You pay for work completed and costs committed up to that date; we hand over what has been paid for. Our refund and cancellation policy sets out how money already paid is treated.",
      ],
    },
    {
      h: "13. Using this website",
      ul: [
        "Do not attempt to breach, scan, overload or interfere with this site or the systems behind it.",
        "Do not copy the design, code, text or images on it for your own commercial use.",
        "Content on this site is provided for information. We may change it at any time.",
      ],
    },
    {
      h: "14. Governing law",
      p: [
        `These terms are governed by the laws of India. The courts at ${COMPANY.city}, ${COMPANY.state} have exclusive jurisdiction, and both sides will attempt a good-faith resolution by discussion before going anywhere near them.`,
      ],
    },
    {
      h: "15. Contact",
      p: [`${entity}`, `Email: ${COMPANY.email}`, `Phone: ${COMPANY.phone}`, `Address: ${address}`],
    },
  ],
};

/* ---------------------------------------------------------- */

const REFUNDS = {
  slug: "refund-policy",
  path: "/refund-policy",
  title: "Refund & Cancellation",
  kicker: "If it does not work out",
  summary:
    "How cancellations are handled, what is refundable, what is not, and how long a refund takes.",
  sections: [
    {
      h: "1. The principle",
      p: [
        "You pay for work that has been done. If work has not been done, you should not be paying for it — and if it has, we should be. Everything below is that idea, written out.",
      ],
    },
    {
      h: "2. Before a project starts",
      ul: [
        "The 48-hour demo is free. Deciding not to proceed after seeing it costs you nothing and requires no explanation.",
        "If you cancel after paying an advance but before we have begun work, the advance is refunded in full.",
      ],
    },
    {
      h: "3. After work has started",
      ul: [
        "Cancel mid-project and we invoice for work completed and third-party costs already committed — domains, licences, paid services. Any remaining balance of your advance is refunded.",
        "Where a project is delivered in milestones, completed and approved milestones are not refundable.",
        "Work completed and handed over is not refundable, since you keep it.",
      ],
    },
    {
      h: "4. If we cannot deliver",
      p: [
        "If we are unable to complete a project we have taken on, we refund every amount paid for work not delivered, and we say so early rather than letting a deadline slide. If a delay is our fault, we do not charge you for it.",
      ],
    },
    {
      h: "5. Recurring services",
      ul: [
        "Maintenance, hosting and retainer plans can be cancelled with 15 days' written notice before the next billing date.",
        "The current period is not refunded, and service continues to the end of it.",
        "Third-party costs paid for a full term — domains, licences, subscriptions — are not refundable, but transfer to you.",
      ],
    },
    {
      h: "6. What is never refundable",
      ul: [
        "Amounts already paid to third parties on your instruction.",
        "Advertising spend that has been delivered by the platform.",
        "Work rejected for reasons outside the agreed scope, where it matches what was approved.",
      ],
    },
    {
      h: "7. How to request one",
      p: [
        `Email ${COMPANY.email} from the address on the engagement, with the project name and the reason. We acknowledge within 48 hours and confirm the outcome within 7 working days.`,
        "Approved refunds are returned by the original payment method within 7 to 10 working days of approval. Bank timelines after that are out of our hands.",
      ],
    },
    {
      h: "8. Disputes",
      p: [
        "Talk to us before raising a chargeback. Nearly every dispute we have seen was a misunderstanding about scope, and those are faster to fix over a call than through a payment provider.",
      ],
    },
  ],
};

/* ---------------------------------------------------------- */

const COOKIES = {
  slug: "cookie-policy",
  path: "/cookie-policy",
  title: "Cookie Policy",
  kicker: "What we store in your browser",
  summary: "The categories of cookies this site may use, and how to switch them off.",
  sections: [
    {
      h: "1. What cookies are",
      p: [
        "Cookies are small text files a website asks your browser to keep. They let a site remember things between page loads — and they let site owners count visits. We use few of them, and none that identify you personally by themselves.",
      ],
    },
    {
      h: "2. What we use",
      ul: [
        "Essential: needed for the site to load and function correctly. These cannot be switched off from here.",
        "Analytics: aggregate measurement — pages viewed, time on page, which sources send traffic. Used to improve the site, not to profile you.",
        "Advertising and conversion tracking: where we run campaigns, tags from advertising platforms record that a visit or enquiry came from an ad. These are set by the advertising platform under its own policy.",
        "Preference: remembers small choices, such as a dismissed banner.",
      ],
    },
    {
      h: "3. Third-party cookies",
      p: [
        "Analytics and advertising cookies are set by the platforms providing those services, and the data they collect is subject to their privacy policies as well as ours. We do not control how long those platforms retain it.",
      ],
    },
    {
      h: "4. Turning them off",
      p: [
        "Every major browser lets you block or delete cookies, and offers a private browsing mode that discards them on exit. Blocking analytics and advertising cookies does not break this website. Blocking essential cookies may.",
        "Browser-level controls are the most reliable way to refuse cookies from any site, including this one.",
      ],
    },
    {
      h: "5. Contact",
      p: [`Questions about this policy: ${COMPANY.email}`],
    },
  ],
};

/* ---------------------------------------------------------- */

export const LEGAL_DOCS = [PRIVACY, TERMS, REFUNDS, COOKIES];

export const LEGAL_BY_PATH = LEGAL_DOCS.reduce((acc, doc) => {
  acc[doc.path] = doc;
  return acc;
}, {});
