# Blog Kubernetes Deployment

Kubernetes manifests for deploying the Astro blog to the K3s cluster.

## Prerequisites

### Container Registry

The blog uses `thami/blog` on Docker Hub. The image is public, so no authentication is required for pulling.

The GitHub Actions workflow pushes to Docker Hub on each push to main. Required repository secrets:
- `DOCKERHUB_USERNAME`: Your Docker Hub username (thami)
- `DOCKERHUB_TOKEN`: Docker Hub access token (create at https://hub.docker.com/settings/security)

### DNS Configuration

Add `blog.thamimagi.dev` DNS record pointing to `192.168.1.108` (Traefik):

**EdgeRouter (Local DNS):**
```
set system static-host-mapping host-name blog.thamimagi.dev inet 192.168.1.108
commit
save
```

**Cloudflare (Public DNS):**
- Type: A
- Name: blog
- IPv4: <public-ip-or-cloudflare-tunnel>
- Proxy: On (orange cloud)

### Container Registry

The deployment uses `thami/blog:latest` from Docker Hub. GitHub Actions builds and pushes the image on each push to main.

## Manifests

| File | Description |
|------|-------------|
| `namespace.yaml` | Creates `blog` namespace |
| `certificate.yaml` | Let's Encrypt TLS certificate via cert-manager |
| `deployment.yaml` | 2-replica deployment with health checks |
| `service.yaml` | ClusterIP service on port 80 |
| `ingressroute.yaml` | Traefik IngressRoute for HTTPS |
| `kustomization.yaml` | Kustomize configuration |

## Manual Deployment

```bash
# Apply all manifests
kubectl apply -k k8s/

# Check deployment status
kubectl get pods -n blog
kubectl get certificate -n blog
kubectl get ingressroute -n blog
```

## ArgoCD Deployment (Recommended)

The blog is deployed via ArgoCD for GitOps:

```bash
# Check application status
argocd app get blog

# Sync application
argocd app sync blog
```

## Access

- URL: https://blog.thamimagi.dev
- Health: https://blog.thamimagi.dev/health

## Troubleshooting

```bash
# Check pod logs
kubectl logs -n blog -l app.kubernetes.io/name=blog

# Check certificate status
kubectl describe certificate blog-tls -n blog

# Check IngressRoute
kubectl describe ingressroute blog-tls -n blog
```
