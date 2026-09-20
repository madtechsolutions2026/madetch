/* ============================================================
   SQUADRIDE — product copy and legal content
   A Mad Tech Solutions product. Android app for group rides.

   The policy below describes what the app actually does today
   (anonymous auth, name + vehicle type, latest GPS fix only while
   a trip is active, deleted when it ends). If the app's behaviour
   changes — analytics added, history kept server-side, photos —
   update this file and the Play Data Safety form together, or the
   listing gets rejected for a mismatch.
   ============================================================ */

import { COMPANY } from "./siteContent";

export const SQUADRIDE = {
  name: "SquadRide",
  promise: "Stay together when you travel together.",
  pitch:
    "SquadRide tells your riding group whether the squad is still together — who is ahead, who is behind, and when someone has actually separated rather than just lost signal.",
  platform: "Android",
  status: "Private beta",
  package: "app.squadride",
  path: "/squadride",
};

/* ---------- Landing page content ---------- */

export const SR_PROBLEM = {
  kicker: "The problem",
  title: "Four bikes leave together.",
  serif: "One arrives alone.",
  body: "Somewhere between the petrol stop and the ghat section the group stretches out. Someone takes a wrong turn. Someone stops for chai. The rest ride on, and the next twenty minutes are spent pulling over, calling, and asking the same question into a helmet: where are you?",
  note: "WhatsApp live location shows you dots. It does not tell you the group has broken up, and it certainly does not tell you the difference between a friend who is two kilometres behind and a friend whose phone just lost signal.",
};

export const SR_FEATURES = [
  {
    idx: "01",
    title: "Automatic squad status",
    body: "Together, stretching, separated, or connection lost — worked out continuously from everyone's position, and named in plain words with the rider who is the outlier.",
  },
  {
    idx: "02",
    title: "Ahead and behind, not dots",
    body: "\"Sai is 1.1 km behind\" is useful at 80 km/h. A map pin is not. Every rider is described in the terms a rider actually thinks in.",
  },
  {
    idx: "03",
    title: "Lost signal is not lost rider",
    body: "When a phone stops reporting, the squad is told the connection dropped — not that the rider has fallen behind. That single distinction prevents most wrong turns back down a hill.",
  },
  {
    idx: "04",
    title: "Join in seconds",
    body: "The leader creates a trip and shares a code, a link or a QR. Friends join without an account, an email or a password.",
  },
  {
    idx: "05",
    title: "Built for gloves and sunlight",
    body: "Large controls, colour plus text for every state, and nothing that needs interaction while moving. Glance only when safe.",
  },
  {
    idx: "06",
    title: "It ends when the ride ends",
    body: "Sharing is off by default, on only during an active trip, and deleted the moment the leader ends it. Nobody stays on a map after they get home.",
  },
];

export const SR_STEPS = [
  {
    idx: "01",
    title: "Create the trip",
    body: "Name the ride, pick your vehicle, done in under fifteen seconds.",
  },
  {
    idx: "02",
    title: "Share the invite",
    body: "WhatsApp, a copied code or a QR at the petrol pump. Friends join and appear in the lobby as they mark themselves ready.",
  },
  {
    idx: "03",
    title: "Start the ride",
    body: "One tap starts sharing for the whole squad, with an explicit privacy confirmation. The map, the status and the alerts run from there.",
  },
  {
    idx: "04",
    title: "End it",
    body: "The leader ends the trip. Sharing stops for everyone, live positions are deleted, and you get the ride summary — time, distance, who arrived and when.",
  },
];

export const SR_PRIVACY_POINTS = [
  "Location sharing is off until a ride starts, and off again the moment it ends.",
  "Only the riders in your trip can see your position — never the public, never other groups.",
  "Only your latest position is stored. It is overwritten as you ride and deleted when the trip ends.",
  "No email, no password, no phone number. Joining takes a name and a vehicle type.",
  "No advertising, and your data is never sold or shared for marketing.",
];

