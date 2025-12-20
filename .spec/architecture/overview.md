# Blog Architecture Overview

## System Context

```
┌─────────────────────────────────────────────────────────────────┐
│                         Users                                    │
│                           │                                      │
│                           ▼                                      │
│                    ┌─────────────┐                               │
│                    │  Cloudflare │                               │
│                    │     CDN     │                               │
│                    └──────┬──────┘                               │
│                           │                                      │
│                           ▼                                      │
│                    ┌─────────────┐                               │
│                    │   K3s       │                               │
│                    │  Cluster    │                               │
│                    └──────┬──────┘                               │
│                           │                                      │
│              ┌────────────┼────────────┐                         │
│              ▼            ▼            ▼                         │
│        ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│        │  Blog   │  │Directus │  │  Other  │                     │
│        │ (Astro) │  │   CMS   │  │Services │                     │
│        └─────────┘  └─────────┘  └─────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend (Astro)

```
apps/web/
├── src/
│   ├── pages/           # File-based routing
│   │   ├── index.astro  # Homepage
│   │   ├── blog/        # Blog section
│   │   └── [...slug].astro  # Dynamic routes
│   ├── layouts/         # Page layouts
│   │   └── Base.astro   # Base HTML layout
│   ├── components/      # Astro/React components
│   └── lib/             # Utilities, API clients
├── public/              # Static assets
└── astro.config.mjs     # Astro configuration
```

### Design System Integration

```tsx
// Import components from design system
import { Button, Card } from "@thamimagi/design-system";
import "@thamimagi/design-system/styles";

// Use in Astro components
<Card title="Blog Post">
  <Button variant="primary">Read More</Button>
</Card>
```

## Data Flow

### Build-time (SSG)

```
1. GitHub Actions triggers build
2. Astro fetches content from Directus API
3. Static HTML generated for each page
4. Assets deployed to K8s / Cloudflare
```

### Content Updates

```
1. Editor updates content in Directus
2. Directus Flow triggers GitHub dispatch
3. Blog repo rebuilds
4. ArgoCD deploys updated static files
```

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Astro | Best static site performance |
| Styling | TailwindCSS + DaisyUI | Design system compatibility |
| CMS | Directus | Self-hosted, flexible API |
| Deployment | K3s + ArgoCD | GitOps workflow |
