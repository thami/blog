# Blog Kubernetes Deployment

Kubernetes manifests for deploying the Astro blog to the K3s cluster.

## Prerequisites

### GitHub Container Registry Authentication

The blog uses `ghcr.io/thami/blog` as the container image. To pull from ghcr.io:

1. Create a GitHub Personal Access Token (PAT) with `read:packages` scope
2. Store in Vault:
   ```bash
   kubectl exec -n vault vault-0 -- vault kv put secret/github \
     username=thami \
     token=<your-github-pat>
   ```
3. The ExternalSecret will sync this to a Kubernetes dockerconfigjson secret

**Alternative**: Make the package public at https://github.com/users/thami/packages/container/blog/settings

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

The deployment uses `ghcr.io/thami/blog:latest`. Ensure GitHub Actions builds and pushes the image.

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
