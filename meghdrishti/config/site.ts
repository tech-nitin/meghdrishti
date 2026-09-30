export const siteConfig = {
  name: "MEGHDRISHTI",
  tagline: "Hyperlocal Monsoon Intelligence",
  description:
    "AI-driven climate intelligence and hyperlocal monsoon onset, risk, and agricultural advisory platform.",
  navItems: [
    { label: "Overview", href: "/dashboard" },
    { label: "Risk Map", href: "/map" },
    { label: "Forecast", href: "/forecast" },
    { label: "Advisory", href: "/advisory" },
    { label: "Farmer Mode", href: "/farmer" },
  ],
};

export type SiteConfig = typeof siteConfig;
