# 10 — Docker & Cloud Run Plan

## Container-first standard

Every major service runs as a versioned container.

## Local compose draft

```yaml
services:
  web:
    build: ./apps/web
    ports: ['3000:3000']
  api:
    build: ./services/api
    ports: ['8080:8080']
  agent:
    build: ./services/agent
    ports: ['8081:8080']
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: localpass
  redis:
    image: redis:7
```

## Cloud Run deployment

```bash
gcloud artifacts repositories create bookedai-services   --repository-format=docker   --location=australia-southeast1

gcloud builds submit --tag australia-southeast1-docker.pkg.dev/$PROJECT_ID/bookedai-services/api:latest ./services/api

gcloud run deploy api-g-bookedai   --image australia-southeast1-docker.pkg.dev/$PROJECT_ID/bookedai-services/api:latest   --region australia-southeast1   --platform managed
```

## Scaling rule

```txt
Cloud Run first. Move to GKE only if traffic, multi-tenant isolation, or advanced networking requires it.
```
