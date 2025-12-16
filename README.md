# Blog Monorepo

Blog platform using Astro with Directus CMS integration.

## Structure

```
blog/
├── apps/
│   └── web/          # Astro frontend
├── packages/
│   └── config/       # Shared configurations
├── package.json
└── pnpm-workspace.yaml
```

## Tech Stack

- **Frontend**: Astro + @thamimagi/design-system
- **CMS**: Directus (headless)
- **Styling**: TailwindCSS v4 + DaisyUI v5
- **Package Manager**: pnpm workspaces

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build for production
pnpm build
```

## Design System

This project uses [@thamimagi/design-system](https://www.npmjs.com/package/@thamimagi/design-system) for UI components.

```bash
pnpm add @thamimagi/design-system
```

## License

MIT
