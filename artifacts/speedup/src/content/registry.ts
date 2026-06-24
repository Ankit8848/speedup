/**
 * Content registry — the single source of truth for every editable piece of
 * site content. It defines BOTH the field schema the admin uses to render
 * editing forms AND the built-in default values the public site falls back to.
 *
 * The database (`content_blocks`) only stores admin overrides; at runtime the
 * site merges `serverOverride ?? registryDefault` per section (see
 * ContentProvider). To make a new section editable: add a SectionDef here and
 * read it in the component via `useSection("<key>")`.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "image"
  | "color"
  | "number";

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
}

export interface ListField {
  key: string;
  label: string;
  type: "list";
  help?: string;
  /** Singular noun for the "Add <item>" button. */
  itemNoun: string;
  /** Field that best labels each row in the editor (falls back to index). */
  titleKey?: string;
  fields: Field[];
}

export type AnyField = Field | ListField;

export interface SectionDef {
  key: string;
  title: string;
  group: string;
  description?: string;
  fields: AnyField[];
  default: Record<string, unknown>;
}

const link = (): Field[] => [
  { key: "label", label: "Label", type: "text" },
  { key: "href", label: "Link", type: "url" },
];

export const REGISTRY: SectionDef[] = [
  // ─────────────────────────────── Global ───────────────────────────────
  {
    key: "global.navbar",
    title: "Navigation bar",
    group: "Global",
    description: "Top navigation links and call-to-action buttons.",
    fields: [
      {
        key: "links",
        label: "Nav links",
        type: "list",
        itemNoun: "link",
        titleKey: "label",
        fields: link(),
      },
      { key: "ctaSecondaryLabel", label: "Secondary button label", type: "text" },
      { key: "ctaSecondaryHref", label: "Secondary button link", type: "url" },
      { key: "ctaPrimaryLabel", label: "Primary button label", type: "text" },
      { key: "ctaPrimaryHref", label: "Primary button link", type: "url" },
    ],
    default: {
      links: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Technology", href: "/technology" },
        { label: "Safety", href: "/safety" },
        { label: "Locations", href: "/locations" },
        { label: "Pricing", href: "/pricing" },
        { label: "For Business", href: "/for-business" },
      ],
      ctaSecondaryLabel: "Find My City",
      ctaSecondaryHref: "/locations",
      ctaPrimaryLabel: "Request Demo",
      ctaPrimaryHref: "/for-business",
    },
  },
  {
    key: "global.ticker",
    title: "News ticker",
    group: "Global",
    description: "Scrolling headline strip pinned to the very top of the page.",
    fields: [
      {
        key: "items",
        label: "Headlines",
        type: "list",
        itemNoun: "headline",
        titleKey: "text",
        fields: [
          { key: "emoji", label: "Emoji", type: "text" },
          { key: "text", label: "Text", type: "text" },
          { key: "color", label: "Accent color", type: "color" },
        ],
      },
    ],
    default: {
      items: [
        { emoji: "🚀", text: "SpeedUp launches drone delivery in Orlando, FL", color: "#FF5500" },
        { emoji: "📦", text: "100,000th delivery milestone reached", color: "#D97706" },
        { emoji: "✈️", text: "FAA grants BVLOS certification for 12 new cities", color: "#2563EB" },
        { emoji: "🌿", text: "Fleet runs 100% on renewable energy", color: "#16A34A" },
        { emoji: "🏆", text: "Best Drone Delivery Startup 2025 — TechCrunch", color: "#9333EA" },
        { emoji: "📍", text: "New hub opening in Dallas, TX · Q3 2025", color: "#0891B2" },
        { emoji: "💊", text: "CVS partnership: same-day pharmacy deliveries", color: "#059669" },
        { emoji: "⚡", text: "$120M Series C raised to expand nationwide", color: "#D97706" },
        { emoji: "🇺🇸", text: "Expanding to 25 US cities by end of 2025", color: "#2563EB" },
      ],
    },
  },
  {
    key: "global.footer",
    title: "Footer",
    group: "Global",
    description: "Site footer: tagline, link columns and bottom bar.",
    fields: [
      { key: "tagline", label: "Tagline", type: "textarea" },
      { key: "statusText", label: "Status pill text", type: "text" },
      {
        key: "productLinks",
        label: "Product column",
        type: "list",
        itemNoun: "link",
        titleKey: "label",
        fields: link(),
      },
      {
        key: "companyLinks",
        label: "Company column",
        type: "list",
        itemNoun: "link",
        titleKey: "label",
        fields: link(),
      },
      { key: "ctaPrimaryLabel", label: "Primary button label", type: "text" },
      { key: "ctaPrimaryHref", label: "Primary button link", type: "url" },
      { key: "ctaSecondaryLabel", label: "Secondary button label", type: "text" },
      { key: "ctaSecondaryHref", label: "Secondary button link", type: "url" },
      { key: "certText", label: "Certification note", type: "text" },
      { key: "copyright", label: "Copyright (use {year})", type: "text" },
      {
        key: "legalLinks",
        label: "Legal links",
        type: "list",
        itemNoun: "link",
        titleKey: "label",
        fields: link(),
      },
    ],
    default: {
      tagline: "Autonomous drone delivery — from hub to backyard in under 10 minutes.",
      statusText: "Now live in 6 cities",
      productLinks: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Technology", href: "/technology" },
        { label: "Safety Record", href: "/safety" },
        { label: "Service Areas", href: "/locations" },
        { label: "For Business", href: "/for-business" },
        { label: "Pricing", href: "/pricing" },
      ],
      companyLinks: [
        { label: "About Us", href: "#" },
        { label: "Newsroom", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Investor Relations", href: "#" },
        { label: "Contact", href: "#" },
      ],
      ctaPrimaryLabel: "Request Demo",
      ctaPrimaryHref: "/for-business",
      ctaSecondaryLabel: "Find My City",
      ctaSecondaryHref: "/locations",
      certText: "FAA Part 135 Certified · Zero Incidents",
      copyright: "© {year} SpeedUp Inc. All rights reserved.",
      legalLinks: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Settings", href: "#" },
      ],
    },
  },
  {
    key: "global.demoForm",
    title: "Demo request form",
    group: "Global",
    description:
      'The pop-up form opened by the "Request Demo" / "Schedule a Demo" buttons. Paste your Formspree endpoint to start receiving submissions.',
    fields: [
      {
        key: "formspreeEndpoint",
        label: "Formspree endpoint URL",
        type: "url",
        help: "Create a form at formspree.io and paste its endpoint, e.g. https://formspree.io/f/abcdwxyz",
      },
      { key: "title", label: "Form title", type: "text" },
      { key: "subtitle", label: "Form subtitle", type: "textarea" },
      { key: "submitLabel", label: "Submit button label", type: "text" },
      { key: "successTitle", label: "Success heading", type: "text" },
      { key: "successMessage", label: "Success message", type: "textarea" },
    ],
    default: {
      formspreeEndpoint: "",
      title: "Request a demo",
      subtitle:
        "See SpeedUp fly in your city. Tell us a bit about you and our team will reach out within one business day.",
      submitLabel: "Send request",
      successTitle: "Request received",
      successMessage:
        "Thanks for reaching out — we'll be in touch shortly with next steps and availability in your area.",
    },
  },

  // ──────────────────────────────── Home ────────────────────────────────
  {
    key: "home.hero",
    title: "Hero",
    group: "Home",
    description: "The first thing visitors see — headline, sub-text and CTAs.",
    fields: [
      { key: "badge", label: "Badge text", type: "text" },
      { key: "headlineLine1", label: "Headline line 1", type: "text" },
      { key: "headlineHighlight", label: "Headline line 2 (accent)", type: "text" },
      { key: "headlineLine3", label: "Headline line 3", type: "text" },
      { key: "subhead", label: "Sub-headline", type: "textarea" },
      { key: "ctaPrimaryLabel", label: "Primary button label", type: "text" },
      { key: "ctaPrimaryHref", label: "Primary button link", type: "url" },
      { key: "ctaSecondaryLabel", label: "Secondary button label", type: "text" },
      { key: "ctaSecondaryHref", label: "Secondary button link", type: "url" },
      {
        key: "trustStats",
        label: "Trust strip stats",
        type: "list",
        itemNoun: "stat",
        titleKey: "label",
        fields: [
          { key: "val", label: "Value", type: "text" },
          { key: "suf", label: "Suffix", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "cruiseChip", label: "Cruise speed chip", type: "text" },
      {
        key: "bottomChips",
        label: "Tracker chips",
        type: "list",
        itemNoun: "chip",
        titleKey: "text",
        fields: [{ key: "text", label: "Text", type: "text" }],
      },
    ],
    default: {
      badge: "Now Operational · 6 US Cities",
      headlineLine1: "Backyard",
      headlineHighlight: "Delivery.",
      headlineLine3: "Reinvented.",
      subhead:
        "Fully autonomous drones deliver from your favorite restaurants and stores to your exact backyard — under 10 minutes, zero traffic, every time.",
      ctaPrimaryLabel: "Get Early Access",
      ctaPrimaryHref: "/for-business",
      ctaSecondaryLabel: "How It Works",
      ctaSecondaryHref: "/how-it-works",
      trustStats: [
        { val: "<10", suf: "min", label: "Avg delivery time" },
        { val: "100K+", suf: "", label: "Deliveries flown" },
        { val: "0", suf: "", label: "Incidents to date" },
        { val: "FAA", suf: "", label: "Part 135 certified" },
      ],
      cruiseChip: "⚡ Cruise speed: 120 km/h",
      bottomChips: [
        { text: "🛡 FAA Part 135" },
        { text: "📍 ±10 cm precision" },
        { text: "🔋 100% renewable" },
      ],
    },
  },
  {
    key: "home.stats",
    title: "Stats band",
    group: "Home",
    description: '"By the numbers" headline statistics.',
    fields: [
      { key: "eyebrow", label: "Eyebrow label", type: "text" },
      {
        key: "items",
        label: "Stats",
        type: "list",
        itemNoun: "stat",
        titleKey: "label",
        fields: [
          { key: "prefix", label: "Prefix", type: "text" },
          { key: "counter", label: "Number", type: "number" },
          { key: "suffix", label: "Suffix", type: "text" },
          { key: "unit", label: "Unit", type: "text" },
          { key: "label", label: "Label", type: "text" },
          { key: "sub", label: "Sub-label", type: "text" },
          { key: "color", label: "Color", type: "color" },
        ],
      },
    ],
    default: {
      eyebrow: "By the numbers",
      items: [
        { prefix: "<", counter: 10, suffix: "", unit: "min", label: "Average delivery time", sub: "Door to backyard", color: "#FF5500" },
        { prefix: "", counter: 100, suffix: "K+", unit: "", label: "Deliveries flown", sub: "And counting daily", color: "#D97706" },
        { prefix: "", counter: 99, suffix: ".9%", unit: "", label: "Fleet uptime", sub: "Across all hubs", color: "#16A34A" },
        { prefix: "", counter: 0, suffix: "", unit: "", label: "Incidents recorded", sub: "Since launch 2022", color: "#2563EB" },
      ],
    },
  },
  {
    key: "home.partners",
    title: "Partners marquee",
    group: "Home",
    description: "Scrolling list of delivery partners.",
    fields: [
      { key: "label", label: "Section label", type: "text" },
      {
        key: "items",
        label: "Partners",
        type: "list",
        itemNoun: "partner",
        titleKey: "name",
        fields: [
          { key: "emoji", label: "Emoji", type: "text" },
          { key: "name", label: "Name", type: "text" },
        ],
      },
    ],
    default: {
      label: "Delivery Partners",
      items: [
        { name: "Chili's", emoji: "🌶️" },
        { name: "CVS", emoji: "💊" },
        { name: "Walmart", emoji: "🛒" },
        { name: "Domino's", emoji: "🍕" },
        { name: "Target", emoji: "🎯" },
        { name: "Starbucks", emoji: "☕" },
        { name: "Whole Foods", emoji: "🥗" },
        { name: "GNC", emoji: "💪" },
      ],
    },
  },
  {
    key: "home.pageCards",
    title: "Explore cards",
    group: "Home",
    description: '"Everything you need to know" navigation cards.',
    fields: [
      { key: "eyebrow", label: "Eyebrow label", type: "text" },
      { key: "heading", label: "Heading (use line breaks)", type: "textarea" },
      { key: "subhead", label: "Sub-headline", type: "textarea" },
      {
        key: "cards",
        label: "Cards",
        type: "list",
        itemNoun: "card",
        titleKey: "label",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "headline", label: "Headline (use line breaks)", type: "textarea" },
          { key: "desc", label: "Description", type: "textarea" },
          { key: "href", label: "Link", type: "url" },
          { key: "accent", label: "Accent color", type: "color" },
          { key: "num", label: "Corner number", type: "text" },
        ],
      },
    ],
    default: {
      eyebrow: "Explore SpeedUp",
      heading: "Everything\nyou need\nto know.",
      subhead: "Dive into any section — each page is packed with details, demos, and data.",
      cards: [
        { label: "How It Works", headline: "Order to door.\nThree steps.", desc: "See exactly how a delivery goes from tap to backyard in under 10 minutes.", href: "/how-it-works", accent: "#FF5500", num: "01" },
        { label: "Technology", headline: "Built for\nthe future.", desc: "AI navigation, solid-state LiDAR, dual 5G+satellite comms — explore the hardware.", href: "/technology", accent: "#2563EB", num: "02" },
        { label: "Safety", headline: "Zero\nincidents.", desc: "FAA Part 135 certified. 4M+ hours flown. Every safety layer, explained.", href: "/safety", accent: "#16A34A", num: "03" },
        { label: "Locations", headline: "Live in\n6 cities.", desc: "Explore active zones, watch a live drone flight, and check your address.", href: "/locations", accent: "#7C3AED", num: "04" },
        { label: "For Business", headline: "Cut delivery\ncosts in half.", desc: "No driver fleet, no tips — a flat fee per delivery. See plans for every industry.", href: "/for-business", accent: "#D97706", num: "05" },
      ],
    },
  },
  {
    key: "home.finalCta",
    title: "Final call-to-action",
    group: "Home",
    description: "Closing audience cards and demo banner at the bottom of the page.",
    fields: [
      { key: "eyebrow", label: "Eyebrow label", type: "text" },
      { key: "headlineLine1", label: "Headline line 1", type: "text" },
      { key: "headlineHighlight", label: "Headline line 2 (accent)", type: "text" },
      { key: "subhead", label: "Sub-headline", type: "textarea" },
      {
        key: "cards",
        label: "Audience cards",
        type: "list",
        itemNoun: "card",
        titleKey: "tag",
        fields: [
          { key: "tag", label: "Tag", type: "text" },
          { key: "headline", label: "Headline", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
          { key: "cta", label: "Link label", type: "text" },
          { key: "href", label: "Link", type: "url" },
          { key: "color", label: "Accent color", type: "color" },
        ],
      },
      { key: "demoEyebrow", label: "Demo banner eyebrow", type: "text" },
      { key: "demoHeadline", label: "Demo banner headline (use line breaks)", type: "textarea" },
      { key: "demoPrimaryLabel", label: "Demo primary button", type: "text" },
      { key: "demoPrimaryHref", label: "Demo primary link", type: "url" },
      { key: "demoSecondaryLabel", label: "Demo secondary button", type: "text" },
      { key: "demoSecondaryHref", label: "Demo secondary link", type: "url" },
      { key: "liveLabel", label: '"Live in" label', type: "text" },
      {
        key: "cities",
        label: "Cities",
        type: "list",
        itemNoun: "city",
        titleKey: "name",
        fields: [{ key: "name", label: "City", type: "text" }],
      },
      { key: "comingSoon", label: "Coming-soon note", type: "text" },
    ],
    default: {
      eyebrow: "Available Now · 6 US Cities",
      headlineLine1: "Delivery.",
      headlineHighlight: "Reinvented.",
      subhead:
        "Join thousands already flying with SpeedUp. Whether you're a restaurant, retailer, or resident — there's a SpeedUp plan built for you.",
      cards: [
        { tag: "For Businesses", headline: "Cut your delivery costs in half.", desc: "No driver fleet, no tips, no logistics overhead. SpeedUp charges a flat fee per delivery and handles everything from launch to landing.", cta: "Explore Business Plans", href: "/for-business", color: "#FF5500" },
        { tag: "For Residents", headline: "Your neighborhood, delivered fast.", desc: "Sign up for early access in your city and get notified when SpeedUp goes live within 2 km of your address.", cta: "Join the Waitlist", href: "/locations", color: "#2563EB" },
        { tag: "For Investors", headline: "The future of last-mile logistics.", desc: "We've proven the model. Now we're scaling to 100 cities by 2027. See our traction, unit economics, and roadmap.", cta: "View Investor Deck", href: "/technology", color: "#16A34A" },
      ],
      demoEyebrow: "Request a Demo",
      demoHeadline: "See SpeedUp fly\nin your city.",
      demoPrimaryLabel: "Schedule a Demo",
      demoPrimaryHref: "/for-business",
      demoSecondaryLabel: "View Pricing",
      demoSecondaryHref: "/pricing",
      liveLabel: "Live in",
      cities: [
        { name: "Orlando, FL" },
        { name: "Miami, FL" },
        { name: "Dallas, TX" },
        { name: "Atlanta, GA" },
        { name: "New York, NY" },
      ],
      comingSoon: "+ Los Angeles → Q3 2025",
    },
  },
];

export const REGISTRY_BY_KEY: Record<string, SectionDef> = Object.fromEntries(
  REGISTRY.map((s) => [s.key, s]),
);

/** Built-in defaults keyed by section — the site's fallback content. */
export const DEFAULTS: Record<string, Record<string, unknown>> = Object.fromEntries(
  REGISTRY.map((s) => [s.key, s.default]),
);

/** Sections grouped for the admin sidebar, preserving registry order. */
export function registryGroups(): { group: string; sections: SectionDef[] }[] {
  const groups: { group: string; sections: SectionDef[] }[] = [];
  for (const section of REGISTRY) {
    let bucket = groups.find((g) => g.group === section.group);
    if (!bucket) {
      bucket = { group: section.group, sections: [] };
      groups.push(bucket);
    }
    bucket.sections.push(section);
  }
  return groups;
}
