# MEGHDRISHTI (मेघदृष्टि)
> **Hyperlocal Monsoon Intelligence Platform**

MEGHDRISHTI is an AI-driven climate intelligence system providing hyperlocal monsoon onset predictions, false-onset risk analytics, and precision agricultural advisories for farmers and policy makers.

---

## 🎨 Design System & Palette

MEGHDRISHTI uses a light, clean, professional climate & agricultural design system:

- **Background**: `#F7F8F5`
- **Surface**: `#FFFFFF`
- **Primary Green**: `#176B4D` (Brand)
- **Secondary Green**: `#2F8F62`
- **Soft Green**: `#E8F3EC`
- **Warm Beige**: `#F3EFE5`
- **Soft Yellow**: `#FFF4D6`
- **Warning**: `#D99A18`
- **Danger**: `#D9574A`
- **Primary Text**: `#17211C`
- **Secondary Text**: `#65736B`
- **Border**: `#DDE4DE`
- **Rainfall Blue**: `#4A90C2` *(Used exclusively for rainfall/water data)*

---

## 🛠️ Project Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Geospatial & Mapping**: [MapLibre GL JS](https://maplibre.org/) & [react-map-gl](https://visgl.github.io/react-map-gl/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Architecture & Directory Structure

```
meghdrishti/
│
├── app/                      # Next.js App Router pages & layouts
│   ├── page.tsx              # Landing / Index route
│   ├── dashboard/            # Monsoon Overview & Analytics
│   ├── map/                  # Hyperlocal Geospatial Risk Map
│   ├── forecast/             # Long-range & Medium-range Monsoon Predictions
│   ├── advisory/             # Crop-specific Sowing & Action Advisories
│   ├── farmer/               # Simplified Farmer-Centric Dashboard
│   ├── layout.tsx            # Global Root Layout
│   └── globals.css           # Design Tokens & Theme Variables
│
├── components/               # Modular UI Components
│   ├── layout/               # Header, AppShell, LocationSelector (Top Horizontal Nav)
│   ├── dashboard/            # Status, Risk Overview, Timeline, Drivers
│   ├── map/                  # Risk Map, Controls, Legend, Details
│   ├── forecast/             # Forecast Charts, Phase Timelines, Risk
│   ├── advisory/             # Crop & Stage Selectors, Sowing Windows
│   ├── farmer/               # Farmer Forecast, Advisory, Dashboard
│   └── shared/               # Reusable Atoms (StatCard, Badges, Headers, ProbabilityBar)
│
├── data/                     # Mock Data & Prototype Datasets
│   ├── locations.ts          # Geo coordinates & district info
│   ├── forecasts.ts          # Onset probabilities & metrics
│   ├── climate.ts            # ENSO, IOD, and climate drivers
│   ├── crops.ts              # Crop phenology & water requirements
│   └── advisories.ts         # Actionable advisories & alerts
│
├── lib/                      # Application & Business Logic
│   ├── advisory-engine.ts    # Advisory decision algorithms
│   ├── forecast-utils.ts     # Meteorological & statistical helpers
│   ├── location-utils.ts     # Spatial lookup & helpers
│   └── utils.ts              # Class merging & general utilities
│
├── types/                    # TypeScript Type Definitions & Contracts
│   ├── forecast.ts           # Forecast & onset types
│   ├── location.ts           # Geographic & spatial types
│   ├── crop.ts               # Crop & phenological types
│   └── advisory.ts           # Advisory & alert types
│
├── config/                   # Global App Configuration
│   └── site.ts               # Site metadata & navigation config
│
└── public/                   # Static Assets
    ├── images/
    ├── icons/
    └── logo/
```

---

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.