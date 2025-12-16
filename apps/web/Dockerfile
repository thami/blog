# Build stage - use Bun for fast builds
FROM oven/bun:1 AS build

WORKDIR /app

# Copy workspace root files for monorepo context
COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/

# Install dependencies using Bun
WORKDIR /app/apps/web
RUN bun install

# Copy source files
COPY apps/web/ ./

# Build the Astro static site
RUN bun run build

# Production stage - lightweight nginx for static files
FROM nginx:alpine AS runtime

# Copy built static files
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

# Custom nginx config for SPA routing
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
