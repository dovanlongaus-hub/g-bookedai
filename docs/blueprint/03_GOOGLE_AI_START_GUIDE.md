# 03 — Starting with Google AI & Google Cloud

## 1. Account ownership

Use `ceo@longcare.au` as the business owner for:

- Google Cloud billing owner
- Google Workspace admin
- Google Ads owner
- Google Analytics owner
- Search Console owner
- Google Drive/Docs owner

## 2. Create Google Cloud project

Suggested project IDs:

```txt
longcare-prod
longcare-staging
bookedai-g-prod
```

Minimum services to enable:

```bash
gcloud services enable   run.googleapis.com   artifactregistry.googleapis.com   cloudbuild.googleapis.com   secretmanager.googleapis.com   sqladmin.googleapis.com   firestore.googleapis.com   pubsub.googleapis.com   cloudscheduler.googleapis.com   cloudtasks.googleapis.com   aiplatform.googleapis.com   generativelanguage.googleapis.com   calendar-json.googleapis.com   gmail.googleapis.com   drive.googleapis.com   docs.googleapis.com   sheets.googleapis.com   translate.googleapis.com   speech.googleapis.com   texttospeech.googleapis.com
```

## 3. Gemini / Vertex AI setup

Initial approach:

```txt
Phase 1: Use Gemini API directly from agent-service.
Phase 2: Move agent orchestration to Vertex AI Agent Builder / ADK.
Phase 3: Deploy production agents to Agent Engine.
```

### Core Gemini tools

```txt
searchServices()
checkAvailability()
createBookingHold()
confirmBooking()
createPaymentLink()
createCalendarMeet()
sendEmail()
createLearningNotes()
generateMarketingCampaign()
recommendNextCourse()
```

## 4. Local developer environment

Recommended IDE:

```txt
VS Code + Google Cloud Code + Gemini Code Assist + Docker Desktop + gcloud CLI
```

## 5. Container-first flow

```txt
Local Docker Compose → Artifact Registry → Cloud Run staging → Cloud Run production
```

## 6. First deploy sequence

```txt
1. Deploy api.g.bookedai.au
2. Deploy agent.g.bookedai.au
3. Deploy g.bookedai.au
4. Deploy longcare.au / book.longcare.au / app.longcare.au
5. Run smoke tests
```

## 7. Secrets to store in Secret Manager

```txt
GEMINI_API_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
XERO_CLIENT_ID
XERO_CLIENT_SECRET
DB_CONNECTION_STRING
```

## 8. Auth scope planning

Admin account `ceo@longcare.au` needs scopes for Drive, Docs, Sheets, Calendar, Gmail only after explicit OAuth consent. For production, use least-privilege scopes and separate service accounts for backend infrastructure.
