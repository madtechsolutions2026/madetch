export const getProjects = (req, res) => {
  const projects = [
    {
      id: "01",
      slug: "kriss-maagiic-crystals",
      name: "Kriss Maagiic Crystals",
      category: "Crystals & Wellness",
      year: "2025",
      url: "https://www.krissmaagiiccrystals.com/",
      description: "High-performance e-commerce and wellness digital platform with custom catalog, frictionless checkout, and bespoke visual identity.",
      tags: ["Next.js", "React", "Tailwind", "E-Commerce", "SEO Engine"],
      deliverables: ["Brand Identity", "Custom Web Application", "Payment Gateway", "SEO Architecture"]
    },
    {
      id: "02",
      slug: "shoot-at-sight-weddings",
      name: "Shoot @ Sight",
      category: "Photography & Films",
      year: "2025",
      url: "http://shootatsightweddings.com/",
      description: "Cinematic visual portfolio showcasing luxury wedding photography and film production with fluid gallery motion and fast image delivery.",
      tags: ["React", "WebGL", "Media CDN", "Editorial UI", "Lead Capture"],
      deliverables: ["Visual Direction", "Portfolio Web App", "Ultra-fast CDN", "Client Inquiries"]
    },
    {
      id: "03",
      slug: "ride-for-you-ev",
      name: "Ride For You EV",
      category: "EV Rental Platform",
      year: "2025",
      url: "https://rideforyouev.com/",
      description: "Scalable electric vehicle booking and fleet reservation system with automated fleet availability and location-based routing.",
      tags: ["React", "Node.js", "Booking Engine", "Maps Integration", "Fleet Management"],
      deliverables: ["Booking Flow", "Admin Dashboard", "WhatsApp API Notifications", "Mobile UI"]
    },
    {
      id: "04",
      slug: "shaik-and-reddy-associates",
      name: "Shaik & Reddy Associates",
      category: "Legal & Corporate",
      year: "2025",
      url: "https://shaikandreddyassociates.com/",
      description: "Authoritative corporate presence for legal & advisory practitioners with secure consultation booking and enterprise compliance architecture.",
      tags: ["Next.js", "Corporate Identity", "Appointment Booking", "Enterprise SEO"],
      deliverables: ["Corporate Strategy", "Secure Legal Portal", "Consultation Pipeline", "Accessibility"]
    }
  ];

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
};
