# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

Astro-based blog frontend consuming Directus CMS content. Part of a multi-repo architecture.

**Tech Stack**: Astro + TailwindCSS v4 + DaisyUI v5 + @thamimagi/design-system

## Related Repositories

| Repository | Path | Purpose |
|------------|------|---------|
| **blog** (this) | `/Users/thami.magi/workspace/blog` | Astro frontend |
| **blog-cms** | `/Users/thami.magi/workspace/blog-cms` | Directus CMS config |
| **design-system** | `/Users/thami.magi/workspace/design-system` | UI components |
| **kubernetes-spec-kit** | `/Users/thami.magi/workspace/kubernetes-spec-kit` | Infrastructure |

## Project Structure

```
blog/
├── apps/
│   └── web/              # Astro frontend app
│       ├── src/
│       │   ├── pages/    # Astro pages
│       │   ├── layouts/  # Page layouts
│       │   └── components/
│       └── astro.config.mjs
├── packages/
│   └── config/           # Shared configurations
├── k8s/                  # Kubernetes manifests
├── .github/workflows/    # CI/CD pipelines
└── pnpm-workspace.yaml   # Monorepo config
```

## Key Commands

```bash
# Development
pnpm install              # Install dependencies
pnpm dev                  # Start dev server
pnpm build                # Build for production
pnpm preview              # Preview production build

# Quality
pnpm lint                 # Run linter
pnpm typecheck            # TypeScript check
```

## Architecture

### Content Flow

```
Directus CMS → API (api.thamimagi.dev) → Astro SSG → Static HTML → CDN
```

### Rebuild Triggers

Content changes in Directus trigger automatic rebuilds via:
1. Directus Flow with GitHub Operation extension
2. Repository dispatch to this repo
3. GitHub Actions builds and deploys

## Constraints

1. **Use @thamimagi/design-system** for all UI components
2. **Never hardcode content** - all content from Directus
3. **Follow Astro patterns** - prefer static generation, islands for interactivity
4. **Commit to main** - ArgoCD auto-deploys from main branch

## MCP Integration

Available MCP servers:
- **Directus MCP**: Content management via Claude
- **GitHub MCP**: Repository operations

## Deployment

- **URL**: https://blog.thamimagi.dev
- **Platform**: K3s cluster via ArgoCD
- **CDN**: Cloudflare

## Credentials

All secrets in HashiCorp Vault at `secret/blog`:
```bash
kubectl exec -n vault vault-0 -- vault kv get secret/blog
```