export const SR_FAQS = [
  {
    q: "Is there an iPhone version?",
    a: "Not yet. SquadRide is Android only during the beta. An iPhone rider can still be part of the plan, but cannot yet appear on the squad map — a web join page for iPhone is on the roadmap.",
  },
  {
    q: "Does it drain my battery?",
    a: "It uses adaptive GPS: the app reports more often when the squad is moving and separating, and less when everyone is together or stopped. It runs as a foreground service so Android does not silently kill sharing mid-ride, and the notification is always visible while it is on.",
  },
  {
    q: "What happens when we lose network in the hills?",
    a: "Your friends see \"connection lost\" against your name with the time of your last known position, rather than a stale dot that makes it look like you stopped. When signal returns, you reappear automatically.",
  },
  {
    q: "Can my friends see me after the ride?",
    a: "No. Sharing stops when the leader ends the trip, when you leave it, or when the trip expires after 24 hours, and the stored positions are deleted at that point.",
  },
  {
    q: "Do we all need accounts?",
    a: "No. There is no sign-up. The app creates an anonymous identity on your phone; you give a display name and a vehicle type so your friends know which rider is which.",
  },
  {
    q: "Is this a safety or emergency service?",
    a: "No. SquadRide helps a group stay coordinated. It is not an emergency service, does not contact anyone on your behalf, and should never be relied on in place of calling for help.",
  },
];

/* ---------- Legal ---------- */

const entity = COMPANY.legalEntityName || COMPANY.name;
const place = `${COMPANY.city}, ${COMPANY.state}, ${COMPANY.country}`;
const address = COMPANY.registeredAddress || place;

