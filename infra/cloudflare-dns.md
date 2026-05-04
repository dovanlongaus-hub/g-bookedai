# Cloudflare DNS Configuration

## Domains
- `bookedai.au` — AI Revenue Engine Platform
- `longcare.au` — First production tenant

## DNS Records

### bookedai.au Zone

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | g | web-g-bookedai-xxxxx.run.app | Yes |
| CNAME | api.g | api-g-bookedai-xxxxx.run.app | Yes |
| CNAME | agent.g | agent-g-bookedai-xxxxx.run.app | Yes |
| CNAME | app.g | (future multi-tenant workspace) | - |

### longcare.au Zone

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | @ | web-longcare-xxxxx.run.app | Yes |
| CNAME | book | booking-web-xxxxx.run.app | Yes |
| CNAME | app | user-app-xxxxx.run.app | Yes |
| CNAME | admin | admin-app-xxxxx.run.app | Yes |
| CNAME | services | (SEO landing pages) | - |
| TXT | @ | v=spf1 include:_spf.google.com ~all | No |
| MX | @ | aspmx.l.google.com (priority 1) | No |

## Cloud Run Domain Mapping

After deploying to Cloud Run, map custom domains:

```bash
# Map each Cloud Run service to its domain
gcloud run domain-mappings create --service web-g-bookedai --domain g.bookedai.au --region australia-southeast1
gcloud run domain-mappings create --service api-g-bookedai --domain api.g.bookedai.au --region australia-southeast1
gcloud run domain-mappings create --service web-longcare --domain longcare.au --region australia-southeast1
gcloud run domain-mappings create --service booking-web --domain book.longcare.au --region australia-southeast1
gcloud run domain-mappings create --service user-app --domain app.longcare.au --region australia-southeast1
gcloud run domain-mappings create --service admin-app --domain admin.longcare.au --region australia-southeast1
```

## SSL
Cloudflare provides automatic SSL with "Full (strict)" mode.
Set SSL/TLS encryption mode to "Full (strict)" in Cloudflare dashboard.

## Page Rules

| URL Pattern | Setting |
|---|---|
| `*longcare.au/api/*` | Cache Level: Bypass |
| `*longcare.au/*.js` | Cache Level: Cache Everything, Edge TTL: 1 month |
| `*longcare.au/*.css` | Cache Level: Cache Everything, Edge TTL: 1 month |

## Security Headers (Cloudflare Workers or Transform Rules)

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
