export const site = {
  name: "YOGFINITY",
  tagline: "Engineering the Human Body",
  description:
    "A small, intentional yoga studio rooted in fascia science and ancient practice. Small classes. Personalised attention. Real transformation.",
  url: "https://yogfinity.com",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Classes", href: "#classes" },
  { label: "Book", href: "#booking" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  eyebrow: "A New Kind of Yoga Studio",
  line1: "Where your practice",
  line2: "finds infinite depth.",
  subheadline:
    "Small classes. Real science. Two dedicated teachers who will actually know your name — and your body.",
  ctaPrimary: "Book Your First Class",
  ctaSecondary: "Our Method",
  stats: [
    { value: "2", label: "Certified Teachers" },
    { value: "Small", label: "Intimate Classes" },
    { value: "∞", label: "Your Potential" },
  ],
} as const;

export const manifesto = {
  id: "about",
  quote:
    "The body is not a problem to be fixed. It is an architecture to be understood.",
  attribution: "— The YOGFINITY Method",
  pillars: [
    {
      icon: "🧬",
      title: "Fascia Intelligence",
      description: "Map and release the body's connective web for fluid, resilient movement.",
    },
    {
      icon: "🌀",
      title: "Ancient Yogic Wisdom",
      description: "Time-tested practices refined for modern biomechanics and nervous system balance.",
    },
    {
      icon: "🦴",
      title: "Movement Alignment",
      description: "Restore structural integrity from the ground up — joints, spine, and breath.",
    },
    {
      icon: "🧘",
      title: "Nervous System Recovery",
      description: "Down-regulate stress and rewire your body for lasting transformation.",
    },
  ],
} as const;

export const method = {
  id: "method",
  label: "THE METHOD",
  steps: [
    {
      number: "01",
      title: "Assess",
      description:
        "We begin with you — your patterns, postural habits, and where your body holds tension.",
    },
    {
      number: "02",
      title: "Engineer",
      description:
        "Targeted yoga, mobility, and fascia work designed for your body and your goals.",
    },
    {
      number: "03",
      title: "Integrate",
      description:
        "Practice that lasts beyond the mat — into how you move, breathe, and live.",
    },
  ],
} as const;

export const classes = {
  id: "classes",
  heading: "Our Classes",
  subheading:
    "Four signature offerings. Small groups. Personal guidance every session.",
  items: [
    {
      name: "Fascia Flow",
      intensity: 3,
      duration: "75 min",
      level: "Deep",
      description:
        "Release tension deep in connective tissue. Feel fundamentally freer.",
      bgClass: "bg-sage",
      textClass: "text-ivory",
    },
    {
      name: "Mobility Architecture",
      intensity: 2,
      duration: "60 min",
      level: "All Levels",
      description:
        "Joint mobility layered with dynamic yoga. For all levels.",
      bgClass: "bg-amber",
      textClass: "text-obsidian",
    },
    {
      name: "Yin Deep Tissue",
      intensity: 3,
      duration: "90 min",
      level: "Restore",
      description:
        "Long passive holds. Deep stillness. Profound release.",
      bgClass: "bg-charcoal",
      textClass: "text-ivory",
    },
    {
      name: "Recovery",
      intensity: 1,
      duration: "45 min",
      level: "Athletic",
      description:
        "Nervous system reset. Breathwork. Active release.",
      bgClass: "bg-ivory",
      textClass: "text-obsidian",
    },
  ],
} as const;

export const teachers = {
  id: "teachers",
  heading: "Two Teachers. Personal Guidance.",
  subheading: "We're a small team — and we'll actually know your name.",
  members: [
    {
      initials: "A",
      name: "Aditi Singh",
      title: "Certified Yoga & Fascia Coach",
      bio: "Passionate about the intersection of movement science and ancient yogic practice. Here to guide you deeper into your body's intelligence.",
      specializations: ["Fascia", "Mobility", "Yin"],
    },
    {
      initials: "B",
      name: "Coming Soon",
      title: "Certified Yoga & Recovery Coach",
      bio: "Dedicated to helping students build a practice that heals, strengthens and restores — from the inside out.",
      specializations: ["Breathwork", "Recovery", "Nervous System"],
    },
  ],
} as const;

export const studio = {
  id: "studio",
  overlayTitle: "A Space Designed for Deep Work",
  images: [
    { label: "Our Studio", gradient: "from-obsidian via-sage/40 to-charcoal" },
  ],
  features: [
    "One Intimate Studio",
    "Designed for Deep Practice",
    "1:1 Body Architecture Sessions",
  ],
} as const;

export const testimonials = {
  heading: "Voices of the Practice",
  items: [
    {
      quote:
        "This isn't a yoga studio. It's a laboratory for the body. The science behind every session changed everything.",
      name: "Priya S.",
      program: "Founding Student",
    },
  ],
  mantra: {
    quote:
      "The body is not a problem to be fixed. It is an architecture to be understood.",
    attribution: "The YOGFINITY Method",
  },
} as const;

export const booking = {
  eyebrow: "Limited Founding Spots Available",
  heading: "Be one of our first students.",
  subtext:
    "We're opening our doors to a small founding cohort. Join us for a complimentary intro session and experience the YOGFINITY method firsthand.",
  cta: "Claim Your Founding Spot",
  secondary: "Or view our opening class schedule →",
} as const;

export const bookingForm = {
  title: "Book a Session",
  subtitle: "Small classes, big results. Secure your spot below.",
  classOptions: [
    "Fascia Flow",
    "Mobility Architecture",
    "Yin Deep Tissue",
    "Recovery",
    "Not sure yet — recommend one for me",
  ],
  submit: "Confirm Booking",
  disclaimer: "We'll confirm within 24 hours · Free first session",
} as const;

export const footer = {
  socials: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  columns: [
    {
      title: "Studio",
      links: [
        { label: "About", href: "#about" },
        { label: "The Method", href: "#method" },
      ],
    },
    {
      title: "Classes",
      links: [
        { label: "Schedule", href: "#classes" },
        { label: "All Classes", href: "#classes" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Book", href: "#booking" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ],
  newsletter: {
    placeholder: "your@email.com",
    button: "Join the Movement",
  },
  copyright: "© 2026 YOGFINITY. All rights reserved.",
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const;