const SR_PRIVACY = {
  slug: "squadride-privacy",
  path: "/squadride/privacy-policy",
  title: "SquadRide Privacy Policy",
  kicker: "The app that shares your location",
  summary:
    "SquadRide handles live location, so this policy is specific about what is collected, who can see it, how long it lasts, and what is never collected at all.",
  sections: [
    {
      h: "1. Who we are",
      p: [
        `SquadRide is an Android application published by ${entity}, ${place}. This policy covers the SquadRide app (package ${SQUADRIDE.package}) and applies in addition to the privacy policy for ${COMPANY.site}.`,
        "SquadRide is in private beta. Where this policy describes behaviour that changes during the beta, we will update the policy and the Google Play Data Safety declarations together.",
      ],
    },
    {
      h: "2. What we collect",
      p: ["Only what a group ride needs, and nothing else."],
      ul: [
        "An anonymous account identifier created on your device. We do not collect an email address, a password or a phone number, and we have no way to identify you personally from it.",
        "Your display name and vehicle type (motorcycle, car or other), so your friends know which rider is which. You choose the name; it does not have to be your real one.",
        "Trip details: the trip name, who created it, the invite code and when the trip expires.",
        "Precise location — latitude, longitude, accuracy, and where available speed and heading — while, and only while, a trip you have joined is active and you are sharing.",
        "Ride totals such as elapsed time, distance covered and arrival times, used to show the ride summary.",
      ],
      after: [
        "We do not collect your contacts, photos, messages, call logs, microphone, browsing activity, device advertising identifier, or any other location at any other time.",
      ],
    },
    {
      h: "3. When location is collected — and when it is not",
      p: [
        "This is the part that matters most, so it is stated exactly:",
      ],
      ul: [
        "Location sharing is off by default. Installing the app does not share anything.",
        "It begins only when a trip you are a member of is started, and only after you have granted location permission and seen the in-app confirmation.",
        "While a trip is active, the app reports your position in the background using a foreground service. A notification stays visible on your phone the entire time sharing is on.",
        "Sharing stops when the leader ends the trip, when you leave it, when the trip expires 24 hours after it was created, or when you revoke location permission.",
        "Our servers refuse to record a position for a trip that is not active or has expired. This is enforced by the database rules, not only by the app.",
      ],
    },
    {
      h: "4. Who can see your location",
      ul: [
        "Only the riders who are members of that specific trip, while that trip is active.",
        "Not the public. Not other SquadRide groups. Not anyone who has your invite code but has not joined.",
        "A rider removed from a trip, or who has left it, loses access immediately.",
      ],
      after: [
        "Our engineers can technically access the database in order to operate and debug the service, and do so only when necessary. We do not browse trip data, and we do not use it for any purpose other than running SquadRide.",
      ],
    },
    {
      h: "5. How long it is kept",
      ul: [
        "Live position: only your most recent position is stored. Each new reading overwrites the previous one, so there is no location history on our servers — no route is retained.",
        "Your position is deleted when the trip ends, when you leave the trip, or when the trip expires.",
        "Trip records and ride summaries expire 24 hours after the trip was created.",
        "Your display name and vehicle type remain until you delete them or ask us to remove your data.",
        "On-device settings — your name, vehicle, distance totals for a ride in progress — stay on your phone and are removed when you uninstall the app. The app does not store any location on your device.",
      ],
    },
    {
      h: "6. Services we rely on",
      p: ["SquadRide is built on Google services, which process data on our behalf:"],
      ul: [
        "Firebase Authentication — creates the anonymous identity for your device.",
        "Firebase Realtime Database — stores trip and live position data as described above.",
        "Google Maps SDK for Android — draws the map. Google receives the data needed to serve map tiles.",
        "Google Routes API — calculates the distance and estimated arrival time to a destination or to another rider when you ask for it.",
        "Google Play services location — supplies your device's position to the app.",
      ],
      after: [
        "These providers process data under Google's own terms and privacy policy. We do not sell your data, and we do not share it with advertisers, data brokers or analytics networks.",
      ],
    },
    {
      h: "7. Where your data is stored",
      p: [
        "Our database is hosted in a Google Cloud region in Asia, which may be outside India. Where data is transferred outside your country, it is transferred only to run the service and is protected by Google Cloud's safeguards. Nothing is stored for longer than the periods set out in section 5 regardless of where it is held.",
      ],
    },
    {
      h: "8. Demo mode",
      p: [
        "If SquadRide is running in demo mode — used for showcasing the app without a server — everything happens on your phone with simulated riders, a DEMO MODE label stays visible, and no data whatsoever leaves the device.",
      ],
    },
    {
      h: "9. Your rights",
      p: [
        "Under the Digital Personal Data Protection Act, 2023, you may ask us what personal data we hold about you, ask us to correct it, ask us to delete it, or withdraw consent for processing that relies on it.",
      ],
      ul: [
        "To stop all sharing immediately: end or leave the trip, or revoke location permission in Android settings.",
        "To remove everything: uninstall the app, which clears on-device data, and email us to delete your profile and any remaining trip records.",
        `To make any other request, or to raise a grievance, write to ${COMPANY.email}.`,
      ],
      after: [
        "We acknowledge requests within 48 hours and act on them within 30 days. If we cannot resolve a grievance, you may escalate it to the Data Protection Board of India.",
      ],
    },
    {
      h: "10. Children",
      p: [
        "SquadRide is intended for adults who ride. It is not directed at children, and we do not knowingly collect data from anyone under 18. If you believe a child has used the app, write to us and we will delete the data.",
      ],
    },
    {
      h: "11. Security",
      ul: [
        "All communication between the app and our servers is encrypted in transit.",
        "Database rules restrict every read and write to the trip members entitled to it, and are enforced on the server.",
        "Position writes are rejected outright for trips that are not active.",
      ],
      after: [
        "No system is perfectly secure. If a breach affects your personal data we will notify affected users and the Data Protection Board of India as the law requires.",
      ],
    },
    {
      h: "12. Changes",
      p: [
        "When this policy changes we update the date at the top of the page, and we update the Google Play Data Safety information at the same time. Material changes will be surfaced in the app.",
      ],
    },
    {
      h: "13. Contact",
      p: [
        `${entity} — SquadRide`,
        `Email: ${COMPANY.email}`,
        `Phone: ${COMPANY.phone}`,
        `Address: ${address}`,
      ],
    },
  ],
};

const SR_TERMS = {
  slug: "squadride-terms",
  path: "/squadride/terms",
  title: "SquadRide Terms of Use",
  kicker: "Using the app",
  summary:
    "What SquadRide is, what it is not, and the rules for using it — including the ones about riding safely.",
  sections: [
    {
      h: "1. Agreement",
      p: [
        `These terms govern your use of the SquadRide Android application, published by ${entity}. By installing or using the app you accept them. If you do not, do not use the app.`,
        "SquadRide is currently in private beta. Features may change, break or be withdrawn, and the service is provided without any guarantee of availability.",
      ],
    },
    {
      h: "2. Ride safely — this comes first",
      ul: [
        "Do not operate a vehicle while using your phone. Glance only when it is safe, and stop before interacting with the app.",
        "SquadRide is a coordination tool, not a navigation instruction and not a riding instruction. Road conditions, traffic law and your own judgement always take priority over anything the app shows.",
        "You are responsible for complying with the law on mobile phone and device use while driving or riding in your jurisdiction.",
      ],
    },
    {
      h: "3. What SquadRide is not",
      ul: [
        "It is not an emergency or roadside assistance service. It does not call anyone for you.",
        "It is not a safety device and does not detect crashes.",
        "It is not a precise or guaranteed tracking service. Positions depend on your phone's GPS and mobile network, both of which fail in exactly the terrain where riders want them most.",
        "It is not a substitute for agreeing a route and a meeting point with your group before you set off.",
      ],
    },
    {
      h: "4. Your account and profile",
      ul: [
        "The app creates an anonymous identity on your device. You are responsible for the device and for anyone you let use it.",
        "Choose a display name that does not impersonate someone else and is not offensive.",
        "You must be 18 or older to use SquadRide.",
      ],
    },
    {
      h: "5. Location sharing and consent",
      ul: [
        "You control your own sharing. Starting a ride shares your live position with the other members of that trip only.",
        "Do not share another person's location without their knowledge. Never add someone to a trip on a device that is not theirs, and never use SquadRide to monitor a person who has not agreed to it.",
        "We may suspend accounts used for surveillance, stalking or harassment.",
      ],
    },
    {
      h: "6. Acceptable use",
      ul: [
        "Do not attempt to break, probe, overload or reverse-engineer the service, or to access trips you have not been invited to.",
        "Do not use the app for any unlawful purpose, including organising or coordinating illegal racing on public roads.",
        "Do not resell, sublicense or redistribute the app or its data.",
      ],
    },
    {
      h: "7. Availability during beta",
      p: [
        "The beta is free. We may change, suspend or discontinue any part of SquadRide at any time, and trip data may be reset between beta builds. Do not rely on the app as the only means of keeping a group together on a ride that matters.",
      ],
    },
    {
      h: "8. Intellectual property",
      p: [
        `The app, its name, design and code belong to ${entity}. You get a personal, non-exclusive, revocable licence to use the app for its intended purpose.`,
      ],
    },
    {
      h: "9. Disclaimers and liability",
      p: [
        "The app is provided \"as is\". To the extent permitted by law we exclude implied warranties, and we are not liable for indirect or consequential loss, for any incident occurring while riding, or for any consequence of a position being inaccurate, delayed or unavailable.",
        "Nothing in these terms limits liability that cannot be limited under Indian law.",
      ],
    },
    {
      h: "10. Privacy",
      p: [
        "How we handle your data is set out in the SquadRide privacy policy, which forms part of these terms.",
      ],
    },
    {
      h: "11. Governing law",
      p: [
        `These terms are governed by the laws of India, and the courts at ${COMPANY.city}, ${COMPANY.state} have exclusive jurisdiction.`,
      ],
    },
    {
      h: "12. Contact",
      p: [`Email: ${COMPANY.email}`, `Address: ${address}`],
    },
  ],
};

export const SQUADRIDE_DOCS = [SR_PRIVACY, SR_TERMS];
